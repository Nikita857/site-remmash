'use client';

import { FileText, Download, Send, Info, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function QuestionnaireSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const questionnaires = [
    {
      title: 'Теплообменное оборудование',
      description: 'Для расчета и подбора теплообменников кожухотрубного типа',
      fields:
        'Технические параметры, условия эксплуатации, требования к материалам',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Аппараты воздушного охлаждения',
      description: 'Для проектирования АВО с учетом климатических условий',
      fields: 'Расход, температура, давление, климатическая зона',
      color: 'from-[rgb(0,91,137)] to-blue-600',
    },
    {
      title: 'Емкостное оборудование',
      description: 'Для изготовления резервуаров, сепараторов и отстойников',
      fields: 'Объем, давление, температура, характеристики среды',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Нестандартное оборудование',
      description: 'Для разработки оборудования по индивидуальным требованиям',
      fields: 'Техническое задание, чертежи, особые требования',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section
      id="questionnaire"
      className="py-20 bg-linear-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-br from-[rgb(0,91,137)]/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-[rgb(0,91,137)]/10 to-purple-500/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[rgb(0,91,137)]" />
            <span className="text-[rgb(0,91,137)] text-sm">Быстрый старт</span>
          </div>
          <h2 className="text-[rgb(0,91,137)] mb-4">Опросные листы 📋</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Заполните опросный лист — получите оптимальное решение за 24 часа!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {questionnaires.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Card className="hover:shadow-2xl transition-all duration-300 border-none overflow-hidden group h-full relative">
                {/* Gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5`}
                  initial={{ scale: 0 }}
                  animate={{ scale: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`w-12 h-12 bg-linear-to-br ${item.color} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <FileText className="w-6 h-6 text-white" />
                      </motion.div>
                      <CardTitle className="text-lg group-hover:text-[rgb(0,91,137)] transition-colors">
                        {item.title}
                      </CardTitle>
                    </div>
                  </div>
                  <p className="mt-3 text-base text-gray-600">
                    {item.description}
                  </p>
                </CardHeader>

                <CardContent className="relative z-10">
                  <motion.div
                    className="bg-linear-to-br from-gray-50 to-blue-50/50 rounded-xl p-4 mb-4 border border-gray-100"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-[rgb(0,91,137)] mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-600 leading-relaxed">
                        <span className="font-medium">Основные данные:</span>{" "}
                        {item.fields}
                      </p>
                    </div>
                  </motion.div>

                  <div className="flex gap-2">
                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-2 border-gray-200 text-gray-700 hover:border-[rgb(0,91,137)] hover:bg-[rgb(0,91,137)] hover:text-white transition-all"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                    </motion.div>

                    <motion.div
                      className="flex-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="sm"
                        className={`w-full bg-linear-to-r ${item.color} hover:opacity-90 shadow-md`}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Заполнить
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>

                {/* Decorative corner */}
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-gray-100 to-transparent rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: hoveredCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-l-4 border-[rgb(0,91,137)] relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-[rgb(0,91,137)]/5 to-transparent rounded-full blur-2xl" />

          <h3 className="mb-8 text-center relative z-10">
            Как это работает? 🚀
          </h3>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              {
                step: "1",
                text: "Выберите нужный опросный лист и скачайте его в формате PDF или заполните онлайн-форму",
                icon: "📄",
              },
              {
                step: "2",
                text: "Заполните все необходимые поля максимально подробно для точного расчета",
                icon: "✍️",
              },
              {
                step: "3",
                text: "Отправьте заполненный лист нам на email, и мы свяжемся с вами в течение 1 рабочего дня",
                icon: "⚡",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 bg-linear-to-br from-[rgb(0,91,137)] to-blue-600 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-lg">{item.step}</span>
                </motion.div>

                <div className="text-3xl mb-3">{item.icon}</div>

                <p className="text-gray-600 leading-relaxed">{item.text}</p>

                {/* Connection line */}
                {index < 2 && (
                  <motion.div
                    className="hidden md:block absolute top-6 w-full h-0.5 bg-linear-to-r from-[rgb(0,91,137)] to-blue-400"
                    style={{
                      left: "50%",
                      width: "calc(100% / 3)",
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}