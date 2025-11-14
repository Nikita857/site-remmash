'use client';

import { useContactRequests } from '@/hooks/useContactRequests';
import { ContactRequestsTable } from '../components/ContactRequestsTable';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ContactRequestsPageContent() {
  const {
    requests,
    loading,
    error,
    updateStatus,
    deleteRequest,
    refreshRequests
  } = useContactRequests();

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
          onClick={refreshRequests}
          className="px-4 py-2 bg-[rgb(0,91,137)] text-white rounded hover:bg-[rgb(0,71,117)] transition-colors"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <ContactRequestsTable
      initialRequests={requests}
      onUpdateStatus={updateStatus}
      onDelete={deleteRequest}
    />
  );
}