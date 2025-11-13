"use client";

import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Factory, Wrench, CheckCircle, Award, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

export function ProductionCapabilities() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const capabilities = [
    {
      icon: Factory,
      title: "Современное производство",
      description:
        "Высокотехнологичное оборудование и автоматизированные линии производства обеспечивают высокое качество продукции.",
      color: "from-blue-500 to-[rgb(0,91,137)]",
    },
    {
      icon: Wrench,
      title: "Полный цикл изготовления",
      description:
        "От проектирования до монтажа и пусконаладки — все этапы производства под контролем наших специалистов.",
      color: "from-[rgb(0,91,137)] to-cyan-600",
    },
    {
      icon: CheckCircle,
      title: "Контроль качества",
      description:
        "Многоступенчатая система контроля качества на каждом этапе производства гарантирует соответствие всем стандартам.",
      color: "from-cyan-600 to-blue-500",
    },
    {
      icon: Award,
      title: "Сертификация",
      description:
        "Вся продукция имеет необходимые сертификаты и разрешения для применения в нефтегазовой промышленности.",
      color: "from-blue-500 to-indigo-600",
    },
  ];

  return (
    <section
      id="production"
      className="py-20 bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgb(0,91,137)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[rgb(0,91,137)]/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[rgb(0,91,137)]" />
            <span className="text-[rgb(0,91,137)] text-sm">
              Наши преимущества
            </span>
          </div>
          <h2 className="text-[rgb(0,91,137)] mb-4">
            Производственные возможности
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Современное оборудование и профессиональная команда для реализации
            проектов любой сложности
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card className="border-none shadow-md hover:shadow-2xl transition-all duration-300 h-full overflow-hidden group cursor-pointer">
                  <CardContent className="p-6 relative">
                    {/* Animated gradient background on hover */}
                    <motion.div
                      className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5`}
                      initial={{ scale: 0, rotate: -180 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    />

                    <div className="flex items-start gap-4 relative z-10">
                      <motion.div
                        className={`shrink-0 w-14 h-14 bg-linear-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6, type: "spring" }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="mb-2 group-hover:text-[rgb(0,91,137)] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Decorative corner element */}
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-[rgb(0,91,137)]/10 to-transparent rounded-bl-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredCard === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h3 className="text-[rgb(0,91,137)] mb-6">
              Основные направления производства
            </h3>
            <ul className="space-y-4">
              {[
                "Теплообменники кожухотрубного типа различных модификаций",
                "Аппараты воздушного охлаждения (АВО)",
                "Емкостное оборудование для нефтегазовой отрасли",
                "Сепараторы и отстойники различных типов",
                "Нестандартное оборудование по техническим заданиям заказчика",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-5 h-5 text-[rgb(0,91,137)] shrink-0 mt-1 group-hover:text-blue-600 transition-colors" />
                  </motion.div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2 relative group"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-linear-to-br from-[rgb(0,91,137)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <ImageWithFallback
              src="assets/5ec64322986861ecdd03e5545bca5cbd.jpeg"
              alt="Производство"
              className="w-full h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
