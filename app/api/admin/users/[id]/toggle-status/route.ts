import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/client';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'ADMIN') {
      return Response.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const { isActive } = await request.json();

    // Проверяем, существует ли пользователь
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return Response.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    // Проверяем, не является ли пользователь текущим администратором
    if (session.user?.id === id && !isActive) {
      return Response.json(
        { error: 'Нельзя деактивировать собственную учетную запись' },
        { status: 400 }
      );
    }

    // Обновляем статус пользователя
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        isActive,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        department: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return Response.json({
      success: true,
      data: updatedUser,
      message: `Пользователь ${isActive ? 'активирован' : 'деактивирован'}`,
    });
  } catch (error) {
    console.error('Ошибка обновления статуса пользователя:', error);
    
    return Response.json(
      { 
        success: false, 
        error: 'Ошибка сервера при обновлении статуса пользователя' 
      },
      { status: 500 }
    );
  }
}