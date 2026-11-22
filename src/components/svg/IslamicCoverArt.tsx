'use client';

import React from 'react';

interface IslamicCoverArtProps {
  className?: string;
}

export function IslamicCoverArt({ className = '' }: IslamicCoverArtProps) {
  return (
    <div className={`w-full flex items-center justify-center my-4 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 600 240"
        className="w-full max-w-lg drop-shadow-[0_4px_16px_rgba(181,150,90,0.15)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="islamicGoldMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBF73" />
            <stop offset="30%" stopColor="#B5965A" />
            <stop offset="70%" stopColor="#8C6D37" />
            <stop offset="100%" stopColor="#5C451C" />
          </linearGradient>

          <linearGradient id="softPaperGlow" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#EFE8DA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F8F5EE" stopOpacity="0.2" />
          </linearGradient>

          <pattern id="islamicLattice" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M10,0 L20,10 L10,20 L0,10 Z"
              stroke="#B5965A"
              strokeWidth="0.4"
              strokeOpacity="0.3"
              fill="none"
            />
          </pattern>
        </defs>

        {/* Decorative Outer Arched Spandrels with Islamic Lattice */}
        <path
          d="M30,220 L30,40 C30,40 180,40 220,40 C250,40 280,15 300,5 C320,15 350,40 380,40 C420,40 570,40 570,40 L570,220 Z"
          fill="url(#softPaperGlow)"
          stroke="url(#islamicGoldMain)"
          strokeWidth="1.5"
        />

        {/* Interior Trellis / Jali Pattern */}
        <path
          d="M40,210 L40,50 C40,50 190,50 225,50 C255,50 285,25 300,16 C315,25 345,50 375,50 C410,50 560,50 560,50 L560,210 Z"
          fill="url(#islamicLattice)"
        />

        {/* Grand Mughal Multi-Foil / Cusped Arch */}
        <path
          d="M80,220 
             L80,120 
             C80,105 100,90 125,90 
             C150,90 170,75 195,75 
             C220,75 240,55 270,55 
             C285,55 295,45 300,38 
             C305,45 315,55 330,55 
             C360,55 380,75 405,75 
             C430,75 450,90 475,90 
             C500,90 520,105 520,120 
             L520,220"
          stroke="url(#islamicGoldMain)"
          strokeWidth="2"
          fill="#F8F5EE"
          strokeLinecap="round"
        />

        {/* Inner Arch Hairline Trim */}
        <path
          d="M90,220 
             L90,123 
             C90,110 108,96 130,96 
             C153,96 173,81 198,81 
             C223,81 243,61 273,61 
             C287,61 296,51 300,45 
             C304,51 313,61 327,61 
             C357,61 377,81 402,81 
             C427,81 447,96 470,96 
             C492,96 510,110 510,123 
             L510,220"
          stroke="url(#islamicGoldMain)"
          strokeWidth="0.8"
          strokeDasharray="3,2"
          fill="none"
          opacity="0.85"
        />

        {/* Center Illuminated Shamsa Rosette Motif */}
        <g transform="translate(300, 115)">
          {/* Radial 16-pointed sunburst petals */}
          {[...Array(16)].map((_, i) => (
            <path
              key={i}
              d="M0,-24 L3,-12 L0,0 L-3,-12 Z"
              fill="url(#islamicGoldMain)"
              transform={`rotate(${i * 22.5})`}
              opacity="0.9"
            />
          ))}

          {/* Core Medallion Rings */}
          <circle cx="0" cy="0" r="14" fill="#702F3D" stroke="#DFBF73" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="10" fill="#F8F5EE" stroke="#B5965A" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="5" fill="#702F3D" />

          {/* Ornamental 4-axis Flourishes */}
          <circle cx="0" cy="-32" r="2" fill="#B5965A" />
          <circle cx="0" cy="32" r="2" fill="#B5965A" />
          <circle cx="-32" cy="0" r="2" fill="#B5965A" />
          <circle cx="32" cy="0" r="2" fill="#B5965A" />
        </g>

        {/* Left and Right Hanging Floral Lanterns */}
        <g transform="translate(130, 130)">
          <line x1="0" y1="-30" x2="0" y2="0" stroke="#B5965A" strokeWidth="0.8" />
          <path d="M-6,0 L6,0 L4,12 L-4,12 Z" fill="#B5965A" opacity="0.8" />
          <circle cx="0" cy="15" r="1.5" fill="#B5965A" />
        </g>
        <g transform="translate(470, 130)">
          <line x1="0" y1="-30" x2="0" y2="0" stroke="#B5965A" strokeWidth="0.8" />
          <path d="M-6,0 L6,0 L4,12 L-4,12 Z" fill="#B5965A" opacity="0.8" />
          <circle cx="0" cy="15" r="1.5" fill="#B5965A" />
        </g>
      </svg>
    </div>
  );
}
