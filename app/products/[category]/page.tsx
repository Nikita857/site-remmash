import { notFound } from 'next/navigation';
import { getProductsByCategory, getCategoryBySlug } from '@/lib/product-service';
import type { ProductWithCategory, ProductCategory } from '@/types';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import ProductsHero from '../components/ProductsHero';
import ProductsGridWrapper from './ProductsGridWrapper';
import { SITE_CONFIG } from '@/config';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  const resolvedParams = await params;
  const { category: categorySlug } = resolvedParams;
  
  const category: ProductCategory | null = await getCategoryBySlug(categorySlug);
  
  if (!category) {
    return {
      title: 'Категория не найдена',
      description: 'Запрашиваемая категория продуктов не найдена',
    };
  }

  return {
    title: `${category.name} | ${SITE_CONFIG.siteName}`,
    description: category.description || SITE_CONFIG.meta.description,
    keywords: `${category.name}, ${SITE_CONFIG.meta.keywords}`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { category: categorySlug } = params;
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const limit = Math.min(SITE_CONFIG.pagination.maxLimit, Math.max(SITE_CONFIG.pagination.minLimit, parseInt(searchParams.limit || SITE_CONFIG.pagination.defaultLimit.toString(), 10))); // количество продуктов на странице

  // Получаем категорию и продукты из БД
  const category: ProductCategory | null = await getCategoryBySlug(categorySlug);
  if (!category || !category.isActive) {
    notFound(); // Показываем 404 страницу, если категория не найдена
  }

  const result = await getProductsByCategory(category.id, page, limit);

  // Подготавливаем данные для компонентов
  const products = result.products.map(product => ({
    id: product.id,
    title: product.name,
    description: product.shortDescription,
    image: product.images[0] || '/placeholder-product.jpg', // используем первое изображение или заглушку
    category: product.category.name,
    categorySlug: product.category.slug,
    price: product.price ? `от ${product.price} ₽` : undefined,
    slug: product.slug,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ProductsHero category={category.name} />
      <ProductsGridWrapper
        key={category.id} // Обеспечиваем пересоздание компонента при смене категории
        category={category}
        initialData={result}
      />
      <Footer />
    </div>
  );
}