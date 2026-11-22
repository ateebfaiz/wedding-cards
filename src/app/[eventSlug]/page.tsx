import React from 'react';
import { notFound } from 'next/navigation';
import { getWeddingConfig, getEventBySlug } from '@/config/default';
import { EventClientView } from './EventClientView';

interface EventPageProps {
  params: Promise<{
    eventSlug: string;
  }>;
}

export async function generateStaticParams() {
  const config = getWeddingConfig();
  return Object.values(config.events).map((event) => ({
    eventSlug: event.slug,
  }));
}

export default async function EventPage({ params }: EventPageProps) {
  const { eventSlug } = await params;
  const config = getWeddingConfig();
  const event = getEventBySlug(eventSlug);

  if (!event) {
    notFound();
  }

  return <EventClientView config={config} event={event} />;
}
