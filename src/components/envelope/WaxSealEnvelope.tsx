'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';
import { weddingAudio } from '@/lib/audio';
import { fireWeddingConfetti } from '@/lib/confetti';

interface WaxSealEnvelopeProps {
  config: WeddingConfig;
  lang: SupportedLanguage;
  guestName?: string;
  onOpenComplete: () => void;
  triggerConfetti?: boolean;
}

export function WaxSealEnvelope({
  config,
  lang,
  guestName,
  onOpenComplete,
  triggerConfetti = true,
}: WaxSealEnvelopeProps) {
  const [stage, setStage] = useState<'idle' | 'cracking' | 'opening' | 'revealed'>('idle');

  const handleOpen = () => {
    if (stage !== 'idle') return;

    // Phase 1: Wax crack & music playback
    setStage('cracking');
    weddingAudio.playWaxSealCrack();
    weddingAudio.startTraditionalMusic();

    // Trigger celebratory confetti with a slight delay
    if (triggerConfetti) {
      setTimeout(() => {
        fireWeddingConfetti();
      }, 450);
    }

    // Phase 2: Flap unseals & envelope blooms
    setTimeout(() => {
      setStage('opening');
    }, 400);

    // Phase 3: Transition smoothly to the wedding invitation card
    setTimeout(() => {
      setStage('revealed');
      onOpenComplete();
    }, 1100);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStage('revealed');
    weddingAudio.startTraditionalMusic();
    if (triggerConfetti) {
      fireWeddingConfetti();
    }
    onOpenComplete();
  };

  return (
    <div
      onClick={handleOpen}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 overflow-hidden select-none cursor-pointer bg-[#050B14]/95 transition-opacity duration-700"
    >
      {/* Background Ambience Texture: Moroccan Pattern Backdrop */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none animate-slow-drift mix-blend-luminosity"
        style={{
          backgroundImage: 'url(/assets/backgrounds/moroccan-pattern-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Radial Deep Vignette (No Overwhelming Glowing Flares) */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,rgba(5,11,20,0.92)_100%] pointer-events-none" />

      {/* The Postcard / Envelope Composition (Adaptive Vertical Height for All Displays) */}
      <div className="relative w-full max-w-[290px] xs:max-w-[320px] sm:max-w-[560px] md:max-w-[620px] max-h-[90dvh] flex flex-col items-center justify-center my-auto">
        {/* Personalized Invitee Callout Badge on Envelope (Clean, Single-Line No-Wrap) */}
        <div
          className={`mb-2.5 sm:mb-4 px-4 sm:px-6 py-1.5 rounded-full border border-[#DFBF73]/50 bg-[#081226]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.7)] text-center transition-all duration-500 max-w-[92vw] sm:max-w-max mx-auto shrink-0 ${
            stage !== 'idle' ? 'opacity-0 -translate-y-2' : 'opacity-100'
          }`}
        >
          <span
            className={`text-xs sm:text-sm text-[#FFDF73] font-medium tracking-wide inline-flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap ${
              lang === 'ur' ? 'font-sameer-zikran text-base sm:text-lg' : 'font-cinzel'
            }`}
          >
            <span className="text-[#DFBF73] shrink-0 text-xs">✦</span>
            <span className="truncate">
              {guestName
                ? (lang === 'ur' ? `بخدمتِ گرامی قدر: ${guestName} و اہلِ خانہ` : `Invited with Honor: ${guestName} & Family`)
                : (lang === 'ur' ? 'بخدمتِ گرامی قدر: معزز مہمان و اہلِ خانہ' : 'Invited with Honor: Respected Guest & Family')}
            </span>
            <span className="text-[#DFBF73] shrink-0 text-xs">✦</span>
          </span>
        </div>

        {/* Luminous Gold Mandala Artwork Display (Clean Stationery Shadow, No Saturated Flares) */}
        <div
          className={`relative w-full flex flex-col items-center justify-center filter transition-all duration-700 ease-out group ${
            stage === 'cracking'
              ? 'scale-103 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]'
              : stage === 'opening'
              ? 'scale-110 opacity-80 blur-[1px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]'
              : stage === 'revealed'
              ? 'scale-125 opacity-0'
              : 'scale-100 hover:scale-[1.01] drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]'
          }`}
        >
          {/* Desktop Version: Landscape (1672x941) */}
          <div className="hidden sm:block relative w-full aspect-[1672/941] max-h-[48dvh] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/assets/envelope/mandala-envelope-desktop.webp"
              alt="Luminous Gold Mandala Wedding Seal Envelope Desktop"
              fill
              sizes="(max-width: 1024px) 560px, 620px"
              className="object-cover"
              priority
            />
            {/* Ambient Radial Golden Shimmer Overlay */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(8,18,38,0.4)_100%] pointer-events-none group-hover:opacity-60 transition-opacity" />
          </div>

          {/* Mobile Version: Vertical Optimized with Adaptive Height (941x1672) */}
          <div className="block sm:hidden relative w-auto h-[46dvh] max-h-[460px] aspect-[941/1672] rounded-2xl overflow-hidden shadow-2xl mx-auto">
            <Image
              src="/assets/envelope/mandala-envelope-mobile.webp"
              alt="Luminous Gold Mandala Wedding Seal Envelope Mobile"
              fill
              sizes="280px"
              className="object-cover"
              priority
            />
            {/* Ambient Radial Golden Shimmer Overlay */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(8,18,38,0.4)_100%] pointer-events-none group-hover:opacity-60 transition-opacity" />
          </div>

          {/* Interactive Center Seal Hotspot with Ping Animation (Flares Removed) */}
          <div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center cursor-pointer"
            title="Click or tap to open invitation"
          >
            {/* Expanding Pulsing Ring (Preserved) */}
            <div
              className={`absolute inset-0 rounded-full border border-[#DFBF73]/70 transition-all duration-500 ${
                stage === 'cracking'
                  ? 'scale-140 border-[#DFBF73] bg-[#DFBF73]/15'
                  : 'group-hover:scale-115 group-hover:border-[#FFDF73] animate-ping opacity-35'
              }`}
            />
          </div>
        </div>

        {/* Tactile Tap Prompt & Actions */}
        <div className="mt-3 sm:mt-5 text-center z-20 space-y-2 shrink-0">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#DFBF73] font-cinzel font-bold flex items-center justify-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-pulse">
            <span className="text-[#FFDF73]">✦</span>
            <span>{config.seal.openPrompt[lang]}</span>
            <span className="text-[#FFDF73]">✦</span>
          </p>

          {/* Visible Skip Option */}
          <div>
            <button
              type="button"
              onClick={handleSkip}
              className="text-[10px] sm:text-[11px] text-[#EFE8DA]/80 hover:text-[#FFDF73] font-cinzel tracking-wider px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#DFBF73]/40 bg-[#081226]/80 hover:border-[#DFBF73]/80 hover:bg-[#0D1B36] transition-all cursor-pointer shadow-md"
            >
              {lang === 'ur' ? 'براہِ راست دعوت نامہ کھولیں ➔' : 'Skip to Invitation ➔'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
