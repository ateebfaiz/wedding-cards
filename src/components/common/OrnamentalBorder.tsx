'use client';

import React from 'react';

export function OrnamentalBorder({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative p-6 md:p-10 border border-[#B5965A]/35 bg-[#F8F5EE]/85 shadow-[0_4px_24px_-4px_rgba(52,44,38,0.06)] rounded-sm ${className}`}>
      {/* Corner Ornaments */}
      <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#B5965A]/80 pointer-events-none" />
      <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#B5965A]/80 pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#B5965A]/80 pointer-events-none" />
      <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#B5965A]/80 pointer-events-none" />

      {/* Inner hairline border */}
      <div className="absolute inset-2 border border-[#B5965A]/20 pointer-events-none rounded-[1px]" />

      {children}
    </div>
  );
}

export function MughalArchHeader() {
  return (
    <div className="w-full flex items-center justify-center my-4 opacity-85">
      <svg width="140" height="26" viewBox="0 0 120 24" fill="none" className="text-[#DFBF73]">
        <path
          d="M0 12H40C50 12 55 4 60 2C65 4 70 12 80 12H120"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="60" cy="2" r="2.5" fill="currentColor" />
        <circle cx="50" cy="8" r="1.5" fill="currentColor" />
        <circle cx="70" cy="8" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
}
