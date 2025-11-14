"use client";

import { useState, useEffect } from "react";
import { Certificate } from "@/types";

interface UseCertificatesReturn {
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
  updateStatus: (id: string, isActive: boolean) => Promise<void>;
  updateCertificate: (id: string, certificateData: Partial<Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  createCertificate: (certificateData: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  deleteCertificate: (id: string) => Promise<void>;
  refreshCertificates: () => Promise<void>;
}

export function useCertificates(): UseCertificatesReturn {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/certificates");

      if (!response.ok) {
        throw new Error(`Ошибка получения данных: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Не удалось получить данные");
      }

      setCertificates(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
      console.error("Ошибка при получении сертификатов:", err);
    } finally {
      setLoading(false);
    }
  };

  // Инициализация данных
  useEffect(() => {
    fetchCertificates();
  }, []);

  // Функция для обновления статуса сертификата
  const updateStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/certificates/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Ошибка обновления статуса: ${response.status}`);
      }

      // Обновляем статус в локальном состоянии
      setCertificates(prev => 
        prev.map(cert => 
          cert.id === id 
            ? { ...cert, isActive, updatedAt: new Date() } 
            : cert
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка при обновлении статуса");
      console.error("Ошибка при обновлении статуса сертификата:", err);
      throw err;
    }
  };

  // Функция для обновления сертификата
  const updateCertificate = async (id: string, certificateData: Partial<Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const response = await fetch(`/api/admin/certificates`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...certificateData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Ошибка обновления сертификата: ${response.status}`);
      }

      const result = await response.json();

      // Обновляем сертификат в локальном состоянии
      setCertificates(prev => 
        prev.map(cert => 
          cert.id === id 
            ? { ...cert, ...result.data, updatedAt: new Date() } 
            : cert
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка при обновлении сертификата");
      console.error("Ошибка при обновлении сертификата:", err);
      throw err;
    }
  };

  // Функция для создания нового сертификата
  const createCertificate = async (certificateData: Omit<Certificate, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(certificateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Ошибка создания сертификата: ${response.status}`);
      }

      const result = await response.json();

      // Добавляем новый сертификат в локальное состояние
      setCertificates(prev => [
        result.data,
        ...prev
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка при создании сертификата");
      console.error("Ошибка при создании сертификата:", err);
      throw err;
    }
  };

  // Функция для удаления сертификата
  const deleteCertificate = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/certificates/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Ошибка удаления сертификата: ${response.status}`);
      }

      // Удаляем сертификат из локального состояния
      setCertificates(prev => prev.filter(cert => cert.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка при удалении сертификата");
      console.error("Ошибка при удалении сертификата:", err);
      throw err;
    }
  };

  // Функция для обновления списка сертификатов
  const refreshCertificates = async () => {
    await fetchCertificates();
  };

  return {
    certificates,
    loading,
    error,
    updateStatus,
    updateCertificate,
    createCertificate,
    deleteCertificate,
    refreshCertificates,
  };
}