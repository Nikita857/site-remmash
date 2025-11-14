import { Header } from "@/components/Header";
import ProductsHero from "../components/ProductsHero";
import ProductsGridWrapper from "./ProductsGridWrapper";
import { Footer } from "@/components/Footer";
import { SITE_CONFIG } from "@/config";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/product-service";
import { ProductCategory } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function CategoryPage(props: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { category: categorySlug } = params;
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));
  const limit = Math.min(
    SITE_CONFIG.pagination.maxLimit,
    Math.max(
      SITE_CONFIG.pagination.minLimit,
      parseInt(
        searchParams.limit || SITE_CONFIG.pagination.defaultLimit.toString(),
        10
      )
    )
  );

  const category: ProductCategory | null = await getCategoryBySlug(
    categorySlug
  );
  if (!category || !category.isActive) {
    notFound();
  }

  const result = await getProductsByCategory(category.id, page, limit);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ProductsHero category={category.name} />
      <ProductsGridWrapper
        key={category.id}
        category={category}
        initialData={result}
      />
      <Footer />
    </div>
  );
}
