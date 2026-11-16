import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils';
import { useI18n } from '../../hooks/useI18n';

export default function CartSummary() {
  const { getTotalPrice, clearCart } = useCartStore();
  const { t } = useI18n();
  const total = getTotalPrice();
  const shipping = total >= 500 ? 0 : 50;
  const finalTotal = total + shipping;

  return (
    <div className="border-t border-gray-200 px-6 py-5 bg-gray-50">
      {/* Price Breakdown */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{t('Subtotal')}</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{t('Shipping')}</span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
            {shipping === 0 ? t('FREE') : formatPrice(shipping)}
          </span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold text-gray-900">
          <span>{t('Total')}</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-700 transition-colors text-sm mb-2">
        {t('Proceed to Checkout')}
      </button>

      <button
        onClick={clearCart}
        className="w-full py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
      >
        {t('Clear Cart')}
      </button>
    </div>
  );
}
