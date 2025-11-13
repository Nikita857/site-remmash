'use client';

import { useState } from 'react';
import type { Questionnaire } from '@prisma/client';
import type { ProductWithCategory } from '@/types';
import { Header } from '@/components/Header';
import ProductHero from '@/app/product/components/ProductHero';
import ProductDescription from '@/app/product/components/ProductDescription';
import ProductGallery from '@/app/product/components/ProductGallery';
import ProductSpecs from '@/app/product/components/ProductSpecs';
import QuestionnaireCard from '@/app/product/components/QuestionnaireCard';
import OrderButton from '@/app/product/components/OrderButton';
import { Footer } from '@/components/Footer';
import OrderModal from '@/components/OrderModal';
import QuestionnaireDownloader from '@/app/product/components/QuestionnaireDownloader';

interface ProductDetailClientProps {
  product: ProductWithCategory;
  questionnaire: Questionnaire | null;
}

export default function ProductDetailClient({ product, questionnaire }: ProductDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <ProductHero product={product} />
        <ProductDescription product={product} />
        <ProductGallery images={product.images || []} />
        <ProductSpecs specifications={product.specifications! || null} />
        <QuestionnaireCard product={product} questionnaire={questionnaire} />
        <OrderButton onClick={() => setIsModalOpen(true)} />
      </main>
      <Footer />
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}