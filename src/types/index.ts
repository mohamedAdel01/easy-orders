export interface VariationProp {
  id: string;
  name: string;
  variation_id?: string;
  value?: string; // image URL for type=image
}

export interface Variation {
  id: string;
  name: string;
  product_id: string;
  type: 'image' | 'button' | 'color';
  props: VariationProp[];
}

export interface VariantProp {
  id: string;
  variation: string;
  variation_prop: string;
  product_variant_id: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  price: number;
  sale_price: number;
  quantity: number;
  taager_code: string;
  variation_props: VariantProp[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  thumb?: string;
  show_in_header?: boolean;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  author?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  sale_price: number;
  description: string;
  slug: string;
  thumb: string;
  images: string[];
  quantity: number;
  track_stock: boolean;
  disable_orders_for_no_stock: boolean;
  variations: Variation[];
  variants: ProductVariant[];
  categories: Category[];
  reviews?: Review[];
  buy_now_text?: string;
  is_free_shipping?: boolean;
  store_id: string;
  hide_related_products?: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string; // unique cart item id (productId + variantId or productId)
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  thumb: string;
  quantity: number;
  selectedVariations: Record<string, string>; // { color: 'brown', size: '42' }
  maxQuantity?: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface ProductState {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  selectedVariations: Record<string, string>;
  selectedVariant: ProductVariant | null;
  quantity: number;
  activeImageIndex: number;
  setSelectedVariation: (variationName: string, propName: string) => void;
  setQuantity: (quantity: number) => void;
  setActiveImageIndex: (index: number) => void;
  setProduct: (product: Product) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getCurrentPrice: () => number;
  getOriginalPrice: () => number;
  isVariationSelected: (variationName: string, propName: string) => boolean;
  isCombinationAvailable: (variationName: string, propName: string) => boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface RequestConfig {
  service: string;
  slug?: string;
  params?: Record<string, string>;
  payload?: unknown;
}
