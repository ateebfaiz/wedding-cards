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
            ? `${config.couple.groom.shortName?.ur || config.couple.groom.fullName.ur} اور ${config.couple.bride.shortName?.ur || config.couple.bride.fullName.ur}`
            : `${config.couple.groom.shortName?.en || config.couple.groom.fullName.en} & ${config.couple.bride.shortName?.en || config.couple.bride.fullName.en}`;

        return (
          <div className="w-full flex flex-col items-center">
            {/* The Heirloom Card Folio */}
            <div className="relative w-full max-w-[420px] sm:max-w-[490px] bg-[#FDFBF7] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] border-2 border-[#DFBF73]/80 overflow-hidden p-5 sm:p-8 text-center">
              {/* Rotating Decorative Golden Mandala in Card Background */}
              <div className="absolute -top-16 -right-16 w-80 h-80 opacity-12 pointer-events-none animate-spin-slow">
                <Image
                  src="/assets/mandalas/decorative-golden-mandala.webp"
                  alt=""
                  fill
                  sizes="320px"
                  className="object-contain"
                />
              </div>

              {/* Inner Luxury Gold Filigree Borders */}
              <div className="absolute inset-2 sm:inset-2.5 border-2 border-[#DFBF73]/50 rounded-2xl pointer-events-none" />
              <div className="absolute inset-3.5 sm:inset-4 border border-[#DFBF73]/25 rounded-xl pointer-events-none" />

              {/* 1. Royal Wedding Shield Crest & Logo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto -mt-1 mb-2 drop-shadow-[0_8px_18px_rgba(0,0,0,0.3)]">
                <Image
                  src="/assets/seal/wedding-seal-opt.webp"
                  alt="Wedding Shield Crest"
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* 2. Authentic Golden Bismillah Banner Asset (No custom SVG/text) */}
              <div className="relative w-60 sm:w-72 h-14 mx-auto my-1">
                <Image
                  src="/assets/calligraphy/bismillah-gold-banner.webp"
                  alt="Bismillah Al-Rahman Al-Raheem"
                  fill
                  sizes="(max-width: 640px) 240px, 288px"
                  className="object-contain drop-shadow-[0_1px_2px_rgba(181,150,90,0.3)]"
                  priority
                />
              </div>

              {/* 3. Authentic Quranic Marriage Verse Image Asset */}
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-32 sm:h-36 mx-auto my-2 rounded-xl overflow-hidden border border-[#DFBF73]/40 bg-[#F5EFEB]/60 p-1.5 shadow-inner">
                <Image
                  src="/assets/calligraphy/quranic-marriage-verse.webp"
                  alt="Surah Ar-Rum: 21 Marriage Verse"
                  fill
                  sizes="(max-width: 640px) 340px, 380px"
                  className="object-contain p-1"
                  priority
                />
              </div>

              {/* 4. Personalized Guest Badge (If provided in link) */}
              {guest.guestName && (
                <div className="my-2.5 mx-auto max-w-xs py-1 px-3.5 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 shadow-xs">
                  <p
                    className={`text-xs sm:text-sm text-[#8B0000] font-semibold ${
                      lang === 'ur' ? 'font-nastaliq-display' : 'font-cinzel tracking-wider'
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
                <p className="text-xs uppercase tracking-[0.25em] text-[#B5965A] font-cinzel font-bold">
                  {config.invitationIntro.hostsLine[lang]}
                </p>
                <p
                  className={`text-xs sm:text-sm text-[#7D7266] max-w-sm mx-auto leading-relaxed ${
                    lang === 'ur' ? 'font-nastaliq-body text-sm leading-loose' : 'font-serif italic'
                  }`}
                >
                  {config.invitationIntro.greetingLine[lang]}
                </p>
              </div>

              {/* 6. Grand Couple Presentation */}
              <div className="my-4 py-3.5 border-y border-[#DFBF73]/40 space-y-2.5">
                {/* Groom */}
                <div>
                  <h2
                    className={`text-3xl sm:text-4xl font-normal ${
                      lang === 'ur' ? 'font-nastaliq-display text-4xl sm:text-5xl text-[#5E0C12]' : 'font-cinzel font-bold text-[#35050C]'
                    }`}
                  >
                    {config.couple.groom.fullName[lang]}
                  </h2>
                  <p className={`text-[11px] sm:text-xs text-[#7D7266] ${lang === 'ur' ? 'font-nastaliq-body mt-1' : 'font-serif'}`}>
                    {lang === 'ur'
                      ? `فرزندِ ارجمند ${config.couple.groom.parents[lang]}`
                      : `Son of ${config.couple.groom.parents[lang]}`}
                  </p>
                </div>

                {/* Decorative Amper-knot */}
                <div className="flex items-center justify-center gap-3 text-[#DFBF73]">
                  <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#DFBF73]" />
                  <span className={`text-xl sm:text-2xl text-[#8B0000] ${lang === 'ur' ? 'font-nastaliq-display' : 'font-serif italic'}`}>
                    {lang === 'ur' ? 'اور' : '&'}
                  </span>
                  <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#DFBF73]" />
                </div>

                {/* Bride */}
                <div>
                  <h2
                    className={`text-3xl sm:text-4xl font-normal ${
                      lang === 'ur' ? 'font-nastaliq-display text-4xl sm:text-5xl text-[#5E0C12]' : 'font-cinzel font-bold text-[#35050C]'
                    }`}
                  >
                    {config.couple.bride.fullName[lang]}
                  </h2>
                  <p className={`text-[11px] sm:text-xs text-[#7D7266] ${lang === 'ur' ? 'font-nastaliq-body mt-1' : 'font-serif'}`}>
                    {lang === 'ur'
                      ? `دخترِ نیک اختر ${config.couple.bride.parents[lang]}`
                      : `Daughter of ${config.couple.bride.parents[lang]}`}
                  </p>
                </div>
              </div>

              {/* 7. Targeted Ceremony Cards (Only Invited Events) */}
              <div className="my-4 space-y-3.5 text-left">
                <div className="text-center mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B0000] font-cinzel font-bold">
                    {lang === 'ur' ? 'تقریب کے اوقات و مقام' : 'Ceremony & Venue Details'}
                  </span>
                </div>

                {allowedOrder.map((eventId) => {
                  const event = config.events[eventId];
                  if (!event) return null;

                  return (
                    <div
                      key={event.id}
                      className="p-4 sm:p-5 rounded-2xl border border-[#DFBF73]/60 bg-[#F5EFEB]/90 shadow-sm text-center space-y-2.5"
                    >
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B0000] font-cinzel font-bold block">
                        {event.ceremonyType[lang]}
                      </span>

                      <h3
                        className={`text-xl sm:text-2xl font-medium ${
                          lang === 'ur' ? 'font-nastaliq-display text-2xl text-[#5E0C12]' : 'font-cinzel font-bold text-[#35050C]'
                        }`}
                      >
                        {event.title[lang]}
                      </h3>

                      {/* Date Pill */}
                      <div className="inline-flex items-center gap-1.5 bg-[#545B43]/10 px-3.5 py-1 rounded-full text-xs text-[#545B43] font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#B5965A]" />
                        <span className={lang === 'ur' ? 'font-nastaliq-body' : ''}>
                          {event.formattedDate[lang]}
                        </span>
                      </div>

                      {/* Schedule Steps */}
                      <div className="py-2 border-y border-[#DFBF73]/30 space-y-1.5 text-xs text-[#2A201A]">
                        {event.schedule.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-center justify-between gap-2 px-2">
                            <span className={lang === 'ur' ? 'font-nastaliq-body' : 'font-medium'}>
                              {step.title[lang]}
                            </span>
                            <span dir="ltr" className="font-mono text-[11px] text-[#8B0000] font-semibold shrink-0">
                              {step.time}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Venue Address */}
                      <div className="space-y-0.5">
                        <p className={`text-sm text-[#35050C] font-bold ${lang === 'ur' ? 'font-nastaliq-body text-base' : 'font-serif'}`}>
                          {event.venue.name[lang]}
                        </p>
                        <p className="text-xs text-[#7D7266]">
                          {event.venue.address[lang]}, {event.venue.city[lang]}
                        </p>
                      </div>

                      {/* Action Buttons: Directions & Calendar */}
                      <div className="flex items-center justify-center gap-2.5 pt-1.5">
                        <a
                          href={event.venue.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#545B43] text-[#FDFBF7] text-xs font-cinzel font-bold hover:bg-[#434935] transition-colors shadow-xs"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>{lang === 'ur' ? 'گوگل میپس' : 'Directions'}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => downloadICS(event, coupleNames, lang)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#DFBF73] bg-[#FDFBF7] text-[#35050C] text-xs font-cinzel font-bold hover:bg-[#F5EFEB] transition-colors shadow-xs cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#B5965A]" />
                          <span>{lang === 'ur' ? 'کیلنڈر' : 'Calendar'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 8. Family Salam & Blessing */}
              <div className="pt-3 border-t border-[#DFBF73]/30 text-center">
                <p className={`text-xs text-[#7D7266] ${lang === 'ur' ? 'font-nastaliq-body text-sm' : 'font-serif italic'}`}>
                  {config.invitationIntro.closingBlessing[lang]}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#B5965A] font-cinzel font-bold mt-1.5">
                  Ahmed & Arfa Wedding
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
