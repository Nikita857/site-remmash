import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/password-utils";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id: productId } = resolvedParams;

    // Проверяем сессию пользователя
    const session = await getServerSession(authOptions);

    // Только администраторы могут обновлять продукты
    if (!session || session.user?.role !== "ADMIN") {
      return Response.json(
        {
          success: false,
          error: "Доступ запрещен",
          message: "Недостаточно прав для обновления продукта",
        },
        { status: 403 }
      );
    }

    // Получаем данные продукта из тела запроса
    const productData = await request.json();

    // Валидация обязательных полей
    if (
      !productData.name ||
      !productData.slug ||
      !productData.shortDescription ||
      !productData.fullDescription
    ) {
      return Response.json(
        {
          success: false,
          error: "Missing required fields",
          message:
            "Отсутствуют обязательные поля: name, slug, shortDescription, fullDescription",
        },
        { status: 400 }
      );
    }

    // Обновляем продукт в базе данных
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: productData.name,
        slug: productData.slug,
        shortDescription: productData.shortDescription,
        fullDescription: productData.fullDescription,
        specifications: productData.specifications || null,
        images: productData.images || [],
        isActive: productData.isActive ?? true,
        order: productData.order || 0,
        categoryId: productData.categoryId,
        updatedAt: new Date(),
      },
      include: {
        category: true, // Включаем категорию для полного возвращаемого объекта
      },
    });

    // Возвращаем обновленный продукт
    return Response.json({
      success: true,
      data: updatedProduct,
      message: "Продукт успешно обновлен",
    });
  } catch (error) {
    console.error("Ошибка при обновлении продукта:", error);

    // Если продукт не найден
    if (error instanceof Error && error.message.includes("RecordNotFound")) {
      return Response.json(
        {
          success: false,
          error: "Product not found",
          message: "Продукт с указанным ID не найден",
        },
        { status: 404 }
      );
    }

    // Другие ошибки
    return Response.json(
      {
        success: false,
        error: "Internal server error",
        message: "Ошибка на сервере при обновлении продукта",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
