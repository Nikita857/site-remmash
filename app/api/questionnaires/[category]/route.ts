import { NextRequest } from "next/server";
import prisma from "@/lib/prisma/client";
import { SITE_CONFIG } from "@/config";

const VALID_CATEGORIES = SITE_CONFIG.validCategories;

// Получить опросные листы по категории
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;

    if (!VALID_CATEGORIES.some((cat) => cat.category === category)) {
      return Response.json(
        {
          success: false,
          error: "Неверная категория",
          message: `Категория '${category}' не найдена.`,
        },
        { status: 404 }
      );
    }

    // Получаем опросные листы по категории
    const questionnaires = await prisma.questionnaire.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      data: questionnaires,
      message: "Опросные листы успешно получены",
    });
  } catch (error) {
    console.error("Ошибка при получении опросных листов:", error);

    return Response.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
        message: "Ошибка при получении опросных листов",
      },
      { status: 500 }
    );
  }
}
