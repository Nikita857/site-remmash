"use client";

import { useState, useEffect, Fragment, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User as UserType } from "@/types";
import {
  UserTableHeader,
  UserTableRow,
  UserTablePagination,
  EditUserModal,
} from "./users";

interface UsersTableProps {
  initialUsers: UserType[];
  onEditUser: (user: UserType) => void;
  onCreateUser: () => void;
  onToggleStatus: (userId: string) => void;
  onDelete: (userId: string) => void;
}

export function UsersTable({
  initialUsers,
  onEditUser,
  onCreateUser,
  onToggleStatus,
  onDelete,
}: UsersTableProps) {
  const [users] = useState<UserType[]>(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Фильтрация пользователей по поисковому запросу
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
    setCurrentPage(1); // Сброс на первую страницу при поиске
  }, [searchTerm, users]);

  // Функция для открытия модального окна редактирования
  const openEditModal = useCallback((user: UserType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  // Функция для закрытия модального окна
  const closeEditModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  // Переключение расширенной строки
  const toggleRowExpansion = useCallback((userId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  }, []);

  // Пагинация
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
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
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <UserTableHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onCreateUser={onCreateUser}
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
                  Отдел
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Роль
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
              {currentUsers.map((user) => (
                <Fragment key={user.id}>
                  <UserTableRow
                    user={user}
                    onEdit={openEditModal}
                    onDelete={onDelete}
                    onToggleStatus={onToggleStatus}
                    onToggleRowExpansion={toggleRowExpansion}
                    isExpanded={!!expandedRows[user.id]}
                  />
                  {expandedRows[user.id] && (
                    <tr key={`expanded-${user.id}`}>
                      <td colSpan={6} className="px-6 py-4 bg-gray-50">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3 text-lg">
                              Контактная информация
                            </h4>
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                <dt className="text-sm font-medium text-gray-500">
                                  Телефон
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">
                                  {user.phone}
                                </dd>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                <dt className="text-sm font-medium text-gray-500">
                                  Email
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">
                                  {user.email}
                                </dd>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                <dt className="text-sm font-medium text-gray-500">
                                  Отдел
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">
                                  {user.department}
                                </dd>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                <dt className="text-sm font-medium text-gray-500">
                                  Дата создания
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 font-medium">
                                  {new Date(user.createdAt).toLocaleDateString(
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
          <UserTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            startIndex={startIndex}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Модальное окно редактирования/создания */}
      <AnimatePresence>
        {isModalOpen && (
          <EditUserModal
            user={selectedUser}
            isOpen={isModalOpen}
            onClose={closeEditModal}
            onSave={() => {}} // onSave будет обработан в родительском компоненте
          />
        )}
      </AnimatePresence>
    </>
  );
}
