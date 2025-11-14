import { hashPassword } from "@/lib/password-utils";

// Скрипт для генерации хеша пароля
async function generatePasswordHash() {
  const plainPassword = process.argv[2] || "admin123"; // Пароль передается как аргумент или по умолчанию 'admin123'

  try {
    const hashedPassword = await hashPassword(plainPassword);
    console.log("Хеш пароля:", hashedPassword);
    console.log("Пароль:", plainPassword);
  } catch (error) {
    console.error("Ошибка при хешировании пароля:", error);
  }
}

// Запускаем функцию, если файл запускается напрямую
if (require.main === module) {
  generatePasswordHash();
}

export { generatePasswordHash };
