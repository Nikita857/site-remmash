import { NextRequest } from "next/server";
import {
  getProductsByCategory,
  getCategoryBySlug,
  validatePaginationParams,
} from "@/lib/product-service";
import type {
  ApiResponse,
  DisplayProduct,
  PaginatedResponse,
  ProductCategory,
} from "@/types";
import { SITE_CONFIG } from "@/config";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const params = await context.params;
    const { category: categorySlug } = params;

    // Валидация параметра category
    if (!categorySlug || typeof categorySlug !== "string") {
      return Response.json(
        {
          success: false,
          error: "Invalid category parameter",
          message: "Category slug is required and must be a string",
        },
        { status: 400 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    // Парсинг параметров
    const rawPage = pageParam ? parseInt(pageParam, 10) : 1;
    const rawLimit = limitParam
      ? parseInt(limitParam, 10)
      : SITE_CONFIG.pagination.defaultLimit;

    // Валидация и нормализация параметров пагинации
    if (isNaN(rawPage) || rawPage < 1) {
      return Response.json(
        {
          success: false,
          error: "Invalid page parameter",
          message: "Page must be a positive integer",
        },
        { status: 400 }
      );
    }

    if (
      isNaN(rawLimit) ||
      rawLimit < SITE_CONFIG.pagination.minLimit ||
      rawLimit > SITE_CONFIG.pagination.maxLimit
    ) {
      return Response.json(
        {
          success: false,
          error: "Invalid limit parameter",
          message: `Limit must be a positive integer between ${SITE_CONFIG.pagination.minLimit} and ${SITE_CONFIG.pagination.maxLimit}`,
        },
        { status: 400 }
      );
    }

    const { page, limit } = validatePaginationParams(rawPage, rawLimit);

    // Получаем категорию по slug
    const category: ProductCategory | null = await getCategoryBySlug(
      categorySlug
    );
    if (!category) {
      return Response.json(
        {
          success: false,
          error: "Category not found",
          message: `Category with slug "${categorySlug}" does not exist`,
        },
        { status: 404 }
      );
    }

    // Получаем продукты по ID категории
    const result = await getProductsByCategory(category.id, page, limit);

    const apiResponse: ApiResponse<PaginatedResponse<DisplayProduct>> = {
      success: true,
      data: {
        data: result.products,
        totalCount: result.totalCount,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      },
    };

    return Response.json(apiResponse);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return Response.json(
      {
        success: false,
        error: "Internal server error",
        message: "An unexpected error occurred while fetching products",
      },
      { status: 500 }
    );
  }
}
