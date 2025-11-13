"use client";

import { motion } from "motion/react";

interface ProductDescriptionProps {
  product?: {
    name: string;
    fullDescription?: string;
    shortDescription?: string;
  };
}

export default function ProductDescription({ product }: ProductDescriptionProps) {
  const title = product?.name || "Описание продукта";
  const description = product?.fullDescription || product?.shortDescription || 
    `Наше теплообменное оборудование разработано с использованием
    передовых технологий и соответствует международным стандартам
    качества. Устройство обеспечивает высокую эффективность
    теплопередачи при минимальном гидравлическом сопротивлении.`;

  // Безопасное обращение к свойствам
  const productDetails = product ? {
    name: product.name || '',
    fullDescription: product.fullDescription || '',
    shortDescription: product.shortDescription || ''
  } : null;

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[rgb(0,91,137)] text-3xl sm:text-4xl font-bold mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-[rgb(0,91,137)] mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {title} премиум класса
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Теплообменники этой серии применяются в нефтегазовой, химической и
              энергетической промышленности. Они обеспечивают надежную и
              эффективную работу в самых тяжелых условиях эксплуатации.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-[rgb(0,91,137)] text-white flex items-center justify-center mr-3 mt-1 shrink-0">
                  ✓
                </div>
                <span className="text-gray-600">
                  Высокая эффективность теплопередачи
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-[rgb(0,91,137)] text-white flex items-center justify-center mr-3 mt-1 shrink-0">
                  ✓
                </div>
                <span className="text-gray-600">Долговечные материалы</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-[rgb(0,91,137)] text-white flex items-center justify-center mr-3 mt-1 shrink-0">
                  ✓
                </div>
                <span className="text-gray-600">Простота обслуживания</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-[rgb(0,91,137)] text-white flex items-center justify-center mr-3 mt-1 shrink-0">
                  ✓
                </div>
                <span className="text-gray-600">
                  Соответствие международным стандартам
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-linear-to-br from-gray-50 to-blue-50 p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Преимущества
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[rgb(0,91,137)]/10 flex items-center justify-center mr-4 shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[rgb(0,91,137)]"></div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Надежность</h5>
                  <p className="text-gray-600 text-sm">
                    Прочные материалы и проверенная конструкция обеспечивают
                    длительный срок службы.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[rgb(0,91,137)]/10 flex items-center justify-center mr-4 shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[rgb(0,91,137)]"></div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Эффективность</h5>
                  <p className="text-gray-600 text-sm">
                    Максимальная теплопередача с минимальными потерями энергии.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-[rgb(0,91,137)]/10 flex items-center justify-center mr-4 shrink-0">
                  <div className="w-6 h-6 rounded-full bg-[rgb(0,91,137)]"></div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800">Экономичность</h5>
                  <p className="text-gray-600 text-sm">
                    Снижение эксплуатационных расходов за счет высокой
                    эффективности.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
