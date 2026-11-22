'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { getWeddingConfig } from '@/config/default';
import { InvitationShell } from '@/components/layout/InvitationShell';
import { filterEventsForTier } from '@/lib/audience';
import { downloadICS, buildGoogleCalendarUrl } from '@/lib/calendar';
import { Calendar, Navigation, Clock, MapPin, Share2 } from 'lucide-react';

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
            <div className="relative w-full max-w-[440px] sm:max-w-lg bg-[#FDFBF7] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-2 border-[#DFBF73]/70 overflow-hidden p-6 sm:p-9 text-center">
              {/* Subtle background mandala watermark with slow rotation */}
              <div className="absolute -top-20 -right-20 w-80 h-80 opacity-10 pointer-events-none animate-spin-slow">
                <Image
                  src="/assets/mandalas/golden-mandala-arabesque.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              {/* Inner Fine Gold Hairline Frame */}
              <div className="absolute inset-2 border border-[#DFBF73]/40 rounded-2xl pointer-events-none" />
              <div className="absolute inset-3.5 border border-[#DFBF73]/20 rounded-xl pointer-events-none" />

              {/* 1. Royal Wedding Shield Seal / Logo */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto -mt-2 mb-3 drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
                <Image
                  src="/assets/seal/wedding-seal-opt.webp"
                  alt="Wedding Shield Crest"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* 2. Classical Bismillah Calligraphy Banner */}
              <div className="relative w-64 sm:w-72 h-14 mx-auto my-1">
                <Image
                  src="/assets/calligraphy/bismillah-gold-banner.webp"
                  alt="Bismillah Al-Rahman Al-Raheem"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* 3. Quranic Marriage Verse */}
              <div className="my-3 px-2">
                <p
                  className="font-arabic text-[#7B1113] text-sm sm:text-base leading-relaxed tracking-wide font-semibold"
                  dir="rtl"
                >
                  وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
                </p>
                <p className="text-[11px] sm:text-xs text-[#7D7266] font-serif italic mt-1 max-w-sm mx-auto leading-normal">
                  {lang === 'ur'
                    ? 'اور اس کی نشانیوں میں سے یہ ہے کہ اس نے تمہارے لیے تمہاری ہی جنس سے جوڑے بنائے تاکہ تم ان کے پاس سکون پاؤ اور تمہارے درمیان محبت اور رحمت پیدا کی۔'
                    : '“And of His signs is that He created for you mates from among yourselves, that you may find tranquility in them; and He placed between you affection and mercy.”'}
                </p>
              </div>

              {/* 4. Personalized Guest Badge (If provided in link) */}
              {guest.guestName && (
                <div className="my-3 mx-auto max-w-xs py-1.5 px-3.5 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30">
                  <p
                    className={`text-xs sm:text-sm text-[#8B0000] font-semibold ${
                      lang === 'ur' ? 'font-nastaliq-display leading-relaxed' : 'font-cinzel tracking-wider'
                    }`}
                  >
                    {lang === 'ur'
                      ? `بخدمتِ گرامی قدر: ${guest.guestName} و اہلِ خانہ`
                      : `Specially Invited: ${guest.guestName} & Family`}
                  </p>
                </div>
              )}

              {/* 5. Family Invitation Announcement */}
              <div className="my-4 space-y-1">
                <p className="text-xs uppercase tracking-[0.25em] text-[#B5965A] font-cinzel font-bold">
                  {config.invitationIntro.hostsLine[lang]}
                </p>
                <p
                  className={`text-xs sm:text-sm text-[#7D7266] max-w-sm mx-auto ${
                    lang === 'ur' ? 'font-nastaliq-body leading-loose' : 'font-serif italic leading-relaxed'
                  }`}
                >
                  {config.invitationIntro.greetingLine[lang]}
                </p>
              </div>

              {/* 6. Grand Couple Presentation */}
              <div className="my-5 py-4 border-y border-[#DFBF73]/35 space-y-3">
                {/* Groom */}
                <div>
                  <h2
                    className={`text-3xl sm:text-4xl text-[#35050C] font-normal ${
                      lang === 'ur' ? 'font-nastaliq-display text-4xl sm:text-5xl text-[#5E0C12]' : 'font-cinzel font-bold text-[#35050C]'
                    }`}
                  >
                    {config.couple.groom.fullName[lang]}
                  </h2>
                  <p className={`text-[11px] sm:text-xs text-[#7D7266] mt-0.5 ${lang === 'ur' ? 'font-nastaliq-body' : 'font-serif'}`}>
                    {lang === 'ur'
                      ? `فرزندِ ارجمند ${config.couple.groom.parents[lang]}`
                      : `Son of ${config.couple.groom.parents[lang]}`}
                  </p>
                </div>

                {/* Decorative Amper-knot with Gold Floral Ornament */}
                <div className="flex items-center justify-center gap-2.5 text-[#B5965A]">
                  <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#DFBF73]" />
                  <span className={`text-xl sm:text-2xl text-[#8B0000] ${lang === 'ur' ? 'font-nastaliq-display' : 'font-serif italic'}`}>
                    {lang === 'ur' ? 'اور' : '&'}
                  </span>
                  <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#DFBF73]" />
                </div>

                {/* Bride */}
                <div>
                  <h2
                    className={`text-3xl sm:text-4xl text-[#35050C] font-normal ${
                      lang === 'ur' ? 'font-nastaliq-display text-4xl sm:text-5xl text-[#5E0C12]' : 'font-cinzel font-bold text-[#35050C]'
                    }`}
                  >
                    {config.couple.bride.fullName[lang]}
                  </h2>
                  <p className={`text-[11px] sm:text-xs text-[#7D7266] mt-0.5 ${lang === 'ur' ? 'font-nastaliq-body' : 'font-serif'}`}>
                    {lang === 'ur'
                      ? `دخترِ نیک اختر ${config.couple.bride.parents[lang]}`
                      : `Daughter of ${config.couple.bride.parents[lang]}`}
                  </p>
                </div>
              </div>

              {/* 7. Targeted Ceremony Cards (Only Invited Events) */}
              <div className="my-5 space-y-4 text-left">
                <div className="text-center mb-3">
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
                      className="p-4 sm:p-5 rounded-2xl border border-[#DFBF73]/50 bg-[#F5EFEB]/90 shadow-sm text-center space-y-3"
                    >
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B0000] font-cinzel font-bold block">
                        {event.ceremonyType[lang]}
                      </span>

                      <h3
                        className={`text-xl sm:text-2xl text-[#35050C] font-medium ${
                          lang === 'ur' ? 'font-nastaliq-display text-2xl text-[#5E0C12]' : 'font-cinzel font-bold'
                        }`}
                      >
                        {event.title[lang]}
                      </h3>

                      {/* Date & Time Codes */}
                      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#545B43] font-medium">
                        <span className="inline-flex items-center gap-1.5 bg-[#545B43]/10 px-3 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5 text-[#B5965A]" />
                          <span className={lang === 'ur' ? 'font-nastaliq-body' : ''}>
                            {event.formattedDate[lang]}
                          </span>
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
                      <div className="space-y-1">
                        <p className={`text-sm text-[#35050C] font-bold ${lang === 'ur' ? 'font-nastaliq-body text-base' : 'font-serif'}`}>
                          {event.venue.name[lang]}
                        </p>
                        <p className="text-xs text-[#7D7266]">
                          {event.venue.address[lang]}, {event.venue.city[lang]}
                        </p>
                      </div>

                      {/* Action Buttons: Get Directions & Add Calendar */}
                      <div className="flex items-center justify-center gap-2.5 pt-2">
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

              {/* 8. Closing Family Blessing */}
              <div className="pt-3 border-t border-[#DFBF73]/30 text-center">
                <p className={`text-xs text-[#7D7266] ${lang === 'ur' ? 'font-nastaliq-body text-sm' : 'font-serif italic'}`}>
                  {config.invitationIntro.closingBlessing[lang]}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-[#B5965A] font-cinzel font-bold mt-2">
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
