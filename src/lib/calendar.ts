import { WeddingEvent, SupportedLanguage } from '@/types/wedding';
import { t } from './utils';

/**
 * Generates an iCalendar (.ics) string for a wedding event
 */
export function generateICS(event: WeddingEvent, coupleNames: string, lang: SupportedLanguage): string {
  const eventStart = new Date(event.dateISO);
  // Default wedding event duration is 3.5 hours
  const eventEnd = new Date(eventStart.getTime() + 3.5 * 60 * 60 * 1000);

  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const title = `${t(event.title, lang)} — ${coupleNames}`;
  const description = `${t(event.invitationNote, lang)}\n\nVenue: ${t(event.venue.name, lang)}, ${t(event.venue.address, lang)}, ${t(event.venue.city, lang)}\nDirections: ${event.venue.googleMapsUrl}`;
  const location = `${t(event.venue.name, lang)}, ${t(event.venue.address, lang)}, ${t(event.venue.city, lang)}`;

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Heirloom Wedding Cards Engine//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${event.id}-${eventStart.getTime()}@weddingcards.app`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(eventStart)}`,
    `DTEND:${formatDate(eventEnd)}`,
    `SUMMARY:${escapeICS(title)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Wedding Celebration Tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

function escapeICS(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Triggers a download of the .ics file in browser
 */
export function downloadICS(event: WeddingEvent, coupleNames: string, lang: SupportedLanguage): void {
  if (typeof window === 'undefined') return;
  const icsContent = generateICS(event, coupleNames, lang);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}-invitation.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Builds a direct Google Calendar creation link
 */
export function buildGoogleCalendarUrl(event: WeddingEvent, coupleNames: string, lang: SupportedLanguage): string {
  const eventStart = new Date(event.dateISO);
  const eventEnd = new Date(eventStart.getTime() + 3.5 * 60 * 60 * 1000);

  const formatGoogleDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const dates = `${formatGoogleDate(eventStart)}/${formatGoogleDate(eventEnd)}`;
  const text = encodeURIComponent(`${t(event.title, lang)} — ${coupleNames}`);
  const details = encodeURIComponent(
    `${t(event.invitationNote, lang)}\n\nVenue: ${t(event.venue.name, lang)}, ${t(event.venue.address, lang)}\nGoogle Maps: ${event.venue.googleMapsUrl}`
  );
  const location = encodeURIComponent(`${t(event.venue.name, lang)}, ${t(event.venue.address, lang)}, ${t(event.venue.city, lang)}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}
