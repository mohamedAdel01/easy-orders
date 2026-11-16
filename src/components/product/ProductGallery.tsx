import { useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import { ChevronArrowIcon, ShareIcon } from '../icons';
import type { Product } from '../../types';
import { getAllImages } from '../../utils';
import { useI18n } from '../../hooks/useI18n';
import { useWishlistStore } from '../../store/wishlistStore';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = getAllImages(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const { t, isRtl } = useI18n();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = () => {
    toggleItem({
      productId: product.id,
      name: product.name,
      price: product.sale_price > 0 ? product.sale_price : product.price,
      thumb: product.thumb,
      slug: product.slug,
    });
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, [isZoomed]);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col gap-4 select-none">
      {/* Top Container: Main Image + External Floating Actions Strip */}
      <div className="flex gap-3 sm:gap-4 items-stretch">
        {/* Main Image with rounded-2xl */}
        <div
          className="flex-1 relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#f4f4f4] cursor-zoom-in group"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            src={images[activeIndex]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-300"
            style={
              isZoomed
                ? { transform: 'scale(2.2)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                : { transform: 'scale(1)' }
            }
            loading="eager"
          />
        </div>

        {/* EXTERNAL Action Buttons Strip (Positioned OUTSIDE the image to the side!) */}
        <div className="flex flex-col justify-between py-1 flex-shrink-0">
          {/* Top buttons: Share & Wishlist */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert(t('Product link copied to clipboard!'));
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#F2F4F7] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-gray-800 transition-all shadow-none border-0 cursor-pointer"
              title={t('Share')}
              aria-label={t('Share')}
            >
              <ShareIcon size={20} stroke="#141414" />
            </button>

            <button
              onClick={handleToggleWishlist}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#F2F4F7] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-gray-800 transition-all shadow-none border-0 cursor-pointer"
              title={isWishlisted ? t('Added to wishlist') : t('Add to wishlist')}
              aria-label={isWishlisted ? t('Added to wishlist') : t('Add to wishlist')}
            >
              <Heart
                size={18}
                className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-800 stroke-[1.75]'}
              />
            </button>
          </div>

          {/* Bottom buttons: Previous & Next arrows (direction adjusted via isRtl) */}
          <div className="flex flex-col gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#F2F4F7] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-gray-800 transition-all shadow-none border-0 cursor-pointer"
              aria-label={t('Previous image')}
            >
              <ChevronArrowIcon direction={isRtl ? 'right' : 'left'} size={14} stroke="#141414" />
            </button>

            <button
              onClick={next}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#F2F4F7] hover:bg-[#E5E7EB] active:scale-[0.96] flex items-center justify-center text-gray-800 transition-all shadow-none border-0 cursor-pointer"
              aria-label={t('Next image')}
            >
              <ChevronArrowIcon direction={isRtl ? 'left' : 'right'} size={14} stroke="#141414" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnails Row: 5 portrait cards with rounded-xl */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.slice(0, 5).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`aspect-[3/4] rounded-xl overflow-hidden bg-[#f4f4f4] transition-all duration-150 ${
                i === activeIndex
                  ? 'border-2 border-black ring-1 ring-black shadow-sm'
                  : 'border border-transparent hover:border-gray-300 opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${product.name} thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
