"use client";

import { useState, useEffect } from "react";
import { User as UserType } from "@/types";

interface UseUsersReturn {
  users: UserType[];
  loading: boolean;
  error: string | null;
  refreshUsers: () => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/users");

      if (!response.ok) {
        throw new Error(`Ошибка получения данных: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Не удалось получить данные");
      }

      setUsers(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      console.error("Ошибка при получении пользователей:", err);
    } finally {
      setLoading(false);
    }
  };

  // Инициализация данных
  useEffect(() => {
    fetchUsers();
  }, []);

  // Функция для обновления списка пользователей
  const refreshUsers = async () => {
    await fetchUsers();
  };

  return {
    users,
    loading,
    error,
    refreshUsers,
  };
}
