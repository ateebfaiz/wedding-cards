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
      <span className="text-xs uppercase tracking-[0.25em] text-[#8B0000] font-bold my-1">
        {event.ceremonyType[lang]}
      </span>

      {/* Main Event Title */}
      <h1
        className={`text-3xl md:text-5xl text-[#342C26] my-2 font-normal ${
          lang === 'ur' ? 'font-nastaliq-display text-4xl md:text-5xl text-[#5E0C12] leading-[2.4]' : 'font-serif'
        }`}
      >
        {event.title[lang]}
      </h1>

      {/* Formatted Date */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B5965A]/40 bg-[#EFE8DA]/60 my-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" />
        <span
          className={`text-sm md:text-base text-[#545B43] font-medium ${
            lang === 'ur' ? 'font-nastaliq-body' : 'font-serif'
          }`}
        >
          {event.formattedDate[lang]}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" />
      </div>

      {/* Invitation Note */}
      <p
        className={`max-w-lg text-sm md:text-base text-[#8A8074] mt-3 px-4 ${
          lang === 'ur' ? 'font-nastaliq-body leading-loose text-base' : 'font-sans font-light leading-relaxed'
        }`}
      >
        {event.invitationNote[lang]}
      </p>
    </div>
  );
}
