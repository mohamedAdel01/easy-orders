import { useCartStore } from '../../store/cartStore';
import { CartIcon } from '../icons';
import { useI18n } from '../../hooks/useI18n';

export default function FloatingCartButton() {
  const { toggleCart, getTotalItems } = useCartStore();
  const { t } = useI18n();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={toggleCart}
      className="sm:hidden fixed bottom-6 end-5 z-40 w-13 h-13 rounded-full bg-black text-white shadow-xl flex items-center justify-center active:scale-95 transition-transform cursor-pointer border border-neutral-800"
      aria-label={t('Shopping bag')}
      title={t('Shopping bag')}
    >
      <div className="relative flex items-center justify-center">
        <CartIcon size={22} stroke="#FFFFFF" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -end-2.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
            {totalItems}
          </span>
        )}
      </div>
    </button>
  );
}
