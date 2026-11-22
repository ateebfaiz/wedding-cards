'use client';

import React from 'react';
import { WeddingConfig, WeddingEvent } from '@/types/wedding';
import { InvitationShell } from '@/components/layout/InvitationShell';
import { OrnamentalBorder } from '@/components/common/OrnamentalBorder';
import { EventHero } from '@/components/events/EventHero';
import { CountdownTimer } from '@/components/common/CountdownTimer';
import { ScheduleTimeline } from '@/components/events/ScheduleTimeline';
import { VenueCard } from '@/components/events/VenueCard';
import { TravelGuide } from '@/components/events/TravelGuide';
import { MeetingPointCard } from '@/components/events/MeetingPointCard';
import { BaraatStatusCard } from '@/components/events/BaraatStatusCard';
import { ActionRow } from '@/components/events/ActionRow';

interface EventClientViewProps {
  config: WeddingConfig;
  event: WeddingEvent;
}

export function EventClientView({ config, event }: EventClientViewProps) {
  return (
    <InvitationShell config={config}>
      {(lang) => {
        const coupleNames =
          lang === 'ur'
            ? `${config.couple.groom.shortName?.ur || config.couple.groom.fullName.ur} اور ${config.couple.bride.shortName?.ur || config.couple.bride.fullName.ur}`
            : `${config.couple.groom.shortName?.en || config.couple.groom.fullName.en} & ${config.couple.bride.shortName?.en || config.couple.bride.fullName.en}`;

        return (
          <div className="w-full flex flex-col items-center">
            <OrnamentalBorder className="w-full max-w-2xl my-2">
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
            </OrnamentalBorder>
          </div>
        );
      }}
    </InvitationShell>
  );
}
