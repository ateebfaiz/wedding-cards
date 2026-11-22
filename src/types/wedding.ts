export type SupportedLanguage = 'en' | 'ur';

export interface LocalizedString {
  en: string;
  ur: string;
}

export interface WeddingTheme {
  palette: {
    ivory: string;
    warmPaper: string;
    antiqueGold: string;
    deepOlive: string;
    darkEspresso: string;
    mutedTaupe: string;
    burgundy: string;
  };
  typography: {
    englishSerif: string;
    englishSans: string;
    urduNastaliq: string;
  };
}

export interface FamilyPerson {
  fullName: LocalizedString;
  shortName?: LocalizedString;
  parents: LocalizedString;
  grandparents?: LocalizedString;
}

export interface ScheduleItem {
  time: string; // e.g. "06:30 PM"
  timeUrdu?: string; // e.g. "شام 6:30 بجے"
  title: LocalizedString;
  description?: LocalizedString;
  iconName?: 'reception' | 'ceremony' | 'dinner' | 'departure' | 'celebration' | 'prayer';
}

export interface VenueInfo {
  name: LocalizedString;
  hallOrSection?: LocalizedString;
  address: LocalizedString;
  city: LocalizedString;
  googleMapsUrl: string;
  appleMapsUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface TravelGuidance {
  originCity: LocalizedString;
  estimatedDuration: LocalizedString;
  routeTitle: LocalizedString;
  departureWindowNote: LocalizedString;
  advisories: LocalizedString[];
}

export interface MeetingPoint {
  title: LocalizedString;
  location: LocalizedString;
  assemblyTime: string;
  assemblyTimeUrdu?: string;
  directionsUrl: string;
}

export interface BaraatStatus {
  enabled: boolean;
  currentStage: 'Assembly' | 'Departure' | 'EnRoute' | 'Arrived';
  updatedAt?: string;
  statusNote: LocalizedString;
  liveMapUrl?: string;
}

export interface WeddingEvent {
  id: string; // 'nikkah' | 'baraat' | 'walima' | custom slug
  slug: string; // 'nikkah'
  title: LocalizedString;
  ceremonyType: LocalizedString;
  dateISO: string; // "2026-11-15T18:30:00+05:00"
  formattedDate: LocalizedString; // e.g. "Sunday, 15 November 2026" / "اتوار، 15 نومبر 2026"
  timezone: string; // "Asia/Karachi"
  invitationNote: LocalizedString;
  venue: VenueInfo;
  schedule: ScheduleItem[];
  travelGuidance?: TravelGuidance;
  meetingPoint?: MeetingPoint;
  baraatStatus?: BaraatStatus;
  accentColor?: string; // optional event-specific ceremonial tint
}

export interface WeddingConfig {
  meta: {
    id: string;
    title: LocalizedString;
    description: LocalizedString;
    ogImage?: string;
    url?: string;
    defaultLanguage: SupportedLanguage;
    theme: WeddingTheme;
  };
  seal: {
    monogram: {
      en: string; // e.g. "A & A" or generic "M & M"
      ur: string; // e.g. "الف & ع" or generic "ع & م"
    };
    sealSubtitle: LocalizedString;
    openPrompt: LocalizedString;
  };
  bismillah: {
    arabic: string;
    translation: LocalizedString;
  };
  couple: {
    groom: FamilyPerson;
    bride: FamilyPerson;
  };
  invitationIntro: {
    hostsLine: LocalizedString;
    greetingLine: LocalizedString;
    celebrationLine: LocalizedString;
    closingBlessing: LocalizedString;
  };
  events: Record<string, WeddingEvent>;
  eventOrder: string[]; // ['nikkah', 'baraat', 'walima']
  audio: {
    enabledByDefault: boolean;
    ambientSoundEnabled: boolean;
    soundEffectsEnabled: boolean;
    ambientVolume: number; // 0.0 to 1.0
    effectsVolume: number; // 0.0 to 1.0
  };
}
