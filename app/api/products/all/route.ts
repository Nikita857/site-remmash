import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);
    
    // Только зарегистрированные пользователи могут просматривать продукты
    if (!session) {
      return Response.json(
        { 
          success: false, 
          error: 'Необходима аутентификация',
          message: 'Требуется авторизация для получения списка продуктов'
        },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));

    // Вычисляем сдвиг
    const offset = (page - 1) * limit;

    // Получаем продукты с пагинацией
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        include: {
          category: true,
        },
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ],
        skip: offset,
        take: limit,
      }),
      prisma.product.count(),
    ]);

    // Вычисляем количество страниц
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Возвращаем продукты с информацией о пагинации
    return Response.json({
      success: true,
      data: {
        data: products,
        totalCount,
        totalPages,
        currentPage: page,
        hasNextPage,
        hasPrevPage,
      },
      message: 'Продукты успешно получены'
    });
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error);
    
    return Response.json(
      { 
        success: false, 
        error: 'Внутренняя ошибка сервера',
        message: 'Ошибка при получении списка продуктов'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}