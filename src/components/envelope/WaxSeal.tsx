'use client';

import React from 'react';
import { SupportedLanguage } from '@/types/wedding';

interface WaxSealProps {
  monogram: { en: string; ur: string };
  lang: SupportedLanguage;
  onClick: () => void;
  isCracking?: boolean;
}

export function WaxSeal({ monogram, lang, onClick, isCracking }: WaxSealProps) {
  const displayMonogram = lang === 'ur' ? monogram.ur : monogram.en;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Break seal to open invitation"
      className={`group relative w-24 h-24 md:w-28 md:h-28 rounded-full cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-[#B5965A]/40 transition-transform duration-300 transform ${
        isCracking ? 'scale-110 rotate-6 opacity-80' : 'hover:scale-105 active:scale-95'
      }`}
    >
      {/* Outer irregular wax drip contour */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#B5965A] to-[#8C6D37] shadow-[0_10px_25px_rgba(133,96,38,0.45),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,0,0,0.5)] border-2 border-[#E7C970]/50" />

      {/* Wax drip imperfections / organic contour */}
      <div className="absolute -top-1 left-3 w-4 h-3 bg-[#B5965A] rounded-full blur-[0.5px] opacity-75" />
      <div className="absolute -bottom-1.5 right-4 w-5 h-4 bg-[#8C6D37] rounded-full blur-[0.5px] opacity-80" />
      <div className="absolute top-6 -left-1.5 w-3 h-5 bg-[#A88842] rounded-full blur-[0.5px] opacity-60" />

      {/* Inner embossed stamp ring */}
      <div className="absolute inset-2 md:inset-2.5 rounded-full border border-[#7A5B27]/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center bg-gradient-to-tr from-[#9B7C3B] via-[#C5A358] to-[#DFC176]">
        {/* Fine beaded circular border */}
        <div className="absolute inset-1 rounded-full border border-dashed border-[#F3DE97]/60" />

        {/* Monogram Text with 3D letterpress effect */}
        <span
          className={`relative z-10 text-center font-serif text-lg md:text-xl font-bold tracking-widest text-[#4A3816] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] select-none ${
            lang === 'ur' ? 'font-nastaliq text-base md:text-lg leading-normal' : ''
          }`}
          style={{ textShadow: '0 1px 1px rgba(255,255,255,0.4), 0 -1px 1px rgba(0,0,0,0.5)' }}
        >
          {displayMonogram}
        </span>

        {/* Small ceremonial crest underneath */}
        <span className="text-[9px] uppercase tracking-widest text-[#5C451C] mt-0.5 opacity-80 font-sans">
          ✦
        </span>
      </div>

      {/* Lustre reflection highlight */}
      <div className="absolute top-2 left-4 w-7 h-4 bg-white/25 rounded-full blur-[1px] transform -rotate-30 pointer-events-none" />
    </button>
  );
}
