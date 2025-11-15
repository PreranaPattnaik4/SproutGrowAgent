
'use client';
import type { ReactNode } from 'react';
import { createContext, useMemo, useState } from 'react';

import { translations, type Translation } from '@/lib/i18n';

export type Language = 'en';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translation;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const t = useMemo(() => translations[language], [language]);

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
