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

export function WaxSealEnvelope({ config, lang, guestName, onOpenComplete }: WaxSealEnvelopeProps) {
  const [stage, setStage] = useState<'idle' | 'cracking' | 'opening' | 'revealed'>('idle');

  const handleOpen = () => {
    if (stage !== 'idle') return;

    // Phase 1: Wax crack & music unlock
    setStage('cracking');
    weddingAudio.playWaxSealCrack();
    weddingAudio.startTraditionalMusic();

    // Phase 2: Flap rotates open
    setTimeout(() => {
      setStage('opening');
    }, 320);

    // Phase 3: Reveal full invitation card
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
        backgroundImage: 'radial-gradient(circle at center, #2C050B 0%, #150205 100%)',
      }}
    >
      {/* Animated Background Arabesque Pattern with gentle drift */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none animate-pulse duration-[8000ms]"
        style={{
          backgroundImage: 'url(/assets/backgrounds/golden-arabesque-opt.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Rotating Subtle Mandala Glow in Background */}
      <div className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-15 pointer-events-none animate-[spin_60s_linear_infinite]">
        <Image
          src="/assets/mandalas/white-ornament-mandala.png"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Main Envelope Card */}
      <div className="relative w-full max-w-[360px] sm:max-w-md aspect-[4/3] flex flex-col items-center justify-center">
        {/* Envelope Body */}
        <div className="relative w-full h-full rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-[#DFBF73]/40 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-[#4A0A12] via-[#35050C] to-[#200206]">
          {/* Diagonal fold accents */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49.5%,#DFBF73_50%,transparent_50.5%)] opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_49.5%,#DFBF73_50%,transparent_50.5%)] opacity-20 pointer-events-none" />

          {/* Vertical Ceremonial Silk Ribbon in Deep Crimson & Gold */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-14 bg-gradient-to-r from-[#2A0408] via-[#8B0000] to-[#2A0408] shadow-2xl z-15 pointer-events-none flex items-center justify-between px-1 border-x border-[#DFBF73]/40">
            <span className="w-[1px] h-full bg-[#DFBF73]/60" />
            <span className="w-[1px] h-full bg-[#DFBF73]/60" />
          </div>

          {/* Envelope Card Peeking / Emerging on Tap */}
          <div
            className={`absolute w-[90%] h-[85%] bg-[#F8F5EE] border-2 border-[#DFBF73]/60 rounded-xl shadow-2xl transition-all duration-700 ease-out flex flex-col items-center justify-center p-6 text-center z-10 ${
              stage === 'opening'
                ? '-translate-y-28 opacity-95 scale-102'
                : stage === 'revealed'
                ? '-translate-y-48 opacity-0 scale-105'
                : 'translate-y-0 opacity-100'
            }`}
          >
            {/* Elegant Bismillah Calligraphy */}
            <div className="relative w-44 h-12 mb-2">
              <Image
                src="/assets/calligraphy/bismillah-gold-banner.webp"
                alt="Bismillah"
                fill
                className="object-contain"
                priority
              />
            </div>

            <h1
              className={`text-2xl md:text-3xl text-[#342C26] my-1 font-normal ${
                lang === 'ur' ? 'font-nastaliq-display leading-relaxed' : 'font-cinzel text-xl tracking-wider'
              }`}
            >
              {config.meta.title[lang]}
            </h1>

            {/* Personalized Guest Badge if provided */}
            {guestName && (
              <div className="my-1.5 px-3 py-1 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 text-xs font-medium text-[#8B0000]">
                {lang === 'ur' ? `بخدمتِ گرامی قدر: ${guestName}` : `Specially Invited: ${guestName}`}
              </div>
            )}

            <p className="text-xs text-[#8A8074] font-serif italic mt-1">
              {config.seal.sealSubtitle[lang]}
            </p>
          </div>

          {/* Envelope Flap (Top Triangular Flap) */}
          <div
            className={`absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#5C0D17] to-[#3B070E] border-b border-[#DFBF73]/50 origin-top transition-transform duration-500 ease-in-out [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-md z-20 ${
              stage !== 'idle' ? '[transform:rotateX(-180deg)] opacity-30' : ''
            }`}
          />

          {/* Royal Shield Seal (Ateeb & Nimra Wedding Seal) positioned in the center */}
          <div
            className={`absolute z-30 transition-all duration-500 ease-out ${
              stage === 'cracking'
                ? 'scale-115 rotate-6'
                : stage === 'opening'
                ? 'scale-75 opacity-0 -translate-y-12'
                : stage === 'revealed'
                ? 'opacity-0 scale-50'
                : 'scale-100'
            }`}
          >
            <div className="relative w-28 h-28 md:w-32 md:h-32 drop-shadow-[0_12px_28px_rgba(0,0,0,0.8)] hover:scale-105 active:scale-95 transition-transform">
              <Image
                src="/assets/seal/wedding-seal-opt.webp"
                alt="Wedding Shield Seal"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Tap Prompt Below Envelope (NO SKIP OPTION) */}
        <div className="mt-8 text-center z-20">
          <p className="text-xs uppercase tracking-[0.25em] text-[#DFBF73] font-cinzel font-semibold flex items-center justify-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="text-[#FFDF73] animate-pulse">✦</span>
            <span>{config.seal.openPrompt[lang]}</span>
            <span className="text-[#FFDF73] animate-pulse">✦</span>
          </p>
        </div>
      </div>
    </div>
  );
}
