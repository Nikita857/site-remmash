import { auth } from '@/lib/auth';

// Типы для сессии
export type UserRole = 'ADMIN' | 'MODERATOR' | 'user';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Session {
  user: SessionUser;
  expires: string;
}

/**
 * Проверяет, аутентифицирован ли пользователь
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const session = await auth();
    return !!session?.user;
  } catch {
    return false;
  }
}

/**
 * Получает информацию о текущем пользователе
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const session = await auth();
    return session?.user || null;
  } catch {
    return null;
  }
}

/**
 * Проверяет, является ли пользователь администратором
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const session = await auth();
    return session?.user?.role === 'ADMIN';
  } catch {
    return false;
  }
}

/**
 * Проверяет, есть ли у пользователя доступ к админке
 */
export async function hasAdminAccess(): Promise<boolean> {
  return await isAdmin();
}