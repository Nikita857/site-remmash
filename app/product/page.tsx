import { redirect } from 'next/navigation';

// Редиректим старый маршрут /product на новую структуру /products
export default function ProductPage() {
  redirect('/products');
}
