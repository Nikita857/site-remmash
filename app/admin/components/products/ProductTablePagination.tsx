'use client';

import { Button } from '@/components/ui/button';

interface ProductTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  onPageChange: (page: number) => void;
}

export function ProductTablePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  startIndex,
  onPageChange
}: ProductTablePaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // Показываем первые 4 и последнюю страницу
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Показываем первую и последние 4 страницы
        pages.push(1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Показываем текущую страницу с двумя соседями с каждой стороны
        pages.push(1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          if (i > 1 && i < totalPages) {
            pages.push(i);
          }
        }
        pages.push(totalPages);
      }
    }

    // Убираем дубликаты
    return [...new Set(pages)];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Показано <span className="font-medium">{startIndex + 1}</span> -{" "}
        <span className="font-medium">
          {Math.min(startIndex + itemsPerPage, totalItems)}
        </span>{" "}
        из <span className="font-medium">{totalItems}</span>{" "}
        {totalItems === 1 ? "продукт" : totalItems < 5 ? "продукта" : "продуктов"}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1 transform rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          Назад
        </Button>

        {pageNumbers.map((pageNum, index) => {
          const showEllipsis = 
            index > 0 && 
            pageNumbers[index - 1] !== undefined && 
            pageNumbers[index - 1] !== pageNum - 1;

          return (
            <div key={pageNum} className="flex items-center">
              {showEllipsis && (
                <span className="mx-1 px-2 py-1 text-sm text-gray-500">...</span>
              )}
              <Button
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className={
                  currentPage === pageNum
                    ? "bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)]"
                    : ""
                }
              >
                {pageNum}
              </Button>
            </div>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center"
        >
          Вперед
          <svg
            className="w-4 h-4 ml-1 transform -rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}