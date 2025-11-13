import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id: productId } = resolvedParams;

    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);
    
    // Только администраторы и модераторы могут изменять статус продукта
    if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'MODERATOR')) {
      return Response.json(
        { 
          success: false, 
          error: 'Доступ запрещен',
          message: 'Недостаточно прав для изменения статуса продукта'
        },
        { status: 403 }
      );
    }

    // Получаем тело запроса
    const { isActive } = await request.json();

    // Проверяем, что isActive - boolean
    if (typeof isActive !== 'boolean') {
      return Response.json(
        { 
          success: false, 
          error: 'Invalid data',
          message: 'Параметр isActive должен быть булевым значением'
        },
        { status: 400 }
      );
    }

    // Обновляем статус продукта в базе данных
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        isActive: isActive,
        updatedAt: new Date(),
      },
      include: {
        category: true, // Включаем категорию для полного возвращаемого объекта
      }
    });

    // Возвращаем обновленный продукт
    return Response.json({
      success: true,
      data: updatedProduct,
      message: 'Статус продукта успешно обновлен'
    });
  } catch (error) {
    console.error('Ошибка при обновлении статуса продукта:', error);
    
    // Если продукт не найден
    if (error instanceof Error && error.message.includes('RecordNotFound')) {
      return Response.json(
        { 
          success: false, 
          error: 'Product not found',
          message: 'Продукт с указанным ID не найден'
        },
        { status: 404 }
      );
    }
    
    // Другие ошибки
    return Response.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Ошибка на сервере при обновлении статуса продукта'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}