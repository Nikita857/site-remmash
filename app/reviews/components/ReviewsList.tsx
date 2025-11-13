'use client';

import { motion } from 'motion/react';
import { Star, Calendar } from 'lucide-react';
import ReviewCard from './ReviewCard';
import Pagination from './Pagination';
import SortSelect from './SortSelect';

interface Review {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  date: string;
}

interface ReviewsListProps {
  reviews: Review[];
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
  sortOption: 'newest' | 'rating';
  setSortOption: (option: 'newest' | 'rating') => void;
}

export default function ReviewsList({ 
  reviews, 
  totalPages, 
  currentPage, 
  paginate, 
  sortOption, 
  setSortOption 
}: ReviewsListProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[rgb(0,91,137)] text-3xl sm:text-4xl font-bold mb-4">
            Что говорят о нас
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Реальные отзывы от наших клиентов и партнёров
          </p>
        </motion.div>

        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
          <div className="text-lg font-medium text-gray-700">
            Найдено отзывов: <span className="font-bold">{reviews.length}</span>
          </div>
          
          <div>
            <SortSelect 
              sortOption={sortOption} 
              setSortOption={setSortOption} 
            />
          </div>
        </div>

        <div className="grid gap-8">
          {reviews.map((review, index) => (
            <ReviewCard 
              key={review.id} 
              review={review} 
              index={index}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination 
              totalPages={totalPages} 
              currentPage={currentPage} 
              paginate={paginate} 
            />
          </div>
        )}
      </div>
    </section>
  );
}