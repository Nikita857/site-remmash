'use client';

import { memo } from 'react';
import { motion } from 'motion/react';
import { Certificate } from '@/types';
import { Button } from '@/components/ui/button';
import { Edit3, Eye, EyeOff, FileText } from 'lucide-react';

interface CertificateTableRowProps {
  certificate: Certificate;
  onEdit: (certificate: Certificate) => void;
  onToggleStatus: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
  onToggleRowExpansion: (id: string) => void;
  isExpanded: boolean;
}

export const CertificateTableRow = memo(({
  certificate,
  onEdit,
  onToggleStatus,
  onDelete,
  onToggleRowExpansion,
  isExpanded
}: CertificateTableRowProps) => {
  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Активен' : 'Неактивен';
  };

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {certificate.title}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
        {certificate.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(certificate.issueDate).toLocaleDateString('ru-RU')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(certificate.expiryDate).toLocaleDateString('ru-RU')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(certificate.isActive)}`}>
          {getStatusText(certificate.isActive)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleStatus(certificate.id, !certificate.isActive)}
            className="flex items-center"
          >
            {certificate.isActive ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Скрыть
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Показать
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(certificate)}
            className="flex items-center"
          >
            <Edit3 className="w-4 h-4 mr-1" />
            Редактировать
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(certificate.id)}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleRowExpansion(certificate.id)}
          >
            {isExpanded ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </Button>
        </div>
      </td>
    </motion.tr>
  );
});

CertificateTableRow.displayName = 'CertificateTableRow';