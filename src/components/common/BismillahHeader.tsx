'use client';

import React from 'react';
import { SupportedLanguage } from '@/types/wedding';

interface BismillahHeaderProps {
  arabic: string;
  translation: { en: string; ur: string };
  lang: SupportedLanguage;
}

export function BismillahHeader({ arabic, translation, lang }: BismillahHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center my-6 select-none">
      {/* Decorative top motif */}
      <div className="flex items-center gap-3 mb-3 text-[#B5965A]/70">
        <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#B5965A]" />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
        <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#B5965A]" />
      </div>

      {/* Arabic Script - Always isolated RTL */}
      <div
        dir="rtl"
        lang="ar"
        className="font-arabic text-2xl md:text-3xl text-[#342C26] tracking-wide leading-relaxed font-normal"
        style={{ fontFamily: '"Noto Naskh Arabic", "Noto Nastaliq Urdu", serif' }}
      >
        {arabic}
      </div>

      {/* Translation */}
      <p
        className={`text-xs md:text-sm text-[#8A8074] mt-2 max-w-md ${
          lang === 'ur' ? 'font-nastaliq leading-loose' : 'font-sans font-light tracking-wide'
        }`}
        dir={lang === 'ur' ? 'rtl' : 'ltr'}
      >
        {translation[lang]}
      </p>

      {/* Subtle bottom separator */}
      <div className="w-16 h-[1px] bg-[#B5965A]/40 mt-4" />
    </div>
  );
}
