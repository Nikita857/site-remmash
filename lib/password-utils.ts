import { compare, hash } from "bcryptjs";

/**
 * Хеширует пароль
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await hash(password, saltRounds);
}

/**
 * Сравнивает пароль с хешем
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash);
}

/**
 * Генерирует случайный пароль
 */
export function generateRandomPassword(length: number = 12): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

/**
 * Проверяет надежность пароля
 */
export function isPasswordStrong(password: string): boolean {
  // Проверяем, что пароль содержит минимум 8 символов,
  // хотя бы одну заглавную букву, одну строчную, одну цифру и один специальный символ
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{8,}$/;
  return strongPasswordRegex.test(password);
}
