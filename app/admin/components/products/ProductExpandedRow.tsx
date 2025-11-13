'use client';

import { memo } from 'react';
import { motion } from 'motion/react';
import { ProductWithCategory } from '@/types';

interface ProductExpandedRowProps {
  product: ProductWithCategory;
  isExpanded: boolean;
}

export const ProductExpandedRow = memo(({ product, isExpanded }: ProductExpandedRowProps) => {
  if (!isExpanded) return null;

  return (
    <motion.tr
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <td colSpan={5} className="px-6 py-4 bg-gray-50">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-lg">Полное описание</h4>
            <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-lg">Технические характеристики</h4>
            {product.specifications ? (
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(product.specifications).map(([key, value]) => {
                  // Проверяем, является ли значение массивом объектов с полями name и value
                  if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && 'name' in value[0] && 'value' in value[0]) {
                    // Это массив объектов с полями name и value
                    return value.map((spec, idx) => (
                      <div key={`${key}-${idx}`} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                        <dt className="text-sm font-medium text-gray-500">
                          {spec.name}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 font-medium">
                          {spec.value}
                        </dd>
                      </div>
                    ));
                  } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    // Это обычный объект
                    return Object.entries(value).map(([subKey, subValue]) => (
                      <div key={`${key}-${subKey}`} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                        <dt className="text-sm font-medium text-gray-500 capitalize">
                          {subKey.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 font-medium">
                          {String(subValue)}
                        </dd>
                      </div>
                    ));
                  } else {
                    // Это простое значение
                    return (
                      <div key={key} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                        <dt className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 font-medium">
                          {String(value)}
                        </dd>
                      </div>
                    );
                  }
                })}
              </dl>
            ) : (
              <p className="text-gray-500 italic py-4 text-center bg-gray-100 rounded-lg">
                Нет технических характеристик
              </p>
            )}
          </div>
        </div>
      </td>
    </motion.tr>
  );
});

ProductExpandedRow.displayName = 'ProductExpandedRow';