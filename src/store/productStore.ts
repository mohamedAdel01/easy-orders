import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Product, ProductVariant, ProductState } from '../types';

const findMatchingVariant = (
  variants: ProductVariant[],
  selectedVariations: Record<string, string>
): ProductVariant | null => {
  if (!variants || variants.length === 0 || Object.keys(selectedVariations).length === 0) return null;

  return (
    variants.find((variant) => {
      return variant.variation_props.every((vp) => {
        const selected = selectedVariations[vp.variation];
        if (!selected) return true;
        return selected.toLowerCase() === vp.variation_prop.toLowerCase();
      });
    }) || null
  );
};

export const useProductStore = create<ProductState>()(
  immer((set, get) => ({
    product: null,
    isLoading: false,
    error: null,
    selectedVariations: {},
    selectedVariant: null,
    quantity: 1,
    activeImageIndex: 0,

    setProduct: (product: Product) => {
      set((state) => {
        state.product = product;
        state.selectedVariations = {};
        if (product.variations && product.variations.length > 0) {
          product.variations.forEach((v) => {
            if (v.props && v.props.length > 0) {
              state.selectedVariations[v.name] = v.props[0].name;
            }
          });
        }
        state.selectedVariant = findMatchingVariant(product.variants, state.selectedVariations);
        state.quantity = 1;
        state.activeImageIndex = 0;
      });
    },

    setLoading: (loading: boolean) => {
      set((state) => {
        state.isLoading = loading;
      });
    },

    setError: (error: string | null) => {
      set((state) => {
        state.error = error;
      });
    },

    setSelectedVariation: (variationName: string, propName: string) => {
      set((state) => {
        state.selectedVariations[variationName] = propName;
        if (state.product) {
          state.selectedVariant = findMatchingVariant(state.product.variants, state.selectedVariations);
        }
      });
    },

    setQuantity: (quantity: number) => {
      set((state) => {
        state.quantity = Math.max(1, quantity);
      });
    },

    setActiveImageIndex: (index: number) => {
      set((state) => {
        state.activeImageIndex = index;
      });
    },

    getCurrentPrice: () => {
      const { selectedVariant, product } = get();
      if (selectedVariant && selectedVariant.sale_price > 0) {
        return selectedVariant.sale_price;
      }
      if (product && product.sale_price > 0) {
        return product.sale_price;
      }
      if (selectedVariant && selectedVariant.price > 0) {
        return selectedVariant.price;
      }
      return product?.price || 0;
    },

    getOriginalPrice: () => {
      const { selectedVariant, product } = get();
      if (selectedVariant && selectedVariant.price > 0) {
        return selectedVariant.price;
      }
      return product?.price || 0;
    },

    isVariationSelected: (variationName: string, propName: string) => {
      return get().selectedVariations[variationName]?.toLowerCase() === propName.toLowerCase();
    },

    isCombinationAvailable: (variationName: string, propName: string) => {
      const { product, selectedVariations } = get();
      if (!product || !product.variants || product.variants.length === 0) return true;

      // Find any variant that has this prop and matches all other already selected variations
      const matchingVariant = product.variants.find((v) => {
        const hasTargetProp = v.variation_props.some(
          (vp) =>
            vp.variation.toLowerCase() === variationName.toLowerCase() &&
            vp.variation_prop.toLowerCase() === propName.toLowerCase()
        );
        if (!hasTargetProp) return false;

        const matchesOthers = Object.entries(selectedVariations).every(([otherVar, otherVal]) => {
          if (otherVar.toLowerCase() === variationName.toLowerCase()) return true;
          return v.variation_props.some(
            (vp) =>
              vp.variation.toLowerCase() === otherVar.toLowerCase() &&
              vp.variation_prop.toLowerCase() === otherVal.toLowerCase()
          );
        });

        return matchesOthers;
      });

      if (!matchingVariant) return false;
      if (product.track_stock && matchingVariant.quantity <= 0) return false;
      return true;
    },
  }))
);
