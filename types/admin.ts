import { ProductWithCategory } from '@/types';

// Типы для админ-панели

export interface AdminProduct extends ProductWithCategory {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, unknown> | null;
  images: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    order: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

// Типы для пагинации
export interface PaginationState {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Типы для сортировки
export interface SortConfig {
  key: keyof AdminProduct | 'category';
  direction: 'ascending' | 'descending';
}

// Типы для фильтрации
export interface FilterConfig {
  searchTerm: string;
  categoryFilter?: string;
  statusFilter?: 'all' | 'active' | 'inactive';
}

// Типы для модального окна
export interface EditProductFormValues {
  id?: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  specifications: string; // JSON строка
  images: string[];
  isActive: boolean;
  order: number;
  categoryId: string;
}

// Типы для ответа API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}