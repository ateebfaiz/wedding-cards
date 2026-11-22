'use client';

import React from 'react';

export function TazhibCorner({ className = '', position = 'top-left' }: { className?: string; position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scale(-1, 1)';
      case 'bottom-left':
        return 'scale(1, -1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  return (
    <svg
      viewBox="0 0 80 80"
      width="48"
      height="48"
      className={`text-[#B5965A] pointer-events-none select-none ${className}`}
      style={{ transform: getTransform() }}
    >
      <defs>
        <linearGradient id="cornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFBF73" />
          <stop offset="50%" stopColor="#B5965A" />
          <stop offset="100%" stopColor="#8C6D37" />
        </linearGradient>
      </defs>

      {/* Main Outer Corner Floral Palmette */}
      <path
        d="M2,2 L35,2 C35,2 32,12 25,18 C18,24 15,28 15,35 L2,35 Z"
        fill="url(#cornerGold)"
        opacity="0.25"
      />

      {/* Ornate Arabesque Curvilinear Scrolls */}
      <path
        d="M2,2 L55,2 C45,2 40,10 32,18 C24,26 22,35 22,55 L2,55"
        stroke="url(#cornerGold)"
        strokeWidth="1.2"
        fill="none"
      />

      <path
        d="M2,2 L40,2 C32,2 28,8 22,14 C16,20 14,28 14,40 L2,40"
        stroke="url(#cornerGold)"
        strokeWidth="0.8"
        strokeDasharray="2,2"
        fill="none"
      />

      {/* Floral Blossom in Corner Nexus */}
      <circle cx="18" cy="18" r="3" fill="#702F3D" />
      <circle cx="18" cy="18" r="1.5" fill="#DFBF73" />

      {/* Micro Paisley / Buta Tendril */}
      <path
        d="M28,8 C32,6 36,9 35,14 C34,18 29,20 25,16"
        stroke="url(#cornerGold)"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

export function IslamicIlluminatedFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-6 sm:p-10 border border-[#B5965A]/40 bg-[#F8F5EE]/95 shadow-[0_12px_40px_rgba(52,44,38,0.08)] rounded-xs ${className}`}>
      {/* 4 Tazhib Illuminated Corners */}
      <div className="absolute top-1 left-1">
        <TazhibCorner position="top-left" />
      </div>
      <div className="absolute top-1 right-1">
        <TazhibCorner position="top-right" />
      </div>
      <div className="absolute bottom-1 left-1">
        <TazhibCorner position="bottom-left" />
      </div>
      <div className="absolute bottom-1 right-1">
        <TazhibCorner position="bottom-right" />
      </div>

      {/* Inner hairline border with gold corner nodes */}
      <div className="absolute inset-2.5 border border-[#B5965A]/25 pointer-events-none rounded-[1px]" />
      <div className="absolute inset-4 border border-[#B5965A]/15 pointer-events-none rounded-[1px]" />

      {children}
    </div>
  );
}
