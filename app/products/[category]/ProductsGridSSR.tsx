"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SITE_CONFIG } from "@/config";
import ProductsGrid from "../components/ProductsGrid";
import { DisplayProduct } from "@/types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ProductApiFormat {
  id: string;
  name: string;
  shortDescription: string;
  images: string[];
  category: {
    name: string;
    slug: string;
  };
  price?: string;
  slug: string;
}

interface ProductsGridSSRProps {
  initialProducts: DisplayProduct[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  categorySlug: string;
}

// Вспомогательная функция для преобразования продукта API в формат компонента
const mapApiProductToComponentProduct = (
  apiProduct: ProductApiFormat
): DisplayProduct => ({
  id: apiProduct.id,
  title: apiProduct.name,
  description: apiProduct.shortDescription,
  image: apiProduct.images[0] || "/placeholder-product.jpg",
  category: apiProduct.category.name,
  categorySlug: apiProduct.category.slug,
  slug: apiProduct.slug,
});

export default function ProductsGridSSR({
  initialProducts,
  totalPages,
  currentPage,
  hasNextPage,
  hasPrevPage,
  categorySlug,
}: ProductsGridSSRProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<DisplayProduct[]>(initialProducts);
  const [pagination, setPagination] = useState({
    totalPages,
    currentPage,
    hasNextPage,
    hasPrevPage,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Функция загрузки продуктов для указанной страницы
  const loadProductsForPage = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/products/by-category/${categorySlug}?page=${page}&limit=${SITE_CONFIG.pagination.defaultLimit}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Категория не найдена");
        }
        throw new Error(`Ошибка загрузки данных: ${response.status}`);
      }

      const result: ApiResponse<PaginatedResponse<ProductApiFormat>> =
        await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || "Не удалось получить данные");
      }

      // Обновляем состояние с новыми продуктами и информацией о пагинации
      const mappedProducts = result.data.data.map(
        mapApiProductToComponentProduct
      );

      setProducts(mappedProducts);
      setPagination({
        totalPages: result.data.totalPages,
        currentPage: result.data.currentPage,
        hasNextPage: result.data.hasNextPage,
        hasPrevPage: result.data.hasPrevPage,
      });
    } catch (err) {
      console.error("Error loading products:", err);
      setError(err instanceof Error ? err.message : "Ошибка загрузки данных");

      // Возвращаем к начальному состоянию в случае ошибки
      setProducts(initialProducts);
      setPagination({
        totalPages,
        currentPage,
        hasNextPage,
        hasPrevPage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Обработка изменения страницы
  const handlePageChange = (page: number) => {
    // Обновляем URL параметры
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    // Обновляем URL
    router.push(`?${params.toString()}`);

    // Загружаем продукты для новой страницы
    loadProductsForPage(page);
  };

  // Эффект для отслеживания изменений URL и загрузки соответствующей страницы
  useEffect(() => {
    const pageFromURL = Math.max(
      1,
      parseInt(searchParams.get("page") || "1") || 1
    );

    // Загружаем данные для страницы из URL, если она отличается от текущей
    if (pageFromURL !== pagination.currentPage) {
      loadProductsForPage(pageFromURL);
    }
  }, [searchParams, categorySlug]); // categorySlug добавлен в зависимости для сброса при смене категории

  // Эффект для обновления данных при смене категории
  useEffect(() => {
    // Загружаем данные для текущей страницы и новой категории
    const pageFromURL = Math.max(
      1,
      parseInt(searchParams.get("page") || "1") || 1
    );
    loadProductsForPage(pageFromURL);
  }, [categorySlug]);

  return (
    <div className="relative">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span className="font-bold">Ошибка:</span> {error}
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[rgb(0,91,137)] mx-auto"></div>
            <p className="mt-2 text-gray-600">Загрузка продуктов...</p>
          </div>
        </div>
      )}
      <ProductsGrid
        products={products}
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        paginate={handlePageChange}
      />
    </div>
  );
}
