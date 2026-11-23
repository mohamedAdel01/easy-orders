import { useState, useEffect } from 'react';
import { SearchIcon, UserIcon, CartIcon, WishlistIcon, NavChevronDownIcon } from '../icons';
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
      {/* 1. Top Offer / Announcement Bar (Figma node 57:1524) */}
      <div className="bg-[#141414] text-white min-h-[42px] py-2 sm:py-0 flex items-center justify-center px-4 select-none">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center">
          <p className="font-sans font-medium text-[13px] sm:text-[14px] leading-tight text-white m-0">
            {t('New season coming!  Discount 10% for all product!  Checkout Now!')}
          </p>
          <div className="bg-[#383838] w-[49px] h-[18px] rounded-[23px] flex items-center justify-center shrink-0">
            <span className="font-sans font-medium text-[12px] leading-none text-white">
              {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Header (Figma node 57:1307 & Line 2 57:1333) */}
      <header className="sticky top-0 z-40 bg-white select-none border-b border-dashed border-[#A3A3A3]/70">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
          <div className="flex items-center justify-between h-[64px] sm:h-[80px] lg:h-[94px]">
            {/* Brand Logo - 170x32px in Figma */}
            <div className="shrink-0 flex items-center">
              <a href="/" className="block">
                <img
                  src="/logo.png"
                  alt="John Lewis & Partners"
                  className="h-6 sm:h-7 lg:h-[32px] w-auto lg:w-[170px] object-contain"
                />
              </a>
            </div>

            {/* Right Navigation Controls - exactly 32px gap in Figma */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 text-[16px] text-[#141414]">
              {/* Search Icon (Figma Frame 7: 20x20) */}
              <button
                className="p-1 hover:opacity-70 transition-opacity cursor-pointer flex items-center justify-center"
                aria-label={t('Search')}
                onClick={() => alert(t('Search...'))}
              >
                <SearchIcon size={20} stroke="#141414" />
              </button>

              {/* Categories Dropdown (Figma Frame 5: 16px medium text + 20x20 chevron down) */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="flex items-center gap-1 font-sans font-medium text-[16px] text-[#141414] hover:opacity-70 transition-opacity py-1 cursor-pointer"
                >
                  <span>{t('Categories')}</span>
                  <NavChevronDownIcon size={20} stroke="#141414" className={categoriesOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                </button>

                {categoriesOpen && (
                  <div className="absolute end-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 text-sm">
                    <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-[#141414] font-medium">
                      {t('Womenswear')}
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-[#141414] font-medium">
                      {t('Menswear')}
                    </a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-50 text-[#141414] font-medium">
                      {t('Shoes')}
                    </a>
                  </div>
                )}
              </div>

              {/* Sign in (Figma Frame 6: 20x20 User icon + 16px medium text) */}
              <div className="hidden sm:flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
                <UserIcon size={20} stroke="#141414" />
                <span className="font-sans font-medium text-[16px] text-[#141414]">{t('Sign in')}</span>
              </div>

              {/* Wishlist Heart (Figma Frame: 20x20 linear heart) */}
              <button
                onClick={openWishlist}
                className="p-1 hover:opacity-70 transition-opacity relative cursor-pointer flex items-center justify-center"
                aria-label={t('Wishlist')}
                title={t('Wishlist')}
              >
                <div className="relative flex items-center justify-center">
                  <WishlistIcon size={20} stroke="#141414" />
                  {totalWishlist > 0 && (
                    <span className="absolute -top-1.5 -end-2 bg-[#141414] text-white text-[8px] font-sans font-medium rounded-full w-[13px] h-[13px] flex items-center justify-center">
                      {totalWishlist}
                    </span>
                  )}
                </div>
              </button>

              {/* Cart / Shopping Bag (Figma Frame: 20x20 basket icon + 13x13 badge) */}
              <button
                onClick={toggleCart}
                className="p-1 hover:opacity-70 transition-opacity relative cursor-pointer flex items-center justify-center"
                aria-label={t('Shopping bag')}
                title={t('Shopping bag')}
              >
                <div className="relative flex items-center justify-center">
                  <CartIcon size={20} stroke="#141414" />
                  {totalItems > 0 && (
                    <span className="absolute -top-[3px] -end-[5px] bg-[#141414] text-white text-[8px] font-sans font-medium rounded-full w-[13px] h-[13px] flex items-center justify-center leading-none">
                      {totalItems}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
