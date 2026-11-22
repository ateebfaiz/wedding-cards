'use client';

import React, { useState } from 'react';
import { WaxSeal } from './WaxSeal';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';
import { weddingAudio } from '@/lib/audio';

interface WaxSealEnvelopeProps {
  config: WeddingConfig;
  lang: SupportedLanguage;
  onOpenComplete: () => void;
}

export function WaxSealEnvelope({ config, lang, onOpenComplete }: WaxSealEnvelopeProps) {
  const [stage, setStage] = useState<'idle' | 'cracking' | 'opening' | 'revealed'>('idle');

  const handleOpen = () => {
    if (stage !== 'idle') return;

    // Phase 1: Wax crack
    setStage('cracking');
    weddingAudio.playWaxSealCrack();

    // Phase 2: Flap unfolds & paper rustle
    setTimeout(() => {
      setStage('opening');
      weddingAudio.playPaperRustle();
    }, 280);

    // Phase 3: Reveal invitation card & start music
    setTimeout(() => {
      setStage('revealed');
      weddingAudio.playCeremonialChime();
      weddingAudio.startAmbientSoundscape();
      onOpenComplete();
    }, 1100);
  };

  const handleSkip = () => {
    setStage('revealed');
    weddingAudio.playCeremonialChime();
    weddingAudio.startAmbientSoundscape();
    onOpenComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4EFE6] px-4 overflow-hidden select-none">
      {/* Subtle textured paper background */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5DBCB_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={handleSkip}
          className="text-xs uppercase tracking-widest text-[#8A8074] hover:text-[#342C26] px-3 py-1.5 rounded-full border border-[#B5965A]/30 hover:border-[#B5965A] bg-[#F8F5EE]/80 backdrop-blur-xs transition-colors cursor-pointer"
        >
          {lang === 'ur' ? 'براہ راست کارڈ دیکھیں ↗' : 'Skip Animation ↗'}
        </button>
      </div>

      {/* Main Envelope Composition */}
      <div className="relative w-full max-w-md aspect-[4/3] flex flex-col items-center justify-center">
        {/* Envelope Body */}
        <div className="relative w-full h-full bg-[#EFE8DA] rounded-lg shadow-[0_20px_50px_rgba(52,44,38,0.18)] border border-[#D5C9B5] overflow-hidden flex flex-col items-center justify-center">
          {/* Diagonal fold creases */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49.5%,#DFD3BE_50%,transparent_50.5%)] opacity-35 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_49.5%,#DFD3BE_50%,transparent_50.5%)] opacity-35 pointer-events-none" />

          {/* Envelope Inner Card Peeking / Emerging */}
          <div
            className={`absolute w-[90%] h-[85%] bg-[#F8F5EE] border border-[#B5965A]/40 rounded shadow-md transition-all duration-700 ease-out flex flex-col items-center justify-center p-6 text-center ${
              stage === 'opening'
                ? '-translate-y-20 opacity-90 scale-102'
                : stage === 'revealed'
                ? '-translate-y-40 opacity-0 scale-105'
                : 'translate-y-0 opacity-100'
            }`}
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#B5965A] font-medium">
              {config.bismillah.translation[lang]}
            </span>
            <h1 className="font-serif text-2xl md:text-3xl text-[#342C26] my-2 font-normal">
              {config.meta.title[lang]}
            </h1>
            <p className="text-xs text-[#8A8074] max-w-xs font-light">
              {config.seal.sealSubtitle[lang]}
            </p>
          </div>

          {/* Envelope Flap (Top Triangular Flap) */}
          <div
            className={`absolute top-0 inset-x-0 h-1/2 bg-[#E9DFCFA0] border-b border-[#D5C9B5] origin-top transition-transform duration-500 ease-in-out [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-sm ${
              stage !== 'idle' ? '[transform:rotateX(-180deg)] opacity-40' : ''
            }`}
          />

          {/* Wax Seal positioned in the center */}
          <div
            className={`absolute z-30 transition-all duration-500 ease-out ${
              stage === 'cracking'
                ? 'scale-115 rotate-6'
                : stage === 'opening'
                ? 'scale-75 opacity-0 -translate-y-10'
                : stage === 'revealed'
                ? 'opacity-0 scale-50'
                : 'scale-100'
            }`}
          >
            <WaxSeal
              monogram={config.seal.monogram}
              lang={lang}
              onClick={handleOpen}
              isCracking={stage === 'cracking'}
            />
          </div>
        </div>

        {/* Prompt Below Envelope */}
        <div className="mt-8 text-center">
          <p
            onClick={handleOpen}
            className="text-xs uppercase tracking-[0.2em] text-[#8A8074] hover:text-[#B5965A] transition-colors cursor-pointer font-medium flex items-center justify-center gap-2"
          >
            <span>✦</span>
            <span>{config.seal.openPrompt[lang]}</span>
            <span>✦</span>
          </p>
        </div>
      </div>
    </div>
  );
}
