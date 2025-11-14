import { NextRequest } from "next/server";
import prisma from "@/lib/prisma/client";

export async function GET(request: NextRequest) {
  try {
    // Получаем все активные сертификаты (доступные для просмотра всем пользователям)
    const certificates = await prisma.certificate.findMany({
      where: {
        isActive: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    console.error("Ошибка получения сертификатов:", error);

    return Response.json(
      {
        success: false,
        error: "Ошибка сервера при получении сертификатов",
      },
      { status: 500 }
    );
  }
}