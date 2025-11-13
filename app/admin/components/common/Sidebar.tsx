'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface SidebarProps {
  activeView: 'dashboard' | 'products' | 'users' | 'certificates' | 'orders';
  setActiveView: (view: 'dashboard' | 'products' | 'users' | 'certificates' | 'orders') => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  isAdmin: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Главная', icon: LayoutDashboard },
  { id: 'products', label: 'Продукция', icon: Package },
  { id: 'certificates', label: 'Сертификаты', icon: FileText },
  { id: 'orders', label: 'Заявки', icon: FileText },
];

const adminMenuItems = [
  { id: 'users', label: 'Пользователи', icon: Users },
];

export function Sidebar({ activeView, setActiveView, isOpen, toggleSidebar, isAdmin }: SidebarProps) {
  const handleLogout = useCallback(async () => {
    await signOut({ 
      callbackUrl: '/rm-login',
      redirect: true 
    });
  }, []);

  const handleMenuItemClick = useCallback((viewId: 'dashboard' | 'products' | 'users' | 'certificates' | 'orders') => {
    // Проверяем, является ли пользователь администратором при попытке доступа к вкладке "Пользователи"
    if (viewId === 'users' && !isAdmin) {
      return; // Не изменяем активный вид, если пользователь не администратор
    }
    
    setActiveView(viewId);
    if (window.innerWidth < 768) {
      toggleSidebar(); // Закрываем сайдбар на мобильных устройствах после выбора
    }
  }, [setActiveView, toggleSidebar, isAdmin]);

  return (
    <>
      {/* Кнопка для мобильной версии */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-[rgb(0,91,137)] text-white hover:bg-[rgb(0,71,117)] transition-colors"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Сайдбар */}
      <motion.aside
        className={`fixed top-0 left-0 h-full bg-[rgb(0,91,137)] text-white z-40 shadow-lg ${
          isOpen ? 'w-60' : 'w-16'
        } transition-all duration-300 ease-in-out md:flex flex-col hidden`}
        initial={false}
        animate={{ width: isOpen ? 240 : 64 }}
        aria-label="Боковое меню администратора"
      >
        <div className="p-4 border-b border-[rgb(0,71,117)]">
          <h2 className={`text-xl font-bold ${!isOpen && 'hidden'}`}>
            Админ-панель
          </h2>
        </div>

        <nav className="flex-1 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <motion.li 
                  key={item.id} 
                  whileHover={{ x: 5 }}
                  className="transition-colors"
                >
                  <button
                    onClick={() => handleMenuItemClick(item.id as any)}
                    className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                      isActive
                        ? 'bg-[rgb(0,71,117)] text-white'
                        : 'hover:bg-[rgb(0,71,117)] text-gray-200'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    {isOpen && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </button>
                </motion.li>
              );
            })}
            {isAdmin && (
              <>
                {adminMenuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;

                  return (
                    <motion.li
                      key={item.id}
                      whileHover={{ x: 5 }}
                      className="transition-colors"
                    >
                      <button
                        onClick={() => handleMenuItemClick(item.id as any)}
                        className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                          isActive
                            ? 'bg-[rgb(0,71,117)] text-white'
                            : 'hover:bg-[rgb(0,71,117)] text-gray-200'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon className="w-5 h-5" />
                        {isOpen && (
                          <span className="ml-3">{item.label}</span>
                        )}
                      </button>
                    </motion.li>
                  );
                })}
              </>
            )}
          </ul>

          <div className="mt-8 pt-6 border-t border-[rgb(0,71,117)]">
            <motion.li whileHover={{ x: 5 }} className="transition-colors">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-left text-gray-200 hover:bg-[rgb(0,71,117)] transition-colors"
              >
                <LogOut className="w-5 h-5" />
                {isOpen && (
                  <span className="ml-3">Выйти</span>
                )}
              </button>
            </motion.li>
          </div>
        </nav>
      </motion.aside>

      {/* Overlay для мобильной версии */}
      {isOpen && (
        <motion.div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
        />
      )}
    </>
  );
}