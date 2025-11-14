import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/client';

export async function GET(request: NextRequest) {
  try {
    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return Response.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }

    // Получаем все заявки
    const requests = await prisma.contactRequest.findMany({
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        message: true,
        status: true,
        contactedAt: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Response.json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error('Ошибка получения заявок:', error);

    return Response.json(
      {
        success: false,
        error: 'Ошибка сервера при получении заявок'
      },
      { status: 500 }
    );
  }
}