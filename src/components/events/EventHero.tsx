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
      ? 'border-[#545B43]/40 bg-[#545B43]/10 text-[#545B43]'
      : event.slug === 'baraat'
      ? 'border-[#702F3D]/40 bg-[#702F3D]/10 text-[#702F3D]'
      : 'border-[#B5965A]/50 bg-[#B5965A]/10 text-[#735A2D]';

  return (
    <div className="w-full flex flex-col items-center text-center my-3 sm:my-5">
      {/* 1. Golden Bismillah Banner Asset (Prominent & Sized) */}
      <div className="relative w-72 sm:w-96 md:w-[460px] aspect-[934/225] mx-auto mb-4 drop-shadow-xs">
        <Image
          src="/assets/calligraphy/bismillah-islamic-vector.webp"
          alt="Bismillah Al-Rahman Al-Raheem"
          fill
          sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 460px"
          className="object-contain"
          priority
        />
      </div>

      {/* 2. Ceremony Type Subheading (Distinct Font) */}
      <span
        className={`text-xs sm:text-sm uppercase tracking-[0.25em] font-cinzel font-black my-1 ${accentColor}`}
      >
        {event.ceremonyType[lang]}
      </span>

      {/* 3. Main Event Title (Playfair Display / AA Sameer Zikran) */}
      <h1
        className={`my-2 leading-tight ${
          lang === 'ur'
            ? 'font-sameer-zikran text-4xl sm:text-6xl text-[#2E050B] font-black'
            : 'font-playfair text-3xl sm:text-5xl font-black text-[#2E050B]'
        }`}
      >
        {event.title[lang]}
      </h1>

      {/* 4. Formatted Date Badge */}
      <div
        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border my-2.5 shadow-2xs ${pillBorder}`}
      >
        <Calendar className="w-4 h-4" />
        <span
          className={`text-xs sm:text-sm font-sans font-bold ${
            lang === 'ur' ? 'font-alqalam-taj text-base' : ''
          }`}
        >
          {event.formattedDate[lang]}
        </span>
      </div>

      {/* 5. Dignified Formal Invitation Announcement Note (Bold & Readable) */}
      <div className="w-full max-w-xl mx-auto my-3 p-5 sm:p-6 rounded-2xl bg-[#FCFAF6]/95 border-2 border-[#B5965A]/40 shadow-[0_4px_20px_rgba(52,44,38,0.06)] backdrop-blur-sm">
        <p
          className={`text-base sm:text-lg font-bold text-[#2E050B] leading-relaxed ${
            lang === 'ur'
              ? 'font-alqalam-taj text-xl sm:text-2xl leading-loose'
              : 'font-serif text-lg leading-relaxed'
          }`}
        >
          {event.invitationNote[lang]}
        </p>
      </div>
    </div>
  );
}
