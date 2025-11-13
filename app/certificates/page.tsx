"use client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CertificatesHero from "./components/CertificatesHero";
import CertificatesGrid from "./components/CertificatesGrid";
import { useState } from "react";

// Тип данных для сертификата
interface Certificate {
  id: number;
  title: string;
  description: string;
  issueDate: string; // формат YYYY-MM-DD
  expiryDate: string; // формат YYYY-MM-DD
  image: string;
}

export default function CertificatesPage() {
  // Пример данных сертификатов
  const [certificates] = useState<Certificate[]>([
    {
      id: 1,
      title: "Сертификат соответствия ISO 9001:2015",
      description: "Система менеджмента качества",
      issueDate: "2023-05-15",
      expiryDate: "2026-05-15",
      image: "https://images.unsplash.com/photo-1600880292203-757ccadf829e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZXxlbnwwfHx8fDE3NjI3NjQxMjN8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      title: "Сертификат промышленной безопасности",
      description: "Оборудование для опасных производственных объектов",
      issueDate: "2024-01-20",
      expiryDate: "2027-01-20",
      image: "https://images.unsplash.com/photo-1600880292027-b3e6e4b9e7d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjZXJ0aWZpY2F0ZXxlbnwwfHx8fDE3NjI3NjQxMjN8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
    },
    {
      id: 3,
      title: "Сертификат ГОСТ Р",
      description: "Соответствие национальным стандартам",
      issueDate: "2023-09-10",
      expiryDate: "2026-09-10",
      image: "https://images.unsplash.com/photo-1600880292031-7de5f6a5d8a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjZXJ0aWZpY2F0ZXxlbnwwfHx8fDE3NjI3NjQxMjN8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
    },
    {
      id: 4,
      title: "Сертификат пожарной безопасности",
      description: "Оборудование для взрывопожароопасных производств",
      issueDate: "2024-03-05",
      expiryDate: "2027-03-05",
      image: "https://images.unsplash.com/photo-1600880292034-3b1b1b1b1b1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjZXJ0aWZpY2F0ZXxlbnwwfHx8fDE3NjI3NjQxMjN8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
    },
    {
      id: 5,
      title: "Сертификат ТР ТС",
      description: "Евразийская conformity оценка",
      issueDate: "2023-11-30",
      expiryDate: "2026-11-30",
      image: "https://images.unsplash.com/photo-1600880292037-5d5d5d5d5d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjZXJ0aWZpY2F0ZXxlbnwwfHx8fDE3NjI3NjQxMjN8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
    },
    {
      id: 6,
      title: "Сертификат качества продукции",
      description: "Соответствие техническому регламенту",
      issueDate: "2024-02-18",
      expiryDate: "2027-02-18",
      image: "https://images.unsplash.com/photo-1600880292040-6a6a6a6a6a6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxjZXJ0aWZpY2F0ZXxlbnwwfHx8fDE3NjI3NjQxMjN8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
    },
    {
      id: 7,
      title: "Сертификат экологической безопасности",
      description: "Соответствие экологическим требованиям",
      issueDate: "2023-07-22",
      expiryDate: "2026-07-22",
      image: "https://images.unsplash.com/photo-1600880292043-7c7c7c7c7c7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxjZXJ0aWZpY2F0ZXxlbnwwfHx8fDE3NjI3NjQxMjN8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
    },
    {
      id: 8,
      title: "Сертификат энергоэффективности",
      description: "Оборудование с высоким КПД",
      issueDate: "2024-04-08",
      expiryDate: "2027-04-08",
      image: "https://images.unsplash.com/photo-1600880292046-8b8b8b8b8b8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxjZXJ0aWZpY2F0ZXxlbnwwfHx8fDE3NjI3NjQxMjN8MA&ixlib=rb-4.1.0&q=80&w=800&utm_source=figma&utm_medium=referral"
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 6;

  // Вычисляем индексы сертификатов для текущей страницы
  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  const currentCertificates = certificates.slice(indexOfFirstCertificate, indexOfLastCertificate);
  const totalPages = Math.ceil(certificates.length / certificatesPerPage);

  // Функция для переключения страниц
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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