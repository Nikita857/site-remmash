"use client";

import { useState, useEffect } from "react";
import { ProductWithCategory } from "@/types";

interface UseAdminProductsReturn {
  products: ProductWithCategory[];
  loading: boolean;
  error: string | null;
  sortByCategory: (category: string) => void;
  sortByName: () => void;
  sortByStatus: () => void;
  refreshProducts: () => Promise<void>;
}

export function useAdminProducts(): UseAdminProductsReturn {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/products");

      if (!response.ok) {
        throw new Error(`Ошибка получения данных: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Не удалось получить данные");
      }

      setProducts(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      console.error("Ошибка при получении продукции:", err);
    } finally {
      setLoading(false);
    }
  };

  // Инициализация данных
  useEffect(() => {
    fetchProducts();
  }, []);

  // Функция для сортировки по категории
  const sortByCategory = (category: string) => {
    setProducts((prev) => {
      return [...prev].sort((a, b) => {
        const aMatches = a.category.name
          .toLowerCase()
          .includes(category.toLowerCase());
        const bMatches = b.category.name
          .toLowerCase()
          .includes(category.toLowerCase());

        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      });
    });
  };

  // Функция для сортировки по названию
  const sortByName = () => {
    setProducts((prev) => {
      return [...prev].sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    });
  };

  // Функция для сортировки по статусу
  const sortByStatus = () => {
    setProducts((prev) => {
      return [...prev].sort((a, b) => {
        if (a.isActive && !b.isActive) return -1;
        if (!a.isActive && b.isActive) return 1;
        return 0;
      });
    });
  };

  // Функция для обновления списка продуктов
  const refreshProducts = async () => {
    await fetchProducts();
  };

  return {
    products,
    loading,
    error,
    sortByCategory,
    sortByName,
    sortByStatus,
    refreshProducts,
  };
}