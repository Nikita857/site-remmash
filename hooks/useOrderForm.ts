"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { z } from "zod";
import { ServiceResult } from "@/types";
import { SITE_CONFIG } from "@/config";

// Конфигурация валидации
const VALIDATION_CONFIG = {
  FULL_NAME: {
    MIN: 2,
    MAX: 100,
    PATTERN: /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/u, // Добавлен u-флаг для Unicode и апостроф
  },
  PHONE: {
    MIN: 10,
    MAX: 20,
    PATTERN: /^[\d\s\-\+\(\)]+$/,
    CLEAN_PATTERN: /[^\d+]/g, // Для очистки номера
  },
  EMAIL: {
    MAX: 100,
  },
  COMMENT: {
    MAX: 500,
  },
} as const;

interface RateLimitRecord {
  timestamp: number;
  count: number;
}

// Улучшенная Zod схема
const orderFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "ФИО является обязательным полем")
    .min(VALIDATION_CONFIG.FULL_NAME.MIN, {
      message: `ФИО должно содержать не менее ${VALIDATION_CONFIG.FULL_NAME.MIN} символов`,
    })
    .max(VALIDATION_CONFIG.FULL_NAME.MAX, {
      message: `ФИО не должно превышать ${VALIDATION_CONFIG.FULL_NAME.MAX} символов`,
    })
    .regex(VALIDATION_CONFIG.FULL_NAME.PATTERN, {
      message: "ФИО может содержать только буквы, пробелы, дефисы и апострофы",
    })
    .transform((name) => name.trim().replace(/\s+/g, " "))
    .refine(
      (name) => {
        const words = name.split(" ").filter((word) => word.length > 0);
        return words.length >= 2 && words.every((word) => word.length >= 2);
      },
      {
        message: "Введите имя и фамилию (каждое не менее 2 символов)",
      }
    ),

  phone: z
    .string()
    .min(1, "Телефон является обязательным полем")
    .transform((phone) => phone.trim())
    .refine(
      (phone) => {
        const digitsOnly = phone.replace(/\D/g, "");
        return digitsOnly.length >= VALIDATION_CONFIG.PHONE.MIN;
      },
      {
        message: `Номер телефона должен содержать не менее ${VALIDATION_CONFIG.PHONE.MIN} цифр`,
      }
    )
    .refine(
      (phone) => {
        const cleanPhone = phone.replace(
          VALIDATION_CONFIG.PHONE.CLEAN_PATTERN,
          ""
        );
        return cleanPhone.length <= VALIDATION_CONFIG.PHONE.MAX;
      },
      {
        message: `Номер телефона не должен превышать ${VALIDATION_CONFIG.PHONE.MAX} символов`,
      }
    )
    .refine(
      (phone) => {
        return VALIDATION_CONFIG.PHONE.PATTERN.test(phone);
      },
      {
        message:
          "Номер телефона может содержать только цифры, пробелы, +, -, (, )",
      }
    ),

  email: z
    .string()
    .optional()
    .nullable()
    .transform((email) => email?.trim() || null)
    .refine((email) => !email || z.string().email().safeParse(email).success, {
      message: "Введите корректный email адрес",
    })
    .refine((email) => !email || email.length <= VALIDATION_CONFIG.EMAIL.MAX, {
      message: `Email не должен превышать ${VALIDATION_CONFIG.EMAIL.MAX} символов`,
    }),

  comment: z
    .string()
    .optional()
    .nullable()
    .transform((comment) => comment?.trim() || null)
    .refine(
      (comment) => !comment || comment.length <= VALIDATION_CONFIG.COMMENT.MAX,
      {
        message: `Комментарий не должен превышать ${VALIDATION_CONFIG.COMMENT.MAX} символов`,
      }
    ),
});

// Схема с согласием
const orderFormWithConsentSchema = orderFormSchema.extend({
  consent: z.boolean().refine((val) => val === true, {
    message:
      "Необходимо подтвердить согласие с политикой обработки персональных данных",
  }),
});

// Типы
export type OrderFormData = z.infer<typeof orderFormSchema>;
export type OrderFormDataWithConsent = OrderFormData & { consent: boolean };

interface UseOrderFormReturn {
  formData: OrderFormData;
  consent: boolean;
  errors: Partial<Record<keyof OrderFormData, string>> & { consent?: string };
  loading: boolean;
  success: boolean;
  error: string | null;
  isRateLimited: boolean;
  timeUntilReset: number | null;
  submissionsCount: number;
  validation: {
    isValid: boolean;
    touched: Partial<Record<keyof OrderFormData, boolean>>;
    dirty: Partial<Record<keyof OrderFormData, boolean>>;
  };
  handleChange: (name: keyof OrderFormData, value: string) => void;
  handleBlur: (name: keyof OrderFormData) => void;
  handleConsentChange: (consent: boolean) => void;
  validateForm: (withConsent?: boolean) => boolean;
  validateField: (field: keyof OrderFormData) => boolean;
  submitOrder: (
    additionalData?: Partial<OrderFormData>,
    withConsent?: boolean
  ) => Promise<ServiceResult<unknown>>;
  resetForm: () => void;
  clearError: () => void;
}

interface UseOrderFormOptions {
  initialData?: Partial<OrderFormData>;
  autoValidate?: boolean;
  enableRateLimit?: boolean;
  onSuccess?: (data: OrderFormData) => void;
  onError?: (error: string) => void;
}

export function useOrderForm({
  initialData = {},
  autoValidate = true,
  enableRateLimit = true,
  onSuccess,
  onError,
}: UseOrderFormOptions = {}): UseOrderFormReturn {
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: initialData.fullName || "",
    phone: initialData.phone || "",
    email: initialData.email || null,
    comment: initialData.comment || null,
  });

  const [consent, setConsent] = useState<boolean>(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof OrderFormData, string>> & { consent?: string }
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof OrderFormData, boolean>>
  >({});
  const [dirty, setDirty] = useState<
    Partial<Record<keyof OrderFormData, boolean>>
  >({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Состояния для ограничения отправки
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [timeUntilReset, setTimeUntilReset] = useState<number | null>(null);
  const [submissionsCount, setSubmissionsCount] = useState<number>(0);

  // Функция для проверки ограничения на отправку
  const checkRateLimit = useCallback((): {
    isLimited: boolean;
    timeUntilReset: number | null;
    count: number;
  } => {
    if (!enableRateLimit) {
      return { isLimited: false, timeUntilReset: null, count: 0 };
    }

    try {
      const stored = localStorage.getItem(SITE_CONFIG.rateLimit.STORAGE_KEY);

      if (!stored) {
        return { isLimited: false, timeUntilReset: null, count: 0 };
      }

      const record: RateLimitRecord = JSON.parse(stored);
      const now = Date.now();
      const timeDiff = now - record.timestamp;

      if (timeDiff < SITE_CONFIG.rateLimit.WINDOW_MS) {
        if (record.count >= SITE_CONFIG.rateLimit.MAX_REQUESTS) {
          const remainingTime = SITE_CONFIG.rateLimit.WINDOW_MS - timeDiff;
          return {
            isLimited: true,
            timeUntilReset: remainingTime,
            count: record.count,
          };
        }
        return {
          isLimited: false,
          timeUntilReset: null,
          count: record.count,
        };
      } else {
        // Время истекло, очищаем запись
        localStorage.removeItem(SITE_CONFIG.rateLimit.STORAGE_KEY);
        return { isLimited: false, timeUntilReset: null, count: 0 };
      }
    } catch {
      return { isLimited: false, timeUntilReset: null, count: 0 };
    }
  }, [enableRateLimit]);

  // Функция для записи отправки
  const recordSubmission = useCallback(() => {
    if (!enableRateLimit) return;

    try {
      const now = Date.now();
      const stored = localStorage.getItem(SITE_CONFIG.rateLimit.STORAGE_KEY);

      let record: RateLimitRecord;

      if (stored) {
        record = JSON.parse(stored);
        const timeDiff = now - record.timestamp;

        if (timeDiff < SITE_CONFIG.rateLimit.WINDOW_MS) {
          record.count += 1;
        } else {
          // Сбрасываем счетчик если время истекло
          record = { timestamp: now, count: 1 };
        }
      } else {
        record = { timestamp: now, count: 1 };
      }

      localStorage.setItem(
        SITE_CONFIG.rateLimit.STORAGE_KEY,
        JSON.stringify(record)
      );
      setSubmissionsCount(record.count);
    } catch (error) {
      console.warn("Failed to record submission:", error);
    }
  }, [enableRateLimit]);

  // Эффект для проверки ограничения при монтировании
  useEffect(() => {
    const { isLimited, timeUntilReset, count } = checkRateLimit();
    setIsRateLimited(isLimited);
    setTimeUntilReset(timeUntilReset);
    setSubmissionsCount(count);

    if (isLimited && timeUntilReset) {
      const timer = setTimeout(() => {
        setIsRateLimited(false);
        setTimeUntilReset(null);
        setSubmissionsCount(0);
        localStorage.removeItem(SITE_CONFIG.rateLimit.STORAGE_KEY);
      }, timeUntilReset);

      return () => clearTimeout(timer);
    } else {
      return () => {};
    }
  }, [checkRateLimit]);

  // Мемоизированная проверка валидности формы
  const isValid = useMemo(() => {
    try {
      orderFormSchema.parse(formData);
      return Object.keys(errors).length === 0;
    } catch {
      return false;
    }
  }, [formData, errors]);

  // Валидация отдельного поля
  const validateField = useCallback(
    (field: keyof OrderFormData): boolean => {
      try {
        orderFormSchema.shape[field].parse(formData[field]);

        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });

        return true;
      } catch (err) {
        if (err instanceof z.ZodError) {
          const fieldError = err.errors.find(
            (error) => error.path[0] === field
          );

          if (fieldError) {
            setErrors((prev) => ({
              ...prev,
              [field]: fieldError.message,
            }));
          }
        }
        return false;
      }
    },
    [formData]
  );

  // Обработчик изменения полей
  const handleChange = useCallback(
    (name: keyof OrderFormData, value: string) => {
      setFormData((prev) => {
        const newFormData = { ...prev, [name]: value };
        return newFormData;
      });

      setDirty((prev) => ({ ...prev, [name]: true }));

      // Автовалидация при изменении
      if (autoValidate && touched[name]) {
        const timeoutId = setTimeout(() => validateField(name), 500);
        return () => clearTimeout(timeoutId);
      }
      return () => {};
    },
    [autoValidate, touched, validateField]
  );

  // Обработчик потери фокуса
  const handleBlur = useCallback(
    (name: keyof OrderFormData) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      validateField(name);
    },
    [validateField]
  );

  const handleConsentChange = useCallback(
    (newConsent: boolean) => {
      setConsent(newConsent);

      if (errors.consent && newConsent) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.consent;
          return newErrors;
        });
      }
    },
    [errors.consent]
  );

  // Полная валидация формы
  const validateForm = useCallback(
    (withConsent: boolean = false): boolean => {
      try {
        // Валидация основных полей
        orderFormSchema.parse(formData);

        // Валидация согласия если нужно
        if (withConsent) {
          orderFormWithConsentSchema.parse({ ...formData, consent });
        }

        setErrors({});
        return true;
      } catch (err) {
        if (err instanceof z.ZodError) {
          const newErrors: Partial<Record<keyof OrderFormData, string>> & {
            consent?: string;
          } = {};

          err.errors.forEach((error) => {
            if (error.path[0]) {
              const field = error.path[0] as keyof OrderFormData | "consent";
              if (field === "consent") {
                newErrors.consent = error.message;
              } else {
                newErrors[field] = error.message;
              }
            }
          });

          setErrors(newErrors);

          // Помечаем все поля как touched при неудачной валидации
          setTouched({
            fullName: true,
            phone: true,
            email: true,
            comment: true,
          });

          return false;
        }
        return false;
      }
    },
    [formData, consent]
  );

  // Отправка формы
  const submitOrder = useCallback(
    async (
      additionalData?: Partial<OrderFormData>,
      withConsent: boolean = false
    ): Promise<ServiceResult<unknown>> => {
      // Проверяем ограничение на отправку
      if (isRateLimited) {
        const errorMsg = `Превышено ограничение на отправку форм. Максимум ${SITE_CONFIG.rateLimit.MAX_REQUESTS} отправки в течение 24 часов.`;
        setError(errorMsg);
        onError?.(errorMsg);
        return {
          success: false,
          error: errorMsg,
          message: "Превышено ограничение на отправку формы",
        };
      }

      // Помечаем все поля как touched перед валидацией
      setTouched({
        fullName: true,
        phone: true,
        email: true,
        comment: true,
      });

      if (!validateForm(withConsent)) {
        const errorMsg = "Пожалуйста, исправьте ошибки в форме";
        setError(errorMsg);
        onError?.(errorMsg);
        return {
          success: false,
          error: errorMsg,
          message: "Ошибка валидации формы",
        };
      }

      // Проверяем согласие если нужно
      if (withConsent && !consent) {
        const errorMsg =
          "Необходимо подтвердить согласие с политикой обработки персональных данных";
        setError(errorMsg);
        onError?.(errorMsg);
        return {
          success: false,
          error: errorMsg,
          message: "Необходимо подтвердить согласие",
        };
      }

      setLoading(true);
      setError(null);

      try {
        // Подготовка данных для отправки в соответствии с новой структурой API
        const orderPayload: any = {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email || null,
          comment: formData.comment || null,
        };

        // Добавляем согласие только если нужно
        if (withConsent) {
          orderPayload.consent = consent;
        }

        // CSRF защита
        const csrfToken = document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute("content");

        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(csrfToken && { "X-CSRF-Token": csrfToken }),
          },
          body: JSON.stringify(orderPayload),
        });

        // Обработка HTTP ошибок
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const result = await response.json();

        if (result.success) {
          // Записываем отправку
          recordSubmission();

          // Проверяем, когда истекает ограничение
          const { isLimited, timeUntilReset, count } = checkRateLimit();
          setIsRateLimited(isLimited);
          setTimeUntilReset(timeUntilReset);
          setSubmissionsCount(count);

          setSuccess(true);
          onSuccess?.(formData);
          return result;
        } else {
          throw new Error(result.error || "Не удалось отправить заказ");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Ошибка при отправке заказа";
        setError(errorMessage);
        onError?.(errorMessage);
        return {
          success: false,
          error: errorMessage,
          message: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    [
      formData,
      consent,
      validateForm,
      onSuccess,
      onError,
      isRateLimited,
      recordSubmission,
      checkRateLimit,
    ]
  );

  const resetForm = useCallback(() => {
    setFormData({
      fullName: initialData.fullName || "",
      phone: initialData.phone || "",
      email: initialData.email || null,
      comment: initialData.comment || null,
    });
    setConsent(false);
    setErrors({});
    setTouched({});
    setDirty({});
    setSuccess(false);
    setError(null);
  }, [initialData]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    formData,
    consent,
    errors,
    loading,
    success,
    error,
    isRateLimited,
    timeUntilReset,
    submissionsCount,
    validation: {
      isValid,
      touched,
      dirty,
    },
    handleChange,
    handleBlur,
    handleConsentChange,
    validateForm,
    validateField,
    submitOrder,
    resetForm,
    clearError,
  };
}
