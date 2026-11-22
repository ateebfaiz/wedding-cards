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
    <div className="w-full my-5 border-2 border-[#DFBF73]/60 rounded-2xl bg-[#FAF7F2] overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#F5EFEB] transition-colors cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full bg-[#8B0000]/10 text-[#8B0000] border border-[#8B0000]/30 flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h4
              className={`text-sm sm:text-base font-bold text-[#35050C] ${
                lang === 'ur' ? 'font-nastaliq-display text-lg' : 'font-playfair'
              }`}
            >
              {lang === 'ur'
                ? `${guidance.originCity[lang]} سے تشریف لانے والے مہمانوں کے لیے سفری رہنمائی`
                : `Travel Guidance from ${guidance.originCity[lang]}`}
            </h4>
            <p className="text-xs text-[#7A6A5D] font-medium">
              {guidance.estimatedDuration[lang]} · {guidance.routeTitle[lang]}
            </p>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-[#8B0000] transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-[#DFBF73]/40 text-xs sm:text-sm text-[#5C4D43] space-y-3">
          <div className="p-3.5 bg-[#2E050B] text-[#FFDF73] rounded-xl border border-[#DFBF73]/50 flex items-start gap-2.5 shadow-2xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#DFBF73]" />
            <p className={`font-medium ${lang === 'ur' ? 'font-nastaliq-body text-xs' : ''}`}>
              {guidance.departureWindowNote[lang]}
            </p>
          </div>

          <ul className="space-y-2 text-xs leading-relaxed">
            {guidance.advisories.map((advisory, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#8B0000] font-bold mt-0.5">✦</span>
                <span className={lang === 'ur' ? 'font-nastaliq-body text-xs' : ''}>
                  {advisory[lang]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
