"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { User as UserType } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";

interface EditUserModalProps {
  user?: UserType | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: UserType) => void;
}

export function EditUserModal({
  user,
  isOpen,
  onClose,
  onSave,
}: EditUserModalProps) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    surname: user?.surname || "",
    department: user?.department || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "MODERATOR",
    isActive: user?.isActive || true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Очистка ошибки при изменении поля
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Фамилия обязательна";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Отдел обязателен";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const userData: UserType = {
        id: user?.id || "", // ID будет пустым для новых пользователей
        name: formData.name,
        surname: formData.surname,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        password: user?.password || "", // Пароль не изменяется при редактировании
        role: formData.role,
        isActive: formData.isActive,
        createdAt: user?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      onSave(userData);
    } catch (error) {
      console.error("Ошибка при сохранении пользователя:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Закрытие по ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <User className="w-6 h-6 mr-2 text-[rgb(0,91,137)]" />
                {user ? "Редактировать пользователя" : "Создать нового пользователя"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={cn("mt-1", errors.name && "border-red-500")}
                    placeholder="Введите имя"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Label htmlFor="surname">Фамилия *</Label>
                  <Input
                    id="surname"
                    value={formData.surname}
                    onChange={(e) => handleChange("surname", e.target.value)}
                    className={cn("mt-1", errors.surname && "border-red-500")}
                    placeholder="Введите фамилию"
                  />
                  {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={cn("mt-1", errors.email && "border-red-500")}
                    placeholder="user@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className={cn("mt-1", errors.phone && "border-red-500")}
                    placeholder="+7 (XXX) XXX-XX-XX"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Label htmlFor="department">Отдел *</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    className={cn("mt-1", errors.department && "border-red-500")}
                    placeholder="Отдел, в котором работает пользователь"
                  />
                  {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                </div>

                <div>
                  <Label htmlFor="role">Роль</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleChange("role", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MODERATOR">Модератор</SelectItem>
                      <SelectItem value="ADMIN">Администратор</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => handleChange("isActive", e.target.checked)}
                  className="h-4 w-4 text-[rgb(0,91,137)] focus:ring-[rgb(0,91,137)] border-gray-300 rounded"
                />
                <Label htmlFor="isActive">Активный пользователь</Label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  className="bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] flex items-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {user ? "Сохранить изменения" : "Создать пользователя"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}