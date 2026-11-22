'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';
import { weddingAudio } from '@/lib/audio';
import { IslamicGeometricStar } from '@/components/ornaments/IslamicGeometricStar';

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
    }, 1100);
  };

  return (
    <div
      onClick={handleOpen}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 overflow-hidden select-none cursor-pointer"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #28040A 0%, #0D0103 100%)',
      }}
    >
      {/* Background Deep Maroon-Gold Pattern with Slow Drift */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none animate-slow-drift"
        style={{
          backgroundImage: 'url(/assets/backgrounds/maroon-golden-opt.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Mesmerizing Islamic Geometric Star SVG Animation (Replacing Golden Mandala) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <IslamicGeometricStar size={680} className="scale-75 sm:scale-100" />
      </div>

      {/* The Postcard / Envelope Composition (Only Postcard + Seal, No Writing Over It) */}
      <div className="relative w-full max-w-[380px] sm:max-w-[460px] aspect-[4/3] flex flex-col items-center justify-center">
        {/* Physical Postcard Envelope: Filled Seamlessly with No Writing Over It */}
        <div
          className={`relative w-full h-full rounded-2xl shadow-[0_35px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ease-out ${
            stage === 'opening'
              ? 'scale-105 opacity-90'
              : stage === 'revealed'
              ? 'scale-110 opacity-0'
              : 'scale-100 opacity-100'
          }`}
        >
          {/* Authentic Postcard Envelope Texture Fills the Whole Container */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/envelope/brown-envelope.webp"
              alt="Wedding Postcard Envelope"
              fill
              sizes="(max-width: 640px) 380px, 460px"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Luxury Card Perimeter Filigree & Inset Bevel (No text, pure stationery aesthetic) */}
          <div className="absolute inset-2.5 sm:inset-3 border-2 border-[#DFBF73]/60 rounded-xl pointer-events-none z-10 shadow-inner" />
          <div className="absolute inset-4 sm:inset-5 border border-[#DFBF73]/30 rounded-lg pointer-events-none z-10" />

          {/* Centered Royal Wedding Shield Seal (Only Element on Envelope) */}
          <div
            className={`relative z-30 transition-all duration-500 ease-out ${
              stage === 'cracking'
                ? 'scale-120 rotate-6'
                : stage === 'opening'
                ? 'scale-75 opacity-0'
                : 'scale-100 hover:scale-105 active:scale-95'
            }`}
          >
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 drop-shadow-[0_16px_40px_rgba(0,0,0,0.9)]">
              <Image
                src="/assets/seal/wedding-seal-opt.webp"
                alt="Royal Wedding Shield Seal"
                fill
                sizes="(max-width: 640px) 128px, 144px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Tactile Tap Prompt (NO SKIP OPTION) */}
        <div className="mt-8 text-center z-20">
          <p className="text-xs uppercase tracking-[0.25em] text-[#DFBF73] font-cinzel font-bold flex items-center justify-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] animate-pulse">
            <span className="text-[#FFDF73]">✦</span>
            <span>{config.seal.openPrompt[lang]}</span>
            <span className="text-[#FFDF73]">✦</span>
          </p>
        </div>
      </div>
    </div>
  );
}
