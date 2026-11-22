'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';
import { weddingAudio } from '@/lib/audio';

interface WaxSealEnvelopeProps {
  config: WeddingConfig;
  lang: SupportedLanguage;
  guestName?: string;
  onOpenComplete: () => void;
}

export function WaxSealEnvelope({ config, lang, onOpenComplete }: WaxSealEnvelopeProps) {
  const [stage, setStage] = useState<'idle' | 'cracking' | 'opening' | 'revealed'>('idle');

  const handleOpen = () => {
    if (stage !== 'idle') return;

    // Phase 1: Wax crack & music playback
    setStage('cracking');
    weddingAudio.playWaxSealCrack();
    weddingAudio.startTraditionalMusic();

    // Phase 2: Mail flap opens & envelope expands
    setTimeout(() => {
      setStage('opening');
    }, 350);

    // Phase 3: Transition to full wedding card
    setTimeout(() => {
      setStage('revealed');
      onOpenComplete();
    }, 1000);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStage('revealed');
    weddingAudio.startTraditionalMusic();
    onOpenComplete();
  };

  return (
    <div
      onClick={handleOpen}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 overflow-hidden select-none cursor-pointer bg-[#200408]"
    >
      {/* Background Ambience Texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none animate-slow-drift"
        style={{
          backgroundImage: 'url(/assets/backgrounds/alyoha-arabic-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Radial Focus Vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(16,2,5,0.85)_100%] pointer-events-none" />

      {/* The Postcard / Envelope Composition */}
      <div className="relative w-full max-w-[360px] sm:max-w-[440px] aspect-[4/3] flex flex-col items-center justify-center">
        {/* Physical Postcard Envelope */}
        <div
          className={`relative w-full h-full rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ease-out ${
            stage === 'opening'
              ? 'scale-105 opacity-90'
              : stage === 'revealed'
              ? 'scale-110 opacity-0'
              : 'scale-100 opacity-100'
          }`}
        >
          {/* Postcard Envelope Texture Fills Frame */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/envelope/brown-envelope.webp"
              alt="Wedding Postcard Envelope"
              fill
              sizes="(max-width: 640px) 360px, 440px"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Luxury Card Perimeter Filigree & Inset Bevel */}
          <div className="absolute inset-2.5 sm:inset-3 border-2 border-[#DFBF73]/60 rounded-xl pointer-events-none z-10 shadow-inner" />
          <div className="absolute inset-4 sm:inset-4.5 border border-[#DFBF73]/30 rounded-lg pointer-events-none z-10" />

          {/* Centered Royal Wedding Shield Seal */}
          <div
            className={`relative z-30 transition-all duration-500 ease-out ${
              stage === 'cracking'
                ? 'scale-115 rotate-6'
                : stage === 'opening'
                ? 'scale-75 opacity-0'
                : 'scale-100 hover:scale-105 active:scale-95'
            }`}
          >
            <div className="relative w-30 h-30 sm:w-34 sm:h-34 drop-shadow-[0_14px_30px_rgba(0,0,0,0.85)]">
              <Image
                src="/assets/seal/wedding-seal-opt.webp"
                alt="Royal Wedding Shield Seal"
                fill
                sizes="(max-width: 640px) 120px, 136px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Tactile Tap Prompt */}
        <div className="mt-7 text-center z-20 space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-[#DFBF73] font-cinzel font-bold flex items-center justify-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-pulse">
            <span className="text-[#FFDF73]">✦</span>
            <span>{config.seal.openPrompt[lang]}</span>
            <span className="text-[#FFDF73]">✦</span>
          </p>

          {/* Visible Skip Option */}
          <div>
            <button
              type="button"
              onClick={handleSkip}
              className="text-[11px] text-[#EFE8DA]/70 hover:text-[#FFDF73] font-cinzel tracking-wider px-3 py-1 rounded-full border border-[#DFBF73]/30 bg-[#160205]/60 hover:border-[#DFBF73]/60 transition-colors cursor-pointer"
            >
              {lang === 'ur' ? 'براہِ راست دعوت نامہ کھولیں ➔' : 'Skip to Invitation ➔'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
