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
    <div className="w-full flex flex-col items-center text-center my-2 sm:my-3">
      {/* 1. Golden Bismillah Banner Asset (Prominent & Sized) */}
      <div className="relative w-64 sm:w-80 md:w-[440px] aspect-[2000/1648] mx-auto mb-2 drop-shadow-xs">
        <Image
          src="/assets/calligraphy/bismillah-islamic-vector.webp"
          alt="Bismillah Al-Rahman Al-Raheem"
          fill
          sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 440px"
          className="object-contain"
          priority
        />
      </div>

      {/* Sacred Quranic Marriage Verse Sticker (Enlarged Physical Sticker on Ceremony Hero) */}
      <div className="relative mx-auto my-3 flex items-center justify-center">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-3xl overflow-hidden border-2 border-[#B5965A]/50 shadow-[0_12px_32px_rgba(52,44,38,0.12)] -rotate-1 hover:rotate-0 transition-transform duration-300 bg-[#FAF7F2] p-2 cursor-default">
          <Image
            src="/assets/calligraphy/quranic-marriage-verse.webp"
            alt="Surah Ar-Rum: 21 Marriage Verse"
            fill
            sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 192px"
            className="object-contain p-1"
            priority
          />
          <div className="absolute inset-0 rounded-2xl border border-white/60 pointer-events-none" />
        </div>
      </div>

      {/* 2. Ceremony Type Subheading (Distinct Font, AA Sameer Zikran / AlQalam Taj for Urdu) */}
      <span
        className={`text-sm sm:text-base tracking-[0.15em] font-black my-1 ${accentColor} ${
          lang === 'ur' ? 'font-sameer-zikran text-xl sm:text-2xl' : 'font-cinzel uppercase'
        }`}
      >
        {event.ceremonyType[lang]}
      </span>

      {/* 3. Main Event Title (Playfair Display / AA Sameer Zikran) */}
      <h1
        className={`my-1.5 leading-tight ${
          lang === 'ur'
            ? 'font-sameer-zikran text-4xl sm:text-6xl text-[#2E050B] font-black'
            : 'font-playfair text-3xl sm:text-5xl font-black text-[#2E050B]'
        }`}
      >
        {event.title[lang]}
      </h1>

      {/* 4. Formatted Date Badge */}
      <div
        className={`inline-flex items-center gap-2 px-5 py-1.5 rounded-full border my-2 shadow-2xs ${pillBorder}`}
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
      <div className="w-full max-w-xl mx-auto my-2.5 p-4 sm:p-5 rounded-2xl bg-[#FCFAF6]/95 border-2 border-[#B5965A]/40 shadow-[0_4px_20px_rgba(52,44,38,0.06)] backdrop-blur-sm">
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
