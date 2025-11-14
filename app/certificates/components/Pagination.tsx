"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  className?: string;
}

export default function Pagination({
  totalPages,
  currentPage,
  paginate,
  className = "",
}: PaginationProps) {
  // Используем useMemo для оптимизации вычислений
  const pageNumbers = useMemo(() => {
    if (totalPages <= 0) return [];

    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Показываем все страницы
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Всегда показываем первую страницу
      pages.push(1);

      // Определяем диапазон вокруг текущей страницы
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      // Добавляем многоточие если нужно
      if (startPage > 2) {
        pages.push("...");
      }

      // Добавляем страницы вокруг текущей
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Добавляем многоточие если нужно
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Всегда показываем последнюю страницу
      pages.push(totalPages);
    }

    return pages;
  }, [totalPages, currentPage]);

  // Если нет страниц или всего одна - не показываем пагинацию
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav
      className={`flex items-center justify-center gap-1 ${className}`}
      role="navigation"
      aria-label="Пагинация"
    >
      {/* Кнопка "Назад" */}
      <motion.button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed opacity-50"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }`}
        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
        aria-label="Предыдущая страница"
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      {/* Номера страниц */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => (
          <div key={page === "..." ? `ellipsis-${index}` : `page-${page}`}>
            {page === "..." ? (
              <span
                className="px-3 py-2 text-gray-500 select-none"
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <motion.button
                onClick={() => paginate(page as number)}
                className={`min-w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[rgb(0,91,137)] text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                whileHover={currentPage !== page ? { scale: 1.05 } : {}}
                whileTap={currentPage !== page ? { scale: 0.95 } : {}}
                aria-label={`Перейти на страницу ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </motion.button>
            )}
          </div>
        ))}
      </div>

      {/* Кнопка "Вперед" */}
      <motion.button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed opacity-50"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        }`}
        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
        aria-label="Следующая страница"
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </nav>
  );
}
