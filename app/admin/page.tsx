import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminDashboardLayout from './components/AdminDashboardLayout';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Проверяем, вошел ли пользователь и является ли он админом или модератором
  if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'MODERATOR')) {
    // Если нет доступа, перенаправляем на страницу логина
    redirect('/rm-login');
  }

  // Определяем, является ли пользователь администратором
  const isAdmin = session.user?.role === 'ADMIN';

  return <AdminDashboardLayout isAdmin={isAdmin} />;
}