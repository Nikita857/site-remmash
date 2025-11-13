'use client';

import { motion } from 'motion/react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { useState } from 'react';
import CertificateModal from './CertificateModal';

interface Certificate {
  id: number;
  title: string;
  description: string;
  issueDate: string;
  expiryDate: string;
  image: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

export default function CertificateCard({ certificate, index }: CertificateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Форматирование дат
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        onClick={openModal}
        whileTap={{ scale: 0.98 }}
      >
        <div className="p-1 bg-gradient-to-r from-[rgb(0,91,137)] to-blue-600">
          <div className="bg-white p-4">
            <ImageWithFallback
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{certificate.title}</h3>
          <p className="text-gray-600 mb-4">{certificate.description}</p>
          
          <div className="flex justify-between text-sm text-gray-500">
            <div>
              <span className="font-medium">Выдан:</span> {formatDate(certificate.issueDate)}
            </div>
            <div>
              <span className="font-medium">Действует до:</span> {formatDate(certificate.expiryDate)}
            </div>
          </div>
        </div>
      </motion.div>
      
      <CertificateModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        certificate={certificate} 
      />
    </>
  );
}