"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { truncateText } from "@/lib/utils";
import { DisplayProduct } from "@/types";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

interface ProductCardProps {
  product: DisplayProduct;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  // Generate proper URL for the product page
  const productUrl = `/products/${product.categorySlug}/${product.slug}`;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      aria-label={`Product: ${product.title}`}
    >
      <div className="md:w-1/3">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="w-full h-64 md:h-full object-cover"
          width={400}
          height={300}
        />
      </div>

      <div className="p-8 flex-1 flex flex-col justify-center">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-[rgb(0,91,137)]/10 text-[rgb(0,91,137)] rounded-full mb-3">
            {product.category}
          </span>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {product.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {truncateText(product.description, 150)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <a
              href={productUrl}
              className="inline-flex items-center gap-2 bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] text-white px-6 py-3 rounded-lg transition-colors"
            >
              Подробнее
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <a
              href="#"
              className="inline-flex items-center gap-2 border-2 border-[rgb(0,91,137)] text-[rgb(0,91,137)] hover:bg-[rgb(0,91,137)] hover:text-white px-6 py-3 rounded-lg transition-colors"
              onClick={(e) => e.preventDefault()} // Prevent default navigation for this placeholder link
            >
              Скачать каталог
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
