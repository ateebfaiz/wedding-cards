import { WeddingConfig } from '@/types/wedding';
import { ahmedArfaWeddingConfig } from './ahmed-arfa.config';

/**
 * Active Configuration on branch 'ahmad-arfa-invitation'
 * Configured specifically for Ahmed & Arfa's Wedding Invitation festivities.
 */
export const activeWeddingConfig: WeddingConfig = ahmedArfaWeddingConfig;

export function getWeddingConfig(): WeddingConfig {
  return activeWeddingConfig;
}

export function getEventBySlug(slug: string) {
  const config = getWeddingConfig();
  return config.events[slug] || null;
}
