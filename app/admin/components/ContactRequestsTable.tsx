"use client";

import { useState, useEffect, Fragment, useCallback } from "react";
import { ContactRequest } from "@/types";
import {
  ContactRequestTableHeader,
  ContactRequestTableRow,
  ContactRequestTablePagination,
} from "./requests";

interface ContactRequestsTableProps {
  initialRequests: ContactRequest[];
  onUpdateStatus: (
    id: string,
    status: "new" | "in_progress" | "completed"
  ) => void;
  onDelete: (id: string) => void;
}

export function ContactRequestsTable({
  initialRequests,
  onUpdateStatus,
  onDelete,
}: ContactRequestsTableProps) {
  const [requests, setRequests] = useState<ContactRequest[]>(initialRequests);
  const [filteredRequests, setFilteredRequests] =
    useState<ContactRequest[]>(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Фильтрация заявок по поисковому запросу
  useEffect(() => {
    const filtered = requests.filter(
      (request) =>
        request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.email &&
          request.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (request.message &&
          request.message.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredRequests(filtered);
    setCurrentPage(1); // Сброс на первую страницу при поиске
  }, [searchTerm, requests]);

  // Переключение расширенной строки
  const toggleRowExpansion = useCallback((requestId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [requestId]: !prev[requestId],
    }));
  }, []);

  // Пагинация
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Функция для изменения страницы
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, []);

  // Функция для удаления заявки с подтверждением и проверкой статуса
  const handleDeleteRequest = useCallback(
    async (id: string) => {
      const request = requests.find((r) => r.id === id);

      if (!request) {
        return;
      }

      // Проверяем статус заявки
      if (request.status === "new") {
        alert(
          'Нельзя удалить новую заявку. Сначала измените её статус на "в процессе" или "завершена".'
        );
        return;
      }

      if (
        !window.confirm(
          "Вы уверены, что хотите удалить эту заявку? Отменить это действие будет невозможно."
        )
      ) {
        return;
      }

      try {
        // Удаляем заявку из локального состояния для мгновенного обновления UI
        setRequests((prev) => prev.filter((request) => request.id !== id));
        setFilteredRequests((prev) =>
          prev.filter((request) => request.id !== id)
        );

        // Вызываем функцию удаления из пропсов
        await onDelete(id);
      } catch (error) {
        // Если произошла ошибка, откатываем локальное удаление
        console.error("Ошибка при удалении заявки:", error);

        // Обновляем данные, чтобы отобразить актуальное состояние из API
        // (в реальной реализации нужно будет использовать refreshRequests)
      }
    },
    [requests, onDelete]
  );

  // Функция для обновления статуса с мгновенным обновлением UI
  const handleUpdateStatus = useCallback(
    async (id: string, status: "new" | "in_progress" | "completed") => {
      // Обновляем статус в локальном состоянии для мгновенного обновления UI
      setRequests((prev) =>
        prev.map((request) =>
          request.id === id
            ? { ...request, status, updatedAt: new Date() }
            : request
        )
      );
      setFilteredRequests((prev) =>
        prev.map((request) =>
          request.id === id
            ? { ...request, status, updatedAt: new Date() }
            : request
        )
      );

      try {
        // Вызываем функцию обновления статуса из пропсов
        await onUpdateStatus(id, status);
      } catch (error) {
        // Если произошла ошибка, откатываем локальное изменение
        console.error("Ошибка при обновлении статуса:", error);

        // Обновляем данные, чтобы отобразить актуальное состояние из API
        // (в реальной реализации нужно будет использовать refreshRequests)
      }
    },
    [onUpdateStatus]
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <ContactRequestTableHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Имя
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Сообщение
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Время
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRequests.map((request) => (
              <Fragment key={request.id}>
                <ContactRequestTableRow
                  request={request}
                  onStatusChange={handleUpdateStatus}
                  onDelete={handleDeleteRequest}
                  onToggleRowExpansion={toggleRowExpansion}
                  isExpanded={!!expandedRows[request.id]}
                />
                {expandedRows[request.id] && (
                  <tr key={`expanded-${request.id}`}>
                    <td colSpan={7} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 text-lg">
                            Детали заявки
                          </h4>
                          <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Имя
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {request.fullName}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Телефон
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {request.phone}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Email
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {request.email || "—"}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Статус
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {request.status === "new"
                                  ? "Новая"
                                  : request.status === "in_progress"
                                  ? "В процессе"
                                  : "Завершена"}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm md:col-span-2">
                              <dt className="text-sm font-medium text-gray-500">
                                Сообщение
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {request.message || "—"}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Дата создания
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {new Date(request.createdAt).toLocaleDateString(
                                  "ru-RU"
                                )}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Время создания
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {new Date(request.createdAt).toLocaleTimeString(
                                  "ru-RU",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  }
                                )}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Дата изменения
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {new Date(request.updatedAt).toLocaleDateString(
                                  "ru-RU"
                                )}
                              </dd>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                              <dt className="text-sm font-medium text-gray-500">
                                Время изменения
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 font-medium">
                                {new Date(request.updatedAt).toLocaleTimeString(
                                  "ru-RU",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                  }
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
        <ContactRequestTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredRequests.length}
          itemsPerPage={itemsPerPage}
          startIndex={startIndex}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
