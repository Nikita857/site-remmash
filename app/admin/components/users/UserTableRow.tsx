'use client';

import { memo } from 'react';
import { motion } from 'motion/react';
import { User as UserType } from '@/types';
import { Button } from '@/components/ui/button';
import { User as UserIcon, Edit, Trash2 } from 'lucide-react';

interface UserTableRowProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (userId: string) => void;
  onToggleStatus: (userId: string) => void;
  onToggleRowExpansion: (userId: string) => void;
  isExpanded: boolean;
}

export const UserTableRow = memo(({ 
  user, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onToggleRowExpansion,
  isExpanded
}: UserTableRowProps) => {
  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Активен' : 'Неактивен';
  };

  const getRoleColor = (role: string) => {
    return role === 'ADMIN' 
      ? 'bg-purple-100 text-purple-800 border-purple-200'
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getRoleText = (role: string) => {
    return role === 'ADMIN' ? 'Администратор' : 'Модератор';
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
          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-gray-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.name} {user.surname}
            </div>
            <div className="text-sm text-gray-500">{user.phone}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{user.department}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
          {getRoleText(user.role)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(user.isActive)}`}>
          {getStatusText(user.isActive)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleStatus(user.id)}
            className="flex items-center"
          >
            {user.isActive ? (
              <>
                <UserIcon className="w-4 h-4 mr-1" />
                Деактивировать
              </>
            ) : (
              <>
                <UserIcon className="w-4 h-4 mr-1" />
                Активировать
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(user)}
            className="flex items-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            Редактировать
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(user.id)}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Удалить
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleRowExpansion(user.id)}
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

UserTableRow.displayName = 'UserTableRow';