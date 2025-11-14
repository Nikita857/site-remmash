'use client';

import { memo } from 'react';
import { motion } from 'motion/react';
import { ContactRequest } from '@/types';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, Mail, Check, AlertTriangle, X } from 'lucide-react';

interface ContactRequestTableRowProps {
  request: ContactRequest;
  onStatusChange: (id: string, status: 'new' | 'in_progress' | 'completed') => void;
  onDelete: (id: string) => void;
  onToggleRowExpansion: (id: string) => void;
  isExpanded: boolean;
}

export const ContactRequestTableRow = memo(({
  request,
  onStatusChange,
  onDelete,
  onToggleRowExpansion,
  isExpanded
}: ContactRequestTableRowProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'Новая';
      case 'in_progress':
        return 'В процессе';
      case 'completed':
        return 'Завершена';
      default:
        return status;
    }
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
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {request.fullName}
            </div>
            <div className="text-sm text-gray-500">{request.phone}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {request.email || '—'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
        {request.message || '—'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
          {getStatusText(request.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(request.createdAt).toLocaleDateString('ru-RU')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(request.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusChange(request.id, request.status === 'new' ? 'in_progress' : 
              request.status === 'in_progress' ? 'completed' : 'new')}
            className="flex items-center"
          >
            {request.status === 'new' ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Взять в работу
              </>
            ) : request.status === 'in_progress' ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Завершить
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 mr-1" />
                Назначить
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(request.id)}
            disabled={request.status === 'new'}
            className={`flex items-center ${request.status === 'new' ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-800'}`}
            title={request.status === 'new' ? 'Нельзя удалить новую заявку' : undefined}
          >
            <X className="w-4 h-4 mr-1" />
            Удалить
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleRowExpansion(request.id)}
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

ContactRequestTableRow.displayName = 'ContactRequestTableRow';