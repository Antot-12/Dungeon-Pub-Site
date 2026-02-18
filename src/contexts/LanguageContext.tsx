'use client';

import { createContext, useContext, useState, type ReactNode, useMemo, useCallback } from 'react';
import { ui, defaultLang, type LanguageCode } from '@/lib/translations';

type LanguageContextType = {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: keyof typeof ui[typeof defaultLang]) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<LanguageCode>(defaultLang);

  const t = useCallback((key: keyof typeof ui[typeof defaultLang]): string => {
    return ui[lang][key] || ui[defaultLang][key];
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

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
