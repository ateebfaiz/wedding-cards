import { LocalizedString, SupportedLanguage } from '@/types/wedding';

export function cn(...classes: (string | undefined | null | false | Record<string, boolean>)[]): string {
  const result: string[] = [];
  for (const item of classes) {
    if (!item) continue;
    if (typeof item === 'string') {
      result.push(item);
    } else if (typeof item === 'object') {
      for (const [key, val] of Object.entries(item)) {
        if (val) result.push(key);
      }
    }
  }
  return result.join(' ');
}

export function t(loc: LocalizedString, lang: SupportedLanguage): string {
  return loc[lang] || loc['en'] || '';
}

export type EventTemporalStatus = 'upcoming' | 'happening_now' | 'happened';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  status: EventTemporalStatus;
  isPast: boolean;
  isToday: boolean;
}

export function calculateCountdown(targetIsoDate: string): CountdownState {
  const targetDate = new Date(targetIsoDate);
  const target = targetDate.getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    const hoursElapsed = Math.abs(diff) / (1000 * 60 * 60);
    // Celebration window: within 18 hours of event start time is considered "happening_now" / today
    const isHappeningNow = hoursElapsed <= 18;

    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      status: isHappeningNow ? 'happening_now' : 'happened',
      isPast: true,
      isToday: isHappeningNow,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    status: 'upcoming',
    isPast: false,
    isToday: days === 0,
  };
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}
