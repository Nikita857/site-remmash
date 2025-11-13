'use client';

import { useSession } from 'next-auth/react';
import jwt_decode from 'jwt-decode'; // npm install jwt-decode @types/jwt-decode

/**
 * Hook для получения JWT токена
 * В NextAuth.js JWT токен не предоставляется напрямую на клиенте
 * Но мы можем создать специальный endpoint для его получения или извлекать из сессии
 */
export function useJwtToken() {
  const { data: session, status } = useSession();
  
  // В NextAuth.js по умолчанию токен не передается в сессии на клиент
  // Но мы можем получить доступ к зашифрованному JWT токену через API
  const getJwtToken = async (): Promise<string | null> => {
    if (status === 'authenticated' && session) {
      // Получаем токен, делая запрос к /api/auth/session
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      
      // NextAuth.js не возвращает сырой JWT токен напрямую
      // Вместо этого мы можем использовать getSession или использовать серверный компонент
      return data?.accessToken || null;
    }
    return null;
  };

  return {
    session,
    status,
    getJwtToken,
  };
}

/**
 * Функция для декодирования JWT токена (для отладки)
 */
export function decodeJwtToken(token: string) {
  try {
    const decoded = jwt_decode(token);
    return decoded;
  } catch (error) {
    console.error('Ошибка декодирования JWT токена:', error);
    return null;
  }
}

/**
 * Серверный помощник для получения JWT токена из запроса
 * Используется в серверных компонентах
 */
export async function getServerSessionToken(req: Request) {
  // Этот метод будет работать в middleware или API routes
  // NextAuth.js сам управляет токенами, но мы можем получить доступ через getToken
  const token = await import('next-auth/jwt').then(mod => mod.getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  }));
  
  return token;
}