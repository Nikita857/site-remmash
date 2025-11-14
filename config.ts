import { Award, CheckCircle, Factory, Wrench } from "lucide-react";

export const SITE_CONFIG = {
  // Основная информация
  siteName: "ООО Реммаш",
  siteDescription:
    "Производство теплообменного оборудования для нефтегазовой промышленности с 2005 года",
  siteUrl: "https://remmash.ru",
  siteLogo: "/logo.png",

  // Контактная информация
  contact: {
    phone: "+7 (980) 346-23-77",
    email: "remmash@internet.ru",
    address:
      "Россия, Воронежская область, Поворинский р-он, с. Пески, ул. Пролетарская 59 ",
    workSchedule: "Пн - Пт: 8:00 - 17:00",
  },

  // Социальные сети (если понадобятся)
  social: {
    // vk: "",
    // telegram: "",
    // whatsApp: "",
  },

  // Мета данные
  meta: {
    title: "ООО Реммаш - производство теплообменного оборудования",
    description:
      "Высококачественное теплообменное оборудование, аппараты воздушного охлаждения, емкостное оборудование и оребренные трубы для нефтегазовой промышленности",
    keywords:
      "теплообменное оборудование, аппараты воздушного охлаждения, емкостное оборудование, нефтегазовая промышленность",
    author: "ООО Реммаш",
  },

  // Настройки компании
  company: {
    name: "ООО Реммаш",
    legalName: "Общество с ограниченной ответственностью Реммаш",
    industry: "производство теплообменного оборудования",
    foundedYear: 2005,
    get experience() {
      return new Date().getFullYear() - this.foundedYear;
    },
    services: [
      "Теплообменники кожухотрубные",
      "Аппараты воздушного охлаждения",
      "Емкостное оборудование",
      "Оребренные трубы",
      "Сепараторы и отстойники",
      "Нестандартное оборудование",
    ],
  },

  // Режим работы
  workHours: {
    schedule: "Пн-Пт: 8:00 - 17:00",
    timezone: "MSK (UTC+3)",
    holidays: "Согласно производственному календарю РФ",
  },

  // Продукция
  products: [
    {
      name: "Аппараты воздушного охлаждения",
      href: "/products/air-cooling-equipment",
    },
    {
      name: "Теплообменное оборудование",
      href: "/products/heat-exchange-equipment",
    },
    { name: "Емкостное оборудование", href: "/products/vessels" },
    { name: "Колонное оборудование", href: "/products/column" },
    { name: "Труба оребренная", href: "/products/finned-tube" },
  ],
  validCategories: [
    { category: "air-cooling-equipment" },
    { category: "heat-exchange-equipment" },
    { category: "vessels" },
    { category: "column" },
    { category: "finned-tube" },
  ],
  projects: 200,

  headquarters: {
    director: {
      FIO: "Комаристый Александр Михайлович",
      jobTitle: "Директор",
    },
  },

  // Настройки пагинации
  pagination: {
    defaultLimit: 10, // Количество элементов на странице по умолчанию
    maxLimit: 50, // Максимальное количество элементов на странице
    minLimit: 1, // Минимальное количество элементов на странице
  },

  // Настройки ограничения отправки форм
  rateLimit: {
    WINDOW_MS: 24 * 60 * 60 * 1000, // 24 часа (в миллисекундах)
    MAX_REQUESTS: 3, // Максимум 3 отправки в течение окна
    STORAGE_KEY: "orderFormSubmissions", // Ключ для хранения данных в localStorage
    TIME_MESSAGE: (hours: number) =>
      `Следующая отправка формы возможна через ${hours} часов`, // Шаблон сообщения
  },
  capabilities: [
    {
      icon: Factory,
      title: "Современное производство",
      description:
        "Высокотехнологичное оборудование и автоматизированные линии производства обеспечивают высокое качество продукции.",
      color: "from-blue-500 to-[rgb(0,91,137)]",
    },
    {
      icon: Wrench,
      title: "Полный цикл изготовления",
      description:
        "От проектирования до монтажа и пусконаладки — все этапы производства под контролем наших специалистов.",
      color: "from-[rgb(0,91,137)] to-cyan-600",
    },
    {
      icon: CheckCircle,
      title: "Контроль качества",
      description:
        "Многоступенчатая система контроля качества на каждом этапе производства гарантирует соответствие всем стандартам.",
      color: "from-cyan-600 to-blue-500",
    },
    {
      icon: Award,
      title: "Сертификация",
      description:
        "Вся продукция имеет необходимые сертификаты и разрешения для применения в нефтегазовой промышленности.",
      color: "from-blue-500 to-indigo-600",
    },
  ],
};
