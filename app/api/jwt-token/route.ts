// app/api/jwt-token/route.ts
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Получаем токен из заголовка Authorization или cookie
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Возвращаем токен (в реальной ситуации будьте осторожны с этим)
  return Response.json({ 
    token: request.headers.get('authorization')?.replace('Bearer ', '') || 'Token not exposed',
    claims: token,
    message: 'JWT token is being used internally by NextAuth.js in JWS compact serialization format.'
  });
}