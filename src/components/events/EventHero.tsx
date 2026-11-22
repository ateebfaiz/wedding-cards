'use client';

import React from 'react';
import { WeddingEvent, SupportedLanguage } from '@/types/wedding';
import { MughalArchHeader } from '../common/OrnamentalBorder';

interface EventHeroProps {
  event: WeddingEvent;
  lang: SupportedLanguage;
}

export function EventHero({ event, lang }: EventHeroProps) {
  return (
    <div className="flex flex-col items-center text-center my-4 md:my-6">
      <MughalArchHeader />

      {/* Ceremony Type Subtitle */}
      <span className="text-xs uppercase tracking-[0.28em] text-[#8B0000] font-cinzel font-black my-1">
        {event.ceremonyType[lang]}
      </span>

      {/* Main Event Title (Big & Bold) */}
      <h1
        className={`my-2 leading-tight ${
          lang === 'ur'
            ? 'font-nastaliq-display text-4xl sm:text-5xl text-[#4A0810] font-bold'
            : 'font-playfair text-3xl sm:text-5xl font-extrabold text-[#2A0E12] tracking-tight'
        }`}
      >
        {event.title[lang]}
      </h1>

      {/* Formatted Date Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#DFBF73]/60 bg-[#2E050B] text-[#FFDF73] my-3 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#DFBF73]" />
        <span
          className={`text-xs sm:text-sm font-cinzel font-bold ${
            lang === 'ur' ? 'font-nastaliq-body text-xs' : ''
          }`}
        >
          {event.formattedDate[lang]}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#DFBF73]" />
      </div>

      {/* Invitation Note (Body layout) */}
      <p
        className={`max-w-lg text-sm sm:text-base text-[#5C4D43] mt-3 px-4 ${
          lang === 'ur' ? 'font-nastaliq-body leading-loose text-base' : 'font-serif italic leading-relaxed'
        }`}
      >
        {event.invitationNote[lang]}
      </p>
    </div>
  );
}
