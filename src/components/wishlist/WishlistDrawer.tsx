import { useEffect, useRef } from 'react';
import { X, Heart, Trash2 } from 'lucide-react';
import { CartIcon } from '../icons';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';
import { useI18n } from '../../hooks/useI18n';

export default function WishlistDrawer() {
  const { isOpen, closeWishlist, items, removeItem } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
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

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeWishlist();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeWishlist]);

  const handleMoveToCart = (item: (typeof items)[0]) => {
    addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      thumb: item.thumb,
      quantity: 1,
      selectedVariations: {},
      maxQuantity: 10,
    });
    removeItem(item.productId);
    closeWishlist();
    openCart();
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeWishlist}
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
        aria-label={t('Wishlist')}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Heart size={22} className="text-red-500 fill-red-500" />
            <h2 className="text-lg font-semibold text-gray-900">{t('My Wishlist')}</h2>
            {items.length > 0 && (
              <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length} {t('items')}
              </span>
            )}
          </div>
          <button
            onClick={closeWishlist}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label={t('Close')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-400">
              <Heart size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{t('Your wishlist is empty')}</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              {t('Save items you love by clicking the heart icon on any product page.')}
            </p>
            <button
              onClick={closeWishlist}
              className="mt-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {t('Continue Shopping')}
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100"
              >
                <img
                  src={item.thumb}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg bg-white flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <div className="text-xs font-bold text-gray-900 mt-1">
                    £{item.price.toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-black hover:bg-neutral-800 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <CartIcon size={13} stroke="#ffffff" />
                    <span>{t('Add to Cart')}</span>
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  title={t('Remove')}
                  aria-label={t('Remove')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
