"use client";

import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  paginate,
}: PaginationProps) {
  // Функция для генерации диапазона страниц
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Если всего страниц <= 5, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Если страниц > 5, показываем первые 2, последние 2 и текущую страницу с соседями
      if (currentPage <= 3) {
        // Если текущая страница одна из первых 3
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Если текущая страница одна из последних 3
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // В остальных случаях показываем 1, ..., current-1, current, current+1, ..., last
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav className="flex items-center gap-1">
      <motion.button
        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-200"
        }`}
        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
        aria-label="Предыдущая страница"
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      {getPageNumbers().map((page, index) => (
        <div key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <motion.button
              onClick={() => paginate(page as number)}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentPage === page
                  ? "bg-[rgb(0,91,137)] text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={currentPage !== page ? { scale: 1.05 } : {}}
              whileTap={currentPage !== page ? { scale: 0.95 } : {}}
            >
              {page}
            </motion.button>
          )}
        </div>
      ))}

      <motion.button
        onClick={() =>
          paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
        }
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-200"
        }`}
        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
        aria-label="Следующая страница"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </nav>
  );
}
