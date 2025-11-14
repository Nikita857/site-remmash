"use client";

import { DisplayProduct } from "@/types";
import ProductsGrid from "./ProductsGrid";

interface ProductsGridClientProps {
  products: DisplayProduct[];
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

export default function ProductsGridClient({
  products,
  totalPages,
  currentPage,
  paginate,
}: ProductsGridClientProps) {
  return (
    <ProductsGrid
      products={products}
      totalPages={totalPages}
      currentPage={currentPage}
      paginate={paginate}
    />
  );
}
