import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { CartIcon } from '../icons';
import { useCartStore } from '../../store/cartStore';
import { useI18n } from '../../hooks/useI18n';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default function CartDrawer() {
  const { isOpen, closeCart, items } = useCartStore();
  const { t, isRtl } = useI18n();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeCart]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed ${isRtl ? 'left-0' : 'right-0'} top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen
            ? 'translate-x-0'
            : isRtl
            ? '-translate-x-full'
            : 'translate-x-full'
        }`}
        aria-label={t('Shopping cart')}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <CartIcon size={22} stroke="#141414" />
            <h2 className="text-lg font-semibold text-gray-900">{t('Your Cart')}</h2>
            {items.length > 0 && (
              <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)} {t('items')}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={t('Close cart')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6">
            <div className="text-6xl">🛒</div>
            <h3 className="text-lg font-semibold text-gray-900">{t('Your cart is empty')}</h3>
            <p className="text-sm text-gray-500 text-center">{t('Add some products to get started')}</p>
            <button
              onClick={closeCart}
              className="mt-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              {t('Continue Shopping')}
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Summary */}
            <CartSummary />
          </>
        )}
      </aside>
    </>
  );
}
