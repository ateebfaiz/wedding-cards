'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getWeddingConfig } from '@/config/default';
import { InvitationShell } from '@/components/layout/InvitationShell';
import { filterEventsForTier } from '@/lib/audience';
import { weddingAudio } from '@/lib/audio';
import { calculateCountdown } from '@/lib/utils';
import {
  Calendar,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
} from 'lucide-react';

function HomeCardContent() {
  const config = getWeddingConfig();

  return (
    <InvitationShell config={config}>
      {(lang, guest) => {
        const { allowedOrder } = filterEventsForTier(config, guest.tier);

        return (
          <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-14 text-center relative z-10">
            {/* 1. Authentic Golden Bismillah Banner Asset (Full-Bleed, Interactive Glow & Sound) */}
            <div
              onClick={() => weddingAudio.playSacredChime(432)}
              className="relative w-full max-w-[580px] sm:max-w-[700px] aspect-[2000/1648] mx-auto mb-0 cursor-pointer group transition-all duration-500 filter drop-shadow-md hover:drop-shadow-[0_0_35px_rgba(223,191,115,0.7)] active:scale-98"
              title="Touch to receive sacred barakah chime"
            >
              <Image
                src="/assets/calligraphy/bismillah-islamic-vector.webp"
                alt="Bismillah Al-Rahman Al-Raheem"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 580px, 700px"
                className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
            </div>

            {/* 2. Sacred Marriage Verse (Independent, Floating & Larger without Box Wrapper, Interactive Glow & Sound) */}
            <div
              onClick={() => weddingAudio.playSacredChime(528)}
              className="relative mx-auto mt-0 mb-6 flex flex-col items-center justify-center cursor-pointer group transition-all duration-500"
              title="Surah Ar-Rum (30:21) - Click to listen"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 transition-all duration-500 filter drop-shadow-[0_12px_30px_rgba(52,44,38,0.12)] group-hover:drop-shadow-[0_0_40px_rgba(181,150,90,0.65)] group-hover:scale-105 active:scale-95">
                <Image
                  src="/assets/calligraphy/quranic-marriage-verse.webp"
                  alt="Surah Ar-Rum: 21 Marriage Verse"
                  fill
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* 3. Dedicated Personalized Invitee Heading Section (Natural Stationery, RTL-aware) */}
            {guest.guestName && (
              <div className="w-full my-4 py-4 border-b border-[#B5965A]/35 flex flex-col items-start text-start transition-all animate-in fade-in slide-in-from-top-4 duration-700">
                <span
                  className={`text-xs tracking-[0.15em] text-[#702F3D] font-black flex items-center gap-2 mb-2 ${
                    lang === 'ur' ? 'font-sameer-zikran text-sm' : 'font-cinzel uppercase tracking-[0.25em]'
                  }`}
                >
                  <span className="text-[#B5965A] text-sm">✦</span>
                  <span>{lang === 'ur' ? 'بخدمتِ گرامی قدر معزز مہمان' : 'Invited with Honor'}</span>
                </span>
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-black text-[#2E050B] leading-tight ${
                    lang === 'ur' ? 'font-sameer-zikran text-4xl sm:text-5xl' : 'font-playfair'
                  }`}
                >
                  {lang === 'ur' ? `${guest.guestName} و اہلِ خانہ` : `${guest.guestName} & Family`}
                </h2>
                <div className="w-20 h-1 bg-[#B5965A] mt-3 rounded-full" />
              </div>
            )}

            {/* 4. Family Invitation Announcement */}
            <div className="my-4 space-y-1.5">
              <span
                className={`text-xs sm:text-sm tracking-[0.15em] text-[#702F3D] font-black block ${
                  lang === 'ur' ? 'font-sameer-zikran text-base sm:text-lg' : 'font-cinzel uppercase tracking-[0.25em]'
                }`}
              >
                {config.invitationIntro.hostsLine[lang]}
              </span>
              <p
                className={`text-base sm:text-lg text-[#2E050B] font-bold max-w-xl mx-auto leading-relaxed ${
                  lang === 'ur' ? 'font-alqalam-taj text-xl sm:text-2xl leading-loose' : 'font-serif'
                }`}
              >
                {config.invitationIntro.greetingLine[lang]}
              </p>
            </div>

            {/* 5. Grand Couple Presentation (Distinct Fonts for Headings vs Subheadings, Natural Stationery) */}
            <div className="my-6 py-6 border-y border-[#B5965A]/35 space-y-4">
              {/* Groom Presentation */}
              <div>
                <span
                  className={`text-xs tracking-[0.15em] text-[#702F3D] font-black block mb-1 ${
                    lang === 'ur' ? 'font-sameer-zikran text-sm' : 'font-cinzel uppercase tracking-[0.25em]'
                  }`}
                >
                  {lang === 'ur' ? 'دولہا' : 'The Groom'}
                </span>
                <h1
                  className={`leading-tight ${
                    lang === 'ur'
                      ? 'font-sameer-zikran text-4xl sm:text-6xl text-[#2E050B] font-black'
                      : 'font-playfair text-3xl sm:text-5xl font-black text-[#2E050B] tracking-normal'
                  }`}
                >
                  {config.couple.groom.fullName[lang]}
                </h1>
                <p
                  className={`text-sm sm:text-base text-[#5A4D41] font-bold mt-1.5 ${
                    lang === 'ur' ? 'font-alqalam-taj text-lg sm:text-xl' : 'font-serif italic'
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
                <span className={`text-2xl sm:text-3xl text-[#702F3D] ${lang === 'ur' ? 'font-sameer-zikran' : 'font-serif italic'}`}>
                  {lang === 'ur' ? 'اور' : '&'}
                </span>
                <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#B5965A]/60" />
              </div>

              {/* Bride Presentation */}
              <div>
                <span
                  className={`text-xs tracking-[0.15em] text-[#702F3D] font-black block mb-1 ${
                    lang === 'ur' ? 'font-sameer-zikran text-sm' : 'font-cinzel uppercase tracking-[0.25em]'
                  }`}
                >
                  {lang === 'ur' ? 'دلہن' : 'The Bride'}
                </span>
                <h1
                  className={`leading-tight ${
                    lang === 'ur'
                      ? 'font-sameer-zikran text-4xl sm:text-6xl text-[#2E050B] font-black'
                      : 'font-playfair text-3xl sm:text-5xl font-black text-[#2E050B] tracking-normal'
                  }`}
                >
                  {config.couple.bride.fullName[lang]}
                </h1>
                <p
                  className={`text-sm sm:text-base text-[#5A4D41] font-bold mt-1.5 ${
                    lang === 'ur' ? 'font-alqalam-taj text-lg sm:text-xl' : 'font-serif italic'
                  }`}
                >
                  {lang === 'ur'
                    ? `دخترِ نیک اختر ${config.couple.bride.parents[lang]}`
                    : `Daughter of ${config.couple.bride.parents[lang]}`}
                </p>
              </div>
            </div>

            {/* 6. Wedding Event Overview (Distinct Event Invitation Cards in Chronological Order) */}
            <div className="my-8 space-y-4 text-start">
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
                    {(() => {
                      const countdown = calculateCountdown(event.dateISO);
                      return (
                        <>
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

                          {/* Live Status Pill: Happening Now / Happily Ever After */}
                          {countdown.status === 'happening_now' && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-600/30 text-emerald-800 text-[10px] font-sans font-bold uppercase tracking-wider my-1.5 shadow-2xs">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                              </span>
                              <span>{lang === 'ur' ? 'آج کی مبارک تقریب • جاری ہے' : 'Happening Now • Today'}</span>
                            </div>
                          )}
                          {countdown.status === 'happened' && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFBF73]/20 border border-[#DFBF73]/60 text-[#8B0000] text-[10px] font-sans font-bold uppercase tracking-wider my-1.5 shadow-2xs">
                              <span>✨</span>
                              <span>{lang === 'ur' ? 'بحسن و خوبی پایہ تکمیل • سدا شاد و آباد' : 'Happily Ever After • Concluded'}</span>
                            </div>
                          )}

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
                              const buttonText = countdown.status === 'happened'
                                ? (lang === 'ur' ? 'دعوت نامہ و یادگار دیکھیں' : 'View Memories & Invitation')
                                : (lang === 'ur' ? 'دعوت نامہ دیکھیں' : 'View Invitation');
                              return (
                                <Link
                                  href={`/${event.slug}${targetParams}`}
                                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#342C26] text-[#F8F5EE] text-xs font-sans font-semibold hover:bg-[#545B43] transition-colors shadow-2xs"
                                >
                                  <span>{buttonText}</span>
                                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                                </Link>
                              );
                            })()}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                );
              })}
            </div>

            {/* 7. Important Event Instructions */}
            {config.eventInstructions && (
              <div className="w-full my-6 py-6 border-t border-[#B5965A]/35 text-start">
                <div className="flex items-center gap-2 mb-2 text-[#702F3D]">
                  <Clock className="w-4 h-4 text-[#B5965A] shrink-0" />
                  <span
                    className={`text-xs tracking-[0.15em] font-black ${
                      lang === 'ur' ? 'font-sameer-zikran text-sm' : 'font-cinzel uppercase tracking-wider'
                    }`}
                  >
                    {lang === 'ur' ? 'اہم ہدایات برائے معزز مہمانان' : 'Important Event Instructions'}
                  </span>
                </div>
                <p
                  className={`text-sm sm:text-base text-[#5A4D41] leading-relaxed font-bold ${
                    lang === 'ur' ? 'font-alqalam-taj text-base leading-loose' : 'font-serif italic'
                  }`}
                >
                  {config.eventInstructions[lang]}
                </p>
              </div>
            )}

            {/* 8. Contact & Information RSVP Section */}
            {config.contacts && config.contacts.length > 0 && (
              <div className="w-full my-6 py-6 border-t border-[#B5965A]/35 text-start">
                <div className="mb-4">
                  <span
                    className={`text-xs tracking-[0.15em] text-[#702F3D] font-black block ${
                      lang === 'ur' ? 'font-sameer-zikran text-sm' : 'font-cinzel uppercase tracking-[0.25em]'
                    }`}
                  >
                    {lang === 'ur' ? 'رابطہ و معلومات' : 'Contact & Information'}
                  </span>
                  <h3
                    className={`text-xl sm:text-2xl font-black text-[#2E050B] mt-1 ${
                      lang === 'ur' ? 'font-sameer-zikran text-3xl' : 'font-playfair'
                    }`}
                  >
                    {lang === 'ur' ? 'کسی بھی رہنمائی کے لیے رابطہ فرمائیں' : 'For Inquiries & Guidance'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {config.contacts.map((contact, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-[#B5965A]/30 bg-[#FCFAF6]/70 backdrop-blur-xs flex flex-col justify-between shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span
                            className={`text-sm sm:text-base font-bold text-[#2E050B] ${
                              lang === 'ur' ? 'font-sameer-zikran text-lg' : 'font-sans'
                            }`}
                          >
                            {contact.name[lang]}
                          </span>
                          {contact.relation && (
                            <span className="text-[10px] text-[#702F3D] font-sans font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#B5965A]/25">
                              {contact.relation[lang]}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#5A4D41] font-mono tracking-wide block mb-3 font-semibold">
                          {contact.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#B5965A]/20">
                        <a
                          href={`tel:${contact.phone}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#342C26] text-[#F8F5EE] text-[11px] font-sans font-semibold hover:bg-[#545B43] transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{lang === 'ur' ? 'کال کریں' : 'Call'}</span>
                        </a>
                        {contact.whatsappUrl && (
                          <a
                            href={contact.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#25D366] text-white text-[11px] font-sans font-semibold hover:bg-[#1EBE5D] transition-colors shadow-2xs"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. Family Closing Blessing */}
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
