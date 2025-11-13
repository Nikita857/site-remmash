import { notFound } from 'next/navigation';
import { getProductBySlug, getQuestionnaireByCategorySlug } from '@/lib/product-service';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetailPageServer({ 
  params 
}: { 
  params: { category: string; product: string } 
}) {
  const { product: productSlug } = await params;
  
  // Получаем продукт из базы данных по slug
  const product = await getProductBySlug(productSlug);
  
  if (!product) {
    notFound(); // Показываем 404 страницу, если продукт не найден
  }

  // Получаем опросный лист для категории продукта
  const questionnaire = await getQuestionnaireByCategorySlug(product.category.slug);

  return <ProductDetailClient product={product} questionnaire={questionnaire} />;
}