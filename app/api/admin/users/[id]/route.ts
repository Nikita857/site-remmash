import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/client';

export async function GET(
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

    // Получаем пользователя по ID
    const user = await prisma.user.findUnique({
      where: { id },
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

    if (!user) {
      return Response.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Ошибка получения пользователя:', error);
    
    return Response.json(
      { 
        success: false, 
        error: 'Ошибка сервера при получении пользователя' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(
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
    const { name, surname, department, email, phone, role, isActive } = await request.json();

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

    // Проверяем, не занят ли email другим пользователем
    const emailExists = await prisma.user.findFirst({
      where: {
        email,
        id: { not: id }, // Исключаем текущего пользователя
      },
    });

    if (emailExists) {
      return Response.json(
        { 
          success: false, 
          error: 'Пользователь с таким email уже существует' 
        },
        { status: 400 }
      );
    }

    // Обновляем пользователя
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        surname,
        department,
        email,
        phone,
        role,
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
      message: 'Пользователь успешно обновлен',
    });
  } catch (error) {
    console.error('Ошибка обновления пользователя:', error);
    
    return Response.json(
      { 
        success: false, 
        error: 'Ошибка сервера при обновлении пользователя' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    // Проверяем, не является ли пользователь текущим администратором
    if (session.user?.id === id) {
      return Response.json(
        { error: 'Нельзя удалить собственную учетную запись' },
        { status: 400 }
      );
    }

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

    // Удаляем пользователя
    await prisma.user.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: 'Пользователь успешно удален',
    });
  } catch (error) {
    console.error('Ошибка удаления пользователя:', error);
    
    return Response.json(
      { 
        success: false, 
        error: 'Ошибка сервера при удалении пользователя' 
      },
      { status: 500 }
    );
  }
}