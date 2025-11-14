"use client";

import { useState, useEffect } from "react";
import { ContactRequest } from "@/types";

interface UseContactRequestsReturn {
  requests: ContactRequest[];
  loading: boolean;
  error: string | null;
  updateStatus: (id: string, status: 'new' | 'in_progress' | 'completed') => Promise<void>;
  deleteRequest: (id: string) => Promise<void>;
  refreshRequests: () => Promise<void>;
}

export function useContactRequests(): UseContactRequestsReturn {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/requests");

      if (!response.ok) {
        throw new Error(`Ошибка получения данных: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Не удалось получить данные");
      }

      setRequests(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      console.error("Ошибка при получении заявок:", err);
    } finally {
      setLoading(false);
    }
  };

  // Инициализация данных
  useEffect(() => {
    fetchRequests();
  }, []);

  // Функция для обновления статуса заявки
  const updateStatus = async (id: string, status: 'new' | 'in_progress' | 'completed') => {
    try {
      const response = await fetch(`/api/admin/requests/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Ошибка обновления статуса: ${response.status}`);
      }

      // Обновляем статус в локальном состоянии
      setRequests(prev => 
        prev.map(request => 
          request.id === id 
            ? { ...request, status, updatedAt: new Date() } 
            : request
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка при обновлении статуса");
      console.error("Ошибка при обновлении статуса заявки:", err);
      throw err;
    }
  };

  // Функция для удаления заявки
  const deleteRequest = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/requests/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Ошибка удаления: ${response.status}`);
      }

      // Удаляем заявку из локального состояния
      setRequests(prev => prev.filter(request => request.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка при удалении");
      console.error("Ошибка при удалении заявки:", err);
      throw err;
    }
  };

  // Функция для обновления списка заявок
  const refreshRequests = async () => {
    await fetchRequests();
  };

  return {
    requests,
    loading,
    error,
    updateStatus,
    deleteRequest,
    refreshRequests,
  };
}