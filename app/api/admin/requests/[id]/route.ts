import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/client";

export async function DELETE(
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

    // Удаляем заявку
    await prisma.contactRequest.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: "Заявка успешно удалена",
    });
  } catch (error) {
    console.error("Ошибка удаления заявки:", error);

    return Response.json(
      {
        success: false,
        error: "Ошибка сервера при удалении заявки",
      },
      { status: 500 }
    );
  }
}