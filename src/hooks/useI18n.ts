import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useEffect } from 'react';
import { ar } from '../locales/ar';

export type Language = 'en' | 'ar';

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useI18nStore = create<I18nStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => {
        if (typeof document !== 'undefined') {
          document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = lang;
        }
        set({ language: lang });
      },
      toggleLanguage: () =>
        set((state) => {
          const next = state.language === 'en' ? 'ar' : 'en';
          if (typeof document !== 'undefined') {
            document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = next;
          }
          return { language: next };
        }),
    }),
    {
      name: 'easy-order-language',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = state.language;
        }
      },
    }
  )
);

export const useI18n = () => {
  const { language, setLanguage, toggleLanguage } = useI18nStore();
  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRtl]);

  const t = (text: string): string => {
    if (language === 'ar') {
      return ar[text] || text;
    }
    return text;
  };

  return {
    t,
    language,
    isRtl,
    setLanguage,
    toggleLanguage,
  };
};

export default useI18n;
