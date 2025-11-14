"use client";

import { Button } from "@/components/ui/button";

interface ContactRequestTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  onPageChange: (page: number) => void;
}

export function ContactRequestTablePagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  startIndex,
  onPageChange,
}: ContactRequestTablePaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 5) {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-700">
        Показано <span className="font-medium">{startIndex + 1}</span> -{" "}
        <span className="font-medium">
          {Math.min(startIndex + itemsPerPage, totalItems)}
        </span>{" "}
        из <span className="font-medium">{totalItems}</span> заявок
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

        {getPageNumbers().map((pageNum) => (
          <Button
            key={pageNum}
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
        ))}

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
