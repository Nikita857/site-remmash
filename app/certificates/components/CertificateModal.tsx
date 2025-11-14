"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Certificate } from "@/types";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate;
}

export default function CertificateModal({
  isOpen,
  onClose,
  certificate,
}: CertificateModalProps) {
  // Форматирование дат
  /**
   * Format date from '2025-11-14 08:58:34.484' to 'Ноябрь-25-14'
   */
  function formatDate(inputDate: Date | string): string {
    // Если передана строка, преобразуем в Date
    const dateObj =
      typeof inputDate === "string" ? new Date(inputDate) : inputDate;

    // Проверка валидности даты
    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date format. Expected: 2025-11-14 08:58:34.484");
    }

    const months = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];

    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear().toString(); // Последние 2 цифры года
    const day = dateObj.getDate().toString().padStart(2, "0");

    return `${day} ${month} ${year}`;
  }

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {certificate.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {certificate.description}
                  </p>
                  <div className="flex gap-6 mt-3 text-sm text-gray-500">
                    <div>
                      <span className="font-medium">Выдан:</span>{" "}
                      {formatDate(certificate.issueDate)}
                    </div>
                    <div>
                      <span className="font-medium">Действует до:</span>{" "}
                      {formatDate(certificate.expiryDate)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-2 bg-linear-to-r from-[rgb(0,91,137)] to-blue-600">
              <div className="bg-white p-2">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
