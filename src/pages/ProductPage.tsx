import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useProductStore } from '../store/productStore';
import PageContainer from '../components/layout/PageContainer';
import PageMain from '../components/layout/PageMain';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import WishlistDrawer from '../components/wishlist/WishlistDrawer';
import FloatingCartButton from '../components/cart/FloatingCartButton';
import ProductBreadcrumbs from '../components/product/ProductBreadcrumbs';
import ProductHeroSection from '../components/product/ProductHeroSection';
import { RelatedProducts, PopularProducts } from '../components/product/RelatedProducts';
import ReviewsSection from '../components/product/ReviewsSection';
import ProductSkeleton from '../components/ui/ProductSkeleton';
import ErrorState from '../components/ui/ErrorState';

const DEFAULT_THEME = 'clear-theme';
const DEFAULT_SLUG = 'Sneakers12';

export default function ProductPage() {
  const { theme = DEFAULT_THEME, slug = DEFAULT_SLUG } = useParams();
  const { data: product, isLoading, error } = useProduct(theme, slug);
  const { setProduct, setLoading, setError } = useProductStore();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (product) setProduct(product);
  }, [product, setProduct]);

  useEffect(() => {
    if (error) setError(error.message);
  }, [error, setError]);

  return (
    <PageContainer>
      <Navbar />
      <CartDrawer />
      <WishlistDrawer />
      <FloatingCartButton />

      <PageMain>
        {isLoading && <ProductSkeleton />}
        {error && <ErrorState message={error.message} />}

        {product && !isLoading && (
          <>
            <ProductBreadcrumbs product={product} />
            <ProductHeroSection product={product} />
            <RelatedProducts currentProductId={product.id} storeId={product.store_id} />
            <ReviewsSection reviews={product.reviews || []} />
            <PopularProducts currentProductId={product.id} storeId={product.store_id} />
          </>
        )}
      </PageMain>

      <Footer />
    </PageContainer>
  );
}
