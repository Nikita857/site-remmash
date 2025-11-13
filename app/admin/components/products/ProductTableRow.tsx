'use client';

import { memo } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductWithCategory } from '@/types';
import { Button } from '@/components/ui/button';

interface ProductTableRowProps {
  product: ProductWithCategory;
  onToggleStatus: (productId: string) => void;
  onEdit: (product: ProductWithCategory) => void;
  onToggleRowExpansion: (productId: string) => void;
  isExpanded: boolean;
}

export const ProductTableRow = memo(({ 
  product, 
  onToggleStatus, 
  onEdit, 
  onToggleRowExpansion,
  isExpanded
}: ProductTableRowProps) => {
  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Активен' : 'Неактивен';
  };

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={product.name}>
          {product.name}
        </div>
        <div className="text-sm text-gray-500 max-w-xs truncate" title={product.shortDescription}>
          {product.shortDescription}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{product.category?.name || 'Без категории'}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(product.isActive)}`}>
          {getStatusText(product.isActive)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(product.createdAt).toLocaleDateString('ru-RU')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleStatus(product.id)}
            className="flex items-center"
          >
            {product.isActive ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Скрыть
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" />
                Показать
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(product)}
            className="flex items-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            Редактировать
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleRowExpansion(product.id)}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </td>
    </motion.tr>
  );
});

ProductTableRow.displayName = 'ProductTableRow';