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
      <span className="text-xs uppercase tracking-[0.25em] text-[#B5965A] font-medium my-1">
        {event.ceremonyType[lang]}
      </span>

      {/* Main Event Title */}
      <h1
        className={`text-3xl md:text-5xl text-[#342C26] my-2 font-normal ${
          lang === 'ur' ? 'font-nastaliq leading-[2.2]' : 'font-serif'
        }`}
      >
        {event.title[lang]}
      </h1>

      {/* Formatted Date */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B5965A]/30 bg-[#EFE8DA]/50 my-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B5965A]" />
        <span
          className={`text-sm md:text-base text-[#545B43] font-medium ${
            lang === 'ur' ? 'font-nastaliq leading-loose' : 'font-serif'
          }`}
        >
          {event.formattedDate[lang]}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#B5965A]" />
      </div>

      {/* Invitation Note */}
      <p
        className={`max-w-lg text-sm md:text-base text-[#8A8074] mt-3 px-4 ${
          lang === 'ur' ? 'font-nastaliq leading-loose' : 'font-sans font-light leading-relaxed'
        }`}
      >
        {event.invitationNote[lang]}
      </p>
    </div>
  );
}
