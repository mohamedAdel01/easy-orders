import { useEffect } from 'react';
import UiNavbar from '../components/ui-only/UiNavbar';
import UiBreadcrumbs from '../components/ui-only/UiBreadcrumbs';
import UiProductHero from '../components/ui-only/UiProductHero';
import UiRelatedProducts from '../components/ui-only/UiRelatedProducts';
import UiReviewsSection from '../components/ui-only/UiReviewsSection';
import UiPopularProducts from '../components/ui-only/UiPopularProducts';
import UiFooter from '../components/ui-only/UiFooter';
import FloatingPageSwitcher from '../components/common/FloatingPageSwitcher';

export default function UiOnlyPixelPerfectPage() {
  useEffect(() => {
    document.title = 'Product Details landing page / Web — UI-Only Pixel Perfect';
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-['Clash_Grotesk'] text-[#141414] antialiased selection:bg-black selection:text-white relative">
      {/* 1. Header & Offer Bar (100% at y=0, exactly as in Figma) */}
      <UiNavbar />

      {/* 2. Main Body Content (All Sections) */}
      <main className="flex-1">
        {/* Breadcrumb */}
        <UiBreadcrumbs />

        {/* Hero Section (Image + Info + CTAs) */}
        <UiProductHero />

        {/* Related Product */}
        <UiRelatedProducts />

        {/* Product Reviews */}
        <UiReviewsSection />

        {/* Popular this week */}
        <UiPopularProducts />
      </main>

      {/* 3. Footer */}
      <UiFooter />

      {/* 4. Floating Settings Button to switch back to Dynamic API mode */}
      <FloatingPageSwitcher current="ui-only" />
    </div>
  );
}
