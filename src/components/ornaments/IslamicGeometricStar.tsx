'use client';

import React from 'react';

interface IslamicGeometricStarProps {
  className?: string;
  size?: number;
}

export function IslamicGeometricStar({ className = '', size = 500 }: IslamicGeometricStarProps) {
  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Layer: Slow Clockwise Geometric Ring */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full animate-spin-slow-cw opacity-35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldStroke1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBF73" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFDF73" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#B5965A" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Outer Orbital Rings */}
        <circle cx="250" cy="250" r="236" stroke="url(#goldStroke1)" strokeWidth="0.8" strokeDasharray="3 6" />
        <circle cx="250" cy="250" r="226" stroke="url(#goldStroke1)" strokeWidth="1.2" />
        <circle cx="250" cy="250" r="218" stroke="url(#goldStroke1)" strokeWidth="0.6" strokeDasharray="2 4" />

        {/* 16 Radial Star Beams */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const rad = (angle * Math.PI) / 180;
          const x1 = 250 + 200 * Math.cos(rad);
          const y1 = 250 + 200 * Math.sin(rad);
          const x2 = 250 + 226 * Math.cos(rad);
          const y2 = 250 + 226 * Math.sin(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#goldStroke1)"
              strokeWidth={i % 2 === 0 ? 1.5 : 0.8}
            />
          );
        })}

        {/* Outer 8-Pointed Star (Rub el Hizb) Outer Shell */}
        <polygon
          points="250,55 288,146 388,112 354,212 445,250 354,288 388,388 288,354 250,445 212,354 112,388 146,288 55,250 146,212 112,112 212,146"
          stroke="url(#goldStroke1)"
          strokeWidth="1.4"
          fill="none"
        />

        {/* Interlocking Secondary Polygons */}
        <rect
          x="105"
          y="105"
          width="290"
          height="290"
          stroke="url(#goldStroke1)"
          strokeWidth="1.0"
          fill="none"
        />
        <rect
          x="105"
          y="105"
          width="290"
          height="290"
          stroke="url(#goldStroke1)"
          strokeWidth="1.0"
          fill="none"
          transform="rotate(45 250 250)"
        />
      </svg>

      {/* Inner Layer: Counter-Clockwise Concentric Geometric Rosette */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full animate-spin-slow-ccw opacity-45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldStroke2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDF73" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#DFBF73" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E6C875" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Concentric Inner Circles */}
        <circle cx="250" cy="250" r="145" stroke="url(#goldStroke2)" strokeWidth="1.2" />
        <circle cx="250" cy="250" r="135" stroke="url(#goldStroke2)" strokeWidth="0.8" strokeDasharray="3 4" />
        <circle cx="250" cy="250" r="75" stroke="url(#goldStroke2)" strokeWidth="1.4" />
        <circle cx="250" cy="250" r="65" stroke="url(#goldStroke2)" strokeWidth="0.8" />

        {/* 12-Fold Sacred Rosette Petals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <ellipse
              key={i}
              cx="250"
              cy="185"
              rx="18"
              ry="55"
              stroke="url(#goldStroke2)"
              strokeWidth="0.9"
              transform={`rotate(${angle} 250 250)`}
              fill="none"
            />
          );
        })}

        {/* Inner 8-Star Core */}
        <rect
          x="180"
          y="180"
          width="140"
          height="140"
          stroke="url(#goldStroke2)"
          strokeWidth="1.2"
          fill="none"
        />
        <rect
          x="180"
          y="180"
          width="140"
          height="140"
          stroke="url(#goldStroke2)"
          strokeWidth="1.2"
          fill="none"
          transform="rotate(45 250 250)"
        />

        {/* Center Star Point */}
        <circle cx="250" cy="250" r="10" stroke="url(#goldStroke2)" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="3" fill="#FFDF73" />
      </svg>
    </div>
  );
}
