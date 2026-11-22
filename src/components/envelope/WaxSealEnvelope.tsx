'use client';

import React, { useState } from 'react';
import { RedWaxSeal } from './RedWaxSeal';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';
import { weddingAudio } from '@/lib/audio';
import { BismillahCalligraphySvg } from '../svg/BismillahCalligraphySvg';

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

      {/* Skip Button at Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={handleSkip}
          className="text-xs uppercase tracking-widest text-[#8A8074] hover:text-[#342C26] px-3.5 py-1.5 rounded-full border border-[#B5965A]/40 hover:border-[#8B0000] bg-[#F8F5EE]/90 backdrop-blur-xs transition-colors cursor-pointer shadow-xs"
        >
          {lang === 'ur' ? 'براہِ راست کارڈ ملاحظہ فرمائیں ↗' : 'Skip Animation ↗'}
        </button>
      </div>

      {/* Main Envelope Composition */}
      <div className="relative w-full max-w-md aspect-[4/3] flex flex-col items-center justify-center">
        {/* Envelope Body */}
        <div className="relative w-full h-full bg-[#EFE8DA] rounded-lg shadow-[0_24px_60px_rgba(52,44,38,0.22)] border border-[#D5C9B5] overflow-hidden flex flex-col items-center justify-center">
          {/* Diagonal fold creases */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49.5%,#DFD3BE_50%,transparent_50.5%)] opacity-35 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_49.5%,#DFD3BE_50%,transparent_50.5%)] opacity-35 pointer-events-none" />

          {/* Vertical Ceremonial Silk Ribbon in Deep Crimson */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-[#5E0C12] via-[#8B0000] to-[#5E0C12] shadow-md z-15 pointer-events-none flex items-center justify-between px-0.5">
            <span className="w-[1px] h-full bg-[#DFBF73]/40" />
            <span className="w-[1px] h-full bg-[#DFBF73]/40" />
          </div>

          {/* Envelope Inner Card Peeking / Emerging */}
          <div
            className={`absolute w-[92%] h-[88%] bg-[#F8F5EE] border border-[#B5965A]/40 rounded shadow-md transition-all duration-700 ease-out flex flex-col items-center justify-center p-6 text-center z-10 ${
              stage === 'opening'
                ? '-translate-y-24 opacity-90 scale-102'
                : stage === 'revealed'
                ? '-translate-y-48 opacity-0 scale-105'
                : 'translate-y-0 opacity-100'
            }`}
          >
            <BismillahCalligraphySvg width="180" height="35" className="mb-2" />

            <h1
              className={`text-2xl md:text-3xl text-[#342C26] my-1 font-normal ${
                lang === 'ur' ? 'font-nastaliq-display leading-relaxed' : 'font-serif'
              }`}
            >
              {config.meta.title[lang]}
            </h1>

            {/* Personalized Guest Badge if name provided */}
            {guestName && (
              <div className="my-1.5 px-3 py-0.5 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/25 text-[11px] font-medium text-[#8B0000]">
                {lang === 'ur' ? `بخدمتِ محترم: ${guestName}` : `Specially Invited: ${guestName}`}
              </div>
            )}

            <p className="text-xs text-[#8A8074] max-w-xs font-light mt-1">
              {config.seal.sealSubtitle[lang]}
            </p>
          </div>

          {/* Envelope Flap (Top Triangular Flap) */}
          <div
            className={`absolute top-0 inset-x-0 h-1/2 bg-[#E9DFCFA8] border-b border-[#D5C9B5] origin-top transition-transform duration-500 ease-in-out [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-sm z-20 ${
              stage !== 'idle' ? '[transform:rotateX(-180deg)] opacity-30' : ''
            }`}
          />

          {/* Royal Red Wax Seal positioned in the center over the ribbon */}
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
            <RedWaxSeal
              monogram={config.seal.monogram}
              lang={lang}
              onClick={handleOpen}
              isCracking={stage === 'cracking'}
            />
          </div>
        </div>

        {/* Prompt Below Envelope */}
        <div className="mt-8 text-center z-20">
          <button
            type="button"
            onClick={handleOpen}
            className="text-xs uppercase tracking-[0.2em] text-[#8A8074] hover:text-[#8B0000] transition-colors cursor-pointer font-medium flex items-center justify-center gap-2"
          >
            <span className="text-[#8B0000]">✦</span>
            <span>{config.seal.openPrompt[lang]}</span>
            <span className="text-[#8B0000]">✦</span>
          </button>
        </div>
      </div>
    </div>
  );
}
