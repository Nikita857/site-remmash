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
    const { isActive } = await request.json();

    // Проверяем, существует ли сертификат
    const existingCertificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!existingCertificate) {
      return Response.json(
        { error: "Сертификат не найден" },
        { status: 404 }
      );
    }

    // Обновляем статус сертификата
    const updatedCertificate = await prisma.certificate.update({
      where: { id },
      data: {
        isActive,
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
      message: `Сертификат ${isActive ? "активирован" : "деактивирован"}`,
    });
  } catch (error) {
    console.error("Ошибка обновления статуса сертификата:", error);

    return Response.json(
      {
        success: false,
        error: "Ошибка сервера при обновлении статуса сертификата",
      },
      { status: 500 }
    );
  }
}