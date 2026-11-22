'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { getWeddingConfig } from '@/config/default';
import { InvitationShell } from '@/components/layout/InvitationShell';
import { filterEventsForTier } from '@/lib/audience';
import { downloadICS } from '@/lib/calendar';
import { Calendar, Navigation } from 'lucide-react';

function HomeCardContent() {
  const config = getWeddingConfig();

  return (
    <InvitationShell config={config}>
      {(lang, guest) => {
        const { allowedOrder } = filterEventsForTier(config, guest.tier);

        const coupleNames =
          lang === 'ur'
            ? `${config.couple.groom.fullName.ur} اور ${config.couple.bride.fullName.ur}`
            : `${config.couple.groom.fullName.en} & ${config.couple.bride.fullName.en}`;

        return (
          <div className="w-full flex flex-col items-center relative">
            {/* The Heirloom Card Folio */}
            <div className="relative w-full max-w-[430px] sm:max-w-[500px] bg-[#FDFBF7] rounded-3xl shadow-[0_35px_90px_rgba(0,0,0,0.95)] border-2 border-[#DFBF73]/80 overflow-hidden p-5 sm:p-8 text-center">
              {/* Inner Luxury Gold Filigree Borders */}
              <div className="absolute inset-2 sm:inset-2.5 border-2 border-[#DFBF73]/50 rounded-2xl pointer-events-none" />
              <div className="absolute inset-3.5 sm:inset-4 border border-[#DFBF73]/25 rounded-xl pointer-events-none" />

              {/* Islamic Geometric Euclidean Ornament Header Crown */}
              <div className="relative w-44 sm:w-56 h-10 mx-auto -mt-2 mb-1 opacity-70">
                <Image
                  src="/assets/ornaments/islamic-geometric-ornament.webp"
                  alt="Islamic Ornament Header"
                  fill
                  sizes="(max-width: 640px) 176px, 224px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* 1. Royal Wedding Shield Crest & Logo */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                <Image
                  src="/assets/seal/wedding-seal-opt.webp"
                  alt="Wedding Shield Crest"
                  fill
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* 2. Default Bismillah Banner Asset Across All Pages */}
              <div className="relative w-64 sm:w-76 aspect-[934/225] mx-auto my-1.5 drop-shadow-[0_1px_3px_rgba(181,150,90,0.35)]">
                <Image
                  src="/assets/calligraphy/bismillah-islamic-vector.webp"
                  alt="Bismillah Al-Rahman Al-Raheem"
                  fill
                  sizes="(max-width: 640px) 256px, 304px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* 3. Sacred Marriage Verse Sticker Applied on Its Own */}
              <div className="relative mx-auto my-3 flex items-center justify-center">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-[#DFBF73]/80 shadow-[0_10px_25px_rgba(0,0,0,0.25)] -rotate-2 hover:rotate-0 transition-transform duration-300 bg-[#FAF7F2] p-1.5 cursor-default group">
                  <Image
                    src="/assets/calligraphy/quranic-marriage-verse.webp"
                    alt="Surah Ar-Rum: 21 Marriage Verse Sticker"
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    className="object-contain p-1"
                    priority
                  />
                  {/* Subtle Gold Foil Sticker Bevel */}
                  <div className="absolute inset-0 rounded-xl border border-white/40 pointer-events-none" />
                </div>
              </div>

              {/* 4. Personalized Guest Badge (If provided in link) */}
              {guest.guestName && (
                <div className="my-2.5 mx-auto max-w-xs py-1.5 px-4 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 shadow-xs">
                  <p
                    className={`text-xs sm:text-sm text-[#8B0000] font-bold ${
                      lang === 'ur' ? 'font-nastaliq-display' : 'font-cinzel tracking-wider'
                    }`}
                  >
                    {lang === 'ur'
                      ? `بخدمتِ گرامی قدر: ${guest.guestName} و اہلِ خانہ`
                      : `Specially Invited: ${guest.guestName} & Family`}
                  </p>
                </div>
              )}

              {/* 5. Family Invitation Subheading & Greeting */}
              <div className="my-3 space-y-1">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#A68850] font-cinzel font-bold block">
                  {config.invitationIntro.hostsLine[lang]}
                </span>
                <p
                  className={`text-xs sm:text-sm text-[#5C4D43] max-w-sm mx-auto leading-relaxed ${
                    lang === 'ur' ? 'font-nastaliq-body text-sm leading-loose' : 'font-serif italic'
                  }`}
                >
                  {config.invitationIntro.greetingLine[lang]}
                </p>
              </div>

              {/* 6. Grand Couple Presentation (Bold, Big Headings & Subheadings Layout with Mandala Accent) */}
              <div className="relative my-4 py-4 border-y-2 border-[#DFBF73]/50 space-y-3 bg-[#FAF7F2]/60 rounded-xl overflow-hidden">
                {/* Decorative Mandala Watermark (gdj-mandala-5180247) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                  <div className="relative w-72 h-72 animate-spin-slow-cw">
                    <Image
                      src="/assets/mandalas/gdj-mandala-ornament.webp"
                      alt=""
                      fill
                      priority
                      sizes="288px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Groom Presentation */}
                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B0000] font-cinzel font-extrabold block mb-0.5">
                    {lang === 'ur' ? 'دولہا' : 'The Groom'}
                  </span>
                  <h1
                    className={`leading-tight ${
                      lang === 'ur'
                        ? 'font-nastaliq-display text-4xl sm:text-5xl text-[#4A0810] font-bold'
                        : 'font-playfair text-3xl sm:text-4xl font-extrabold text-[#2A0E12] tracking-tight'
                    }`}
                  >
                    {config.couple.groom.fullName[lang]}
                  </h1>
                  <p
                    className={`text-xs text-[#7A6A5D] font-medium mt-1 ${
                      lang === 'ur' ? 'font-nastaliq-body' : 'font-serif italic tracking-wide'
                    }`}
                  >
                    {lang === 'ur'
                      ? `فرزندِ ارجمند ${config.couple.groom.parents[lang]}`
                      : `Son of ${config.couple.groom.parents[lang]}`}
                  </p>
                </div>

                {/* Decorative Amper-Knot Divider */}
                <div className="relative z-10 flex items-center justify-center gap-3 text-[#DFBF73] my-1">
                  <span className="w-14 h-[1.5px] bg-gradient-to-r from-transparent to-[#DFBF73]" />
                  <span className={`text-2xl sm:text-3xl text-[#8B0000] font-bold ${lang === 'ur' ? 'font-nastaliq-display' : 'font-serif italic'}`}>
                    {lang === 'ur' ? 'اور' : '&'}
                  </span>
                  <span className="w-14 h-[1.5px] bg-gradient-to-l from-transparent to-[#DFBF73]" />
                </div>

                {/* Bride Presentation */}
                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B0000] font-cinzel font-extrabold block mb-0.5">
                    {lang === 'ur' ? 'دلہن' : 'The Bride'}
                  </span>
                  <h1
                    className={`leading-tight ${
                      lang === 'ur'
                        ? 'font-nastaliq-display text-4xl sm:text-5xl text-[#4A0810] font-bold'
                        : 'font-playfair text-3xl sm:text-4xl font-extrabold text-[#2A0E12] tracking-tight'
                    }`}
                  >
                    {config.couple.bride.fullName[lang]}
                  </h1>
                  <p
                    className={`text-xs text-[#7A6A5D] font-medium mt-1 ${
                      lang === 'ur' ? 'font-nastaliq-body' : 'font-serif italic tracking-wide'
                    }`}
                  >
                    {lang === 'ur'
                      ? `دخترِ نیک اختر ${config.couple.bride.parents[lang]}`
                      : `Daughter of ${config.couple.bride.parents[lang]}`}
                  </p>
                </div>
              </div>

              {/* 7. Targeted Ceremony Cards (Bold & Editorial Layout) */}
              <div className="my-5 space-y-4 text-left">
                <div className="text-center mb-2 flex items-center justify-center gap-2">
                  <span className="w-8 h-[1px] bg-[#DFBF73]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#8B0000] font-cinzel font-black">
                    {lang === 'ur' ? 'تقریب کے اوقات و مقام' : 'Ceremony Schedule & Venues'}
                  </span>
                  <span className="w-8 h-[1px] bg-[#DFBF73]" />
                </div>

                {allowedOrder.map((eventId) => {
                  const event = config.events[eventId];
                  if (!event) return null;

                  return (
                    <div
                      key={event.id}
                      className="p-5 rounded-2xl border-2 border-[#DFBF73]/60 bg-[#FAF7F2] shadow-sm text-center space-y-3"
                    >
                      {/* Ceremony Category Subheading */}
                      <span className="text-[10px] uppercase tracking-[0.22em] text-[#A68850] font-cinzel font-extrabold block">
                        {event.ceremonyType[lang]}
                      </span>

                      {/* Ceremony Main Title (BIG & BOLD) */}
                      <h2
                        className={`leading-snug ${
                          lang === 'ur'
                            ? 'font-nastaliq-display text-3xl text-[#4A0810] font-bold'
                            : 'font-playfair text-2xl font-bold text-[#2A0E12]'
                        }`}
                      >
                        {event.title[lang]}
                      </h2>

                      {/* Date & Time Pill Badge */}
                      <div className="inline-flex items-center gap-2 bg-[#2E050B] text-[#FFDF73] px-4 py-1.5 rounded-full text-xs font-cinzel font-bold shadow-xs">
                        <Calendar className="w-3.5 h-3.5 text-[#DFBF73]" />
                        <span className={lang === 'ur' ? 'font-nastaliq-body text-xs' : ''}>
                          {event.formattedDate[lang]}
                        </span>
                      </div>

                      {/* Schedule Timeline Steps (Body Layout) */}
                      <div className="py-2.5 border-y border-[#DFBF73]/40 space-y-2 text-xs text-[#2A201A]">
                        {event.schedule.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center justify-between gap-3 px-3">
                            <span className={`font-semibold ${lang === 'ur' ? 'font-nastaliq-body text-sm' : ''}`}>
                              {step.title[lang]}
                            </span>
                            <span dir="ltr" className="font-mono text-xs text-[#8B0000] font-bold shrink-0 bg-[#8B0000]/10 px-2 py-0.5 rounded-md">
                              {step.time}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Venue Address (Subheading & Body) */}
                      <div className="space-y-1">
                        <p className={`text-sm sm:text-base text-[#35050C] font-extrabold ${lang === 'ur' ? 'font-nastaliq-body text-base' : 'font-serif'}`}>
                          {event.venue.name[lang]}
                        </p>
                        <p className="text-xs text-[#7D7266] max-w-xs mx-auto">
                          {event.venue.address[lang]}, {event.venue.city[lang]}
                        </p>
                      </div>

                      {/* Action Buttons: Directions & Calendar (High-Contrast Buttons) */}
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <a
                          href={event.venue.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2E050B] text-[#FFDF73] text-xs font-cinzel font-bold hover:bg-[#450912] transition-colors shadow-sm"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>{lang === 'ur' ? 'گوگل میپس' : 'Directions'}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => downloadICS(event, coupleNames, lang)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 border-[#DFBF73] bg-[#FDFBF7] text-[#35050C] text-xs font-cinzel font-bold hover:bg-[#F5EFEB] transition-colors shadow-sm cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#B5965A]" />
                          <span>{lang === 'ur' ? 'کیلنڈر محفوظ کریں' : 'Save Date'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 8. Family Salam & Blessing */}
              <div className="pt-4 border-t-2 border-[#DFBF73]/40 text-center space-y-1">
                <p className={`text-xs text-[#7D7266] ${lang === 'ur' ? 'font-nastaliq-body text-sm' : 'font-serif italic'}`}>
                  {config.invitationIntro.closingBlessing[lang]}
                </p>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#B5965A] font-cinzel font-bold">
                  {config.meta.title[lang]}
                </p>
              </div>
            </div>
          </div>
        );
      }}
    </InvitationShell>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#180306]" />}>
      <HomeCardContent />
    </Suspense>
  );
}
