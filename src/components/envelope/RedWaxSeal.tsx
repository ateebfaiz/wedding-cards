'use client';

import React from 'react';
import { SupportedLanguage } from '@/types/wedding';

interface RedWaxSealProps {
  monogram: { en: string; ur: string };
  lang: SupportedLanguage;
  onClick: () => void;
  isCracking?: boolean;
}

export function RedWaxSeal({ monogram, lang, onClick, isCracking }: RedWaxSealProps) {
  const displayMonogram = lang === 'ur' ? monogram.ur : monogram.en;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Break red wax seal to open invitation"
      className={`group relative w-28 h-28 md:w-32 md:h-32 rounded-full cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-[#8B0000]/40 transition-all duration-300 transform ${
        isCracking ? 'scale-110 rotate-6 opacity-80' : 'hover:scale-105 active:scale-95'
      }`}
    >
      {/* SVG Detailed Royal Red Wax Seal */}
      <svg
        viewBox="0 0 140 140"
        className="w-full h-full drop-shadow-[0_12px_28px_rgba(74,14,23,0.55)] overflow-visible"
      >
        <defs>
          {/* Radial gradient for rich 3D carmine red wax body */}
          <radialGradient id="redWaxBody" cx="42%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#C92A2A" />
            <stop offset="35%" stopColor="#A61B1B" />
            <stop offset="70%" stopColor="#7B1113" />
            <stop offset="100%" stopColor="#4A0E17" />
          </radialGradient>

          {/* Inner embossed stamp plate gradient */}
          <radialGradient id="innerPlate" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#A81D1D" />
            <stop offset="55%" stopColor="#7E1214" />
            <stop offset="90%" stopColor="#580C10" />
            <stop offset="100%" stopColor="#38070A" />
          </radialGradient>

          {/* Gold highlight for engraved deboss details */}
          <linearGradient id="goldEngraving" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDF73" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA8222" />
            <stop offset="100%" stopColor="#6E4F0E" />
          </linearGradient>

          {/* Specular gloss filter */}
          <filter id="waxGloss" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feSpecularLighting in="blur" surfaceScale="3" specularConstant="1.2" specularExponent="20" result="spec">
              <fePointLight x="45" y="35" z="70" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" operator="in" result="specOut" />
            <feBlend in="SourceGraphic" in2="specOut" mode="screen" />
          </filter>
        </defs>

        {/* Outer Irregular Organic Wax Flange with real liquid drips */}
        <path
          d="M70,8 
             C84,7 98,13 110,24 
             C121,35 128,48 131,64 
             C134,80 129,97 119,109 
             C110,121 98,129 82,132 
             C66,135 50,131 37,123 
             C24,115 15,103 10,88 
             C6,73 8,57 16,43 
             C24,29 36,18 51,11 
             C58,7 64,8 70,8 Z"
          fill="url(#redWaxBody)"
        />

        {/* Organic drip lobes on periphery */}
        <ellipse cx="28" cy="36" rx="9" ry="8" fill="#8B1416" opacity="0.85" />
        <ellipse cx="118" cy="46" rx="8" ry="11" fill="#780F12" opacity="0.9" />
        <ellipse cx="108" cy="112" rx="11" ry="8" fill="#580C10" opacity="0.95" />
        <ellipse cx="44" cy="124" rx="10" ry="8" fill="#5A0D11" opacity="0.9" />
        <ellipse cx="12" cy="74" rx="7" ry="10" fill="#6A0F13" opacity="0.85" />

        {/* Rim bevel shadow */}
        <circle cx="70" cy="70" r="50" fill="none" stroke="#38070A" strokeWidth="3" opacity="0.6" />
        <circle cx="70" cy="69" r="49" fill="none" stroke="#E03131" strokeWidth="1" opacity="0.5" />

        {/* Inner Stamp Cavity */}
        <circle cx="70" cy="70" r="46" fill="url(#innerPlate)" />

        {/* Concentric Engraved Rope / Beaded Ring */}
        <circle
          cx="70"
          cy="70"
          r="42"
          fill="none"
          stroke="url(#goldEngraving)"
          strokeWidth="1.2"
          strokeDasharray="2,2"
          opacity="0.85"
        />
        <circle
          cx="70"
          cy="70"
          r="38"
          fill="none"
          stroke="url(#goldEngraving)"
          strokeWidth="0.8"
          opacity="0.7"
        />

        {/* Intricate Islamic 8-Pointed Star / Arabesque Watermark Behind Monogram */}
        <g stroke="url(#goldEngraving)" strokeWidth="0.6" fill="none" opacity="0.35">
          <rect x="52" y="52" width="36" height="36" transform="rotate(0 70 70)" />
          <rect x="52" y="52" width="36" height="36" transform="rotate(45 70 70)" />
          <circle cx="70" cy="70" r="14" />
        </g>

        {/* Subtle crescent and floral accents on top & bottom */}
        <path
          d="M62,38 Q70,41 78,38 Q70,36 62,38 Z"
          fill="url(#goldEngraving)"
          opacity="0.85"
        />
        <path
          d="M62,102 Q70,99 78,102 Q70,104 62,102 Z"
          fill="url(#goldEngraving)"
          opacity="0.85"
        />
        <circle cx="70" cy="45" r="1.5" fill="#FFDF73" />
        <circle cx="70" cy="95" r="1.5" fill="#FFDF73" />

        {/* Lustre reflection on top left */}
        <path
          d="M38,32 C48,22 62,18 78,19 C64,22 52,28 42,38 Z"
          fill="#FFA8A8"
          opacity="0.45"
        />
      </svg>

      {/* Monogram Overlay Centered with Letterpress 3D Effect */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10">
        <span
          className={`text-center font-bold tracking-widest text-[#FFDF73] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
            lang === 'ur'
              ? 'font-nastaliq-display text-lg md:text-xl leading-relaxed text-[#FFF0A0]'
              : 'font-serif text-xl md:text-2xl'
          }`}
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 -1px 1px rgba(255,255,255,0.3)',
          }}
        >
          {displayMonogram}
        </span>
        <span className="text-[10px] text-[#FFDF73]/80 -mt-1 tracking-widest font-sans font-light">
          ✦ ✦ ✦
        </span>
      </div>
    </button>
  );
}
