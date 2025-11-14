"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DisplayProduct } from "@/types";
import ProductsGrid from "./components/ProductsGrid";

interface AllProductsGridSSRProps {
  initialProducts: DisplayProduct[];
  totalPages: number;
  currentPage: number;
}

// Вспомогательная функция для преобразования продукта API в формат компонента
const mapApiProductToComponentProduct = (apiProduct: any): DisplayProduct => ({
  id: apiProduct.id,
  title: apiProduct.name,
  description: apiProduct.shortDescription,
  image: apiProduct.images[0] || "/placeholder-product.jpg",
  category: apiProduct.category.name,
  categorySlug: apiProduct.category.slug,
  slug: apiProduct.slug,
});

export default function AllProductsGridSSR({
  initialProducts,
  totalPages,
  currentPage,
}: AllProductsGridSSRProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState(initialProducts);
  const [pagination, setPagination] = useState({
    totalPages,
    currentPage,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Функция загрузки продуктов для указанной страницы
  const loadProductsForPage = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/all?page=${page}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Продукты не найдены");
        }
        throw new Error(`Ошибка загрузки данных: ${response.status}`);
      }

      const data = await response.json();

      // Обновляем состояние с новыми продуктами и информацией о пагинации
      const mappedProducts = data.products.map(mapApiProductToComponentProduct);

      setProducts(mappedProducts);
      setPagination({
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      });
    } catch (err) {
      console.error("Error loading products:", err);
      setError(err instanceof Error ? err.message : "Ошибка загрузки данных");

      // Возвращаем к начальному состоянию в случае ошибки
      setProducts(initialProducts);
      setPagination({
        totalPages,
        currentPage,
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
  }, [searchParams]);

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
