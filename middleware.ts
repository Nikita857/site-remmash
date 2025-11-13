import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Секрет должен совпадать с NEXTAUTH_SECRET в .env.local
const secret = process.env.NEXTAUTH_SECRET || 'default_secret_for_dev';

// Middleware для защиты админ-маршрутов
export default async function middleware(request: NextRequest) {
  // Если маршрут начинается с /admin, проверяем аутентификацию и права
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = await getToken({ req: request, secret });
    
    // Если нет токена или пользователь не админ или модератор, перенаправляем на страницу логина
    if (!token || !(token.role === 'ADMIN' || token.role === 'MODERATOR')) {
      const url = request.nextUrl.clone();
      url.pathname = '/rm-login';
      url.search = `callbackUrl=${request.nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }
  }
  
  // Для всех остальных маршрутов пропускаем без проверки
  return NextResponse.next();
}

// Указываем, какие маршруты должны обрабатываться мидлваром
export const config = {
  matcher: [
    /*
     * Сопоставляем все пути, которые начинаются с /admin
     * и исключаем общие файлы, такие как _next, api, favicon.ico и т.д.
     */
    '/admin/:path*',
  ],
};