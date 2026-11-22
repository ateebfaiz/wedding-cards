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

      {/* Radial Deep Vignette & Golden Ambient Aura */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,rgba(5,11,20,0.92)_100%] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] h-[340px] sm:h-[520px] rounded-full bg-radial-[circle,rgba(223,191,115,0.18)_0%,transparent_70%] pointer-events-none blur-2xl animate-pulse" />

      {/* The Postcard / Envelope Composition (Luminous Gold Mandala on Navy, true landscape) */}
      <div className="relative w-full max-w-[460px] sm:max-w-[560px] md:max-w-[640px] flex flex-col items-center justify-center">
        {/* Personalized Invitee Callout Badge on Envelope */}
        {guestName && (
          <div
            className={`mb-4 px-5 py-1.5 rounded-full border border-[#DFBF73]/60 bg-[#081226]/85 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] text-center transition-all duration-500 ${
              stage !== 'idle' ? 'opacity-0 -translate-y-2' : 'opacity-100'
            }`}
          >
            <span
              className={`text-xs sm:text-sm text-[#FFDF73] font-medium tracking-wide flex items-center justify-center gap-2 ${
                lang === 'ur' ? 'font-sameer-zikran text-lg' : 'font-cinzel'
              }`}
            >
              <span className="text-[#DFBF73]">✦</span>
              {lang === 'ur'
                ? `بخدمتِ گرامی قدر: ${guestName} و اہلِ خانہ`
                : `Invited with Honor: ${guestName} & Family`}
              <span className="text-[#DFBF73]">✦</span>
            </span>
          </div>
        )}

        {/* Luminous Gold Mandala Artwork Display with Interactive Glow */}
        <div
          className={`relative w-full aspect-[1672/941] filter transition-all duration-700 ease-out group ${
            stage === 'cracking'
              ? 'scale-103 drop-shadow-[0_0_50px_rgba(255,223,115,0.7)]'
              : stage === 'opening'
              ? 'scale-110 opacity-80 blur-[1px] drop-shadow-[0_0_80px_rgba(255,223,115,0.9)]'
              : stage === 'revealed'
              ? 'scale-125 opacity-0'
              : 'scale-100 hover:scale-[1.02] drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:drop-shadow-[0_0_40px_rgba(223,191,115,0.55)]'
          }`}
        >
          {/* Main Envelope Image Asset */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/assets/envelope/luminous-gold-mandala.webp"
              alt="Luminous Gold Mandala Wedding Seal Envelope"
              fill
              sizes="(max-width: 640px) 360px, (max-width: 768px) 520px, 640px"
              className="object-cover"
              priority
            />
            {/* Ambient Radial Golden Shimmer Overlay */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(8,18,38,0.4)_100%] pointer-events-none group-hover:opacity-60 transition-opacity" />
          </div>

          {/* Interactive Center Seal Hotspot with Multi-Tier Radiant Glow */}
          <div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center cursor-pointer"
            title="Click or tap to open invitation"
          >
            {/* Expanding Pulsing Ring */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-[#DFBF73]/70 transition-all duration-500 ${
                stage === 'cracking'
                  ? 'scale-150 border-[#FFDF73] bg-[#FFDF73]/30 shadow-[0_0_50px_#FFDF73]'
                  : 'group-hover:scale-115 group-hover:border-[#FFDF73] animate-ping opacity-35'
              }`}
            />
            {/* Radiant Inner Glow Aura */}
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-radial-[circle,rgba(255,223,115,0.35)_0%,transparent_75%] transition-all duration-300 ${
                stage === 'cracking'
                  ? 'scale-125 bg-radial-[circle,rgba(255,223,115,0.7)_0%,transparent_70%]'
                  : 'group-hover:scale-125 group-hover:bg-radial-[circle,rgba(255,223,115,0.55)_0%,transparent_70%]'
              }`}
            />
          </div>
        </div>

        {/* Tactile Tap Prompt & Actions */}
        <div className="mt-6 text-center z-20 space-y-3">
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
              className="text-[11px] text-[#EFE8DA]/80 hover:text-[#FFDF73] font-cinzel tracking-wider px-4 py-1.5 rounded-full border border-[#DFBF73]/40 bg-[#081226]/80 hover:border-[#DFBF73]/80 hover:bg-[#0D1B36] transition-all cursor-pointer shadow-md"
            >
              {lang === 'ur' ? 'براہِ راست دعوت نامہ کھولیں ➔' : 'Skip to Invitation ➔'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
