'use client';

import React, { useState } from 'react';
import { TravelGuidance, SupportedLanguage } from '@/types/wedding';
import { Car, ChevronDown, AlertCircle } from 'lucide-react';

interface TravelGuideProps {
  guidance: TravelGuidance;
  lang: SupportedLanguage;
}

export function TravelGuide({ guidance, lang }: TravelGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full my-4 border border-[#B5965A]/25 rounded-lg bg-[#F8F5EE]/90 overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#EFE8DA]/40 transition-colors cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#545B43]/10 text-[#545B43] flex items-center justify-center">
            <Car className="w-4 h-4" />
          </div>
          <div>
            <h4
              className={`text-sm md:text-base text-[#342C26] font-medium ${
                lang === 'ur' ? 'font-nastaliq leading-loose' : 'font-serif'
              }`}
            >
              {lang === 'ur'
                ? `${guidance.originCity[lang]} سے تشریف لانے والے مہمانوں کے لیے رہنمائی`
                : `Travel Guidance from ${guidance.originCity[lang]}`}
            </h4>
            <p className="text-xs text-[#8A8074]">
              {guidance.estimatedDuration[lang]} · {guidance.routeTitle[lang]}
            </p>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#8A8074] transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-[#B5965A]/15 text-xs md:text-sm text-[#8A8074] space-y-3">
          <div className="p-3 bg-[#EFE8DA]/60 rounded border border-[#B5965A]/20 flex items-start gap-2.5 text-[#545B43]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className={lang === 'ur' ? 'font-nastaliq leading-loose' : ''}>
              {guidance.departureWindowNote[lang]}
            </p>
          </div>

          <ul className="space-y-2 list-disc list-inside text-xs leading-relaxed">
            {guidance.advisories.map((advisory, idx) => (
              <li key={idx} className={lang === 'ur' ? 'font-nastaliq leading-loose' : ''}>
                {advisory[lang]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
