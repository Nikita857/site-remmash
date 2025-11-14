"use client";

import { motion } from "motion/react";
import CertificateCard from "./CertificateCard";
import Pagination from "./Pagination";
import { Certificate } from "@/types";

interface CertificatesGridProps {
  certificates: Certificate[];
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

export default function CertificatesGrid({
  certificates,
  totalPages,
  currentPage,
  paginate,
}: CertificatesGridProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[rgb(0,91,137)] text-3xl sm:text-4xl font-bold mb-4">
            Сертификаты соответствия
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Наша продукция соответствует международным стандартам качества и
            безопасности
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        )}
      </div>
    </section>
  );
}
