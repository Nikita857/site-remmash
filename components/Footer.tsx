"use client";

import { SITE_CONFIG } from "@/config";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contacts"
      className="bg-linear-to-br from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgb(0,91,137)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-12 h-12 bg-linear-to-br from-[rgb(0,91,137)] to-blue-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <span>РМ</span>
              </motion.div>
              <div>
                <div>ООО Реммаш</div>
                <div className="text-sm text-gray-400">
                  Теплообменное оборудование
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Производство теплообменного оборудования для нефтегазовой
              промышленности с 2005 года 🏭
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4 bg-linear-to-r from-[rgb(0,91,137)] to-blue-400 bg-clip-text text-transparent">
              Контактная информация
            </h3>
            <div className="space-y-3 text-sm">
              <motion.a
                href="#"
                className="flex items-start gap-3 group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-[rgb(0,91,137)] shrink-0 group-hover:text-blue-400 transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {SITE_CONFIG.contact.address}
                </span>
              </motion.a>
              <motion.a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-3 group"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-[rgb(0,91,137)] shrink-0 group-hover:text-blue-400 transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {SITE_CONFIG.contact.phone}
                </span>
              </motion.a>
              <motion.a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-3 group"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-[rgb(0,91,137)] shrink-0 group-hover:text-blue-400 transition-colors" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {SITE_CONFIG.contact.email}
                </span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-4 bg-linear-to-r from-[rgb(0,91,137)] to-blue-400 bg-clip-text text-transparent">
              Режим работы
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p>{SITE_CONFIG.workHours.schedule}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <p>Сб - Вс: Выходной</p>
              </div>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Отдел продаж готов ответить на ваши вопросы в рабочее время ☎️
              </p>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} {SITE_CONFIG.company.name}. Все права
            защищены.
          </motion.p>

          <div className="flex items-center gap-6">
            <motion.a
              href="#"
              className="text-sm text-gray-400 hover:text-[rgb(0,91,137)] transition-colors"
              whileHover={{ y: -2 }}
            >
              Политика конфиденциальности
            </motion.a>
            <motion.a
              href="#"
              className="text-sm text-gray-400 hover:text-[rgb(0,91,137)] transition-colors"
              whileHover={{ y: -2 }}
            >
              Реквизиты
            </motion.a>
          </div>

          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 bg-linear-to-br from-[rgb(0,91,137)] to-blue-600 rounded-full flex items-center justify-center hover:shadow-lg"
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
