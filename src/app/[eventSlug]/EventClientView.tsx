'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { WeddingConfig, WeddingEvent } from '@/types/wedding';
import { InvitationShell } from '@/components/layout/InvitationShell';
import { EventHero } from '@/components/events/EventHero';
import { CountdownTimer } from '@/components/common/CountdownTimer';
import { ScheduleTimeline } from '@/components/events/ScheduleTimeline';
import { VenueCard } from '@/components/events/VenueCard';
import { TravelGuide } from '@/components/events/TravelGuide';
import { MeetingPointCard } from '@/components/events/MeetingPointCard';
import { BaraatStatusCard } from '@/components/events/BaraatStatusCard';
import { ActionRow } from '@/components/events/ActionRow';
import { filterEventsForTier } from '@/lib/audience';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface EventClientViewProps {
  config: WeddingConfig;
  event: WeddingEvent;
}

function EventClientViewContent({ config, event }: EventClientViewProps) {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';

  return (
    <InvitationShell config={config}>
      {(lang, guest) => {
        const { allowedOrder } = filterEventsForTier(config, guest.tier);
        const isAllowed = allowedOrder.includes(event.id) || allowedOrder.includes(event.slug);

        const coupleNames =
          lang === 'ur'
            ? `${config.couple.groom.fullName.ur} اور ${config.couple.bride.fullName.ur}`
            : `${config.couple.groom.fullName.en} & ${config.couple.bride.fullName.en}`;

        // Audience gate check
        if (!isAllowed) {
          const firstAllowedSlug = allowedOrder[0] || '';
          const firstAllowedEvent = config.events[firstAllowedSlug];

          return (
            <div className="w-full max-w-xl my-8 text-center p-8 rounded-3xl bg-[#240409]/85 border-2 border-[#DFBF73]/50 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-md">
              <div className="w-12 h-12 rounded-full bg-[#8B0000]/20 text-[#DFBF73] flex items-center justify-center mx-auto mb-4 border border-[#DFBF73]/40">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <h2
                className={`text-xl md:text-2xl text-[#FFDF73] font-bold mb-3 ${
                  lang === 'ur' ? 'font-nastaliq-display leading-relaxed' : 'font-cinzel'
                }`}
              >
                {lang === 'ur' ? 'خاندانی تقریب کی رسائی' : 'Ceremony Specific Invitation'}
              </h2>

              <p
                className={`text-sm text-[#EFE8DA]/80 max-w-md mx-auto mb-6 ${
                  lang === 'ur' ? 'font-nastaliq-body leading-loose' : 'font-serif leading-relaxed'
                }`}
              >
                {lang === 'ur'
                  ? 'یہ پرمسرت تقریب صرف قریبی اہلِ خانہ کے لیے مختص ہے۔ ہم آپ کو اپنے مخصوص دعوت نامے میں خوش آمدید کہتے ہیں۔'
                  : 'This intimate ceremony is reserved for close family. You are warmly invited to your designated celebration.'}
              </p>

              {firstAllowedEvent && (
                <Link
                  href={`/${firstAllowedEvent.slug}${queryString}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#DFBF73] text-[#240409] text-xs font-cinzel font-bold hover:bg-[#FFDF73] transition-colors shadow-md"
                >
                  <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>
                    {lang === 'ur'
                      ? `${firstAllowedEvent.title.ur} کا کارڈ دیکھیں`
                      : `View Your ${firstAllowedEvent.title.en} Card`}
                  </span>
                </Link>
              )}
            </div>
          );
        }

        return (
          <div className="w-full max-w-2xl my-4 flex flex-col items-center">
            {/* Fully Immersive Ceremony View (No Constraining Outer Wrapper) */}
            <div className="w-full bg-[#200307]/85 border-2 border-[#DFBF73]/60 rounded-3xl p-6 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-md relative overflow-hidden">
              {/* Decorative Mandala Medallion in Background (gdj-mandala-5180247) */}
              <div className="absolute -top-24 -right-24 w-96 h-96 opacity-12 pointer-events-none animate-spin-slow-cw">
                <Image
                  src="/assets/mandalas/gdj-mandala-ornament.webp"
                  alt=""
                  fill
                  priority
                  sizes="384px"
                  className="object-contain"
                />
              </div>

              {/* Islamic Geometric Euclidean Ornament Header Crown */}
              <div className="relative w-48 sm:w-60 h-10 mx-auto -mt-2 mb-2 opacity-80">
                <Image
                  src="/assets/ornaments/islamic-geometric-ornament.webp"
                  alt="Islamic Ornament Header"
                  fill
                  sizes="(max-width: 640px) 192px, 240px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Default Bismillah Banner Asset Across All Pages */}
              <div className="relative w-64 sm:w-76 aspect-[934/225] mx-auto my-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                <Image
                  src="/assets/calligraphy/bismillah-islamic-vector.webp"
                  alt="Bismillah Al-Rahman Al-Raheem"
                  fill
                  sizes="(max-width: 640px) 256px, 304px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Event Hero */}
              <EventHero event={event} lang={lang} />

              {/* Countdown Timer */}
              <CountdownTimer targetDateISO={event.dateISO} lang={lang} />

              {/* Action Utilities (Calendar, WhatsApp, QR) */}
              <ActionRow event={event} coupleNames={coupleNames} lang={lang} />

              {/* Baraat Live Progression Status if present */}
              {event.baraatStatus && (
                <BaraatStatusCard status={event.baraatStatus} lang={lang} />
              )}

              {/* Meeting Point if present */}
              {event.meetingPoint && (
                <MeetingPointCard meetingPoint={event.meetingPoint} lang={lang} />
              )}

              {/* Ceremony Schedule Timeline */}
              <ScheduleTimeline schedule={event.schedule} lang={lang} />

              {/* Smart Venue & Directions Card */}
              <VenueCard venue={event.venue} lang={lang} />

              {/* Travel Guide / Advisories */}
              {event.travelGuidance && (
                <TravelGuide guidance={event.travelGuidance} lang={lang} />
              )}

              {/* Back to Full Invitation Link */}
              <div className="mt-8 pt-4 border-t border-[#DFBF73]/30 text-center">
                <Link
                  href={`/${queryString}`}
                  className="inline-flex items-center gap-2 text-xs font-cinzel text-[#DFBF73] hover:text-[#FFDF73] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>{lang === 'ur' ? 'مکمل دعوت نامہ دیکھیں' : 'View Full Wedding Invitation'}</span>
                </Link>
              </div>
            </div>
          </div>
        );
      }}
    </InvitationShell>
  );
}

export function EventClientView(props: EventClientViewProps) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#160205]" />}>
      <EventClientViewContent {...props} />
    </React.Suspense>
  );
}
