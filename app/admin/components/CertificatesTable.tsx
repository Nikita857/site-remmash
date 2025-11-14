"use client";

import { useState, useEffect, Fragment, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Certificate } from "@/types";
import {
  CertificateTableHeader,
  CertificateTableRow,
  CertificateTablePagination,
} from "./certificates";

interface CertificatesTableProps {
  initialCertificates: Certificate[];
  onUpdateStatus: (id: string, isActive: boolean) => void;
  onEdit: (certificate: Certificate) => void;
  onCreateCertificate: () => void;
  onDelete: (id: string) => void;
}

export function CertificatesTable({
  initialCertificates,
  onUpdateStatus,
  onEdit,
  onCreateCertificate,
  onDelete,
}: CertificatesTableProps) {
  const [certificates] = useState<Certificate[]>(initialCertificates);
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[]>(initialCertificates);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Фильтрация сертификатов по поисковому запросу
  useEffect(() => {
    const filtered = certificates.filter(
      (cert) =>
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCertificates(filtered);
    setCurrentPage(1); // Сброс на первую страницу при поиске
  }, [searchTerm, certificates]);

  // Переключение расширенной строки
  const toggleRowExpansion = useCallback((certId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [certId]: !prev[certId],
    }));
  }, []);

  // Пагинация
  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCertificates = filteredCertificates.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Функция для изменения страницы
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <CertificateTableHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onCreateCertificate={onCreateCertificate}
      />

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Название
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Описание
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата выдачи
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата окончания
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCertificates.map((certificate) => (
              <Fragment key={certificate.id}>
                <CertificateTableRow
                  certificate={certificate}
                  onEdit={onEdit}
                  onToggleStatus={onUpdateStatus}
                  onDelete={onDelete}
                  onToggleRowExpansion={toggleRowExpansion}
                  isExpanded={!!expandedRows[certificate.id]}
                />
                {expandedRows[certificate.id] && (
                  <tr key={`expanded-${certificate.id}`}>
                    <td colSpan={6} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 text-lg">
                            Детали сертификата
                          </h4>
                          <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Название
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {certificate.title}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Статус
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {certificate.isActive ? 'Активен' : 'Неактивен'}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm md:col-span-2">
                              <dt className="text-sm font-medium text-gray-500">
                                Описание
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {certificate.description}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Дата выдачи
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {new Date(certificate.issueDate).toLocaleDateString(
                                  "ru-RU"
                                )}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Дата окончания
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {new Date(certificate.expiryDate).toLocaleDateString(
                                  "ru-RU"
                                )}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Дата создания
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {new Date(certificate.createdAt).toLocaleDateString(
                                  "ru-RU"
                                )}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Дата изменения
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {new Date(certificate.updatedAt).toLocaleDateString(
                                  "ru-RU"
                                )}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <CertificateTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredCertificates.length}
          itemsPerPage={itemsPerPage}
          startIndex={startIndex}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}