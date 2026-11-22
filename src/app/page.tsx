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
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-14 text-center relative z-10">
            {/* 1. Authentic Golden Bismillah Banner Asset (Prominent & Enlarged) */}
            <div className="relative w-72 sm:w-96 md:w-[460px] aspect-[934/225] mx-auto my-3 drop-shadow-xs">
              <Image
                src="/assets/calligraphy/bismillah-islamic-vector.webp"
                alt="Bismillah Al-Rahman Al-Raheem"
                fill
                sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 460px"
                className="object-contain"
                priority
              />
            </div>

            {/* 2. Sacred Marriage Verse Sticker (Enlarged & Prominent Physical Sticker) */}
            <div className="relative mx-auto my-5 flex items-center justify-center">
              <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-3xl overflow-hidden border-2 border-[#B5965A]/50 shadow-[0_14px_36px_rgba(52,44,38,0.14)] -rotate-1 hover:rotate-0 transition-transform duration-300 bg-[#FAF7F2] p-2.5 cursor-default">
                <Image
                  src="/assets/calligraphy/quranic-marriage-verse.webp"
                  alt="Surah Ar-Rum: 21 Marriage Verse"
                  fill
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 224px"
                  className="object-contain p-1"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl border border-white/60 pointer-events-none" />
              </div>
            </div>

            {/* 3. Personalized Guest Badge (If provided in link) */}
            {guest.guestName && (
              <div className="my-3 mx-auto max-w-sm py-1.5 px-4 rounded-full bg-[#545B43]/10 border border-[#545B43]/30 shadow-2xs">
                <p
                  className={`text-xs sm:text-sm text-[#545B43] font-semibold ${
                    lang === 'ur' ? 'font-nastaliq-display' : 'font-sans tracking-wide'
                  }`}
                >
                  {lang === 'ur'
                    ? `بخدمتِ گرامی قدر: ${guest.guestName} و اہلِ خانہ`
                    : `Specially Invited: ${guest.guestName} & Family`}
                </p>
              </div>
            )}

            {/* 4. Family Invitation Announcement */}
            <div className="my-4 space-y-1.5">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#B5965A] font-sans font-bold block">
                {config.invitationIntro.hostsLine[lang]}
              </span>
              <p
                className={`text-sm sm:text-base text-[#5A4D41] max-w-lg mx-auto leading-relaxed ${
                  lang === 'ur' ? 'font-nastaliq-body text-base leading-loose' : 'font-serif italic'
                }`}
              >
                {config.invitationIntro.greetingLine[lang]}
              </p>
            </div>

            {/* 5. Grand Couple Presentation */}
            <div className="my-6 py-6 border-y border-[#B5965A]/35 space-y-4 bg-[#FCFAF6]/80 backdrop-blur-xs rounded-3xl shadow-[0_8px_30px_rgba(52,44,38,0.06)] border border-[#B5965A]/25 px-4 sm:px-8">
              {/* Groom Presentation */}
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#702F3D] font-sans font-bold block mb-1">
                  {lang === 'ur' ? 'دولہا' : 'The Groom'}
                </span>
                <h1
                  className={`leading-tight ${
                    lang === 'ur'
                      ? 'font-nastaliq-display text-4xl sm:text-6xl text-[#342C26] font-bold'
                      : 'font-serif text-3xl sm:text-5xl font-bold text-[#342C26] tracking-normal'
                  }`}
                >
                  {config.couple.groom.fullName[lang]}
                </h1>
                <p
                  className={`text-xs sm:text-sm text-[#5A4D41] font-medium mt-1.5 ${
                    lang === 'ur' ? 'font-nastaliq-body text-sm' : 'font-serif italic'
                  }`}
                >
                  {lang === 'ur'
                    ? `فرزندِ ارجمند ${config.couple.groom.parents[lang]}`
                    : `Son of ${config.couple.groom.parents[lang]}`}
                </p>
              </div>

              {/* Refined Amper-Knot Divider */}
              <div className="flex items-center justify-center gap-3 text-[#B5965A] my-2">
                <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#B5965A]/60" />
                <span className={`text-2xl sm:text-3xl text-[#702F3D] ${lang === 'ur' ? 'font-nastaliq-display' : 'font-serif italic'}`}>
                  {lang === 'ur' ? 'اور' : '&'}
                </span>
                <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#B5965A]/60" />
              </div>

              {/* Bride Presentation */}
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#702F3D] font-sans font-bold block mb-1">
                  {lang === 'ur' ? 'دلہن' : 'The Bride'}
                </span>
                <h1
                  className={`leading-tight ${
                    lang === 'ur'
                      ? 'font-nastaliq-display text-4xl sm:text-6xl text-[#342C26] font-bold'
                      : 'font-serif text-3xl sm:text-5xl font-bold text-[#342C26] tracking-normal'
                  }`}
                >
                  {config.couple.bride.fullName[lang]}
                </h1>
                <p
                  className={`text-xs sm:text-sm text-[#5A4D41] font-medium mt-1.5 ${
                    lang === 'ur' ? 'font-nastaliq-body text-sm' : 'font-serif italic'
                  }`}
                >
                  {lang === 'ur'
                    ? `دخترِ نیک اختر ${config.couple.bride.parents[lang]}`
                    : `Daughter of ${config.couple.bride.parents[lang]}`}
                </p>
              </div>
            </div>

            {/* 6. Wedding Event Overview (Distinct Event Invitation Cards) */}
            <div className="my-8 space-y-4 text-left">
              <div className="text-center mb-4">
                <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#702F3D] font-sans font-bold">
                  {lang === 'ur' ? 'تقریباتِ شادی' : 'Wedding Ceremonies'}
                </span>
              </div>

              {allowedOrder.map((eventId) => {
                const event = config.events[eventId];
                if (!event) return null;

                const accentBorder =
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
                    className={`p-6 rounded-2xl border bg-[#FCFAF6]/90 backdrop-blur-xs transition-all shadow-[0_6px_20px_rgba(52,44,38,0.05)] ${accentBorder}`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-[#81776B] font-sans font-bold">
                        {event.ceremonyType[lang]}
                      </span>
                      <span className={`text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-0.5 rounded-full ${badgeBg}`}>
                        {event.slug.toUpperCase()}
                      </span>
                    </div>

                    <h3
                      className={`text-xl sm:text-2xl font-bold text-[#342C26] mb-1.5 ${
                        lang === 'ur' ? 'font-nastaliq-display' : 'font-serif'
                      }`}
                    >
                      {event.title[lang]}
                    </h3>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#545B43] font-medium my-2">
                      <Calendar className="w-4 h-4 text-[#B5965A] shrink-0" />
                      <span className={lang === 'ur' ? 'font-nastaliq-body' : ''}>
                        {event.formattedDate[lang]}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 text-xs sm:text-sm text-[#5A4D41] my-2">
                      <MapPin className="w-4 h-4 text-[#B5965A] shrink-0 mt-0.5" />
                      <span className={lang === 'ur' ? 'font-nastaliq-body' : ''}>
                        {event.venue.name[lang]}, {event.venue.city[lang]}
                      </span>
                    </div>

                    <div className="pt-3.5 mt-3.5 border-t border-[#B5965A]/25 flex items-center justify-end">
                      {(() => {
                        const isSingle = guest.tier === 'walima' || guest.tier === 'nikkah' || guest.tier === 'baraat';
                        const targetParams = `?invite=${guest.tier}${guest.guestName ? `&to=${encodeURIComponent(guest.guestName)}` : ''}${isSingle ? '&nav=0' : ''}`;
                        return (
                          <Link
                            href={`/${event.slug}${targetParams}`}
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#342C26] text-[#F8F5EE] text-xs font-sans font-semibold hover:bg-[#545B43] transition-colors shadow-2xs"
                          >
                            <span>{lang === 'ur' ? 'دعوت نامہ دیکھیں' : 'View Invitation'}</span>
                            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </Link>
                        );
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 7. Family Closing Blessing */}
            <div className="pt-6 border-t border-[#B5965A]/25 text-center space-y-1.5">
              <p className={`text-xs sm:text-sm text-[#5A4D41] ${lang === 'ur' ? 'font-nastaliq-body text-base' : 'font-serif italic'}`}>
                {config.invitationIntro.closingBlessing[lang]}
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-[#B5965A] font-sans font-bold">
                {config.meta.title[lang]}
              </p>
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
