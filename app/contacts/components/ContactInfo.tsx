"use client";

import { motion } from "motion/react";
import { Phone, Mail, MapPin, Building2 } from "lucide-react";
import { SITE_CONFIG } from "../../../config";

export default function ContactInfo() {
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
            Контактная информация
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Свяжитесь с нами по указанным контактам. Наша команда всегда готова
            ответить на ваши вопросы.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="w-14 h-14 bg-[rgb(0,91,137)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Телефон
            </h3>
            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/[^\d+]/g, "")}`}
              className="text-[rgb(0,91,137)] hover:text-[rgb(0,71,117)] font-medium text-lg"
            >
              {SITE_CONFIG.contact.phone}
            </a>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-14 h-14 bg-[rgb(0,91,137)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Email</h3>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="text-[rgb(0,91,137)] hover:text-[rgb(0,71,117)] font-medium"
            >
              {SITE_CONFIG.contact.email}
            </a>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="w-14 h-14 bg-[rgb(0,91,137)] rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Адрес</h3>
            <p className="text-gray-700">{SITE_CONFIG.contact.address}</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="w-14 h-14 bg-[rgb(0,91,137)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Организация
            </h3>
            <p className="text-gray-700 text-sm">
              {SITE_CONFIG.company.legalName}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
