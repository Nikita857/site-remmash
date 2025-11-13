import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma/client';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Проверяем, вошел ли пользователь - если нет, все равно принимаем заказ
    // так как форма доступна и для неавторизованных пользователей
    
    const { fullName, phone, email, comment } = await request.json();

    // Валидация данных
    if (!fullName || !phone) {
      return Response.json(
        { error: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      );
    }

    // Создаем запись заказа в базе данных в таблице contact_requests
    const newOrder = await prisma.contactRequest.create({
      data: {
        fullName,
        phone,
        email: email || null, // Поле email может быть null, если не предоставлено
        message: comment || null, // Используем comment как сообщение
        status: 'new',
        contactedAt: null,
      },
    });

    return Response.json({
      success: true,
      data: newOrder,
      message: 'Ваша заявка успешно отправлена. Наш специалист свяжется с вами в ближайшее время.',
    });
  } catch (error) {
    console.error('Ошибка при создании заявки:', error);
    
    return Response.json(
      { 
        success: false, 
        error: 'Ошибка сервера при обработке заявки' 
      },
      { status: 500 }
    );
  }
}