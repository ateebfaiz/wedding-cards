'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface InteractiveArabicBackgroundProps {
  showDiscAnimation?: boolean;
}

export function InteractiveArabicBackground({ showDiscAnimation = true }: InteractiveArabicBackgroundProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth - 0.5) * 2;
      const yPercent = (e.clientY / innerHeight - 0.5) * 2;
      // Smooth subtle parallax shift
      setOffset({
        x: xPercent * 16,
        y: yPercent * 16,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#160205]">
      {/* 1. Full Bleed Arabic Background Image with Parallax & Slow Drift */}
      <div
        className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] transition-transform duration-700 ease-out animate-slow-drift"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        }}
      >
        <Image
          src="/assets/backgrounds/alyoha-arabic-bg.webp"
          alt="Arabic Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 mix-blend-screen"
        />
      </div>

      {/* 2. Deep Royal Vignette & Gradient Overlays for Readability and Depth */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(18,2,5,0.75)_65%,rgba(10,1,3,0.95)_100%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#180205]/80 via-transparent to-[#180205]/90" />

      {/* 3. Geometric Arabesque Disc Animating in Rounds and Circles (gdj-arabesque-4164761) */}
      {showDiscAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="relative w-[540px] h-[540px] sm:w-[780px] sm:h-[780px] opacity-25 animate-spin-disc transition-transform duration-1000 ease-out"
            style={{
              transform: `translate3d(${offset.x * -0.5}px, ${offset.y * -0.5}px, 0)`,
            }}
          >
            <Image
              src="/assets/mandalas/gdj-arabesque-disc.webp"
              alt="Geometric Arabesque Disc"
              fill
              sizes="(max-width: 640px) 540px, 780px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
