import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/client';
import { hash } from 'bcryptjs';

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

    // Получаем всех пользователей
    const users = await prisma.user.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Response.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Ошибка получения пользователей:', error);
    
    return Response.json(
      { 
        success: false, 
        error: 'Ошибка сервера при получении пользователей' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'ADMIN') {
      return Response.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }

    const { name, surname, department, email, phone, role = 'MODERATOR' } = await request.json();

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { 
          success: false, 
          error: 'Пользователь с таким email уже существует' 
        },
        { status: 400 }
      );
    }

    // Генерируем временный пароль
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hash(tempPassword, 10);

    // Создаем нового пользователя
    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        department,
        email,
        phone,
        role,
        password: hashedPassword,
        isActive: true,
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
      data: newUser,
      message: 'Пользователь успешно создан',
    });
  } catch (error) {
    console.error('Ошибка создания пользователя:', error);
    
    return Response.json(
      { 
        success: false, 
        error: 'Ошибка сервера при создании пользователя' 
      },
      { status: 500 }
    );
  }
}