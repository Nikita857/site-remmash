"use client";

import { motion } from "motion/react";
import { User, Phone, Mail } from "lucide-react";

interface ManagementMember {
  id: number;
  name: string;
  position: string;
  phone: string;
  email: string;
  responsibilities: string[];
}

export default function ManagementInfo() {
  const managementTeam: ManagementMember[] = [
    {
      id: 1,
      name: "Иванов Иван Иванович",
      position: "Генеральный директор",
      phone: "+7 (495) 123-45-67",
      email: "director@remmash.ru",
      responsibilities: [
        "Общее руководство деятельностью компании",
        "Стратегическое планирование развития",
        "Взаимодействие с ключевыми партнёрами",
      ],
    },
    {
      id: 2,
      name: "Петров Сергей Петрович",
      position: "Коммерческий директор",
      phone: "+7 (495) 123-45-68",
      email: "commerical@remmash.ru",
      responsibilities: [
        "Руководство коммерческой деятельностью",
        "Управление продажами и маркетингом",
        "Развитие клиентской базы",
      ],
    },
    {
      id: 3,
      name: "Сидорова Мария Николаевна",
      position: "Технический директор",
      phone: "+7 (495) 123-45-69",
      email: "technical@remmash.ru",
      responsibilities: [
        "Техническое руководство проектами",
        "Контроль качества продукции",
        "Разработка новых решений",
      ],
    },
  ];

  return (
    <section className="py-20 bg-linear-to-br from-gray-50 via-white to-blue-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[rgb(0,91,137)] text-3xl sm:text-4xl font-bold mb-4">
            Руководство предприятия
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Наши руководители всегда готовы ответить на ваши вопросы и
            организовать личную встречу
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {managementTeam.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-[rgb(0,91,137)] to-blue-600 flex items-center justify-center mr-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-[rgb(0,91,137)] font-medium">
                    {member.position}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-[rgb(0,91,137)] mr-3 shrink-0" />
                  <a
                    href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
                    className="text-gray-700 hover:text-[rgb(0,91,137)]"
                  >
                    {member.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-[rgb(0,91,137)] mr-3 shrink-0" />
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-700 hover:text-[rgb(0,91,137)] truncate"
                  >
                    {member.email}
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Обязанности:
                </h4>
                <ul className="space-y-1">
                  {member.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-[rgb(0,91,137)] rounded-full mt-2 mr-2 shrink-0"></div>
                      <span className="text-gray-600 text-sm">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
