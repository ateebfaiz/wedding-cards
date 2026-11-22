'use client';

import React from 'react';
import Image from 'next/image';
import { WeddingEvent, SupportedLanguage } from '@/types/wedding';
import { Calendar } from 'lucide-react';

interface EventHeroProps {
  event: WeddingEvent;
  lang: SupportedLanguage;
}

export function EventHero({ event, lang }: EventHeroProps) {
  // Theme color accents per ceremony
  const accentColor =
    event.slug === 'nikkah'
      ? 'text-[#545B43]'
      : event.slug === 'baraat'
      ? 'text-[#702F3D]'
      : 'text-[#B5965A]';

  const pillBorder =
    event.slug === 'nikkah'
      ? 'border-[#545B43]/30 bg-[#545B43]/10 text-[#545B43]'
      : event.slug === 'baraat'
      ? 'border-[#702F3D]/30 bg-[#702F3D]/10 text-[#702F3D]'
      : 'border-[#B5965A]/40 bg-[#B5965A]/10 text-[#735A2D]';

  return (
    <div className="flex flex-col items-center text-center my-4 sm:my-6">
      {/* 1. Golden Bismillah Banner Asset (Enlarged) */}
      <div className="relative w-72 sm:w-96 md:w-[440px] aspect-[934/225] mx-auto mb-4 drop-shadow-xs">
        <Image
          src="/assets/calligraphy/bismillah-islamic-vector.webp"
          alt="Bismillah Al-Rahman Al-Raheem"
          fill
          sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 440px"
          className="object-contain"
          priority
        />
      </div>

      {/* 2. Ceremony Type Subtitle */}
      <span className={`text-[11px] uppercase tracking-[0.25em] font-sans font-bold my-1 ${accentColor}`}>
        {event.ceremonyType[lang]}
      </span>

      {/* 3. Main Event Title (Cormorant Garamond / Gulzar) */}
      <h1
        className={`my-2 leading-tight ${
          lang === 'ur'
            ? 'font-nastaliq-display text-4xl sm:text-5xl text-[#342C26] font-bold'
            : 'font-serif text-3xl sm:text-5xl font-bold text-[#342C26]'
        }`}
      >
        {event.title[lang]}
      </h1>

      {/* 4. Formatted Date Badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border my-2.5 shadow-2xs ${pillBorder}`}>
        <Calendar className="w-3.5 h-3.5" />
        <span
          className={`text-xs sm:text-sm font-sans font-bold ${
            lang === 'ur' ? 'font-nastaliq-body text-xs' : ''
          }`}
        >
          {event.formattedDate[lang]}
        </span>
      </div>

      {/* 5. Invitation Announcement Note */}
      <p
        className={`max-w-xl text-sm sm:text-base text-[#81776B] mt-2 px-4 leading-relaxed ${
          lang === 'ur' ? 'font-nastaliq-body leading-loose text-sm sm:text-base' : 'font-serif italic'
        }`}
      >
        {event.invitationNote[lang]}
      </p>
    </div>
  );
}
