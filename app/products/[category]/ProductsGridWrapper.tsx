'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SITE_CONFIG } from '@/config';
import ProductsGrid from '../components/ProductsGrid';

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  categorySlug: string;
  price?: string;
  slug?: string;
}

interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PaginatedProducts {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ProductsGridWrapperProps {
  category: ProductCategory;
  initialData: PaginatedProducts;
}

export default function ProductsGridWrapper({
  category,
  initialData
}: ProductsGridWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState(initialData.products);
  const [pagination, setPagination] = useState({
    totalPages: initialData.totalPages,
    currentPage: initialData.currentPage,
    hasNextPage: initialData.hasNextPage,
    hasPrevPage: initialData.hasPrevPage,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Функция загрузки продуктов для указанной страницы
  const loadProductsForPage = async (page: number) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/products/by-category/${category.slug}?page=${page}&limit=${SITE_CONFIG.pagination.defaultLimit}`);

      if (!response.ok) {
        throw new Error(`Ошибка загрузки данных: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Не удалось получить данные');
      }

      // Обновляем состояние с новыми продуктами и информацией о пагинации
      setProducts(result.data.data);
      setPagination({
        totalPages: result.data.totalPages,
        currentPage: result.data.currentPage,
        hasNextPage: result.data.hasNextPage,
        hasPrevPage: result.data.hasPrevPage,
      });
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработка изменения страницы
  const handlePageChange = (page: number) => {
    // Обновляем URL параметры
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }

    // Обновляем URL
    router.push(`?${params.toString()}`);

    // Загружаем продукты для новой страницы
    loadProductsForPage(page);
  };

  // Эффект для отслеживания изменений URL и загрузки соответствующей страницы
  useEffect(() => {
    const pageFromURL = Math.max(1, parseInt(searchParams.get('page') || '1') || 1);

    // Загружаем данные для страницы из URL, если она отличается от текущей
    if (pageFromURL !== pagination.currentPage) {
      loadProductsForPage(pageFromURL);
    }
  }, [searchParams, category.slug]);

  return (
    <div className="relative">
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