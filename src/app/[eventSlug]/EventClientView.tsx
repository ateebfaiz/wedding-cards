'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { WeddingConfig, WeddingEvent } from '@/types/wedding';
import { InvitationShell } from '@/components/layout/InvitationShell';
import { IslamicIlluminatedFrame } from '@/components/svg/IslamicIlluminatedBorder';
import { IslamicGeometricStar } from '@/components/ornaments/IslamicGeometricStar';
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
            ? `${config.couple.groom.shortName?.ur || config.couple.groom.fullName.ur} اور ${config.couple.bride.shortName?.ur || config.couple.bride.fullName.ur}`
            : `${config.couple.groom.shortName?.en || config.couple.groom.fullName.en} & ${config.couple.bride.shortName?.en || config.couple.bride.fullName.en}`;

        // Audience gate check
        if (!isAllowed) {
          const firstAllowedSlug = allowedOrder[0] || '';
          const firstAllowedEvent = config.events[firstAllowedSlug];

          return (
            <div className="w-full flex flex-col items-center">
              <IslamicIlluminatedFrame className="w-full max-w-xl my-8 text-center p-8">
                <div className="w-12 h-12 rounded-full bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center mx-auto mb-4 border border-[#8B0000]/30">
                  <ShieldAlert className="w-6 h-6" />
                </div>

                <h2
                  className={`text-xl md:text-2xl text-[#342C26] font-medium mb-3 ${
                    lang === 'ur' ? 'font-nastaliq-display leading-relaxed' : 'font-serif'
                  }`}
                >
                  {lang === 'ur' ? 'خاندانی تقریب کی رسائی' : 'Ceremony Specific Invitation'}
                </h2>

                <p
                  className={`text-sm text-[#8A8074] max-w-md mx-auto mb-6 ${
                    lang === 'ur' ? 'font-nastaliq-body leading-loose' : 'font-light leading-relaxed'
                  }`}
                >
                  {lang === 'ur'
                    ? 'یہ پرمسرت تقریب صرف قریبی اہلِ خانہ کے لیے مختص ہے۔ ہم آپ کو اپنے مخصوص دعوت نامے میں خوش آمدید کہتے ہیں۔'
                    : 'This intimate ceremony is reserved for close family. You are warmly invited to your designated celebration.'}
                </p>

                {firstAllowedEvent && (
                  <Link
                    href={`/${firstAllowedEvent.slug}${queryString}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#545B43] text-[#F8F5EE] text-xs font-medium hover:bg-[#434935] transition-colors shadow-xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                    <span>
                      {lang === 'ur'
                        ? `${firstAllowedEvent.title.ur} کا کارڈ دیکھیں`
                        : `View Your ${firstAllowedEvent.title.en} Card`}
                    </span>
                  </Link>
                )}
              </IslamicIlluminatedFrame>
            </div>
          );
        }

        return (
          <div className="w-full flex flex-col items-center relative">
            {/* Background Animated Islamic Geometric Star */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10 overflow-hidden">
              <IslamicGeometricStar size={750} className="scale-75 sm:scale-100" />
            </div>

            <IslamicIlluminatedFrame className="w-full max-w-2xl my-2">
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

              {/* Default Bismillah Banner Asset Across All Pages */}
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

              {/* Travel Guide / Highway & Fog Advisories */}
              {event.travelGuidance && (
                <TravelGuide guidance={event.travelGuidance} lang={lang} />
              )}
            </IslamicIlluminatedFrame>
          </div>
        );
      }}
    </InvitationShell>
  );
}

export function EventClientView(props: EventClientViewProps) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-[#F8F5EE]" />}>
      <EventClientViewContent {...props} />
    </React.Suspense>
  );
}
