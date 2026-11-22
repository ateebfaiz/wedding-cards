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
  Sparkles,
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
      className="min-h-screen bg-[#F8F5EE] text-[#342C26] flex flex-col items-center relative overflow-x-hidden selection:bg-[#B5965A]/25"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Dynamic Heirloom Ambient Background with Dual Rotating Mandalas & Islamic Arch Backdrop */}
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
        /* Floating Unobtrusive Corner Language Switcher (When Navigation is Disabled) */
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
                href={`/${tier}?invite=${tier}${guestName ? `&to=${encodeURIComponent(guestName)}` : ''}&nav=0`}
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
            {/* Dedicated Personalized Invitee Heading Section */}
            {guestName && (
              <div className="w-full my-2 p-5 rounded-3xl bg-[#FCFAF6]/95 border border-[#B5965A]/45 shadow-[0_8px_30px_rgba(52,44,38,0.06)] backdrop-blur-md text-center transition-all animate-in fade-in slide-in-from-top-4 duration-700">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#702F3D] font-sans font-bold flex items-center justify-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B5965A]" />
                  <span>{lang === 'ur' ? 'بخدمتِ گرامی قدر معزز مہمان' : 'Specially Invited with Honor'}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#B5965A]" />
                </span>
                <h2
                  className={`text-2xl sm:text-3xl lg:text-4xl text-[#342C26] font-bold ${
                    lang === 'ur' ? 'font-nastaliq-display' : 'font-serif'
                  }`}
                >
                  {lang === 'ur' ? `${guestName} و اہلِ خانہ` : `${guestName} & Family`}
                </h2>
                <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#B5965A] to-transparent mx-auto mt-3" />
              </div>
            )}

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

            {/* Event Instructions Card */}
            {config.eventInstructions && (
              <div className="w-full p-5 sm:p-6 rounded-2xl bg-[#FCFAF6]/90 border border-[#B5965A]/35 shadow-xs backdrop-blur-xs text-left">
                <div className="flex items-center gap-2 mb-2 text-[#702F3D]">
                  <Clock className="w-4 h-4 text-[#B5965A] shrink-0" />
                  <span className="text-xs uppercase tracking-wider font-sans font-bold">
                    {lang === 'ur' ? 'اہم ہدایات برائے معزز مہمانان' : 'Important Event Instructions'}
                  </span>
                </div>
                <p
                  className={`text-xs sm:text-sm text-[#5A4D41] leading-relaxed ${
                    lang === 'ur' ? 'font-nastaliq-body text-base leading-loose' : 'font-sans'
                  }`}
                >
                  {config.eventInstructions[lang]}
                </p>
              </div>
            )}

            {/* Contact & Info RSVP Card */}
            {config.contacts && config.contacts.length > 0 && (
              <div className="w-full p-5 sm:p-6 rounded-2xl bg-[#FCFAF6]/90 border border-[#B5965A]/35 shadow-xs backdrop-blur-xs text-left">
                <div className="mb-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#702F3D] font-sans font-bold block">
                    {lang === 'ur' ? 'رابطہ و معلومات' : 'Contact & Information'}
                  </span>
                  <h3
                    className={`text-lg font-bold text-[#342C26] ${
                      lang === 'ur' ? 'font-nastaliq-display' : 'font-serif'
                    }`}
                  >
                    {lang === 'ur' ? 'کسی بھی سوال یا رہنمائی کے لیے رابطہ فرمائیں' : 'For Inquiries & Guidance'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#B5965A]/20">
                  {config.contacts.map((contact, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[#B5965A]/25 bg-white/70 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span
                            className={`text-sm font-bold text-[#342C26] ${
                              lang === 'ur' ? 'font-nastaliq-body text-base' : 'font-sans'
                            }`}
                          >
                            {contact.name[lang]}
                          </span>
                          {contact.relation && (
                            <span className="text-[10px] text-[#81776B] font-sans font-medium px-2 py-0.5 rounded-full bg-[#FAF7F2]">
                              {contact.relation[lang]}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#5A4D41] font-mono tracking-wide block mb-3">
                          {contact.phone}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#B5965A]/15">
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

      {/* Persistent Audio Controller on ALL invitation pages */}
      <AudioController />
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
