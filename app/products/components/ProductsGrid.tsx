'use client';

import { motion } from 'motion/react';
import { ArrowRight, Eye, Download, Heart } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  categorySlug: string;
  price?: string;
}

interface ProductsGridProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

export default function ProductsGrid({ products, totalPages, currentPage, paginate }: ProductsGridProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[rgb(0,91,137)] text-3xl sm:text-4xl font-bold mb-4">
            Наша продукция
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Выберите подходящую модель оборудования для вашего производства
          </p>
        </motion.div>

        <div className="grid gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              paginate={paginate} 
            />
          </div>
        )}
      </div>
    </section>
  );
}