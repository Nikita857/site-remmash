"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, FileText, Calendar, Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Certificate } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";
import { Textarea } from "@/components/ui/Textarea";

interface EditCertificateModalProps {
  certificate?: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (certificate: Certificate) => void;
}

export function EditCertificateModal({
  certificate,
  isOpen,
  onClose,
  onSave,
}: EditCertificateModalProps) {
  const [formData, setFormData] = useState({
    title: certificate?.title || "",
    description: certificate?.description || "",
    issueDate: certificate?.issueDate ? new Date(certificate.issueDate).toISOString().split('T')[0] : "",
    expiryDate: certificate?.expiryDate ? new Date(certificate.expiryDate).toISOString().split('T')[0] : "",
    image: certificate?.image || "",
    isActive: certificate?.isActive || true,
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

    if (!formData.title.trim()) {
      newErrors.title = "Название обязательно";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Описание обязательно";
    }

    if (!formData.issueDate) {
      newErrors.issueDate = "Дата выдачи обязательна";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Дата окончания обязательна";
    }

    if (new Date(formData.issueDate) > new Date(formData.expiryDate)) {
      newErrors.expiryDate = "Дата окончания должна быть позже даты выдачи";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Ссылка на изображение обязательна";
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
      const certificateData: Certificate = {
        id: certificate?.id || "", // ID будет пустым для новых сертификатов
        title: formData.title,
        description: formData.description,
        issueDate: new Date(formData.issueDate),
        expiryDate: new Date(formData.expiryDate),
        image: formData.image,
        isActive: formData.isActive,
        createdAt: certificate?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      onSave(certificateData);
    } catch (error) {
      console.error("Ошибка при сохранении сертификата:", error);
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
                <FileText className="w-6 h-6 mr-2 text-[rgb(0,91,137)]" />
                {certificate ? "Редактировать сертификат" : "Создать новый сертификат"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Название *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={cn("w-full", errors.title && "border-red-500")}
                    placeholder="Введите название сертификата"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Описание *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className={cn("w-full min-h-[100px]", errors.description && "border-red-500")}
                    placeholder="Введите описание сертификата"
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <Label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Дата выдачи *
                  </Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleChange("issueDate", e.target.value)}
                    className={cn("w-full", errors.issueDate && "border-red-500")}
                  />
                  {errors.issueDate && <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>}
                </div>

                <div>
                  <Label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Дата окончания *
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleChange("expiryDate", e.target.value)}
                    className={cn("w-full", errors.expiryDate && "border-red-500")}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                    Ссылка на изображение *
                  </Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleChange("image", e.target.value)}
                    className={cn("w-full", errors.image && "border-red-500")}
                    placeholder="https://example.com/certificate.jpg"
                  />
                  {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                </div>
              </div>

              <div className="flex items-center pt-2">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => handleChange("isActive", e.target.checked)}
                    className="h-4 w-4 text-[rgb(0,91,137)] focus:ring-[rgb(0,91,137)] border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="isActive" className="font-medium text-gray-700">
                    Активный сертификат
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2"
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  className="bg-[rgb(0,91,137)] hover:bg-[rgb(0,71,117)] flex items-center px-4 py-2"
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
                      {certificate ? "Сохранить изменения" : "Создать сертификат"}
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