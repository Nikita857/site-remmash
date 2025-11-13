import { DefaultSession } from 'next-auth';

// Типы ролей пользователей
type UserRole = 'ADMIN' | 'MODERATOR';

// Расширяем дефолтный тип сессии
declare module 'next-auth' {
  /**
   * Расширенная сессия для включения дополнительных полей
   */
  interface Session {
    user: {
      /** Уникальный ID пользователя */
      id: string;
      /** Роль пользователя (ADMIN, MODERATOR) */
      role: UserRole;
      /** Отдел пользователя */
      department: string;
    } & DefaultSession['user'];
  }

  /**
   * Расширяем JWT токен для включения дополнительных данных
   */
  interface JWT {
    /** Роль пользователя */
    role: UserRole;
    /** Уникальный ID пользователя */
    id: string;
    /** Отдел пользователя */
    department: string;
  }

  /**
   * Расширяем тип пользователя из authorize
   */
  interface User {
    /** Уникальный ID пользователя */
    id: string;
    name: string;
    email: string;
    /** Роль пользователя */
    role: UserRole;
    /** Отдел пользователя */
    department: string;
  }
}