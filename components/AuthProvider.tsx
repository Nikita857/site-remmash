'use client';

import { SessionProvider, useSession, signOut } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: ('admin' | 'moderator')[];
}

export function ProtectedRoute({ children, roles = ['admin', 'moderator'] }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/rm-login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(0,91,137)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </div>
    );
  }

  const userRole = session?.user?.role;
  const hasAccess = roles.some(role => role.toUpperCase() === userRole);

  if (status === 'unauthenticated' || !hasAccess) {
    return null; // Компонент перенаправит в useEffect
  }

  return <>{children}</>;
}

// Компонент для отображения информации о пользователе
export function UserInfo() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Не аутентифицирован</div>;
  }

  return (
    <div className="text-sm">
      <p>Пользователь: {session?.user?.name}</p>
      <p>Роль: {session?.user?.role}</p>
    </div>
  );
}

// Компонент для проверки аутентификации
export function useAuth() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.role === 'ADMIN';
  const isModerator = isAuthenticated && session?.user?.role === 'MODERATOR';
  const isAdminOrModerator = isAuthenticated && (session?.user?.role === 'ADMIN' || session?.user?.role === 'MODERATOR');

  return { 
    session, 
    status, 
    isAuthenticated, 
    isAdmin,
    isModerator,
    isAdminOrModerator,
    loading: status === 'loading'
  };
}