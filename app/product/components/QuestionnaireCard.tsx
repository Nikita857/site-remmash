"use client";

import { motion } from "motion/react";
import { FileText, Download, Sparkles, Eye } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import type { ProductWithCategory } from "@/types";
import type { Questionnaire } from "@prisma/client";
import { useState, useEffect } from "react";

interface QuestionnaireCardProps {
  product: ProductWithCategory;
  questionnaire: Questionnaire | null;
}

export default function QuestionnaireCard({ product, questionnaire }: QuestionnaireCardProps) {
  if (!questionnaire) {
    return null;
  }

  const [hasPdf, setHasPdf] = useState<boolean>(false);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);

  useEffect(() => {
    if (questionnaire.fileUrl) {
      const checkPdf = async () => {
        const fileWithoutExt = questionnaire.fileUrl.replace(/\.[^/.]+$/, "");
        const pdfUrl = `${fileWithoutExt}.pdf`;
        
        try {
          const response = await fetch(pdfUrl, { method: 'HEAD' });
          setHasPdf(response.ok);
        } catch {
          setHasPdf(false);
        }
      };
      
      checkPdf();
    }
  }, [questionnaire.fileUrl]);

  const openPdfViewer = () => {
    if (questionnaire.fileUrl) {
      const fileWithoutExt = questionnaire.fileUrl.replace(/\.[^/.]+$/, "");
      const pdfUrl = `${fileWithoutExt}.pdf`;
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <section className="py-20 bg-linear-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
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
            <span className="text-[rgb(0,91,137)] text-sm">
              Для точного расчета
            </span>
          </div>
          <h2 className="text-[rgb(0,91,137)] mb-4 text-3xl sm:text-4xl">
            Опросный лист для: {product.category.name} 📋
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Заполните опросный лист для получения точного расчета и оптимального
            решения для вашей задачи
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Опросный лист по: {product.category.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Просмотрите опросный лист, чтобы ознакомиться с необходимыми
                    параметрами для точного расчета и подбора оптимального
                    теплообменного оборудования.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-[rgb(0,91,137)] mr-3 mt-1 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <span className="text-gray-600">
                        Технические параметры теплоносителей
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-[rgb(0,91,137)] mr-3 mt-1 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <span className="text-gray-600">
                        Условия эксплуатации
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-[rgb(0,91,137)] mr-3 mt-1 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                      <span className="text-gray-600">
                        Требования к материалам
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <button 
                      onClick={openPdfViewer}
                      className="w-full bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] text-white py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">
                        Просмотреть
                      </span>
                    </button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <a href={questionnaire.fileUrl} download>
                      <button className="w-full bg-white border-2 border-[rgb(0,91,137)] text-[rgb(0,91,137)] hover:bg-[rgb(0,91,137)] hover:text-white py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-colors">
                        <Download className="w-5 h-5" />
                        <span className="font-medium">Скачать шаблон</span>
                      </button>
                    </a>
                  </motion.div>

                  <div className="text-center text-sm text-gray-500 mt-4">
                    Можете скачать опросный лист, заполнить его, и отправить нам на почту.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
