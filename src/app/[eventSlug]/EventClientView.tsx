'use client';

import React, { useState } from 'react';
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
import { ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react';

interface EventClientViewProps {
  config: WeddingConfig;
  event: WeddingEvent;
}

function EventClientViewContent({ config, event }: EventClientViewProps) {
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<SupportedLanguage>(config.meta.defaultLanguage || 'en');

  const tier = (searchParams.get('invite') as any) || 'all';
  const navParam = searchParams.get('nav');

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

  return (
    <div
      className="min-h-screen bg-[#F8F5EE] text-[#342C26] flex flex-col items-center relative overflow-x-hidden selection:bg-[#B5965A]/25"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Dynamic Heirloom Ambient Background with Dual Rotating Mandalas & Frosted Light Flares */}
      <HeirloomAmbientBackground />

      {/* 1. Navigation Header: Rendered ONLY when navigation is permitted */}
      {allowNavigation ? (
        <EventNavigationHeader
          currentSlug={event.slug}
          lang={lang}
          onToggleLang={() => setLang(lang === 'en' ? 'ur' : 'en')}
          showEventTabs={true}
        />
      ) : (
        /* Floating Unobtrusive Corner Language Switcher (Zero Navigation Bar) */
        <div className="fixed top-4 right-4 z-40 select-none">
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            aria-label="Toggle Language"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#B5965A]/40 bg-[#FCFAF6]/90 text-[#342C26] text-xs font-sans font-medium tracking-wide shadow-xs backdrop-blur-md hover:border-[#B5965A] hover:bg-[#EFE8DA] transition-all cursor-pointer"
          >
            <span>{lang === 'en' ? 'اردو' : 'English'}</span>
          </button>
        </div>
      )}

      {/* 2. Main Full-Fledged Content Area (Unwrapped & Breathing) */}
      <main className="w-full max-w-3xl px-4 sm:px-8 py-8 sm:py-14 flex flex-col items-center relative z-10">
        {/* Audience Gate Check (If tier does not include this event) */}
        {!isAllowed ? (
          <div className="w-full my-8 text-center p-8 rounded-3xl bg-[#FCFAF6]/90 border border-[#B5965A]/40 shadow-sm backdrop-blur-xs">
            <div className="w-12 h-12 rounded-full bg-[#702F3D]/10 text-[#702F3D] flex items-center justify-center mx-auto mb-4 border border-[#702F3D]/30">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <h2
              className={`text-xl sm:text-2xl text-[#342C26] font-bold mb-3 ${
                lang === 'ur' ? 'font-nastaliq-display' : 'font-serif'
              }`}
            >
              {lang === 'ur' ? 'مخصوص تقریب کا دعوت نامہ' : 'Ceremony Specific Invitation'}
            </h2>

            <p
              className={`text-sm text-[#81776B] max-w-md mx-auto mb-6 leading-relaxed ${
                lang === 'ur' ? 'font-nastaliq-body text-sm leading-loose' : 'font-sans'
              }`}
            >
              {lang === 'ur'
                ? 'یہ پرمسرت تقریب مخصوص احباب کے لیے ہے۔ آپ کو اپنے مخصوص دعوت نامے میں خوش آمدید کہتے ہیں۔'
                : 'This intimate ceremony is reserved for invited guests. Please view your designated celebration.'}
            </p>

            {isSingleEventTier ? (
              <Link
                href={`/${tier}?invite=${tier}${searchParams.get('to') ? `&to=${encodeURIComponent(searchParams.get('to')!)}` : ''}&nav=0`}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#342C26] text-[#F8F5EE] text-xs font-sans font-medium hover:bg-[#545B43] transition-colors shadow-2xs"
              >
                <span>{lang === 'ur' ? 'اپنے مخصوص دعوت نامے پر جائیں' : 'Go to Your Designated Ceremony'}</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#342C26] text-[#F8F5EE] text-xs font-sans font-medium hover:bg-[#545B43] transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{lang === 'ur' ? 'مرکزی دعوت نامہ دیکھیں' : 'View Main Wedding Invitation'}</span>
              </Link>
            )}
          </div>
        ) : (
          /* Full Independent Stationery Canvas */
          <div className="w-full flex flex-col items-center space-y-6">
            {/* Event Hero */}
            <EventHero event={event} lang={lang} />

            {/* Countdown to the Event */}
            <CountdownTimer targetDateISO={event.dateISO} lang={lang} />

            {/* Utility Actions (Add to Calendar, WhatsApp Share, Event QR) */}
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

            {/* Ceremony Schedule Timeline */}
            <div className="w-full">
              <ScheduleTimeline schedule={event.schedule} lang={lang} />
            </div>

            {/* Venue & Directions Card */}
            <div className="w-full">
              <VenueCard venue={event.venue} lang={lang} />
            </div>

            {/* Travel Guidance & Highway Advisories (Nikkah only) */}
            {event.travelGuidance && (
              <div className="w-full">
                <TravelGuide guidance={event.travelGuidance} lang={lang} />
              </div>
            )}

            {/* 3. Bottom Event Switcher: ONLY shown when allowNavigation is true */}
            {allowNavigation && (
              <div className="w-full mt-10 pt-8 border-t border-[#B5965A]/25 text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#81776B] font-sans font-bold block mb-4">
                  {lang === 'ur' ? 'دیگر تقریباتِ شادی' : 'Explore Other Ceremonies'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left">
                  {otherEvents.map((oEvent) => (
                    <Link
                      key={oEvent.slug}
                      href={`/${oEvent.slug}`}
                      className="p-4 rounded-2xl border border-[#B5965A]/30 bg-[#FCFAF6]/90 backdrop-blur-xs hover:border-[#B5965A] hover:bg-[#EFE8DA]/50 transition-all flex items-center justify-between group shadow-2xs"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#81776B] font-sans font-bold block">
                          {oEvent.ceremonyType[lang]}
                        </span>
                        <h4
                          className={`text-base font-bold text-[#342C26] ${
                            lang === 'ur' ? 'font-nastaliq-display' : 'font-serif'
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
                    className="inline-flex items-center gap-2 text-xs font-serif font-bold text-[#342C26] hover:text-[#702F3D] transition-colors"
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
    </div>
  );
}

export function EventClientView(props: EventClientViewProps) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F8F5EE]" />}>
      <EventClientViewContent {...props} />
    </React.Suspense>
  );
}
