import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/client';

export async function GET(request: NextRequest) {
  try {
    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'MODERATOR')) {
      return Response.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }

    // Получаем все активные категории
    const categories = await prisma.productCategory.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return Response.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Ошибка получения категорий:', error);
    
    return Response.json(
      { 
        success: false, 
        error: 'Ошибка сервера при получении категорий' 
      },
      { status: 500 }
    );
  }
}