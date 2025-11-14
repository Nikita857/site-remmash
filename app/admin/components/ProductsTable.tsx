"use client";

import { useState, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductWithCategory } from "@/types";
import {
  EditProductModal,
  ProductTableRow,
  ProductExpandedRow,
  ProductTablePagination,
} from "./products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";

interface ProductsTableProps {
  initialProducts: ProductWithCategory[];
  onCreateProduct?: () => void;
}

export function ProductsTable({ initialProducts, onCreateProduct }: ProductsTableProps) {
  const [products, setProducts] =
    useState<ProductWithCategory[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductWithCategory[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  // Фильтрация продуктов по поисковому запросу
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (product.category?.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Сброс на первую страницу при поиске
  }, [searchTerm, products]);

  // Функция для переключения статуса продукта
  const toggleProductStatus = async (productId: string) => {
    setLoading(true);
    try {
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex === -1) return;

      // Обновляем статус в состоянии
      const updatedProducts = [...products];
      const currentProduct = updatedProducts[productIndex];
      if (currentProduct) {
        updatedProducts[productIndex] = {
          ...currentProduct,
          isActive: !currentProduct.isActive,
        };
      }

      setProducts(updatedProducts);

      // Обновляем также фильтрованный список
      const updatedFilteredProducts = [...filteredProducts];
      const filteredIndex = updatedFilteredProducts.findIndex(
        (p) => p.id === productId
      );
      if (filteredIndex !== -1) {
        const filteredProduct = updatedFilteredProducts[filteredIndex];
        if (filteredProduct) {
          updatedFilteredProducts[filteredIndex] = {
            ...filteredProduct,
            isActive: !filteredProduct.isActive,
          };
          setFilteredProducts(updatedFilteredProducts);
        }
      }

      const response = await fetch(`/api/products/${productId}/toggle-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: currentProduct?.isActive,
        }),
      });

      if (!response.ok) {
        // В случае ошибки API, откатываем изменения
        throw new Error(`Ошибка обновления статуса: ${response.status}`);
      }
    } catch (error) {
      console.error("Ошибка при переключении статуса продукта:", error);

      // Откатываем изменения в случае ошибки
      const revertedProducts = [...products];
      const revertedFilteredProducts = [...filteredProducts];

      setProducts(revertedProducts);
      setFilteredProducts(revertedFilteredProducts);
    } finally {
      setLoading(false);
    }
  };

  // Функция для открытия модального окна редактирования
  const openEditModal = (product: ProductWithCategory) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Обработка сохранения отредактированного продукта
  const handleSaveProduct = async (updatedProduct: ProductWithCategory) => {
    try {
      // В реальном приложении здесь будет API вызов для сохранения изменений
      const response = await fetch(`/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error(`Ошибка сохранения продукта: ${response.status}`);
      }

      // Обновляем продукт в состоянии
      const updatedProducts = products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );

      setProducts(updatedProducts);

      // Обновляем также фильтрованный список
      const updatedFilteredProducts = filteredProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );

      setFilteredProducts(updatedFilteredProducts);

      closeEditModal();
    } catch (error) {
      console.error("Ошибка при сохранении продукта:", error);
    }
  };

  // Переключение расширенной строки
  const toggleRowExpansion = (productId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  
  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Функция для изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Заголовок таблицы с элементами управления */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            Управление продукцией
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="text"
                placeholder="Поиск продуктов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(0,91,137)] focus:border-transparent min-w-[250px] w-full"
              />
            </div>
            {onCreateProduct && (
              <Button
                onClick={onCreateProduct}
                className="bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] text-white flex items-center w-full sm:w-auto"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Добавить продукт
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Название
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Категория
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата создания
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <Fragment key={product.id}>
                <ProductTableRow
                  product={product}
                  onToggleStatus={toggleProductStatus}
                  onEdit={openEditModal}
                  onToggleRowExpansion={toggleRowExpansion}
                  isExpanded={!!expandedRows[product.id]}
                />
                <ProductExpandedRow
                  product={product}
                  isExpanded={!!expandedRows[product.id]}
                />
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <ProductTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          startIndex={startIndex}
          onPageChange={handlePageChange}
        />
      )}

      {/* Модальное окно редактирования */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <EditProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={closeEditModal}
            onSave={handleSaveProduct}
          />
        )}
      </AnimatePresence>

      {/* Индикатор загрузки */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[rgb(0,91,137)] mx-auto"></div>
            <p className="mt-2 text-gray-600">Сохранение изменений...</p>
          </div>
        </div>
      )}
    </div>
  );
}