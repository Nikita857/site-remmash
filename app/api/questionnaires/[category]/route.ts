import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/client';

// Получить опросные листы по категории
export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return Response.json(
        { 
          success: false, 
          error: 'Необходима аутентификация',
          message: 'Требуется авторизация для получения опросных листов' 
        },
        { status: 401 }
      );
    }

    const { category } = await params;

    // Получаем опросные листы по категории
    const questionnaires = await prisma.questionnaire.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Response.json({
      success: true,
      data: questionnaires,
      message: 'Опросные листы успешно получены'
    });
  } catch (error) {
    console.error('Ошибка при получении опросных листов:', error);

    return Response.json(
      {
        success: false,
        error: 'Внутренняя ошибка сервера',
        message: 'Ошибка при получении опросных листов'
      },
      { status: 500 }
    );
  }
}