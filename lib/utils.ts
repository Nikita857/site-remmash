/**
 * Utility functions for the application
 */

/**
 * Format currency in Russian Rubles
 */
export function formatCurrency(
  amount: number,
  currency: string = "RUB"
): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date in Russian format
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Проверка валидности даты
  if (isNaN(dateObj.getTime())) {
    return "Invalid Date";
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return dateObj.toLocaleDateString("ru-RU", { ...defaultOptions, ...options });
}

/**
 * Debounce function to limit function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  // Russian phone number format: +7XXXXXXXXXX or 8XXXXXXXXXX
  const cleanedPhone = phone.replace(/[\s\-\(\)]/g, "");
  const phoneRegex = /^(\+7|8)\d{10}$/;
  return phoneRegex.test(cleanedPhone);
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";

  // Remove potentially dangerous characters
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Truncate text to specified length
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Generate slug from string
 */
export function generateSlug(text: string): string {
  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Get initials from full name
 */
export function getInitials(name: string): string {
  if (!name) return "";

  const names = name.trim().split(/\s+/);
  if (names.length === 0) return "";

  const firstInitial = names[0]?.charAt(0).toUpperCase() ?? "";
  const lastInitial =
    names.length > 1
      ? names[names.length - 1]?.charAt(0).toUpperCase() ?? ""
      : "";

  return firstInitial + lastInitial;
}

/**
 * Wait for specified time (useful in async functions)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value.trim() === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (
    typeof value === "object" &&
    value !== null &&
    Object.keys(value).length === 0
  )
    return true;
  return false;
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as T;
  if (typeof obj === "object") {
    const cloned: Record<string, unknown> = {};
    Object.keys(obj).forEach((key) => {
      cloned[key] = deepClone((obj as Record<string, unknown>)[key]);
    });
    return cloned as T;
  }
  return obj;
}

/**
 * Group array items by key
 */
export function groupBy<T>(
  array: T[],
  key: keyof T | ((item: T) => string)
): Record<string, T[]> {
  const result: Record<string, T[]> = {};

  for (const item of array) {
    const groupKey =
      typeof key === "function" ? key(item) : String(item[key] ?? "");

    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
  }

  return result;
}

/**
 * Capitalize first letter of string
 */
export function capitalizeFirst(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
  if (!str) return "";

  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "")
    .replace(/[^\w]/g, "");
}

/**
 * Generate random ID
 */
export function generateId(length: number = 8): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * Parse query string to object
 */
export function parseQueryString(query: string): Record<string, string> {
  if (!query) return {};

  return query
    .replace(/^\?/, "")
    .split("&")
    .reduce((acc: Record<string, string>, pair) => {
      const [key, value] = pair.split("=");
      if (key) {
        acc[decodeURIComponent(key)] = decodeURIComponent(value || "");
      }
      return acc;
    }, {});
}

/**
 * Convert object to query string
 */
export function toQueryString(
  params: Record<string, string | number | boolean>
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  const result = searchParams.toString();
  return result ? `?${result}` : "";
}
