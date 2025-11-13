# Настройка аутентфикации

В этом руководстве описано, как настроить систему аутентфикации с использованием NextAuth.js и JWT для административной панели.

## Установка зависимостей

Для работы аутентфикации необходимо установить следующие зависимости:

```bash
npm install next-auth@4.24.13 bcryptjs
npm install --save-dev @types/bcryptjs
```

## Конфигурация

### 1. Переменные окружения

Добавьте следующие переменные в файл `.env.local`:

```env
# Секрет NextAuth.js - используйте надежный пароль
NEXTAUTH_SECRET=your-super-secret-jwt-token-with-at-least-32-characters-here

# Учетные данные администратора
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-admin-password-here
```

> Важно: Не используйте стандартные учетные данные в продакшене!

### 2. Генерация хеша пароля

Для безопасного хранения паролей используйте хеширование bcrypt. Сгенерируйте хеш для своего пароля:

```bash
npm run hash-password your-password-here
```

Затем обновите хеш в файле `lib/auth.ts`:

```ts
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  hashedPassword: 'your-generated-hash-here'
};
```

## Защита маршрутов

### 1. Middleware

Файл `middleware.ts` защищает маршруты, начинающиеся с `/admin`:

```ts
export const config = {
  matcher: ['/admin/:path*'],
};
```

### 2. Компоненты защиты

Используйте компонент `ProtectedRoute` для защиты отдельных страниц:

```tsx
import { ProtectedRoute } from '@/components/AuthProvider';

export default function AdminPage() {
  return (
    <ProtectedRoute role="admin">
      {/* Контент админ-панели */}
    </ProtectedRoute>
  );
}
```

## Управление сессией

### Проверка аутентификации

Используйте хук `useAuth`:

```tsx
import { useAuth } from '@/components/AuthProvider';

function MyComponent() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) return <div>Загрузка...</div>;
  if (!isAuthenticated) return <div>Доступ запрещен</div>;
  
  return <div>Доступ разрешен</div>;
}
```

## Маршруты аутентфикации

- `/rm-login` - страница входа
- `/admin` - административная панель (требует авторизации)
- `/api/auth/[...nextauth]` - API endpoint для NextAuth.js

## Расширение функционала

### Добавление ролей пользователей

Для добавления новых ролей обновите типы в `lib/auth-utils.ts`:

```ts
export type UserRole = 'admin' | 'moderator' | 'user';
```

И измените логику в `lib/auth.ts` в соответствии с вашими требованиями.

## Безопасность

1. Используйте надежные пароли (минимум 12 символов)
2. Не храните пароли в открытом виде
3. Используйте HTTPS в продакшене
4. Регулярно обновляйте зависимости
5. Не используйте стандартные учетные данные в продакшене

## Устранение неполадок

### Проблемы с аутентфикацией

Если аутентфикация не работает:
1. Проверьте, что `NEXTAUTH_SECRET` указан в `.env.local`
2. Убедитесь, что хеш пароля обновлен
3. Проверьте, что `AuthProvider` обертывает все приложение в `app/layout.tsx`

### Проблемы с редиректами

Если происходит неправильный редирект с `/admin` на `/rm-login`:
1. Проверьте, что пользователь авторизован с ролью 'admin'
2. Убедитесь, что учетные данные введены правильно