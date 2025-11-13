"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images?: ProductImage[];
}

export default function ProductGallery({ images: propImages }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Используем переданные изображения или пример по умолчанию
  const images: ProductImage[] = Array.isArray(propImages) && propImages.length > 0 ? propImages : [
    {
      src: "https://images.unsplash.com/photo-1646753502969/6c7e0c0f2e3d/photo.jpg?w=800&h=600&fit=crop",
      alt: "Кожухотрубный теплообменник - вид 1",
    },
    {
      src: "https://images.unsplash.com/photo-1646753502969/6c7e0c0f2e3e/photo.jpg?w=800&h=600&fit=crop",
      alt: "Кожухотрубный теплообменник - вид 2",
    },
    {
      src: "https://images.unsplash.com/photo-1646753502969/6c7e0c0f2e3f/photo.jpg?w=800&h=600&fit=crop",
      alt: "Кожухотрубный теплообменник - вид 3",
    },
    {
      src: "https://images.unsplash.com/photo-1646753502969/6c7e0c0f2e40/photo.jpg?w=800&h=600&fit=crop",
      alt: "Кожухотрубный теплообменник - вид 4",
    },
    {
      src: "https://images.unsplash.com/photo-1646753502969/6c7e0c0f2e41/photo.jpg?w=800&h=600&fit=crop",
      alt: "Кожухотрубный теплообменник - вид 5",
    },
  ];

  // Автоматическое переключение слайдов
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false); // Остановить автопрокрутку при ручном переключении
    // Возобновить автопрокрутку через 10 секунд после последнего ручного переключения
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

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
            Галерея продукта
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Посмотрите наши продукты с разных ракурсов и узнайте больше о их
            конструкции и особенностях
          </p>
        </motion.div>

        <div className="relative">
          {/* Основной слайдер */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 ${
                  index === currentIndex ? "block" : "hidden"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Навигационные кнопки */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Следующее изображение"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Индикаторы слайдов */}
          <div className="flex justify-center mt-8 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-[rgb(0,91,137)]" : "bg-gray-300"
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
