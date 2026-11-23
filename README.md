# E-Commerce Product Detail Page — John Lewis ANYDAY / EasyOrders

A production-ready, pixel-perfect e-commerce product detail page built with **React 19**, **TypeScript**, **Tailwind CSS**, **Zustand with Immer**, and **TanStack React Query**, integrated with the **EasyOrders API** and replicating the **Figma Community Design** (node `57:1305`) with 100% fidelity.

---

## 📋 Table of Contents
- [1. Setup Instructions](#1-setup-instructions)
- [2. Code Structure & Architecture](#2-code-structure--architecture)
- [3. Key Features & Implementation](#3-key-features--implementation)
  - [Product Image Gallery](#product-image-gallery)
  - [Variation Selection & Validation](#variation-selection--validation)
  - [Cart Management & Persistence](#cart-management--persistence)
  - [Wishlist Functionality](#wishlist-functionality)
  - [API Integration & React Query Caching](#api-integration--react-query-caching)
- [4. State Management Architecture](#4-state-management-architecture)
- [5. Responsive Design & Performance](#5-responsive-design--performance)
- [6. Testing Suite](#6-testing-suite)
- [7. Deployment Instructions](#7-deployment-instructions)

---

## 1. Setup Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **Package Manager**: `npm` (v9+) or `pnpm` (v8+)

### Installation
Clone or navigate to the `product-page` project root:
```bash
cd product-page
npm install
```

### Environment Configuration
The project is preconfigured to connect to the EasyOrders production API. Create a `.env` file in the root directory if customizing API endpoints:
```env
VITE_API_BASE_URL=https://api.easy-orders.net/api/v1
```

### Running the Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:5173/`.

### Available Scripts
- `npm run dev`: Starts the Vite local development server with HMR.
- `npm run build`: Runs TypeScript type checking (`tsc -b`) and bundles for production (`vite build`).
- `npm run lint`: Runs `oxlint` across all files with 116 high-performance rules.
- `npm test`: Runs the Vitest test suite (`vitest run`).
- `npm run preview`: Previews the production build locally.

---

## 2. Code Structure & Architecture

```
product-page/
├── public/
│   ├── figma-assets/         # 56 exact Figma SVGs and high-res WebP/PNG assets
│   └── fonts/                # Clash Grotesk and Raleway web fonts
├── src/
│   ├── types/
│   │   └── index.ts          # Core TypeScript interfaces (Product, Variant, Cart, Wishlist)
│   ├── services/
│   │   └── index.ts          # Centralized SERVICES endpoint registry
│   ├── hooks/
│   │   ├── useProduct.ts     # TanStack React Query cached product hook
│   │   ├── useApiRequest.ts  # Generic API request wrapper
│   │   └── useI18n.ts        # Localization & RTL layout hook
│   ├── store/
│   │   ├── cartStore.ts      # Persistent cart store with Immer & localStorage
│   │   ├── productStore.ts   # Active product, variants, and pricing store
│   │   ├── wishlistStore.ts  # Persistent wishlist store with badge count
│   │   └── globalStore.ts    # Granular tuple-based loading state manager
│   ├── components/
│   │   ├── ui-only/          # Pixel-perfect modular section components
│   │   │   ├── UiNavbar.tsx            # Header, announcement bar, cart/wishlist badges
│   │   │   ├── UiBreadcrumbs.tsx       # Semantic breadcrumb trail
│   │   │   ├── UiProductHero.tsx       # Hero info, buy-box, quantity & variation controls
│   │   │   ├── UiProductGallery.tsx    # Magnifying zoom, thumbnails, transitions, lightbox
│   │   │   ├── UiRelatedProducts.tsx   # 5-card related products carousel
│   │   │   ├── UiReviewsSection.tsx    # Breakdown chart, topic filters, review cards
│   │   │   ├── UiPopularProducts.tsx   # Popular items recommendation carousel
│   │   │   └── UiFooter.tsx            # Multi-column footer & language switcher
│   │   ├── cart/             # Slide-out cart drawer, cart items, summary
│   │   │   ├── CartDrawer.tsx          # Accessible modal drawer with body scroll-lock
│   │   │   ├── CartItem.tsx            # Cart item with quantity adjustment & remove
│   │   │   ├── CartSummary.tsx         # Subtotal, shipping thresholds, total, checkout
│   │   │   └── FloatingCartButton.tsx  # Mobile floating action button with count badge
│   │   ├── wishlist/
│   │   │   └── WishlistDrawer.tsx      # Slide-out wishlist drawer with "Move to Cart"
│   │   └── ui/
│   │       ├── ProductSkeleton.tsx     # Loading skeleton for PDP
│   │       ├── ErrorState.tsx          # Error boundary with retry & demo fallback CTA
│   │       ├── QuantitySelector.tsx    # Reusable counter with min/max bounds
│   │       └── StarRating.tsx          # Star rating display
│   ├── pages/
│   │   └── ProductPage.tsx   # Primary orchestrator page (Route: `/` and `/products/:theme/:slug`)
│   └── test/                 # 43 automated Vitest unit and integration tests
```

---

## 3. Key Features & Implementation

### Product Image Gallery
- **Hover Magnifying Zoom**: Dynamically calculates cursor percentages `(x, y)` relative to the container and applies `transformOrigin: x% y%` with `scale(2.2)`. Uses fast `75ms` transition during movement for lag-free cursor tracking.
- **Click-to-Zoom Lock**: Clicking toggles zoom lock; supports touch drag and panning on mobile and tablet screens.
- **Smooth Transitions**: Images are cross-faded using `opacity 400ms cubic-bezier(0.4, 0, 0.2, 1)`. Active thumbnail gets an elevated border `scale-[1.03]`.
- **Lightbox Fullscreen**: An expand button in the upper-right corner opens a full-screen image viewer with keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
- **Aspect Ratios & Zero CLS**: Main container strictly enforces `aspect-[458/610]` with explicit HTML `width={458} height={610}`; thumbnails enforce `aspect-[76/100]` with `width={76} height={100}`.

### Variation Selection & Validation
- **Color & Size Selectors**: Interactive color swatches (`Royal Brown`, `Off White`, `Slate Blue`, `Dark Navy`) and size buttons (`6`, `8`, `10`, `14`, `18`, `20`).
- **Pre-Add-to-Cart Validation**: Clicking "Add To Cart" validates that both color and size are selected. If unselected or out-of-stock, an accessible inline alert informs the user.
- **Variant Matching & Dynamic Pricing**: Automatically looks up the matching variant from `product.variants` to reflect correct sale prices and available stock.
- **Quantity Constraints**: Min quantity is 1; max quantity is constrained by the selected variant's stock.
- **Success Feedback**: Adding an item triggers a success banner (`✓ Added X item(s) to cart!`) with a direct "View Cart" action and increments the Navbar cart badge.

### Cart Management & Persistence
- **Persistent Storage**: Cart items are persisted to `localStorage` via Zustand `persist` middleware.
- **Slide-out Cart Drawer (`CartDrawer.tsx`)**:
  - Accessible dialog (`role="dialog"`, `aria-modal="true"`) with Escape key handling and background body scroll-locking.
  - Item quantity adjustment with decrement, increment, and removal when quantity reaches 0.
  - Trash button for one-click item deletion.
  - Subtotal and total price calculation with free shipping progress threshold.
  - Empty cart state with illustration and "Continue Shopping" button.
- **Navbar & Floating Cart Badges**:
  - The Navbar cart bag displays a live item counter badge.
  - Mobile screens feature a floating cart button (`FloatingCartButton.tsx`) for instant access.

### Wishlist Functionality
- Heart button in the Hero gallery toggles the product in `useWishlistStore`.
- Visual feedback via filled heart state and Navbar wishlist badge.
- Dedicated `WishlistDrawer.tsx` allowing users to view saved items and move them directly to the cart (`Move to Cart`).

### API Integration & React Query Caching
- Connected to `https://api.easy-orders.net/api/v1/products/slug/:theme/:slug?join=reviews`.
- Managed through **TanStack React Query** with a 5-minute stale-time (`staleTime: 5 * 60 * 1000`) and 10-minute cache lifetime (`gcTime: 10 * 60 * 1000`).
- Safe fallback mechanism:
  - Valid API responses are **never** overwritten by mock data.
  - Invalid responses (empty objects or `{ message: "record not found" }`) are caught and treated as errors.
  - On the root demo route (`/`), if the live API is offline or returns 404, the application falls back safely to `FIGMA_PRODUCT` with an informative banner and a "Retry API" button.

---

## 4. State Management Architecture

All stores utilize **Zustand** combined with **Immer** for atomic, immutable state updates:

```ts
// Example: Cart Store with Immer & Persistence
export const useCartStore = create<CartState>()(
  persist(
    immer((set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const id = generateCartItemId(item.productId, item.selectedVariations);
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            existing.quantity = Math.min(existing.quantity + item.quantity, item.maxQuantity || 99);
          } else {
            state.items.push({ ...item, id });
          }
          state.isOpen = true;
        });
      },
      ...
    })),
    {
      name: 'easy-order-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

---

## 5. Responsive Design & Performance

- **Breakpoints**: Optimized across Mobile (`<640px`), Tablet (`640px - 1024px`), and Desktop (`>1024px`).
- **Touch-Friendly Controls**: Touch targets meet 44×44px minimum sizing; swipe gestures supported on mobile gallery.
- **Performance Optimizations**:
  - Priority LCP image loading with `loading="eager"` and `fetchPriority="high"`.
  - Lazy loading for thumbnails and below-the-fold images (`loading="lazy"` and `decoding="async"`).
  - Code splitting via Vite `rollupOptions.manualChunks` into granular vendor chunks:
    - `vendor-react` (React, ReactDOM, React Router)
    - `vendor-query` (@tanstack/react-query)
    - `vendor-state` (Zustand, Immer)

---

## 6. Testing Suite

The project includes **43 automated unit and integration tests** in **Vitest**:

```bash
npm test
```

### Test Coverage Summary:
```
✓ src/test/variationValidation.test.ts (6 tests)
  - requires both color and size before adding to cart
  - identifies out-of-stock combination properly
  - enforces minimum quantity of 1
  - enforces maximum quantity bounded by available stock
  - adds validated item to cart and opens drawer
  - adjusts item quantity with bounds in the cart

✓ src/test/productApi.test.ts (7 tests)
  - constructs product URL with theme and slug
  - verifies SERVICES configuration
  - rejects empty or "record not found" responses
  - accepts valid product responses
  - provides all mandatory fields in FIGMA_PRODUCT
  - never overrides valid API product with fallback
  - populates productStore from resolved product data

✓ src/test/gallery.test.ts (4 tests)
  - defines 5 exact Figma gallery images and thumbnails
  - maintains precise Figma aspect ratios (458x610 and 76x100)
  - calculates clamped zoom coordinates within [0, 100]
  - wraps image navigation circularly

✓ src/test/cartStore.test.ts (7 tests)
  - adds item, increments existing, deduplicates variations
  - updates quantity, removes items, calculates totals, clears cart

✓ src/test/wishlistStore.test.ts (5 tests)
  - adds, removes, toggles items, manages drawer open/close

✓ src/test/productStore.test.ts (4 tests)
  - initializes variations, switches variants, detects stock limits

✓ src/test/globalStore.test.ts (6 tests)
  - tuple-based loading state tracking and global loading flag

✓ src/test/i18n.test.ts (4 tests)
  - language switching and Arabic dictionary translations

Test Files: 8 passed (8) | Tests: 43 passed (43)
```

---

## 7. Deployment Instructions

### Production Build
```bash
npm run build
```
This generates an optimized, tree-shaken static bundle in the `dist/` directory.

### Deploy to Vercel / Netlify
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Single Page App Routing**: All client routes redirect to `/index.html` (Vercel `vercel.json` or Netlify `_redirects` with `/* /index.html 200`).
