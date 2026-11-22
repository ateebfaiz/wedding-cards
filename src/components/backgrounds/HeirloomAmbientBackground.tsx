'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface HeirloomAmbientBackgroundProps {
  opacityMultiplier?: number;
  variant?: 'homepage' | 'invitation';
}

export function HeirloomAmbientBackground({
  opacityMultiplier = 1,
}: HeirloomAmbientBackgroundProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth - 0.5) * 2;
      const yPercent = (e.clientY / innerHeight - 0.5) * 2;
      setOffset({
        x: xPercent * 14,
        y: yPercent * 14,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[#F8F5EE]">
      {/* 1. Vertical Moroccan Pattern Background (Impressive Full Bleed) */}
      <div
        className="absolute inset-0 opacity-[0.16] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: 'url(/assets/backgrounds/moroccan-pattern-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.16 * opacityMultiplier,
        }}
      />

      {/* 2. Frosted & Blurred Ambient Light Flares */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[550px] bg-gradient-to-b from-[#ECD7B5]/65 via-[#F2E5CE]/35 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#F5EAD4]/70 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-2/3 -right-40 w-96 h-96 bg-[#F1E0CE]/55 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-gradient-to-t from-[#EFE8DA]/80 to-transparent blur-2xl" />

      {/* 3. Rotating Mandala #1: GDJ Arabesque Disc (Clockwise, outer layer) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px), 0)`,
        }}
      >
        <div className="relative w-[750px] h-[750px] sm:w-[1000px] sm:h-[1000px] lg:w-[1250px] lg:h-[1250px] animate-[spin_120s_linear_infinite]">
          <Image
            src="/assets/mandalas/gdj-arabesque-disc.webp"
            alt="Rotating Arabesque Disc"
            fill
            priority
            sizes="(max-width: 768px) 750px, 1250px"
            className="object-contain"
            style={{ opacity: 0.18 * opacityMultiplier }}
          />
        </div>
      </div>

      {/* 4. Rotating Mandala #2: GDJ Mandala Ornament (Counter-Clockwise, concentric inner layer) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(calc(-50% - ${offset.x * 0.7}px), calc(-50% - ${offset.y * 0.7}px), 0)`,
        }}
      >
        <div className="relative w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] lg:w-[950px] lg:h-[950px] animate-[spin_160s_linear_infinite_reverse]">
          <Image
            src="/assets/mandalas/gdj-mandala-ornament.webp"
            alt="Rotating Mandala Ornament"
            fill
            priority
            sizes="(max-width: 768px) 550px, 950px"
            className="object-contain"
            style={{ opacity: 0.15 * opacityMultiplier }}
          />
        </div>
      </div>

      {/* 5. Soft Frosted Translucent Blur Overlay for Superior Text Readability */}
      <div className="absolute inset-0 bg-[#F8F5EE]/45 backdrop-blur-[2px]" />

      {/* 6. Soft Frosted Vignette for Flawless Readability */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(248,245,238,0.72)_80%,rgba(248,245,238,0.92)_100%]" />
    </div>
  );
}
