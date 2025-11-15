"use client";
import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from '@/providers/i18n-provider';

export function useI18n(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
