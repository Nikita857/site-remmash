// Common types used throughout the application
import { 
  AdminProduct, 
  PaginationState, 
  SortConfig, 
  FilterConfig, 
  EditProductFormValues, 
  ApiResponse as AdminApiResponse, 
  PaginatedResponse as AdminPaginatedResponse 
} from './admin';

// User-related types
export interface User {
  id: string;
  name: string;
  surname: string;
  department: string;
  email: string;
  phone: string;
  password: string; // захешированный пароль
  role: 'ADMIN' | 'MODERATOR';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product-related types
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, unknown> | null; // Changed from 'any' to more specific type
  images: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: ProductCategory;
}

// Product with category expanded
export interface ProductWithCategory extends Product {
  category: ProductCategory;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Certificate types
export interface Certificate {
  id: string;
  title: string;
  description: string;
  issueDate: Date;
  expiryDate: Date;
  image: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Review types
export interface Review {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  date: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Contact types
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  workSchedule: string | null;
}

// Company info types
export interface CompanyInfo {
  id: string;
  name: string;
  legalName: string;
  industry: string;
  foundedYear: number;
  services: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Management types
export interface Management {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  responsibilities: string[];
  photo: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Form-related types
export interface Questionnaire {
  id: string;
  title: string;
  category: string;
  description: string | null;
  fields: Record<string, unknown>; // Structure of the form fields
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionnaireSubmission {
  id: string;
  questionnaireId: string;
  clientInfo: Record<string, unknown>; // Client information
  responses: Record<string, unknown>; // Form responses
  status: 'new' | 'in_progress' | 'completed';
  submittedAt: Date;
  processedAt: Date | null;
  processedBy: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Contact request types
export interface ContactRequest {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  message: string | null;
  status: 'new' | 'in_progress' | 'completed';
  assignedTo: string | null;
  notes: string | null;
  contactedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Meta tag types
export interface MetaTag {
  id: string;
  page: string;
  title: string | null;
  description: string | null;
  keywords: string | null;
  ogImage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Gallery types
export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string;
  order: number;
  isActive: boolean;
  uploadedBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Error types
export interface ServiceError {
  success: false;
  error: string;
  message: string;
  code?: string;
  details?: unknown;
}

export interface ServiceSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export type ServiceResult<T> = ServiceSuccess<T> | ServiceError;

// API validation types
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface QueryParams {
  [key: string]: string | string[] | undefined;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface DisplayProduct {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  categorySlug: string;
}

// Export admin types
export type{
  AdminProduct,
  PaginationState,
  SortConfig,
  FilterConfig,
  EditProductFormValues,
  AdminApiResponse,
  AdminPaginatedResponse
};