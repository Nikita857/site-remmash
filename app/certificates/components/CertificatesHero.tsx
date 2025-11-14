"use client";

import { motion } from "motion/react";

export default function CertificatesHero() {
  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-[rgb(0,91,137)] text-white overflow-hidden">
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Наши сертификаты
            </h1>
            <p className="text-xl text-gray-200">
              Подтверждение соответствия и качества нашей продукции
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
