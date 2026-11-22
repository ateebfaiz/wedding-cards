'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getWeddingConfig } from '@/config/default';
import { InvitationShell } from '@/components/layout/InvitationShell';
import { filterEventsForTier } from '@/lib/audience';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';

function HomeCardContent() {
  const config = getWeddingConfig();

  return (
    <InvitationShell config={config}>
      {(lang, guest) => {
        const { allowedOrder } = filterEventsForTier(config, guest.tier);

        return (
          <div className="w-full max-w-xl mx-auto flex flex-col items-center">
            {/* The Contemporary Heirloom Card Folio */}
            <div className="relative w-full bg-[#FCFAF6] rounded-3xl shadow-[0_20px_60px_rgba(52,44,38,0.09)] border border-[#B5965A]/35 overflow-hidden p-6 sm:p-10 text-center">
              {/* Inner Hairline Filigree Frame */}
              <div className="absolute inset-2 sm:inset-3 border border-[#B5965A]/25 rounded-2xl pointer-events-none" />
              <div className="absolute inset-3.5 sm:inset-4.5 border border-[#B5965A]/15 rounded-xl pointer-events-none" />

              {/* 1. Royal Wedding Shield Crest */}
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 mx-auto mt-1 mb-2 drop-shadow-xs">
                <Image
                  src="/assets/seal/wedding-seal-opt.webp"
                  alt="Ateeb & Nimra Wedding Crest"
                  fill
                  sizes="(max-width: 640px) 72px, 88px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* 2. Authentic Golden Bismillah Banner Asset */}
              <div className="relative w-60 sm:w-72 aspect-[934/225] mx-auto my-2">
                <Image
                  src="/assets/calligraphy/bismillah-islamic-vector.webp"
                  alt="Bismillah Al-Rahman Al-Raheem"
                  fill
                  sizes="(max-width: 640px) 240px, 288px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* 3. Sacred Marriage Verse Sticker (Applied on its own) */}
              <div className="relative mx-auto my-3 flex items-center justify-center">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-[#B5965A]/50 shadow-[0_8px_20px_rgba(52,44,38,0.12)] -rotate-2 hover:rotate-0 transition-transform duration-300 bg-[#F8F5EE] p-1 cursor-default">
                  <Image
                    src="/assets/calligraphy/quranic-marriage-verse.webp"
                    alt="Surah Ar-Rum: 21 Marriage Verse"
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-contain p-0.5"
                    priority
                  />
                  <div className="absolute inset-0 rounded-xl border border-white/50 pointer-events-none" />
                </div>
              </div>

              {/* 4. Personalized Guest Badge (If provided in link) */}
              {guest.guestName && (
                <div className="my-2.5 mx-auto max-w-xs py-1 px-3.5 rounded-full bg-[#545B43]/10 border border-[#545B43]/30 shadow-2xs">
                  <p
                    className={`text-xs text-[#545B43] font-semibold ${
                      lang === 'ur' ? 'font-nastaliq-display' : 'font-sans tracking-wide'
                    }`}
                  >
                    {lang === 'ur'
                      ? `بخدمتِ گرامی قدر: ${guest.guestName} و اہلِ خانہ`
                      : `Specially Invited: ${guest.guestName} & Family`}
                  </p>
                </div>
              )}

              {/* 5. Family Invitation Announcement */}
              <div className="my-3 space-y-1">
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#B5965A] font-sans font-bold block">
                  {config.invitationIntro.hostsLine[lang]}
                </span>
                <p
                  className={`text-xs sm:text-sm text-[#81776B] max-w-md mx-auto leading-relaxed ${
                    lang === 'ur' ? 'font-nastaliq-body text-sm leading-loose' : 'font-serif italic'
                  }`}
                >
                  {config.invitationIntro.greetingLine[lang]}
                </p>
              </div>

              {/* 6. Grand Couple Presentation */}
              <div className="my-4 py-4 border-y border-[#B5965A]/30 space-y-3 bg-[#F8F5EE]/50 rounded-2xl">
                {/* Groom Presentation */}
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#702F3D] font-sans font-bold block mb-0.5">
                    {lang === 'ur' ? 'دولہا' : 'The Groom'}
                  </span>
                  <h1
                    className={`leading-tight ${
                      lang === 'ur'
                        ? 'font-nastaliq-display text-4xl sm:text-5xl text-[#342C26] font-bold'
                        : 'font-serif text-3xl sm:text-4xl font-bold text-[#342C26] tracking-normal'
                    }`}
                  >
                    {config.couple.groom.fullName[lang]}
                  </h1>
                  <p
                    className={`text-xs text-[#81776B] font-medium mt-1 ${
                      lang === 'ur' ? 'font-nastaliq-body' : 'font-serif italic'
                    }`}
                  >
                    {lang === 'ur'
                      ? `فرزندِ ارجمند ${config.couple.groom.parents[lang]}`
                      : `Son of ${config.couple.groom.parents[lang]}`}
                  </p>
                </div>

                {/* Refined Amper-Knot Divider */}
                <div className="flex items-center justify-center gap-3 text-[#B5965A] my-1">
                  <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#B5965A]/60" />
                  <span className={`text-xl sm:text-2xl text-[#702F3D] ${lang === 'ur' ? 'font-nastaliq-display' : 'font-serif italic'}`}>
                    {lang === 'ur' ? 'اور' : '&'}
                  </span>
                  <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#B5965A]/60" />
                </div>

                {/* Bride Presentation */}
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#702F3D] font-sans font-bold block mb-0.5">
                    {lang === 'ur' ? 'دلہن' : 'The Bride'}
                  </span>
                  <h1
                    className={`leading-tight ${
                      lang === 'ur'
                        ? 'font-nastaliq-display text-4xl sm:text-5xl text-[#342C26] font-bold'
                        : 'font-serif text-3xl sm:text-4xl font-bold text-[#342C26] tracking-normal'
                    }`}
                  >
                    {config.couple.bride.fullName[lang]}
                  </h1>
                  <p
                    className={`text-xs text-[#81776B] font-medium mt-1 ${
                      lang === 'ur' ? 'font-nastaliq-body' : 'font-serif italic'
                    }`}
                  >
                    {lang === 'ur'
                      ? `دخترِ نیک اختر ${config.couple.bride.parents[lang]}`
                      : `Daughter of ${config.couple.bride.parents[lang]}`}
                  </p>
                </div>
              </div>

              {/* 7. Wedding Event Overview (Distinct Event Invitation Cards with Deep Contrast & Clarity) */}
              <div className="my-6 space-y-4 text-left">
                <div className="text-center mb-3">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#702F3D] font-sans font-bold">
                    {lang === 'ur' ? 'تقریباتِ شادی' : 'Wedding Ceremonies'}
                  </span>
                </div>

                {allowedOrder.map((eventId) => {
                  const event = config.events[eventId];
                  if (!event) return null;

                  // Distinct subtle accent color per event
                  const accentColor =
                    event.slug === 'nikkah'
                      ? 'border-[#545B43]/40 hover:border-[#545B43]'
                      : event.slug === 'baraat'
                      ? 'border-[#702F3D]/40 hover:border-[#702F3D]'
                      : 'border-[#B5965A]/40 hover:border-[#B5965A]';

                  const badgeBg =
                    event.slug === 'nikkah'
                      ? 'bg-[#545B43] text-white'
                      : event.slug === 'baraat'
                      ? 'bg-[#702F3D] text-white'
                      : 'bg-[#B5965A] text-white';

                  return (
                    <div
                      key={event.id}
                      className={`p-5 rounded-2xl border bg-[#F8F5EE] transition-all shadow-xs ${accentColor}`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#81776B] font-sans font-bold">
                          {event.ceremonyType[lang]}
                        </span>
                        <span className={`text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeBg}`}>
                          {event.slug.toUpperCase()}
                        </span>
                      </div>

                      <h3
                        className={`text-xl sm:text-2xl font-bold text-[#342C26] mb-1 ${
                          lang === 'ur' ? 'font-nastaliq-display' : 'font-serif'
                        }`}
                      >
                        {event.title[lang]}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-[#545B43] font-medium my-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#B5965A] shrink-0" />
                        <span className={lang === 'ur' ? 'font-nastaliq-body' : ''}>
                          {event.formattedDate[lang]}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-[#81776B] my-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B5965A] shrink-0 mt-0.5" />
                        <span className={lang === 'ur' ? 'font-nastaliq-body' : ''}>
                          {event.venue.name[lang]}, {event.venue.city[lang]}
                        </span>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#B5965A]/20 flex items-center justify-end">
                        <Link
                          href={`/${event.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#342C26] text-[#F8F5EE] text-xs font-sans font-medium hover:bg-[#545B43] transition-colors shadow-2xs"
                        >
                          <span>{lang === 'ur' ? 'دعوت نامہ دیکھیں' : 'View Invitation'}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 8. Family Closing Blessing */}
              <div className="pt-4 border-t border-[#B5965A]/25 text-center space-y-1">
                <p className={`text-xs text-[#81776B] ${lang === 'ur' ? 'font-nastaliq-body text-sm' : 'font-serif italic'}`}>
                  {config.invitationIntro.closingBlessing[lang]}
                </p>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#B5965A] font-sans font-bold">
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
    <Suspense fallback={<div className="min-h-screen bg-[#F8F5EE]" />}>
      <HomeCardContent />
    </Suspense>
  );
}
