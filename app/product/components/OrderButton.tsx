"use client";

import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";

interface OrderButtonProps {
  onClick: () => void;
}

interface OrderButtonProps {
  onClick: () => void;
}

export default function OrderButton({ onClick }: OrderButtonProps) {
  // Проверка на наличие onClick функции
  if (typeof onClick !== 'function') {
    console.warn('onClick handler is not provided or not a function');
    return null;
  }

  return (
    <section className="py-12 bg-linear-to-r from-[rgb(0,91,137)] to-blue-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Готовы заказать оборудование?
            </h2>
            <p className="text-blue-100">
              Оставьте заявку и наш специалист свяжется с вами для уточнения
              деталей
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={onClick}
              className="bg-white text-[rgb(0,91,137)] hover:bg-gray-100 font-bold py-4 px-8 rounded-lg flex items-center gap-3 text-lg transition-colors shadow-lg"
              aria-label="Заказать оборудование"
            >
              <ShoppingCart className="w-6 h-6" />
              Заказать оборудование
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
