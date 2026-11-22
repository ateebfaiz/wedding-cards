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

  const coupleDisplay =
    lang === 'ur'
      ? `${config.couple.groom.shortName?.ur || config.couple.groom.fullName.ur} اور ${config.couple.bride.shortName?.ur || config.couple.bride.fullName.ur}`
      : `${config.couple.groom.shortName?.en || config.couple.groom.fullName.en} & ${config.couple.bride.shortName?.en || config.couple.bride.fullName.en}`;

  return (
    <div
      onClick={handleOpen}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 overflow-hidden select-none cursor-pointer"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #240307 0%, #0E0103 100%)',
      }}
    >
      {/* Background Deep Maroon-Gold Pattern with Slow Drift */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none animate-slow-drift"
        style={{
          backgroundImage: 'url(/assets/backgrounds/maroon-golden-opt.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Decorative Golden Mandala Rotating Animation Asset */}
      <div className="absolute w-[440px] h-[440px] sm:w-[680px] sm:h-[680px] opacity-25 pointer-events-none animate-spin-slow">
        <Image
          src="/assets/mandalas/decorative-golden-mandala.webp"
          alt="Decorative Golden Mandala"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* The Mail Envelope Composition */}
      <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/3] flex flex-col items-center justify-center">
        {/* Physical Brown Mail Envelope Container */}
        <div
          className={`relative w-full h-full rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ease-out ${
            stage === 'opening'
              ? 'scale-105 opacity-90'
              : stage === 'revealed'
              ? 'scale-110 opacity-0'
              : 'scale-100 opacity-100'
          }`}
        >
          {/* Authentic Brown Envelope Texture Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/envelope/brown-envelope.webp"
              alt="Mail Envelope"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Luxury Card Vignette & Gold Filigree Edging */}
          <div className="absolute inset-2 sm:inset-3 border-2 border-[#DFBF73]/60 rounded-xl pointer-events-none z-10 shadow-inner" />
          <div className="absolute inset-3.5 sm:inset-4.5 border border-[#DFBF73]/30 rounded-lg pointer-events-none z-10" />

          {/* Top Calligraphy Badge on Envelope */}
          <div className="relative z-20 -mt-6 sm:-mt-8 mb-1 w-44 sm:w-52 h-12">
            <Image
              src="/assets/calligraphy/bismillah-gold-banner.webp"
              alt="Bismillah"
              fill
              className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              priority
            />
          </div>

          {/* Names Written on Mail */}
          <div className="relative z-20 text-center px-4 space-y-1 mb-2">
            <h1
              className={`text-2xl sm:text-3xl text-[#2C1810] font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)] ${
                lang === 'ur' ? 'font-nastaliq-display text-3xl sm:text-4xl text-[#3A050A]' : 'font-cinzel'
              }`}
            >
              {coupleDisplay}
            </h1>

            {/* Personalized Guest Address Line */}
            {guestName ? (
              <div className="inline-block px-3 py-1 rounded-full bg-[#8B0000]/15 border border-[#8B0000]/30 shadow-xs">
                <span
                  className={`text-xs sm:text-sm text-[#5C0A10] font-semibold ${
                    lang === 'ur' ? 'font-nastaliq-display' : 'font-cinzel'
                  }`}
                >
                  {lang === 'ur' ? `بخدمتِ گرامی قدر: ${guestName}` : `For: ${guestName}`}
                </span>
              </div>
            ) : (
              <p className="text-[11px] sm:text-xs uppercase tracking-widest text-[#5C451C] font-cinzel font-semibold">
                {config.meta.title[lang]}
              </p>
            )}
          </div>

          {/* Royal Shield Seal (Ateeb & Nimra Wedding Seal) in Center of Envelope */}
          <div
            className={`relative z-30 my-1 transition-all duration-500 ease-out ${
              stage === 'cracking'
                ? 'scale-115 rotate-6'
                : stage === 'opening'
                ? 'scale-75 opacity-0'
                : 'scale-100 hover:scale-105 active:scale-95'
            }`}
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)]">
              <Image
                src="/assets/seal/wedding-seal-opt.webp"
                alt="Royal Wedding Shield Seal"
                fill
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
