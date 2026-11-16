import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { SearchIcon, UserIcon, ChevronArrowIcon, CartIcon } from '../icons';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useI18n } from '../../hooks/useI18n';

export default function Navbar() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 20, seconds: 40 });
  const { getTotalItems, toggleCart } = useCartStore();
  const { getTotalItems: getWishlistTotal, openWishlist } = useWishlistStore();
  const { t } = useI18n();
  const totalItems = getTotalItems();
  const totalWishlist = getWishlistTotal();

  // Simple countdown timer for "20:40"
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: 20, seconds: 40 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <>
      {/* Top Black Announcement Bar */}
      <div className="bg-[#111111] text-white text-[11px] sm:text-xs py-2 px-4 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 text-center font-normal tracking-wide">
          <span>{t('New season coming! Discount 10% for all product!')}</span>
          <a href="#" className="font-semibold text-white hover:text-gray-300 transition-colors">
            {t('Checkout Now!')}
          </a>
          <span className="bg-neutral-800 text-gray-200 text-[10px] sm:text-[11px] font-mono font-medium px-2 py-0.5 rounded-full border border-neutral-700 ms-1">
            {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-dashed border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20 gap-3 sm:gap-4">
            {/* Brand Logo - JOHN LEWIS & PARTNERS */}
            <div className="flex-shrink-0">
              <a href="/" className="block">
                <img
                  src="/logo.png"
                  alt="John Lewis & Partners"
                  className="h-5 sm:h-7 w-auto object-contain"
                />
              </a>
            </div>

            {/* Right Navigation Controls */}
            <div className="flex items-center gap-3 sm:gap-6 text-xs text-gray-700">
              {/* 1. Search Icon (Figma Frame 7.svg) */}
              <button
                className="p-1 hover:text-black transition-colors"
                aria-label={t('Search')}
                onClick={() => alert(t('Search...'))}
              >
                <SearchIcon size={18} stroke="#141414" className="text-gray-900 hover:text-black" />
              </button>

              {/* 2. Categories Dropdown */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="flex items-center gap-1.5 font-medium text-gray-800 hover:text-black py-1"
                >
                  <span>{t('Categories')}</span>
                  <ChevronArrowIcon direction="down" size={11} stroke="#6B7280" />
                </button>

                {categoriesOpen && (
                  <div className="absolute end-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 text-xs">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">
                      {t('Womenswear')}
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">
                      {t('Menswear')}
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-gray-700">
                      {t('Shoes')}
                    </a>
                  </div>
                )}
              </div>

              {/* 4. Sign in (Figma Frame.svg) */}
              <div className="hidden sm:flex items-center gap-1.5 cursor-pointer hover:text-black">
                <UserIcon size={18} stroke="#141414" className="text-gray-900" />
                <span className="font-medium text-gray-800">{t('Sign in')}</span>
              </div>

              {/* 5. Wishlist Heart with count */}
              <button
                onClick={openWishlist}
                className="p-1 hover:text-black transition-colors hidden sm:block relative cursor-pointer"
                aria-label={t('Wishlist')}
                title={t('Wishlist')}
              >
                <div className="relative">
                  <Heart size={18} className="text-gray-700 hover:text-black stroke-[1.75]" />
                  {totalWishlist > 0 && (
                    <span className="absolute -top-1 -end-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      {totalWishlist}
                    </span>
                  )}
                </div>
              </button>

              {/* 6. Official Figma Cart Icon with count (Desktop / Tablet in header, Mobile has FloatingCartButton) */}
              <button
                onClick={toggleCart}
                className="hidden sm:flex items-center gap-1 p-1 hover:text-black transition-colors relative cursor-pointer"
                aria-label={t('Shopping bag')}
                title={t('Shopping bag')}
              >
                <div className="relative">
                  <CartIcon size={20} stroke="#141414" />
                  <span className="absolute -top-1.5 -end-2 bg-black text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
