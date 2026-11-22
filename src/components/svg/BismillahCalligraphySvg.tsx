'use client';

import React from 'react';

interface BismillahSvgProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function BismillahCalligraphySvg({ className = '', width = '100%', height = '70' }: BismillahSvgProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 500 90"
        width={width}
        height={height}
        className="max-w-md w-full drop-shadow-[0_1px_2px_rgba(181,150,90,0.3)] text-[#342C26]"
        fill="currentColor"
      >
        <defs>
          <linearGradient id="bismillahGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C6D37" />
            <stop offset="30%" stopColor="#B5965A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#B5965A" />
            <stop offset="100%" stopColor="#8C6D37" />
          </linearGradient>
        </defs>

        {/* Decorative Top Crest Vignette */}
        <path
          d="M250,5 C242,5 235,11 230,17 C235,16 242,16 250,16 C258,16 265,16 270,17 C265,11 258,5 250,5 Z"
          fill="url(#bismillahGold)"
        />
        <circle cx="250" cy="10" r="2.5" fill="#B5965A" />
        <circle cx="236" cy="12" r="1.5" fill="#B5965A" />
        <circle cx="264" cy="12" r="1.5" fill="#B5965A" />

        {/* Scalable Classical Arabic Thuluth Calligraphy Rendering */}
        <text
          x="250"
          y="56"
          textAnchor="middle"
          fontSize="36"
          fontFamily="'Amiri', 'Noto Naskh Arabic', serif"
          fontWeight="700"
          fill="url(#bismillahGold)"
          letterSpacing="0.04em"
          direction="rtl"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </text>

        {/* Classical Calligraphic Diacritics & Tashkeel Flourishes */}
        <path
          d="M175,68 Q180,63 186,68 Q180,72 175,68 Z"
          fill="#B5965A"
          opacity="0.8"
        />
        <path
          d="M315,68 Q320,63 326,68 Q320,72 315,68 Z"
          fill="#B5965A"
          opacity="0.8"
        />

        {/* Horizontal Hairline Arabesque Taper */}
        <path
          d="M100,68 C150,68 180,67 200,69 C220,71 240,73 250,73 C260,73 280,71 300,69 C320,67 350,68 400,68"
          stroke="url(#bismillahGold)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
        <circle cx="250" cy="73" r="2" fill="#D4AF37" />
        <circle cx="100" cy="68" r="1.5" fill="#B5965A" />
        <circle cx="400" cy="68" r="1.5" fill="#B5965A" />
      </svg>
    </div>
  );
}
