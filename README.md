# E-Commerce Product Detail Page — John Lewis & Partners / EasyOrders

A pixel-perfect, highly responsive e-commerce product detail page built with **React 18/19**, **TypeScript**, **Tailwind CSS**, **Zustand with Immer**, and **TanStack React Query**, integrated with the **EasyOrders API** and matching the **Figma Community Design** with 100% fidelity.

---

## 🎯 Project Highlights & Requirements Coverage

- **Pixel-Perfect Figma Fidelity**: Matches every layout, spacing, typography hierarchy, squircle curves, borders, colors (`#141414`, `#F2F2F2`, `#818B9C`, `#FFA439`), and exact Figma SVGs.
- **Robust State Management**: Built with **Zustand** + **Immer** for immutable updates, featuring:
  - `cartStore`: Persistent cart (`localStorage`), quantity constraints, deduplication by variation combinations, real-time subtotal & total calculation.
  - `productStore`: Dynamic variation selection, variant price syncing, stock tracking, and combination availability checking.
  - `wishlistStore`: Persistent wishlist (`localStorage`), one-click toggle, badge count, and dedicated `WishlistDrawer`.
  - `i18nStore`: Complete localization (English & Arabic) with automatic `dir="rtl"` / `dir="ltr"` switching.
- **Dynamic API Integration**: Live endpoint integration (`https://api.easy-orders.net/api/v1/products/slug/clear-theme/Sneakers12?join=reviews`) fetching real product details, images, variations (color swatches & size buttons), variants, and pricing.
- **Full i18n & RTL Localization**: Follows `AGENTS.md` standards with direct English keys (`t('English Text')`), flat Arabic dictionary in `locales/ar.ts`, and visual directional arrow flipping (`ChevronArrowIcon` based on `isRtl`).
- **Comprehensive Unit Testing**: 20 automated tests across 4 test suites using **Vitest** testing store actions, computed values, persistence, variant matching, and i18n translations.

---

## 🚀 Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Framework** | React 19 + TypeScript | Strict typing, functional components with hooks |
| **Styling** | Tailwind CSS v3 | Custom configuration, responsive breakpoints, zero heavy UI kits |
| **State Management** | Zustand + Immer | Lightweight, immutable state updates, persistent storage |
| **Data Fetching** | TanStack React Query v5 | Centralized `SERVICES` map, query caching, error/loading states |
| **Testing** | Vitest | 20 unit & integration tests, high-speed execution (<200ms) |
| **Icons & Brand** | Official Figma SVGs | Pixel-perfect SVGs extracted directly from design source |
| **Build Tool** | Vite | Production build with code splitting in ~750ms |

---

## 📁 Component Architecture & Directory Structure

```
product-page/
├── public/
│   └── logo.png              # Official John Lewis & Partners logo (207x39 transparent PNG)
├── src/
│   ├── types/
│   │   └── index.ts          # Comprehensive TypeScript interfaces (Product, Variant, Cart, Wishlist, I18n)
│   ├── services/
│   │   ├── index.ts          # Centralized SERVICES endpoint registry
│   │   └── productService.ts # Data fetching service with EasyOrders API & Figma mock fallbacks
│   ├── hooks/
│   │   ├── useProduct.ts     # React Query hook for product fetching
│   │   ├── useApiRequest.ts  # Centralized API request hook
│   │   └── useI18n.ts        # i18n & RTL translation hook
│   ├── locales/
│   │   └── ar.ts             # Flat Arabic localization dictionary (100+ translation keys)
│   ├── store/
│   │   ├── cartStore.ts      # Cart store with Immer & persist
│   │   ├── productStore.ts   # Product, variant matching, & combination checking
│   │   └── wishlistStore.ts  # Wishlist store with Immer & persist
│   ├── components/
│   │   ├── icons/
│   │   │   └── index.tsx     # Exact Figma SVGs (Search, User, Star, Like, Dislike, ChevronArrow, Share, Socials)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx    # Header with announcement countdown, logo, search, categories, wishlist, cart
│   │   │   └── Footer.tsx    # Exact Figma footer: newsletter input, social icons, 3 link columns, language switcher
│   │   ├── product/
│   │   │   ├── ProductGallery.tsx   # Main image + 5 thumbnails + hover zoom + external floating action buttons
│   │   │   ├── ProductInfo.tsx      # Dynamic title, HTML description toggle, prices, stock indicator, quantity, CTA
│   │   │   ├── VariationSelector.tsx# Color swatches with endpoint images + size buttons with unavailable disabling
│   │   │   ├── ReviewsSection.tsx   # Rating breakdown, filter tabs, sorting, customer reviews with likes/dislikes
│   │   │   ├── RelatedProducts.tsx  # Related products & Popular this week carousels/grids
│   │   │   └── ProductCard.tsx      # Reusable product card with image, title, price, and star rating
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx       # Slide-out persistent cart drawer with keyboard & overlay support
│   │   │   ├── CartItem.tsx         # Cart item with thumbnail, quantity buttons, and remove action
│   │   │   └── CartSummary.tsx      # Subtotal, free shipping badge, and checkout CTA
│   │   ├── wishlist/
│   │   │   └── WishlistDrawer.tsx   # Slide-out wishlist drawer with "Move to Cart" action
│   │   └── ui/
│   │       ├── QuantitySelector.tsx # Min/max constrained quantity counter
│   │       ├── StarRating.tsx       # Figma star rating component (#FFA439)
│   │       ├── ProductSkeleton.tsx  # Smooth animated skeleton loading state
│   │       └── ErrorState.tsx       # Error state with retry action
│   ├── test/
│   │   ├── setup.ts                 # Vitest test setup and localStorage mocking
│   │   ├── cartStore.test.ts        # Cart actions & calculations tests (7 tests)
│   │   ├── productStore.test.ts     # Product & variant matching tests (4 tests)
│   │   ├── wishlistStore.test.ts    # Wishlist persistence & toggle tests (5 tests)
│   │   └── i18n.test.ts             # i18n & RTL dictionary tests (4 tests)
│   ├── pages/
│   │   └── ProductPage.tsx          # Main PDP page orchestration
│   ├── App.tsx                      # Application routing
│   └── main.tsx                     # Entry point with QueryClientProvider
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Setup & Execution Instructions

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or pnpm / yarn)

### 2. Installation
```bash
# Navigate to the product-page directory
cd product-page

# Install all dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will start immediately at:
👉 **`http://localhost:5173/`**

### 4. Run Test Suite
```bash
npm test
```
Runs 20 automated unit and integration tests across 4 suites via Vitest.

### 5. Production Build & Preview
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🎨 UI/UX Implementation Details

### 1. Product Image Gallery
- **Main Image**: Aspect ratio `[3/4]` to `[4/5]` with squircle `rounded-2xl` borders and `#f4f4f4` background.
- **Hover Zoom**: Smooth mouse-move magnifying zoom (`scale(2.2)`) with dynamic transform origin matching cursor position.
- **External Floating Action Strip**: Positioned **outside** the image frame with:
  - Official Figma **Share** SVG (`20x20` tray + arrow) with clipboard URL copy.
  - Wishlist Heart button with live red fill when active.
  - Previous / Next navigation buttons with official Figma `ChevronArrowIcon` automatically flipped for RTL.
- **Thumbnails**: 5 portrait thumbnail cards with active selection ring (`border-2 border-black ring-1 ring-black`).

### 2. Product Information Section
- **Dynamic Title & Category**: Real brand name and title fetched directly from the EasyOrders API.
- **Rich HTML Description**: Formats bullet points and lists cleanly with an expandable `See More....` / `See Less` toggle.
- **Dynamic Pricing**: Shows original price and highlighted sale price, updating dynamically as variants are selected.
- **Stock Status Indicator**:
  - `In Stock` (green badge with dot).
  - `Only X left in stock` (amber pulsing indicator when stock <= 5).
  - `Out of Stock` (red badge, disables CTA buttons).
- **Quantity Selector**: Enforces `min: 1` and `max: stock` limits.
- **Action Buttons**:
  - `Add to Cart`: Variation validation, success feedback ("Added To Cart"), and item addition to persistent cart.
  - `Checkout Now`: Validates variations, adds item, and automatically slides out the cart drawer.

### 3. Variations & Combinations Selection
- **Color Swatches**: Render digital thumbnails directly from API image URLs with exact Figma squircle curves.
- **Size Buttons**: Render dynamic sizes (`38`, `40`, `42`) with selected style matching Figma `#ececec` and `border-gray-400`.
- **Unavailable Combination Handling**: `isCombinationAvailable` checks `product.variants` for stock; unavailable options are visually disabled (`line-through`, `cursor-not-allowed`, opacity reduced) to prevent invalid orders.

### 4. Cart & Wishlist Management
- **Persistent Cart Drawer**: Slides in from right (or left in RTL), traps focus, closes on `Escape` or overlay click.
- **Quantity Adjustment**: Smooth `+` and `-` controls with real-time subtotal and total calculations.
- **Wishlist Drawer**: Independent persistent wishlist with one-click "Move to Cart" action.
- **Empty States**: Beautiful empty cart and wishlist illustrations with "Continue Shopping" CTA.

### 5. Header & Footer (Exact Figma Layout)
- **Top Announcement Bar**: Centered promotional text with `Checkout Now!` (no underline) and live countdown timer badge (`20:29`).
- **Header**: John Lewis & Partners logo image, Search icon (`Frame 7.svg`), Categories dropdown, Sign in (`Frame.svg`), Wishlist heart with badge counter, and Shopping Bag with badge counter.
- **Footer**: Exact Figma `#F2F2F2` background, side-by-side layout:
  - Left: Logo, underline newsletter input with squircle chevron button, 4 circular social buttons (`f`, `instagram`, `twitter`, `mail`).
  - Right: 3 distinct columns (`Shop`, `Information`, `Company`) with 4 links each.
  - Bottom: `© John Lewis plc 2001 - 2024` on left; interactive `🇪🇬 العربية / 🇺🇸 English` language switcher and `USD / EGP` currency on right.

---

## 🌐 Localization & RTL Support

- **Zero Dot-Notation Keys**: All keys are natural English phrases (`t('Add To Cart')`, `t('My Wishlist')`).
- **Flat Dictionary**: Defined in `src/locales/ar.ts`.
- **One-Click Language Switcher**: Located in the footer (and mobile menu); instantly switches between English LTR and Arabic RTL.
- **Directional Icon Inversion**: Arrows and chevrons automatically reverse orientation via `isRtl ? 'left' : 'right'` without altering SVG definitions.

---

## 🧪 Testing Verification

```bash
✓ src/test/productStore.test.ts (4 tests)
  - initializes default variations and matches initial variant
  - switches variations and updates variant and prices
  - detects unavailable or out-of-stock combinations
  - updates quantity with min constraint

✓ src/test/wishlistStore.test.ts (5 tests)
  - adds an item to the wishlist
  - does not duplicate items when adding existing item
  - removes an item from the wishlist
  - toggles item in wishlist (adds if absent, removes if present)
  - controls wishlist drawer open and close state

✓ src/test/cartStore.test.ts (7 tests)
  - adds an item to the cart
  - increments quantity when adding same variation combination
  - creates separate items for different variation combinations
  - updates quantity of an existing item
  - removes an item by id
  - calculates total price correctly
  - clears all items from the cart

✓ src/test/i18n.test.ts (4 tests)
  - defaults to English
  - switches language and updates state
  - toggles language between en and ar
  - translates essential product keys accurately in Arabic dictionary

Test Files  4 passed (4)
Tests       20 passed (20)
```

---

## 📦 Deployment Instructions

The application is fully configured for static hosting (Vercel, Netlify, GitHub Pages, or AWS S3):

```bash
npm run build
```
Deploy the generated `dist/` directory directly to any static host or CDN. All routes and dynamic assets are statically bundled and optimized.
