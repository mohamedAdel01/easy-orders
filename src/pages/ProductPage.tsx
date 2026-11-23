import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useProductStore } from '../store/productStore';
import { FIGMA_PRODUCT } from '../utils/mockData';
import UiNavbar from '../components/ui-only/UiNavbar';
import UiBreadcrumbs from '../components/ui-only/UiBreadcrumbs';
import UiProductHero from '../components/ui-only/UiProductHero';
import UiRelatedProducts from '../components/ui-only/UiRelatedProducts';
import UiReviewsSection from '../components/ui-only/UiReviewsSection';
import UiPopularProducts from '../components/ui-only/UiPopularProducts';
import UiFooter from '../components/ui-only/UiFooter';
import ProductSkeleton from '../components/ui/ProductSkeleton';
import ErrorState from '../components/ui/ErrorState';
import CartDrawer from '../components/cart/CartDrawer';
import WishlistDrawer from '../components/wishlist/WishlistDrawer';
import FloatingCartButton from '../components/cart/FloatingCartButton';

export default function ProductPage() {
  const { theme: routeTheme, slug: routeSlug } = useParams<{ theme?: string; slug?: string }>();
  const isSpecificRoute = Boolean(routeTheme && routeSlug);

  // Default demo identifiers when on root ('/')
  const theme = routeTheme || 'default';
  const slug = routeSlug || 'overshirt-khaki-6';

  const [useFallbackOverride, setUseFallbackOverride] = useState(false);

  // TanStack React Query cached API fetch
  const {
    data: apiProduct,
    isLoading,
    isError,
    error,
    refetch,
  } = useProduct(theme, slug);

  const setProduct = useProductStore((state) => state.setProduct);

  // 1. Valid API response check: Must be an object with valid id and name (not empty or error payload)
  const isApiValid = Boolean(apiProduct && typeof apiProduct === 'object' && apiProduct.id && apiProduct.name);

  // 2. Safe mock-data fallback condition:
  // - On root demo route ('/'), if the live API is unavailable (e.g. 404 or network down),
  //   we fall back to FIGMA_PRODUCT so the Figma demo remains 100% functional without breaking.
  // - On specific route ('/products/:theme/:slug'), fallback is used ONLY if explicitly requested by the user.
  // - Valid API data is NEVER silently replaced.
  const isFallback = !isApiValid && (useFallbackOverride || (!isSpecificRoute && isError));

  const resolvedProduct = isApiValid ? apiProduct : isFallback ? FIGMA_PRODUCT : null;

  // Sync resolved product into Zustand productStore
  useEffect(() => {
    if (resolvedProduct) {
      setProduct(resolvedProduct);
      document.title = resolvedProduct.name
        ? `${resolvedProduct.name} | John Lewis`
        : 'John Lewis ANYDAY Long Sleeve Overshirt, Khaki, 6';
    }
  }, [resolvedProduct, setProduct]);

  // Loading state: render skeleton while query is in-flight
  if (isLoading && !resolvedProduct) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-['Clash_Grotesk'] text-[#141414] antialiased">
        <UiNavbar />
        <main className="flex-1">
          <ProductSkeleton />
        </main>
        <UiFooter />
      </div>
    );
  }

  // Error state: render ErrorState with retry when API fails on a specific route without fallback override
  if (isError && !resolvedProduct) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-['Clash_Grotesk'] text-[#141414] antialiased">
        <UiNavbar />
        <main className="flex-1 flex items-center justify-center">
          <ErrorState
            message={error?.message || `Failed to load product "${slug}" from server.`}
            onRetry={() => refetch()}
            onFallback={() => setUseFallbackOverride(true)}
          />
        </main>
        <UiFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Clash_Grotesk'] text-[#141414] antialiased selection:bg-black selection:text-white">
      {/* 1. Header & Offer Bar (Navbar is preserved without modification) */}
      <UiNavbar />

      {/* Transparent Fallback Notice (active only when API is unavailable and fallback is active) */}
      {isFallback && (
        <aside
          role="status"
          aria-label="Demo mode notice"
          className="bg-[#FFFBEB] border-b border-[#FDE68A] text-[#92400E] text-[13px] sm:text-[14px] px-4 py-2 flex items-center justify-center gap-3 select-none"
        >
          <span>
            <strong>Figma Demo Mode:</strong> API unavailable ({error?.message || 'Offline'}). Showing design mockup product.
          </span>
          <button
            type="button"
            onClick={() => refetch()}
            className="underline font-semibold hover:text-[#78350F] cursor-pointer"
          >
            Retry API
          </button>
        </aside>
      )}

      {/* 2. Main Body Content */}
      <main className="flex-1">
        {/* Breadcrumb */}
        <UiBreadcrumbs product={resolvedProduct} />

        {/* Hero Section (Image + Info + CTAs) */}
        <UiProductHero product={resolvedProduct} />

        {/* Related Product */}
        <UiRelatedProducts />

        {/* Product Reviews */}
        <UiReviewsSection />

        {/* Popular this week */}
        <UiPopularProducts />
      </main>

      {/* 3. Footer */}
      <UiFooter />

      {/* 4. Drawers & Floating Controls */}
      <CartDrawer />
      <WishlistDrawer />
      <FloatingCartButton />
    </div>
  );
}
