import { PrismaClient, type Questionnaire } from '@prisma/client';
import type { ProductWithCategory, Product, ProductCategory } from '@/types';
import { SITE_CONFIG } from '@/config';

const prisma = new PrismaClient();

/**
 * Валидация параметров пагинации
 */
export function validatePaginationParams(page: number, limit: number): { page: number; limit: number; offset: number } {
  const validatedPage = Math.max(1, Number.isInteger(page) ? page : 1);
  const validatedLimit = Math.min(SITE_CONFIG.pagination.maxLimit, Math.max(SITE_CONFIG.pagination.minLimit, Number.isInteger(limit) ? limit : SITE_CONFIG.pagination.defaultLimit));
  const offset = (validatedPage - 1) * validatedLimit;
  
  return {
    page: validatedPage,
    limit: validatedLimit,
    offset
  };
}

/**
 * Получить все активные продукты с пагинацией
 */
export async function getActiveProducts(page: number = 1, limit: number = SITE_CONFIG.pagination.defaultLimit) {
  try {
    const { page: validatedPage, limit: validatedLimit, offset } = validatePaginationParams(page, limit);

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: {
          isActive: true,
        },
        include: {
          category: true,
        },
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ],
        skip: offset,
        take: validatedLimit,
      }),
      prisma.product.count({
        where: {
          isActive: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / validatedLimit);
    
    return {
      products: products as unknown as ProductWithCategory[],
      totalCount,
      totalPages,
      currentPage: validatedPage,
      hasNextPage: validatedPage < totalPages,
      hasPrevPage: validatedPage > 1,
    };
  } catch (error) {
    console.error('Ошибка при получении продуктов:', error);
    throw new Error(`Ошибка при получении продуктов: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
}

/**
 * Получить продукт по ID
 */
export async function getProductById(id: string) {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('ID продукта должен быть непустой строкой');
    }
    
    const product = await prisma.product.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: {
        category: true,
      },
    });

    return product as unknown as ProductWithCategory | null;
  } catch (error) {
    console.error('Ошибка при получении продукта по ID:', error);
    throw new Error(`Ошибка при получении продукта по ID: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
}

/**
 * Получить продукт по slug
 */
export async function getProductBySlug(slug: string) {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Slug продукта должен быть непустой строкой');
    }
    
    const product = await prisma.product.findFirst({
      where: {
        slug,
        isActive: true,
      },
      include: {
        category: true,
      },
    });

    return product as unknown as ProductWithCategory | null;
  } catch (error) {
    console.error('Ошибка при получении продукта по slug:', error);
    throw new Error(`Ошибка при получении продукта по slug: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
}

/**
 * Получить продукты по категории
 */
export async function getProductsByCategory(categoryId: string, page: number = 1, limit: number = SITE_CONFIG.pagination.defaultLimit) {
  try {
    if (!categoryId || typeof categoryId !== 'string') {
      throw new Error('ID категории должен быть непустой строкой');
    }
    
    const { page: validatedPage, limit: validatedLimit, offset } = validatePaginationParams(page, limit);

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: {
          categoryId,
          isActive: true,
        },
        include: {
          category: true,
        },
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' }
        ],
        skip: offset,
        take: validatedLimit,
      }),
      prisma.product.count({
        where: {
          categoryId,
          isActive: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / validatedLimit);
    
    return {
      products: products as unknown as ProductWithCategory[],
      totalCount,
      totalPages,
      currentPage: validatedPage,
      hasNextPage: validatedPage < totalPages,
      hasPrevPage: validatedPage > 1,
    };
  } catch (error) {
    console.error('Ошибка при получении продуктов по категории:', error);
    throw new Error(`Ошибка при получении продуктов по категории: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
}

/**
 * Получить все активные категории продуктов
 */
export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const categories = await prisma.productCategory.findMany({
      where: {
        isActive: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
    });

    return categories;
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    throw new Error(`Ошибка при получении категорий: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
}

/**
 * Получить категорию по ID
 */
export async function getCategoryById(id: string): Promise<ProductCategory | null> {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('ID категории должен быть непустой строкой');
    }
    
    const category = await prisma.productCategory.findFirst({
      where: {
        id,
        isActive: true,
      },
    });

    return category;
  } catch (error) {
    console.error('Ошибка при получении категории по ID:', error);
    throw new Error(`Ошибка при получении категории по ID: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
}

/**
 * Получить категорию по slug
 */
export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Slug категории должен быть непустой строкой');
    }
    
    const category = await prisma.productCategory.findFirst({
      where: {
        slug,
        isActive: true,
      },
    });

    return category;
  } catch (error) {
    console.error('Ошибка при получении категории по slug:', error);
    throw new Error(`Ошибка при получении категории по slug: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
}

/**
 * Получить опросный лист по slug категории
 */
export async function getQuestionnaireByCategorySlug(categorySlug: string): Promise<Questionnaire | null> {
  try {
    if (!categorySlug || typeof categorySlug !== 'string') {
      throw new Error('Slug категории должен быть непустой строкой');
    }
    
    const questionnaire = await prisma.questionnaire.findFirst({
      where: {
        category: categorySlug,
        isActive: true,
      },
    });

    return questionnaire;
  } catch (error) {
    console.error('Ошибка при получении опросного листа по slug категории:', error);
    throw new Error(`Ошибка при получении опросного листа: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
  }
}