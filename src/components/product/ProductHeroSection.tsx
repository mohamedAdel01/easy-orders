import type { Product } from '../../types';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';

interface ProductHeroSectionProps {
  product: Product;
}

export default function ProductHeroSection({ product }: ProductHeroSectionProps) {
  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-0 pt-0 pb-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[135px] items-start">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>
    </section>
  );
}
