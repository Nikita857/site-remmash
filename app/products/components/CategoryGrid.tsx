'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  slug: string;
}

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
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
            Категории продукции
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Выберите категорию оборудования для ознакомления с нашими предложениями
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            >
              <div className="h-48">
                <ImageWithFallback
                  src={category.image || '/placeholder-category.jpg'}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{category.name}</h3>
                {category.description && (
                  <p className="text-gray-600 mb-6">{category.description}</p>
                )}

                <div className="flex items-center justify-between">
                  <a
                    href={`/products/${category.slug}`}
                    className="inline-flex items-center gap-2 bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Перейти
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  
                  <a
                    href="#"
                    className="text-[rgb(0,91,137)] hover:text-[rgb(0,71,117)] font-medium"
                  >
                    Каталог
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}