'use client';

import { motion } from 'motion/react';
import { User as UserType } from '@/types';

interface UserExpandedRowProps {
  user: UserType;
  isExpanded: boolean;
}

export function UserExpandedRow({ user, isExpanded }: UserExpandedRowProps) {
  if (!isExpanded) return null;

  return (
    <motion.tr
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <td colSpan={6} className="px-6 py-4 bg-gray-50">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-lg">Контактная информация</h4>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                <dt className="text-sm font-medium text-gray-500">Телефон</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{user.phone}</dd>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{user.email}</dd>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                <dt className="text-sm font-medium text-gray-500">Отдел</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">{user.department}</dd>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                <dt className="text-sm font-medium text-gray-500">Дата создания</dt>
                <dd className="mt-1 text-sm text-gray-900 font-medium">
                  {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </td>
    </motion.tr>
  );
}