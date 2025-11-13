'use client';

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { useUsers } from '@/hooks/useUsers';
import { UsersTable } from '../components/UsersTable';
import { EditUserModal } from '../components/users';
import { Skeleton } from '@/components/ui/Skeleton';
import { User as UserType } from '@/types';

export default function UsersPageContent() {
  const {
    users,
    loading,
    error,
    refreshUsers
  } = useUsers();
  
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEditModal = (user: UserType | null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (updatedUser: UserType) => {
    try {
      let response;
      let method;
      
      if (updatedUser.id) {
        // Редактирование существующего пользователя
        method = 'PUT';
        response = await fetch(`/api/admin/users/${updatedUser.id}`, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser)
        });
      } else {
        // Создание нового пользователя
        method = 'POST';
        response = await fetch('/api/admin/users', {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser)
        });
      }

      if (!response.ok) {
        throw new Error(`Ошибка ${method === 'POST' ? 'создания' : 'обновления'} пользователя: ${response.status}`);
      }

      const result = await response.json();
      const savedUser = result.data;

      closeEditModal();
      refreshUsers(); // Обновляем список пользователей
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
    }
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      // API вызов для обновления статуса в базе данных
      const response = await fetch(`/api/admin/users/${userId}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !user.isActive
        })
      });

      if (!response.ok) {
        throw new Error(`Ошибка обновления статуса: ${response.status}`);
      }

      refreshUsers(); // Обновляем список пользователей
    } catch (error) {
      console.error('Ошибка при переключении статуса пользователя:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      return;
    }

    try {
      // API вызов для удаления пользователя
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Ошибка удаления пользователя: ${response.status}`);
      }

      refreshUsers(); // Обновляем список пользователей
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-1/4 mb-6" />
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-20 rounded" />
                <Skeleton className="h-8 w-20 rounded" />
                <Skeleton className="h-8 w-20 rounded" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Ошибка:</strong> {error}
        </div>
        <button
          onClick={refreshUsers}
          className="px-4 py-2 bg-[rgb(0,91,137)] text-white rounded hover:bg-[rgb(0,71,117)] transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <>
      <UsersTable 
        initialUsers={users} 
        onEditUser={openEditModal}
        onCreateUser={() => openEditModal(null)}
        onToggleStatus={toggleUserStatus}
        onDelete={deleteUser}
      />
      <AnimatePresence>
        {isModalOpen && (
          <EditUserModal
            user={selectedUser}
            isOpen={isModalOpen}
            onClose={closeEditModal}
            onSave={handleSaveUser}
          />
        )}
      </AnimatePresence>
    </>
  );
}