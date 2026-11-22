import { WeddingConfig } from '@/types/wedding';
import { ateebNimraWeddingConfig } from './ateeb-nimra.config';

/**
 * Active Configuration for Ateeb & Nimra Wedding Invitation festivities.
 */
export const activeWeddingConfig: WeddingConfig = ateebNimraWeddingConfig;

export function getWeddingConfig(): WeddingConfig {
  return activeWeddingConfig;
}

export function getEventBySlug(slug: string) {
  const config = getWeddingConfig();
  return config.events[slug] || null;
}
