'use client';

import { createContext, useContext, useState, type ReactNode, useMemo, useCallback, useEffect } from 'react';
import { getTranslations, defaultLang, type LanguageCode, type Translations } from '@/lib/translations';

type LanguageContextType = {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
  loading: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>(defaultLang);
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadTranslations() {
      setLoading(true);
      try {
        const t = await getTranslations(lang);
        if (mounted) {
          setTranslations(t);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTranslations();

    return () => {
      mounted = false;
    };
  }, [lang]);

  const t = useCallback((key: string): string => {
    return translations[key] || key;
  }, [translations]);

  const value = useMemo(() => ({ lang, setLang, t, loading }), [lang, t, loading]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
