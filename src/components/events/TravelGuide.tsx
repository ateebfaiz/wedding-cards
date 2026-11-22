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
    <div className="w-full my-6 py-6 border-t border-[#B5965A]/35 text-start">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-start cursor-pointer select-none group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#702F3D]/10 text-[#702F3D] border border-[#702F3D]/25 flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h4
              className={`text-base sm:text-lg font-black text-[#2E050B] group-hover:text-[#702F3D] transition-colors ${
                lang === 'ur' ? 'font-sameer-zikran text-xl sm:text-2xl' : 'font-playfair'
              }`}
            >
              {lang === 'ur'
                ? `${guidance.originCity[lang]} سے سفری رہنمائی و راستے`
                : `Travel Guidance from ${guidance.originCity[lang]}`}
            </h4>
            <p className={`text-xs text-[#5A4D41] font-semibold mt-0.5 ${lang === 'ur' ? 'font-alqalam-taj text-sm' : 'font-sans'}`}>
              {guidance.estimatedDuration[lang]} · {guidance.routeTitle[lang]}
            </p>
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-[#B5965A] group-hover:text-[#702F3D] transition-transform duration-300 shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-[#B5965A]/25 text-xs sm:text-sm text-[#5A4D41] space-y-3 animate-in fade-in duration-300">
          <div className="p-3.5 bg-[#FCFAF6]/80 rounded-2xl border border-[#B5965A]/30 flex items-start gap-2.5 shadow-2xs">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#702F3D]" />
            <p className={`font-bold text-[#2E050B] ${lang === 'ur' ? 'font-alqalam-taj text-base leading-loose' : 'font-serif italic'}`}>
              {guidance.departureWindowNote[lang]}
            </p>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm leading-relaxed">
            {guidance.advisories.map((advisory, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-[#FCFAF6]/50 border border-[#B5965A]/15">
                <span className="text-[#702F3D] font-black mt-0.5">✦</span>
                <span className={lang === 'ur' ? 'font-alqalam-taj text-base leading-loose text-[#2E050B]' : 'font-sans text-[#342C26]'}>
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
