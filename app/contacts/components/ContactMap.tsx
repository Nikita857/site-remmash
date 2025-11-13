"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function ContactMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  // Здесь будет карта (в реальном приложении нужно подключить API карт)
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
            Наше расположение
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Найдите нас на карте и свяжитесь с нами удобным для вас способом
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Заглушка для карты с анимацией загрузки */}
          <div className="relative h-96 md:h-[500px]">
            {!mapLoaded && (
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(0,91,137)] mb-4"></div>
                  <p className="text-gray-600">Загрузка карты...</p>
                </div>
              </div>
            )}

            {/* Картинка-заглушка для карты */}
            <img
              src="https://maps.googleapis.com/maps/api/staticmap?center=55.7558,37.6173&zoom=14&size=1200x500&maptype=roadmap&markers=color:red%7Clabel:S%7C55.7558,37.6173&key=YOUR_API_KEY"
              alt="Карта расположения компании"
              className="w-full h-full object-cover"
              onLoad={() => setMapLoaded(true)}
              onError={() => setMapLoaded(true)}
            />

            {/* Кастомный маркер */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-10 h-10 bg-[rgb(0,91,137)] rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-2 rounded-lg shadow-md text-sm font-medium text-gray-800 whitespace-nowrap">
                ООО Реммаш
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
