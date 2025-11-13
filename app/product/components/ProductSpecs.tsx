"use client";

import { motion } from "motion/react";

interface Specification {
  name: string;
  value: string;
}

interface AdditionalParamGroup {
  category: string;
  items: Specification[];
}

interface ProductSpecsProps {
  specifications?: Specification[] | { basic?: Specification[]; additional?: AdditionalParamGroup[] };
}

export default function ProductSpecs({ specifications: propSpecs }: ProductSpecsProps) {
  // Используем переданные спецификации или пример по умолчанию
  let specifications: Specification[] = [];
  let additionalParams: AdditionalParamGroup[] = [];

  if (propSpecs) {
    if (Array.isArray(propSpecs)) {
      // Если это массив спецификаций
      specifications = propSpecs;
    } else if (typeof propSpecs === 'object' && propSpecs !== null) {
      // Если это объект с основными и дополнительными параметрами
      specifications = Array.isArray(propSpecs.basic) ? propSpecs.basic : [];
      additionalParams = Array.isArray(propSpecs.additional) ? propSpecs.additional : [];
    }
  }

  // Используем пример по умолчанию, если спецификации не переданы
  if (specifications.length === 0) {
    specifications = [
      { name: "Тип теплообменника", value: "Кожухотрубный" },
      {
        name: "Материал теплообменных труб",
        value: "Нержавеющая сталь AISI 316",
      },
      {
        name: "Материал кожуха",
        value: "Углеродистая сталь с антикоррозийным покрытием",
      },
      { name: "Диаметр труб", value: "19-25 мм" },
      { name: "Количество труб", value: "100-2000 (в зависимости от модели)" },
      { name: "Рабочее давление", value: "До 40 бар" },
      { name: "Температура эксплуатации", value: "-40°C до +400°C" },
      { name: "Пропускная способность", value: "До 500 м³/ч" },
      { name: "Коэффициент теплопередачи", value: "200-1200 Вт/(м²·К)" },
      { name: "Площадь теплообмена", value: "10-500 м²" },
      { name: "Степень защиты", value: "IP54" },
      { name: "Гарантия", value: "15 лет" },
    ];
  }

  if (additionalParams.length === 0) {
    additionalParams = [
      {
        category: "Тепловые параметры",
        items: [
          { name: "Макс. тепловая мощность", value: "2.5 МВт" },
          { name: "КПД", value: "до 95%" },
          { name: "Перепад температур", value: "до 200°C" },
        ],
      },
      {
        category: "Конструктивные особенности",
        items: [
          { name: "Тип присоединения", value: "Фланцевое/Резьбовое" },
          { name: "Конфигурация трубного пучка", value: "U-образный/Прямой" },
          { name: "Наличие байпаса", value: "По запросу" },
        ],
      },
      {
        category: "Эксплуатационные данные",
        items: [
          { name: "Среда на трубной стороне", value: "Вода, масло, пар" },
          {
            name: "Среда на межтрубном пространстве",
            value: "Вода, пар, гликоль",
          },
          {
            name: "Разрешение на применение",
            value: "Российские и международные стандарты",
          },
        ],
      },
    ];
  }

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
            Технические характеристики
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Подробные параметры оборудования для точного подбора и расчета
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="bg-linear-to-br from-gray-50 to-blue-50/30 p-6 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Основные характеристики
            </h3>
            <div className="space-y-4">
              {specifications.map((spec, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between py-2 border-b border-gray-100 last:border-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <span className="text-gray-600">{spec.name}</span>
                  <span className="font-medium text-gray-800">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {additionalParams.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="bg-linear-to-br from-[rgb(0,91,137)]/5 to-blue-50 p-6 rounded-2xl shadow-md"
              >
                <h4 className="text-lg font-semibold text-[rgb(0,91,137)] mb-4">
                  {group.category}
                </h4>
                <div className="space-y-3">
                  {group.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-medium text-gray-800">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="bg-linear-to-r from-[rgb(0,91,137)]/10 to-blue-50/10 p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-[rgb(0,91,137)] mb-4">
            Дополнительные возможности
          </h3>
          <ul className="grid md:grid-cols-2 gap-3">
            <li className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-[rgb(0,91,137)] mr-3 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span>Изготовление по индивидуальным чертежам</span>
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-[rgb(0,91,137)] mr-3 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span>Изменение габаритных размеров</span>
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-[rgb(0,91,137)] mr-3 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span>Применение специальных материалов</span>
            </li>
            <li className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-[rgb(0,91,137)] mr-3 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <span>Добавление дополнительных функций</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
