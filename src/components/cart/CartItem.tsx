import { Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils';
import { useI18n } from '../../hooks/useI18n';
import QuantitySelector from '../ui/QuantitySelector';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore();
  const { t } = useI18n();

  return (
    <div className="flex gap-4 py-2">
      {/* Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
        <img
          src={item.thumb}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2 mb-1">
          {item.name}
        </h4>

        {/* Selected Variations */}
        {Object.keys(item.selectedVariations).length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {Object.entries(item.selectedVariations).map(([k, v]) => (
              <span key={k} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
                {t(k)}: {t(v)}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <p className="text-sm font-bold text-gray-900 mb-2">
          {formatPrice(item.price * item.quantity)}
          {item.quantity > 1 && (
            <span className="text-xs text-gray-400 font-normal ms-1">
              ({formatPrice(item.price)} {t('each')})
            </span>
          )}
        </p>

        {/* Quantity & Remove */}
        <div className="flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            min={1}
            max={item.maxQuantity || 99}
            onChange={(qty) => updateQuantity(item.id, qty)}
          />
          <button
            onClick={() => removeItem(item.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label={t('Remove item')}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
