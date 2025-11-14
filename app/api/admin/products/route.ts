import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  try {
    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return Response.json({ error: "Доступ запрещен" }, { status: 403 });
    }

    // Получаем все продукты с категориями
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" }
      ],
    });

    return Response.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Ошибка получения продуктов:", error);

    return Response.json(
      {
        success: false,
        error: "Ошибка сервера при получении продуктов",
      },
      { status: 500 }
    );
  }
}