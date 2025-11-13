import { getProductCategories } from '@/lib/product-service';
import type { ProductCategory } from '@/types';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import ProductsHero from './components/ProductsHero';
import CategoryGrid from './components/CategoryGrid';
import { SITE_CONFIG } from '@/config';

export async function generateMetadata() {
  return {
    title: `Каталог продукции | ${SITE_CONFIG.siteName}`,
    description: SITE_CONFIG.meta.description,
    keywords: `${SITE_CONFIG.meta.keywords}, каталог продукции`,
  };
}

export default async function ProductsPage() {
  // Получаем только категории из БД (не продукты)
  const categories: ProductCategory[] = await getProductCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProductsHero category="Продукция" />
        <CategoryGrid categories={categories} />
      </main>
      <Footer />
    </div>
  );
}