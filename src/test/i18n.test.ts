import { describe, it, expect, beforeEach } from 'vitest';
import { useI18nStore } from '../hooks/useI18n';
import { ar } from '../locales/ar';

describe('i18n & RTL system', () => {
  beforeEach(() => {
    useI18nStore.getState().setLanguage('en');
  });

  it('defaults to English', () => {
    expect(useI18nStore.getState().language).toBe('en');
  });

  it('switches language and updates state', () => {
    useI18nStore.getState().setLanguage('ar');
    expect(useI18nStore.getState().language).toBe('ar');
  });

  it('toggles language between en and ar', () => {
    useI18nStore.getState().toggleLanguage();
    expect(useI18nStore.getState().language).toBe('ar');

    useI18nStore.getState().toggleLanguage();
    expect(useI18nStore.getState().language).toBe('en');
  });

  it('translates essential product keys accurately in Arabic dictionary', () => {
    expect(ar['Add To Cart']).toBe('أضف إلى السلة');
    expect(ar['Your Cart']).toBe('سلة مشترياتك');
    expect(ar['Product Reviews']).toBe('تقييمات المنتج');
    expect(ar['Related Product']).toBe('منتجات ذات صلة');
    expect(ar['Popular this week']).toBe('الأكثر طلباً هذا الأسبوع');
    expect(ar['John Lewis ANYDAY']).toBe('جون لويس إني داي');
    expect(ar['Long Sleeve Overshirt, Khaki, 6']).toBe('قميص علوي بأكمام طويلة، كاكي، 6');
  });
});