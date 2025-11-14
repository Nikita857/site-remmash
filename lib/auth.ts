import NextAuth, { JWT, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./password-utils";
import prisma from "./prisma/client";
import { UserRole } from "@prisma/client";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Отсутствуют необходимые учетные данные");
            return null;
          }

          // Поиск пользователя в базе данных по email
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
              isActive: true,
            },
          });

          if (!user) {
            console.error(
              "Пользователь с таким email не найден:",
              credentials.email
            );
            return null;
          }

          console.log("Найден пользователь:", user.email, user.role);

          // Проверка пароля
          const isValidPassword = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            console.error("Неверный пароль для пользователя:", user.email);
            return null;
          }

          console.log("Успешная аутентификация для пользователя:", user.email);

          // Возвращаем пользователя с его ролью
          return {
            id: user.id,
            name: `${user.name} ${user.surname}`, // Объединяем имя и фамилию
            email: user.email,
            role: user.role, // Сохраняем роль как есть (ADMIN/MODERATOR)
            department: user.department,
          };
        } catch (error) {
          console.error("Ошибка при аутентификации пользователя:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.id = user.id;
        token.department = user.department;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string; // используем стандартное поле sub
        session.user.role = token.role as UserRole;
        session.user.department = token.department as string;
        // Добавляем токен в сессию для доступа на клиенте
        session.accessToken = token.jti as JWT; // jti - JWT ID
      }
      return session;
    },
  },
  pages: {
    signIn: "/rm-login", // Настраиваем наш маршрут
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "default_secret_for_dev", // В продакшене обязательно укажите в .env.local
};

const handler = NextAuth(nextAuthOptions);

// Правильный экспорт для Next.js App Router
export { handler as GET, handler as POST };
export const authOptions = nextAuthOptions;
