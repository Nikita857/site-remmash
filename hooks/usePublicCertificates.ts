"use client";

import { useState, useEffect } from "react";
import { Certificate } from "@/types";

interface UsePublicCertificatesReturn {
  certificates: Certificate[];
  loading: boolean;
  error: string | null;
  refreshCertificates: () => Promise<void>;
}

export function usePublicCertificates(): UsePublicCertificatesReturn {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/certificates");

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

  // Функция для обновления списка сертификатов
  const refreshCertificates = async () => {
    await fetchCertificates();
  };

  return {
    certificates,
    loading,
    error,
    refreshCertificates,
  };
}