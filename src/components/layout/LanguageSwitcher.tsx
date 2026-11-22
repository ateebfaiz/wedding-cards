'use client';

import React from 'react';
import { SupportedLanguage } from '@/types/wedding';

interface LanguageSwitcherProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-[#B5965A]/35 bg-[#F8F5EE]/90 p-0.5 shadow-xs backdrop-blur-xs select-none">
      <button
        type="button"
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1 rounded-full text-xs font-medium tracking-wider transition-colors cursor-pointer ${
          currentLang === 'en'
            ? 'bg-[#545B43] text-[#F8F5EE] shadow-xs'
            : 'text-[#8A8074] hover:text-[#342C26]'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>

      <span className="w-[1px] h-3 bg-[#B5965A]/30 mx-0.5" />

      <button
        type="button"
        onClick={() => onLanguageChange('ur')}
        className={`px-3 py-1 rounded-full text-xs font-nastaliq transition-colors cursor-pointer ${
          currentLang === 'ur'
            ? 'bg-[#545B43] text-[#F8F5EE] shadow-xs'
            : 'text-[#8A8074] hover:text-[#342C26]'
        }`}
        aria-label="اردو میں تبدیل کریں"
      >
        اردو
      </button>
    </div>
  );
}
