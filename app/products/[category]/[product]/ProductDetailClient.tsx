"use client";

import { useState, useMemo } from "react";
import type { Questionnaire } from "@prisma/client";
import type { ProductWithCategory } from "@/types";
import { Header } from "@/components/Header";
import ProductHero from "@/app/product/components/ProductHero";
import ProductDescription from "@/app/product/components/ProductDescription";
import ProductGallery, {
  ProductImage,
} from "@/app/product/components/ProductGallery";
import ProductSpecs from "@/app/product/components/ProductSpecs";
import QuestionnaireCard from "@/app/product/components/QuestionnaireCard";
import OrderButton from "@/app/product/components/OrderButton";
import { Footer } from "@/components/Footer";
import OrderModal from "@/components/OrderModal";

interface ProductDetailClientProps {
  product: ProductWithCategory;
  questionnaire: Questionnaire | null;
}

export default function ProductDetailClient({
  product,
  questionnaire,
}: ProductDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Нормализуем изображения к нужному формату
  const normalizedImages = useMemo((): ProductImage[] => {
    if (!product.images || !Array.isArray(product.images)) return [];

    return product.images.map((image, index) => {
      if (typeof image === "string") {
        return {
          src: image,
          alt: `Изображение изделия ${index + 1}`,
        };
      }
      // Если image уже объект ProductImage, возвращаем как есть
      return image as ProductImage;
    });
  }, [product.images]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <ProductHero product={product} />
        <ProductDescription product={product} />
        <ProductGallery images={normalizedImages} />
        <ProductSpecs specifications={product.specifications! || null} />
        <QuestionnaireCard product={product} questionnaire={questionnaire} />
        <OrderButton onClick={() => setIsModalOpen(true)} />
      </main>
      <Footer />
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
