import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/client";

export async function GET(
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

    // Получаем сертификат по ID
    const certificate = await prisma.certificate.findUnique({
      where: { id },
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

    if (!certificate) {
      return Response.json(
        { error: "Сертификат не найден" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    console.error("Ошибка получения сертификата:", error);

    return Response.json(
      {
        success: false,
        error: "Ошибка сервера при получении сертификата",
      },
      { status: 500 }
    );
  }
}

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
    const { title, description, issueDate, expiryDate, image, isActive } = await request.json();

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

    // Обновляем сертификат
    const updatedCertificate = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        description,
        issueDate: new Date(issueDate),
        expiryDate: new Date(expiryDate),
        image,
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
      message: "Сертификат успешно обновлен",
    });
  } catch (error) {
    console.error("Ошибка обновления сертификата:", error);

    return Response.json(
      {
        success: false,
        error: "Ошибка сервера при обновлении сертификата",
      },
      { status: 500 }
    );
  }
}

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

    // Удаляем сертификат
    await prisma.certificate.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: "Сертификат успешно удален",
    });
  } catch (error) {
    console.error("Ошибка удаления сертификата:", error);

    return Response.json(
      {
        success: false,
        error: "Ошибка сервера при удалении сертификата",
      },
      { status: 500 }
    );
  }
}