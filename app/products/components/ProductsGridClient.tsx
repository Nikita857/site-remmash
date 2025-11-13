'use client';

import ProductsGrid from './ProductsGrid';

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

interface ProductsGridClientProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

export default function ProductsGridClient({ products, totalPages, currentPage, paginate }: ProductsGridClientProps) {
  return (
    <ProductsGrid 
      products={products}
      totalPages={totalPages}
      currentPage={currentPage}
      paginate={paginate}
    />
  );
}