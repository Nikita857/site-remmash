"use client";

import { useState } from "react";
import { usePublicCertificates } from "@/hooks/usePublicCertificates";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import CertificatesGrid from "./components/CertificatesGrid";
import CertificatesHero from "./components/CertificatesHero";

export default function CertificatesPage() {
  const { certificates, loading, error } = usePublicCertificates();
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 6;

  // Вычисляем индексы сертификатов для текущей страницы
  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  const currentCertificates = certificates.slice(indexOfFirstCertificate, indexOfLastCertificate);
  const totalPages = Math.ceil(certificates.length / certificatesPerPage);

  // Функция для переключения страниц
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg">Загрузка сертификатов...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки сертификатов</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Повторить попытку
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <CertificatesHero />
        <CertificatesGrid
          certificates={currentCertificates}
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </main>
      <Footer />
    </div>
  );
}