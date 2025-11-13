"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface ProductHeroProps {
  product?: {
    name: string;
    shortDescription: string;
  };
}

export default function ProductHero({ product }: ProductHeroProps) {
  const title = product?.name || "Кожухотрубный теплообменник";
  const description = product?.shortDescription || "Высококачественное теплообменное оборудование, соответствующее международным стандартам. Оптимальное решение для вашей производственной задачи.";

  // Обработка данных продукта безопасным образом
  const stats = product ? {
    warranty: product.warranty || "15 лет",
    projects: product.projects || "200+",
    satisfaction: product.satisfaction || "98%",
    quality: product.quality || "100%"
  } : {
    warranty: "15 лет",
    projects: "200+",
    satisfaction: "98%",
    quality: "100%"
  };

  return (
    <section className="relative bg-linear-to-br from-black via-gray-900 to-[rgb(0,91,137)] text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gray-800" />{" "}
        {/* Placeholder for image */}
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[rgb(0,91,137)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl">
          <motion.h1
            className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mb-8 text-gray-200 text-lg sm:text-xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] text-white px-6 py-3 rounded-md flex items-center gap-2 transition-colors">
                Заказать расчет
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="bg-white/10 border border-white text-white hover:bg-white hover:text-black backdrop-blur-sm px-6 py-3 rounded-md transition-colors">
                Скачать каталог
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          className="mt-12 sm:mt-0 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="border-l-2 border-[rgb(0,91,137)] pl-4">
            <div className="text-2xl sm:text-3xl font-bold">15+</div>
            <div className="text-sm text-gray-300 mt-1">Лет гарантии</div>
          </div>
          <div className="border-l-2 border-[rgb(0,91,137)] pl-4">
            <div className="text-2xl sm:text-3xl font-bold">200+</div>
            <div className="text-sm text-gray-300 mt-1">Проектов</div>
          </div>
          <div className="border-l-2 border-[rgb(0,91,137)] pl-4">
            <div className="text-2xl sm:text-3xl font-bold">98%</div>
            <div className="text-sm text-gray-300 mt-1">Удовлетворенности</div>
          </div>
          <div className="border-l-2 border-[rgb(0,91,137)] pl-4">
            <div className="text-2xl sm:text-3xl font-bold">100%</div>
            <div className="text-sm text-gray-300 mt-1">Качества</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}