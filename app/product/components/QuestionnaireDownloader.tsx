'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Questionnaire {
  id: string;
  category: string;
  fileUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface QuestionnaireDownloaderProps {
  categorySlug: string;
}

export default function QuestionnaireDownloader({ categorySlug }: QuestionnaireDownloaderProps) {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/questionnaires/${categorySlug}`);

        if (!response.ok) {
          throw new Error('Не удалось загрузить опросные листы');
        }

        const result = await response.json();

        if (result.success) {
          setQuestionnaires(result.data);
        } else {
          throw new Error(result.error || 'Неизвестная ошибка');
        }
      } catch (err) {
        console.error('Ошибка при загрузке опросных листов:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchQuestionnaires();
    }
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="animate-pulse p-6 bg-gray-50 rounded-lg">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">Ошибка: {error}</p>
      </div>
    );
  }

  if (!questionnaires || questionnaires.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-700">Нет доступных опросных листов для этой категории.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-[rgb(0,91,137)]" />
        Опросные листы
      </h3>

      <div className="space-y-3">
        {questionnaires.map((questionnaire) => (
          <div key={questionnaire.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700 truncate">
              {questionnaire.fileUrl.split('/').pop()}
            </span>
            <a
              href={questionnaire.fileUrl}
              download
              className="ml-4"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <Download className="w-4 h-4 mr-1" />
                Скачать
              </Button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}