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

      {/* The Postcard / Envelope Composition (True Landscape format with natural shadow depth) */}
      <div className="relative w-full max-w-[480px] sm:max-w-[580px] md:max-w-[650px] flex flex-col items-center justify-center">
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

        {/* Physical Luxurious Navy & Gold Envelope Display Card */}
        <div
          className={`relative w-full aspect-[2282/1388] filter transition-all duration-700 ease-out ${
            stage === 'cracking'
              ? 'scale-103 drop-shadow-[0_30px_70px_rgba(223,191,115,0.45)]'
              : stage === 'opening'
              ? 'scale-110 opacity-80 blur-[1px] drop-shadow-[0_40px_90px_rgba(255,223,115,0.6)]'
              : stage === 'revealed'
              ? 'scale-125 opacity-0'
              : 'scale-100 hover:scale-[1.02] drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)] hover:drop-shadow-[0_30px_70px_rgba(223,191,115,0.3)]'
          }`}
        >
          {/* Main Envelope Image Asset */}
          <div className="relative w-full h-full">
            <Image
              src="/assets/envelope/luxurious-navy-envelope.webp"
              alt="Luxurious Navy Gold Wedding Envelope"
              fill
              sizes="(max-width: 640px) 360px, (max-width: 768px) 480px, 540px"
              className="object-contain"
              priority
            />
          </div>

          {/* Interactive Center Seal Hotspot */}
          <div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center group"
            title="Click to open invitation"
          >
            {/* Luminous Pulsing Seal Halo */}
            <div
              className={`absolute inset-0 rounded-full border border-[#DFBF73]/50 transition-all duration-500 ${
                stage === 'cracking'
                  ? 'scale-125 border-[#FFDF73] bg-[#FFDF73]/20 shadow-[0_0_30px_#FFDF73]'
                  : 'group-hover:scale-110 group-hover:border-[#FFDF73]/80 animate-ping opacity-25'
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
