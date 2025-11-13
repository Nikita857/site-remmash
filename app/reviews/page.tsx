"use client";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import ReviewsHero from "./components/ReviewsHero";
import ReviewsList from "./components/ReviewsList";
import { useState } from "react";

// Тип данных для отзыва
interface Review {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  date: string; // формат YYYY-MM-DD
}

export default function ReviewsPage() {
  // Пример данных отзывов
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      name: "Иван Иванович Петров",
      position: "Генеральный директор",
      company: "ООО РосНефть",
      content:
        "Очень довольны сотрудничеством с ООО Реммаш. Оборудование высокого качества, доставили в срок, монтаж прошёл без проблем. Рекомендуем как надёжного партнёра. Очень довольны сотрудничеством с ООО Реммаш. Оборудование высокого качества, доставили в срок, монтаж прошёл без проблем. Рекомендуем как надёжного партнёра. Очень довольны сотрудничеством с ООО Реммаш. Оборудование высокого качества, доставили в срок, монтаж прошёл без проблем. Рекомендуем как надёжного партнёра.",
      rating: 5,
      date: "2024-11-01",
    },
    {
      id: 2,
      name: "Мария Сергеевна Сидорова",
      position: "Технический директор",
      company: "АО ГазПром",
      content:
        "Отличные теплообменники, точное соответствие техническим характеристикам. Быстрое реагирование на запросы, качественный сервис. Планируем дальнейшее сотрудничество.",
      rating: 5,
      date: "2024-10-25",
    },
    {
      id: 3,
      name: "Александр Николаевич Козлов",
      position: "Главный инженер",
      company: "ООО ТрансНефть",
      content:
        "Оборудование работает уже более 3 лет без нареканий. Прочный корпус, высокая эффективность теплообмена. Цена соответствует качеству. Будем обращаться снова.",
      rating: 4,
      date: "2024-10-15",
    },
    {
      id: 4,
      name: "Елена Владимировна Морозова",
      position: "Заместитель генерального директора",
      company: "ООО Лукойл-Энерго",
      content:
        "Хорошая компания-партнёр. Профессиональный подход к проекту, учли все наши пожелания. Оборудование соответствует заявленным характеристикам. Спасибо за качественную работу.",
      rating: 5,
      date: "2024-09-20",
    },
    {
      id: 5,
      name: "Дмитрий Анатольевич Волков",
      position: "Начальник производственного участка",
      company: "ООО СургутНефтегаз",
      content:
        "Оборудование работает стабильно, обслуживание простое. Некоторые технические моменты решались быстро. Рекомендуем к сотрудничеству.",
      rating: 4,
      date: "2024-09-05",
    },
    {
      id: 6,
      name: "Татьяна Олеговна Новикова",
      position: "Директор по закупкам",
      company: "ООО РосАтом",
      content:
        "Очень довольны результатом. Оборудование соответствует международным стандартам, доставка и установка прошли без задержек. Рекомендуем как надёжного поставщика.",
      rating: 5,
      date: "2024-08-18",
    },
    {
      id: 7,
      name: "Андрей Павлович Смирнов",
      position: "Технический консультант",
      company: "ООО Новатэк",
      content:
        "Хорошее соотношение цена-качество. Оборудование соответствует описанию. Работаем с 2022 года, нареканий нет. Будем сотрудничать дальше.",
      rating: 4,
      date: "2024-08-01",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<"newest" | "rating">("newest");
  const reviewsPerPage = 5;

  // Сортировка отзывов
  const sortedReviews = [...reviews];
  if (sortOption === "newest") {
    sortedReviews.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (sortOption === "rating") {
    sortedReviews.sort((a, b) => b.rating - a.rating);
  }

  // Вычисляем индексы отзывов для текущей страницы
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Функция для переключения страниц
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <ReviewsHero />
        <ReviewsList
          reviews={currentReviews}
          totalPages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </main>
      <Footer />
    </div>
  );
}
