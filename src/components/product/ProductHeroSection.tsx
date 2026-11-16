import type { Product } from '../../types';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';

interface ProductHeroSectionProps {
  product: Product;
}

export default function ProductHeroSection({ product }: ProductHeroSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
