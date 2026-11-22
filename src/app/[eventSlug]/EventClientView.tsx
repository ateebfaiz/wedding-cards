'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { WeddingConfig, WeddingEvent, SupportedLanguage } from '@/types/wedding';
import { EventNavigationHeader } from '@/components/navigation/EventNavigationHeader';
import { EventHero } from '@/components/events/EventHero';
import { CountdownTimer } from '@/components/common/CountdownTimer';
import { ScheduleTimeline } from '@/components/events/ScheduleTimeline';
import { VenueCard } from '@/components/events/VenueCard';
import { TravelGuide } from '@/components/events/TravelGuide';
import { MeetingPointCard } from '@/components/events/MeetingPointCard';
import { BaraatStatusCard } from '@/components/events/BaraatStatusCard';
import { ActionRow } from '@/components/events/ActionRow';
import { filterEventsForTier } from '@/lib/audience';
import { HeirloomAmbientBackground } from '@/components/backgrounds/HeirloomAmbientBackground';
import { AudioController } from '@/components/layout/AudioController';
import { fireWeddingConfetti } from '@/lib/confetti';
import {
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageCircle,
  Clock,
} from 'lucide-react';

interface EventClientViewProps {
  config: WeddingConfig;
  event: WeddingEvent;
}

function EventClientViewContent({ config, event }: EventClientViewProps) {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<SupportedLanguage>(config.meta.defaultLanguage || 'en');

  const tier = (searchParams.get('invite') as any) || 'all';
  const navParam = searchParams.get('nav');
  const guestName = searchParams.get('to') || '';

  // Single-event tiers are strictly locked: no navigation bar and no browsing other events
  const isSingleEventTier = tier === 'walima' || tier === 'nikkah' || tier === 'baraat';

  // Navigation is allowed ONLY for multi-event guests and when admin did not disable it (&nav=0)
  const allowNavigation = !isSingleEventTier && navParam !== '0' && navParam !== 'false';

  const { allowedOrder } = filterEventsForTier(config, tier);
  const isAllowed = allowedOrder.includes(event.id) || allowedOrder.includes(event.slug);

  const coupleNames =
    lang === 'ur'
      ? `${config.couple.groom.fullName.ur} اور ${config.couple.bride.fullName.ur}`
      : `${config.couple.groom.fullName.en} & ${config.couple.bride.fullName.en}`;

  const otherEvents = Object.values(config.events).filter((e) => e.slug !== event.slug);

  // Trigger confetti for Nikkah and Baraat
  useEffect(() => {
    if (event.slug === 'nikkah' || event.slug === 'baraat') {
      const timer = setTimeout(() => {
        fireWeddingConfetti();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [event.slug]);

  return (
    <div
      className="min-h-screen text-[#342C26] flex flex-col items-center relative overflow-x-hidden selection:bg-[#B5965A]/25"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Full-Bleed Islamic Arch Backdrop Fill-In for Mobile & Desktop */}
      <HeirloomAmbientBackground variant="invitation" />

      {/* 1. Navigation Header: Rendered ONLY when navigation is permitted */}
      {allowNavigation ? (
        <EventNavigationHeader
          currentSlug={event.slug}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'ur' : 'en')}
          showEventTabs={true}
        />
      ) : (
        /* Floating Unobtrusive Corner Language Switcher (Non-Overlapping) */
        <div className="fixed top-4 right-4 z-40 select-none">
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            aria-label="Toggle Language"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#DFBF73]/60 bg-[#081226]/85 text-[#F8F5EE] text-xs font-sans font-semibold tracking-wide shadow-md backdrop-blur-md hover:border-[#FFDF73] hover:bg-[#0D1B36] transition-all cursor-pointer"
          >
            <span>{lang === 'en' ? 'اردو' : 'English'}</span>
          </button>
        </div>
      )}

      {/* 2. Main Content Canvas with Generous Top Padding to Preempt Any Toggle Collision */}
      <main className="w-full max-w-3xl px-4 sm:px-8 pt-16 sm:pt-20 pb-14 flex flex-col items-center relative z-10">
        {/* Audience Gate Check (If tier does not include this event) */}
        {!isAllowed ? (
          <div className="w-full my-8 text-center p-8 rounded-3xl bg-[#FCFAF6]/95 border-2 border-[#B5965A]/40 shadow-xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-[#702F3D]/10 text-[#702F3D] flex items-center justify-center mx-auto mb-4 border border-[#702F3D]/30">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h2
              className={`text-xl sm:text-2xl text-[#2E050B] font-black mb-3 ${
                lang === 'ur' ? 'font-sameer-zikran text-3xl' : 'font-playfair'
              }`}
            >
              {lang === 'ur' ? 'مخصوص تقریب کا دعوت نامہ' : 'Ceremony Specific Invitation'}
            </h2>

            <p
              className={`text-sm text-[#5A4D41] max-w-md mx-auto mb-6 leading-relaxed ${
                lang === 'ur' ? 'font-nastaliq-body text-base leading-loose' : 'font-sans'
              }`}
            >
              {lang === 'ur'
                ? 'یہ پرمسرت تقریب مخصوص احباب کے لیے ہے۔ آپ کو اپنے مخصوص دعوت نامے میں خوش آمدید کہتے ہیں۔'
                : 'This intimate ceremony is reserved for invited guests. Please view your designated celebration.'}
            </p>

            {isSingleEventTier ? (
              <Link
                href={`/${tier}?invite=${tier}${guestName ? `&to=${encodeURIComponent(guestName)}` : ''}&nav=0`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#342C26] text-[#F8F5EE] text-xs font-sans font-bold hover:bg-[#545B43] transition-colors shadow-2xs"
              >
                <span>{lang === 'ur' ? 'اپنے مخصوص دعوت نامے پر جائیں' : 'Go to Your Designated Ceremony'}</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#342C26] text-[#F8F5EE] text-xs font-sans font-bold hover:bg-[#545B43] transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{lang === 'ur' ? 'مرکزی دعوت نامہ دیکھیں' : 'View Main Wedding Invitation'}</span>
              </Link>
            )}
          </div>
        ) : (
          /* Full Independent Stationery Canvas */
          <div className="w-full flex flex-col items-center space-y-6">
            {/* Dedicated Personalized Invitee Heading Section (Natural Stationery, RTL-aware) */}
            {guestName && (
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
                  {lang === 'ur' ? `${guestName} و اہلِ خانہ` : `${guestName} & Family`}
                </h2>
                <div className="w-20 h-1 bg-[#B5965A] mt-3 rounded-full" />
              </div>
            )}

            {/* Event Hero */}
            <EventHero event={event} lang={lang} />

            {/* Countdown to the Event */}
            <CountdownTimer targetDateISO={event.dateISO} lang={lang} />

            {/* Utility Actions (Add to Calendar, WhatsApp Share — Zero QR Code) */}
            <ActionRow event={event} coupleNames={coupleNames} lang={lang} />

            {/* Ceremonial Progression Milestones (Baraat only) */}
            {event.baraatStatus && (
              <div className="w-full">
                <BaraatStatusCard status={event.baraatStatus} lang={lang} />
              </div>
            )}

            {/* Meeting Point Card (Baraat only) */}
            {event.meetingPoint && (
              <div className="w-full">
                <MeetingPointCard meetingPoint={event.meetingPoint} lang={lang} />
              </div>
            )}

            {/* Left-Aligned Pixel-Perfect Ceremony Schedule Timeline */}
            <div className="w-full">
              <ScheduleTimeline schedule={event.schedule} lang={lang} />
            </div>

            {/* Venue & Directions Card (Single-Line Bold Heading) */}
            <div className="w-full">
              <VenueCard venue={event.venue} lang={lang} />
            </div>

            {/* Travel Guidance & Highway Advisories (Nikkah only) */}
            {event.travelGuidance && (
              <div className="w-full">
                <TravelGuide guidance={event.travelGuidance} lang={lang} />
              </div>
            )}

            {/* Important Event Instructions */}
            {config.eventInstructions && (
              <div className="w-full my-4 py-6 border-t border-[#B5965A]/35 text-start">
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

            {/* Contact & Info RSVP Section */}
            {config.contacts && config.contacts.length > 0 && (
              <div className="w-full my-4 py-6 border-t border-[#B5965A]/35 text-start">
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

            {/* 3. Bottom Event Switcher: ONLY shown when allowNavigation is true */}
            {allowNavigation && (
              <div className="w-full mt-10 pt-8 border-t border-[#B5965A]/25 text-center">
                <span
                  className={`text-xs tracking-[0.15em] text-[#DFBF73] font-bold block mb-4 ${
                    lang === 'ur' ? 'font-sameer-zikran text-sm' : 'font-cinzel uppercase tracking-[0.25em]'
                  }`}
                >
                  {lang === 'ur' ? 'دیگر تقریباتِ شادی' : 'Explore Other Ceremonies'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-start">
                  {otherEvents.map((oEvent) => (
                    <Link
                      key={oEvent.slug}
                      href={`/${oEvent.slug}`}
                      className="p-4 rounded-2xl border border-[#B5965A]/35 bg-[#FCFAF6]/95 backdrop-blur-md hover:border-[#DFBF73] hover:bg-[#EFE8DA]/80 transition-all flex items-center justify-between group shadow-2xs"
                    >
                      <div>
                        <span
                          className={`text-[10px] tracking-wider text-[#702F3D] font-bold block ${
                            lang === 'ur' ? 'font-sameer-zikran text-xs' : 'font-cinzel uppercase'
                          }`}
                        >
                          {oEvent.ceremonyType[lang]}
                        </span>
                        <h4
                          className={`text-base font-bold text-[#2E050B] ${
                            lang === 'ur' ? 'font-sameer-zikran text-lg' : 'font-playfair'
                          }`}
                        >
                          {oEvent.title[lang]}
                        </h4>
                        <span className="text-xs text-[#545B43] font-medium block mt-0.5">
                          {oEvent.formattedDate[lang]}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#B5965A] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform shrink-0" />
                    </Link>
                  ))}
                </div>

                <div className="pt-4 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[#F8F5EE] hover:text-[#DFBF73] transition-colors drop-shadow-md"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                    <span>{lang === 'ur' ? 'مرکزی کارڈ پر واپس جائیں' : 'Back to Main Wedding Card'}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Persistent Audio Controller on ALL invitation pages */}
      <AudioController />
    </div>
  );
}

export function EventClientView(props: EventClientViewProps) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#060D1A]" />}>
      <EventClientViewContent {...props} />
    </React.Suspense>
  );
}
