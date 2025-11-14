'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CertificateTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateCertificate?: () => void;
}

export function CertificateTableHeader({
  searchTerm,
  onSearchChange,
  onCreateCertificate
}: CertificateTableHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">Управление сертификатами</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Поиск сертификатов..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[rgb(0,91,137)] focus:border-transparent min-w-[250px] w-full"
            />
          </div>
          {onCreateCertificate && (
            <Button
              onClick={onCreateCertificate}
              className="bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] text-white flex items-center w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить сертификат
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}