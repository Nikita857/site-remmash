'use client';

import { useState } from 'react';
import { useCertificates } from '@/hooks/useCertificates';
import { CertificatesTable } from './CertificatesTable';
import { EditCertificateModal } from './certificates/EditCertificateModal';
import { Skeleton } from '@/components/ui/Skeleton';
import { Certificate } from '@/types';

export default function CertificatesPageContent() {
  const {
    certificates,
    loading,
    error,
    updateStatus,
    updateCertificate,
    createCertificate,
    deleteCertificate,
    refreshCertificates,
  } = useCertificates();

  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEditModal = (certificate: Certificate | null) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const handleSaveCertificate = async (certificateData: Certificate) => {
    try {
      if (!certificateData.id) {
        // Создание нового сертификата
        await createCertificate({
          title: certificateData.title,
          description: certificateData.description,
          issueDate: certificateData.issueDate,
          expiryDate: certificateData.expiryDate,
          image: certificateData.image,
          isActive: certificateData.isActive,
        });
      } else {
        // Обновление существующего сертификата
        await updateCertificate(certificateData.id, {
          title: certificateData.title,
          description: certificateData.description,
          issueDate: certificateData.issueDate,
          expiryDate: certificateData.expiryDate,
          image: certificateData.image,
          isActive: certificateData.isActive,
        });
      }
      
      closeEditModal();
    } catch (err) {
      console.error('Ошибка при сохранении сертификата:', err);
      // Ошибки обрабатываются в хуке
    }
  };

  const handleCreateCertificate = () => {
    openEditModal(null); // Pass null to indicate creating a new certificate
  };

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-1/4 mb-6" />
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <Skeleton className="h-6 w-1/3" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/6" />
                </div>
                <div className="mt-4 space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-3 w-full" />
                  ))}
                </div>
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
          onClick={refreshCertificates}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Повторить попытку
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <CertificatesTable
        initialCertificates={certificates}
        onUpdateStatus={updateStatus}
        onEdit={openEditModal}
        onCreateCertificate={handleCreateCertificate}
        onDelete={deleteCertificate}
      />
      <EditCertificateModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={closeEditModal}
        onSave={handleSaveCertificate}
      />
    </div>
  );
}