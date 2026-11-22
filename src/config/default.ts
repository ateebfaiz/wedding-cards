import { WeddingConfig } from '@/types/wedding';
import { neutralWeddingConfig } from './neutral-wedding.config';

/**
 * Default Active Configuration
 * On main branch: points to the neutral template configuration.
 * On event-specific branches (e.g. ahmad-arfa-invitation): points to the customized instance.
 */
export const activeWeddingConfig: WeddingConfig = neutralWeddingConfig;

export function getWeddingConfig(): WeddingConfig {
  return activeWeddingConfig;
}

export function getEventBySlug(slug: string) {
  const config = getWeddingConfig();
  return config.events[slug] || null;
}
