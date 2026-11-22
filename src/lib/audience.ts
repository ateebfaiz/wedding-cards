import { WeddingConfig, WeddingEvent } from '@/types/wedding';

export type GuestAccessTier = 'all' | 'walima' | 'baraat' | 'nikkah' | 'reception';

export interface GuestContext {
  tier: GuestAccessTier;
  guestName?: string;
}

/**
 * Resolves guest access tier from URL search params
 */
export function resolveGuestContext(searchParams: URLSearchParams | null): GuestContext {
  if (!searchParams) {
    return { tier: 'all' };
  }

  const rawInvite = searchParams.get('invite') || searchParams.get('access') || searchParams.get('tier') || 'all';
  const guestName = searchParams.get('to') || searchParams.get('guest') || undefined;

  let tier: GuestAccessTier = 'all';
  if (rawInvite === 'walima') tier = 'walima';
  else if (rawInvite === 'baraat') tier = 'baraat';
  else if (rawInvite === 'nikkah') tier = 'nikkah';
  else if (rawInvite === 'reception') tier = 'reception';
  else tier = 'all';

  return {
    tier,
    guestName: guestName ? decodeURIComponent(guestName).trim() : undefined,
  };
}

/**
 * Filters wedding events according to the guest's invited tier
 */
export function filterEventsForTier(
  config: WeddingConfig,
  tier: GuestAccessTier
): { allowedEvents: Record<string, WeddingEvent>; allowedOrder: string[] } {
  let targetSlugs: string[] = config.eventOrder;

  switch (tier) {
    case 'walima':
      targetSlugs = config.eventOrder.filter((id) => id.includes('walima') || id.includes('reception'));
      // Fallback if specific naming
      if (targetSlugs.length === 0 && config.events['walima']) targetSlugs = ['walima'];
      break;

    case 'baraat':
      targetSlugs = config.eventOrder.filter((id) => id.includes('baraat'));
      if (targetSlugs.length === 0 && config.events['baraat']) targetSlugs = ['baraat'];
      break;

    case 'nikkah':
      targetSlugs = config.eventOrder.filter((id) => id.includes('nikkah') || id.includes('ceremony'));
      if (targetSlugs.length === 0 && config.events['nikkah']) targetSlugs = ['nikkah'];
      break;

    case 'reception':
      targetSlugs = config.eventOrder.filter((id) => id.includes('baraat') || id.includes('walima') || id.includes('reception'));
      break;

    case 'all':
    default:
      targetSlugs = config.eventOrder;
      break;
  }

  // If no matching slugs found, fallback to all events
  if (targetSlugs.length === 0) {
    targetSlugs = config.eventOrder;
  }

  const filteredEvents: Record<string, WeddingEvent> = {};
  targetSlugs.forEach((slug) => {
    if (config.events[slug]) {
      filteredEvents[slug] = config.events[slug];
    }
  });

  return {
    allowedEvents: filteredEvents,
    allowedOrder: targetSlugs,
  };
}
