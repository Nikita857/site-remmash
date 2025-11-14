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

    // Получаем все сертификаты
    const certificates = await prisma.certificate.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        issueDate: true,
        expiryDate: true,
        image: true,
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
      data: certificates,
    });
  } catch (error) {
    console.error('Ошибка получения сертификатов:', error);

    return Response.json(
      {
        success: false,
        error: 'Ошибка сервера при получении сертификатов'
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

    const { title, description, issueDate, expiryDate, image, isActive } = await request.json();

    // Проверяем обязательные поля
    if (!title || !description || !issueDate || !expiryDate || !image) {
      return Response.json(
        {
          success: false,
          error: 'Все поля обязательны для заполнения'
        },
        { status: 400 }
      );
    }

    // Проверяем, что дата окончания позже даты выдачи
    if (new Date(issueDate) > new Date(expiryDate)) {
      return Response.json(
        {
          success: false,
          error: 'Дата окончания должна быть позже даты выдачи'
        },
        { status: 400 }
      );
    }

    // Создаем новый сертификат
    const newCertificate = await prisma.certificate.create({
      data: {
        title,
        description,
        issueDate: new Date(issueDate),
        expiryDate: new Date(expiryDate),
        image,
        isActive: isActive !== undefined ? isActive : true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        issueDate: true,
        expiryDate: true,
        image: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return Response.json({
      success: true,
      data: newCertificate,
      message: 'Сертификат успешно создан',
    });
  } catch (error) {
    console.error('Ошибка создания сертификата:', error);

    return Response.json(
      {
        success: false,
        error: 'Ошибка сервера при создении сертификата'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'ADMIN') {
      return Response.json(
        { error: 'Доступ запрещен' },
        { status: 403 }
      );
    }

    const { id, title, description, issueDate, expiryDate, image, isActive } = await request.json();

    // Проверяем обязательные поля
    if (!id || !title || !description || !issueDate || !expiryDate || !image) {
      return Response.json(
        {
          success: false,
          error: 'Все поля обязательны для заполнения'
        },
        { status: 400 }
      );
    }

    // Проверяем, что дата окончания позже даты выдачи
    if (new Date(issueDate) > new Date(expiryDate)) {
      return Response.json(
        {
          success: false,
          error: 'Дата окончания должна быть позже даты выдачи'
        },
        { status: 400 }
      );
    }

    // Проверяем, существует ли сертификат
    const existingCertificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!existingCertificate) {
      return Response.json(
        { error: 'Сертификат не найден' },
        { status: 404 }
      );
    }

    // Обновляем сертификат
    const updatedCertificate = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        description,
        issueDate: new Date(issueDate),
        expiryDate: new Date(expiryDate),
        image,
        isActive: isActive !== undefined ? isActive : existingCertificate.isActive,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        title: true,
        description: true,
        issueDate: true,
        expiryDate: true,
        image: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return Response.json({
      success: true,
      data: updatedCertificate,
      message: 'Сертификат успешно обновлен',
    });
  } catch (error) {
    console.error('Ошибка обновления сертификата:', error);

    return Response.json(
      {
        success: false,
        error: 'Ошибка сервера при обновлении сертификата'
      },
      { status: 500 }
    );
  }
}