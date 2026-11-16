export const formatPrice = (price: number, currency = 'EGP'): string => {
  return `${price.toFixed(0)} ${currency}`;
};

export const calculateDiscount = (original: number, sale: number): number => {
  if (!original || !sale || sale >= original) return 0;
  return Math.round(((original - sale) / original) * 100);
};

export const getStarRating = (rating: number): { filled: number; empty: number } => {
  const filled = Math.floor(rating);
  const empty = 5 - filled;
  return { filled, empty };
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const stripHtml = (html: string): string => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export const getAllImages = (product: {
  thumb: string;
  images?: string[];
  variations?: { props?: { value?: string }[] }[];
}): string[] => {
  const imagesList: string[] = [];

  if (product.thumb) imagesList.push(product.thumb);
  if (product.images && product.images.length > 0) {
    imagesList.push(...product.images);
  }

  // Include color variation image values from the real API
  if (product.variations) {
    product.variations.forEach((v) => {
      if (v.props) {
        v.props.forEach((p) => {
          if (p.value && p.value.startsWith('http')) {
            imagesList.push(p.value);
          }
        });
      }
    });
  }

  // Dedup
  const unique = Array.from(new Set(imagesList));

  // High-quality fashion angles matching the Figma John Lewis Long Sleeve Overshirt model
  const fallbacks = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
  ];

  for (const fb of fallbacks) {
    if (unique.length >= 5) break;
    if (!unique.includes(fb)) {
      unique.push(fb);
    }
  }

  return unique;
};

export const debounce = <T extends (...args: unknown[]) => void>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
