"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Save, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { ProductWithCategory, ProductCategory } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/components/ui/utils";

interface EditProductModalProps {
  product?: ProductWithCategory;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductWithCategory) => void;
}

export function EditProductModal({
  product,
  isOpen,
  onClose,
  onSave,
}: EditProductModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    shortDescription: product?.shortDescription || "",
    fullDescription: product?.fullDescription || "",
    specifications: product?.specifications
      ? JSON.stringify(product.specifications, null, 2)
      : "{}",
    images: product?.images || [],
    isActive: product?.isActive || true,
    order: product?.order || 0,
    categoryId: product?.categoryId || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [imageInput, setImageInput] = useState("");

  // Загружаем категории при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const result = await response.json();
      
      if (result.success) {
        setCategories(result.data);
      } else {
        console.error("Ошибка при загрузке категорий:", result.error);
      }
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
    }
  };

  const handleChange = (field: string, value: string | boolean | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));
      setImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let parsedSpecifications = null;
      if (formData.specifications) {
        try {
          parsedSpecifications = JSON.parse(formData.specifications);
        } catch (e) {
          console.error("Неверный формат JSON для спецификаций:", e);
        }
      }

      const updatedProduct = {
        ...product,
        ...formData,
        specifications: parsedSpecifications || formData.specifications,
        images: formData.images,
        updatedAt: new Date(),
        category: categories.find((cat) => cat.id === formData.categoryId),
      } as ProductWithCategory;

      onSave(updatedProduct);
    } catch (error) {
      console.error("Ошибка при сохранении продукта:", error);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop с backdrop-blur */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Модальное окно */}
          <motion.div
            className={cn(
              "relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden",
              "border border-gray-200/50"
            )}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Заголовок */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {product ? "Редактировать продукт" : "Добавить продукт"}
              </h2>
              <button
                onClick={onClose}
                className={cn(
                  "p-2 text-gray-400 hover:text-gray-600 transition-all duration-200",
                  "hover:bg-gray-100 rounded-lg"
                )}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Контент с прокруткой */}
            <div className="overflow-y-auto max-h-[calc(95vh-140px)]">
              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Название */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Название *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                      className="w-full"
                      placeholder="Введите название продукта"
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-sm font-medium text-gray-700">
                      Slug *
                    </Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleChange("slug", e.target.value)}
                      required
                      className="w-full"
                      placeholder="product-slug"
                    />
                  </div>

                  {/* Краткое описание */}
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="shortDescription" className="text-sm font-medium text-gray-700">
                      Краткое описание *
                    </Label>
                    <Textarea
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) =>
                        handleChange("shortDescription", e.target.value)
                      }
                      required
                      rows={3}
                      className="w-full resize-none"
                      placeholder="Краткое описание продукта"
                    />
                  </div>

                  {/* Полное описание */}
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="fullDescription" className="text-sm font-medium text-gray-700">
                      Полное описание *
                    </Label>
                    <Textarea
                      id="fullDescription"
                      value={formData.fullDescription}
                      onChange={(e) =>
                        handleChange("fullDescription", e.target.value)
                      }
                      required
                      rows={5}
                      className="w-full resize-none"
                      placeholder="Подробное описание продукта"
                    />
                  </div>

                  {/* Спецификации */}
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="specifications" className="text-sm font-medium text-gray-700">
                      Спецификации (JSON)
                    </Label>
                    <Textarea
                      id="specifications"
                      value={formData.specifications}
                      onChange={(e) =>
                        handleChange("specifications", e.target.value)
                      }
                      rows={6}
                      className="w-full font-mono text-sm resize-none"
                      placeholder='{"material": "Сталь 20", "pressure": "1.6 МПа"}'
                    />
                  </div>

                  {/* Изображения */}
                  <div className="md:col-span-2 space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Изображения
                    </Label>
                    
                    <div className="flex gap-2">
                      <Input
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                        placeholder="Введите URL изображения"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleAddImage}
                        variant="outline"
                        className="whitespace-nowrap"
                      >
                        Добавить
                      </Button>
                    </div>

                    {/* Превью изображений */}
                    {formData.images.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-3">
                        {formData.images.map((img, index) => (
                          <div key={index} className="relative group">
                            <div className="w-20 h-20 rounded-lg border-2 border-gray-200 overflow-hidden">
                              <img
                                src={img}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className={cn(
                                "absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1",
                                "opacity-0 group-hover:opacity-100 transition-all duration-200",
                                "hover:bg-red-600 transform hover:scale-110"
                              )}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Категория */}
                  <div className="space-y-2">
                    <Label htmlFor="categoryId" className="text-sm font-medium text-gray-700">
                      Категория *
                    </Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) =>
                        handleChange("categoryId", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Порядок */}
                  <div className="space-y-2">
                    <Label htmlFor="order" className="text-sm font-medium text-gray-700">
                      Порядок
                    </Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        handleChange("order", parseInt(e.target.value) || 0)
                      }
                      className="w-full"
                      min="0"
                    />
                  </div>

                  {/* Статус */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Статус
                    </Label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          checked={formData.isActive}
                          onChange={() => handleChange("isActive", true)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Активный</span>
                      </label>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          checked={!formData.isActive}
                          onChange={() => handleChange("isActive", false)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Скрытый</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
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
                    disabled={isLoading}
                    className="min-w-24"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Сохранить
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}