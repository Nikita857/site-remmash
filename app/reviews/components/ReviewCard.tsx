"use client";

import { motion } from "motion/react";
import { Star, Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";

interface Review {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  date: string;
}

interface ReviewCardProps {
  review: Review;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Определяем, является ли отзыв длинным
  const isLongReview = review.content.length > 200;

  // Обрезаем длинные отзывы
  const truncatedContent =
    review.content.length > 200
      ? review.content.substring(0, 200) + "..."
      : review.content;

  // Генерация звездочек на основе рейтинга
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  const toggleExpanded = () => {
    if (isLongReview) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -5,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div className="md:w-1/4 flex flex-col items-center md:items-start mb-6 md:mb-0 md:pr-8">
        {/* Заглушка аватара */}
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-[rgb(0,91,137)] to-blue-600 flex items-center justify-center mb-4">
          <span className="text-white text-2xl font-bold">
            {review.name.charAt(0)}
            {review.name.split(" ")[1]?.charAt(0) || ""}
          </span>
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-800">{review.name}</h3>
          <p className="text-[rgb(0,91,137)] font-medium">{review.position}</p>
          <p className="text-gray-600 text-sm">{review.company}</p>
        </div>
      </div>

      <div className="md:w-3/4 flex-1">
        <div className="flex items-center mb-4">
          <div className="flex mr-4">{renderStars(review.rating)}</div>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(review.date)}</span>
          </div>
        </div>

        <div className="relative">
          <p className="text-gray-700 text-lg leading-relaxed">
            "{isExpanded ? review.content : truncatedContent}"
          </p>

          {isLongReview && (
            <button
              onClick={toggleExpanded}
              className="mt-3 flex items-center text-[rgb(0,91,137)] hover:text-[rgb(0,71,117)] font-medium"
            >
              {isExpanded ? "Свернуть" : "Развернуть"}
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-1"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
