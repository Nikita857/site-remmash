"use client";

import {
  Users,
  Headphones,
  TrendingUp,
  Shield,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CooperationSection() {
  const benefits = [
    {
      icon: Users,
      title: "Индивидуальный подход",
      description:
        "Разрабатываем решения с учетом специфики вашего производства",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Headphones,
      title: "Техническая поддержка",
      description: "Консультации и сопровождение на всех этапах эксплуатации",
      gradient: "from-[rgb(0,91,137)] to-blue-500",
    },
    {
      icon: TrendingUp,
      title: "Оптимизация процессов",
      description: "Помогаем повысить эффективность производства",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: "Гарантия качества",
      description: "Предоставляем расширенные гарантийные обязательства",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section
      id="cooperation"
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 right-10 w-64 h-64 bg-linear-to-br from-[rgb(0,91,137)]/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="order-2 lg:order-1 relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute -inset-4 bg-linear-to-r from-[rgb(0,91,137)] to-blue-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758599543152-a73184816eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMGNvb3BlcmF0aW9ufGVufDF8fHx8MTc2Mjc1NjEwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Сотрудничество"
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-[rgb(0,91,137)] mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Давайте работать вместе! 🤝
            </motion.h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              Мы стремимся к долгосрочному партнерству и готовы предложить
              индивидуальные условия для каждого клиента.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl border-2 border-gray-100 hover:border-transparent bg-white relative overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10`}
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{ scale: 1.5, rotate: 180 }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${benefit.gradient} rounded-2xl mb-4 shadow-lg relative z-10`}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="mb-2 relative z-10 group-hover:text-[rgb(0,91,137)] transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm relative z-10 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative dots */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-1.5 h-1.5 bg-linear-to-r ${benefit.gradient} rounded-full`}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 bg-linear-to-br from-[rgb(0,91,137)] to-blue-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated background circles */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative z-10">
            <h3 className="text-white mb-4">
              Готовы начать сотрудничество? ✨
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Свяжитесь с нами для обсуждения условий партнерства. Мы ответим на
              все ваши вопросы!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="#questionnaire"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[rgb(0,91,137)] rounded-xl hover:bg-gray-100 transition-all shadow-lg group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Заполнить опросный лист</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#contacts"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-[rgb(0,91,137)] transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Связаться с нами
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
