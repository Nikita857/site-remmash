import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/client";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return Response.json({ error: "Доступ запрещен" }, { status: 403 });
    }

    const { id } = await params;
    const { status } = await request.json();

    // Проверяем, существует ли заявка
    const existingRequest = await prisma.contactRequest.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      return Response.json(
        { error: "Заявка не найдена" },
        { status: 404 }
      );
    }

    // Проверяем корректность статуса
    const validStatuses = ['new', 'in_progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return Response.json(
        { error: "Некорректный статус заявки" },
        { status: 400 }
      );
    }

    // Обновляем статус заявки
    const updatedRequest = await prisma.contactRequest.update({
      where: { id },
      data: {
        status,
        ...(status === 'completed' && { contactedAt: new Date() }), // Устанавливаем дату контакта при завершении
      },
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
    });

    return Response.json({
      success: true,
      data: updatedRequest,
      message: `Статус заявки обновлен на ${status === 'new' ? 'новая' : status === 'in_progress' ? 'в процессе' : 'завершена'}`,
    });
  } catch (error) {
    console.error("Ошибка обновления статуса заявки:", error);

    return Response.json(
      {
        success: false,
        error: "Ошибка сервера при обновлении статуса заявки",
      },
      { status: 500 }
    );
  }
}