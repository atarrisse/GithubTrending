'use client';

import { useState } from 'react';
import { type Language } from '@/app/constants';

export interface LanguageFilterActions {
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
}

export const useLanguageFilter = (initialLanguage: Language = 'All'): LanguageFilterActions => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(initialLanguage);

  return {
    selectedLanguage,
    setSelectedLanguage,
  };
};

export default useLanguageFilter;
