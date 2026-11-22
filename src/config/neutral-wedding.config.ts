import { WeddingConfig } from '@/types/wedding';

/**
 * Neutral Archetype Configuration for the Wedding Cards Engine
 * Contains zero hardcoded names, providing the dynamic scaffolding,
 * ceremony structures, schedules, and design tokens for any wedding celebration.
 */
export const neutralWeddingConfig: WeddingConfig = {
  meta: {
    id: 'heirloom-wedding-template',
    title: {
      en: 'The Wedding Celebration — Digital Invitation',
      ur: 'دعوتِ شادی — ڈیجیٹل کارڈ',
    },
    description: {
      en: 'A premier digital heirloom invitation celebrating the auspicious union of two families.',
      ur: 'دو خاندانوں کے درمیان مسرت اور برکت کے مبارک بندھن کی باوقار ڈیجیٹل دعوت۔',
    },
    url: 'https://weddingcards.app',
    defaultLanguage: 'en',
    theme: {
      palette: {
        ivory: '#F8F5EE',
        warmPaper: '#EFE8DA',
        antiqueGold: '#B5965A',
        deepOlive: '#545B43',
        darkEspresso: '#342C26',
        mutedTaupe: '#8A8074',
        burgundy: '#702F3D',
      },
      typography: {
        englishSerif: 'Cormorant Garamond',
        englishSans: 'DM Sans',
        urduNastaliq: 'Noto Nastaliq Urdu',
      },
    },
  },
  seal: {
    monogram: {
      en: 'W & C',
      ur: 'شادی',
    },
    sealSubtitle: {
      en: 'An Invitation For You',
      ur: 'ایک پُروقار دعوت نامہ',
    },
    openPrompt: {
      en: 'Tap the Wax Seal to Open',
      ur: 'دعوت نامہ کھولنے کے لیے مہر پر کلک کریں',
    },
  },
  bismillah: {
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    translation: {
      en: 'In the name of Allah, the Most Gracious, the Most Merciful',
      ur: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے',
    },
  },
  couple: {
    groom: {
      fullName: {
        en: 'The Groom',
        ur: 'عزیز محترم دلہا',
      },
      shortName: {
        en: 'Groom',
        ur: 'دلہا',
      },
      parents: {
        en: 'Mr. & Mrs. Respected Host',
        ur: 'جناب و محترمہ میزبانِ گرامی',
      },
    },
    bride: {
      fullName: {
        en: 'The Bride',
        ur: 'عزیزہ دلہن',
      },
      shortName: {
        en: 'Bride',
        ur: 'دلہن',
      },
      parents: {
        en: 'Mr. & Mrs. Respected Family',
        ur: 'جناب و محترمہ خاندانِ وقار',
      },
    },
  },
  invitationIntro: {
    hostsLine: {
      en: 'With the grace and blessings of our families',
      ur: 'خاندان کے بزرگوں کی دعاؤں اور اللہ تعالیٰ کے فضل و کرم سے',
    },
    greetingLine: {
      en: 'Request the honor of your gracious presence and prayers at the wedding festivities',
      ur: 'اپنے عزیزوں کی شادی کے پُرمسرت موقع پر آپ کی پُروقار شرکت اور دعاؤں کے متمنی ہیں',
    },
    celebrationLine: {
      en: 'Join us as we unite two souls and celebrate new beginnings',
      ur: 'اس مسرور تقریب کو اپنی آمد اور برکتوں سے رونق بخشیں',
    },
    closingBlessing: {
      en: 'Your prayers and blessings are our greatest gift',
      ur: 'آپ کی تشریف آوری اور دعائیں ہمارے لیے باعثِ افتخار ہوں گی',
    },
  },
  events: {
    ceremony: {
      id: 'ceremony',
      slug: 'ceremony',
      title: {
        en: 'Solemn Ceremony & Celebration',
        ur: 'رسمِ عقد و تقریبِ مسرت',
      },
      ceremonyType: {
        en: 'Sacred Covenant & Festive Gathering',
        ur: 'رسمِ نکاح و خوش آمدید',
      },
      dateISO: '2026-11-15T18:30:00+05:00',
      formattedDate: {
        en: 'Sunday, 15 November 2026',
        ur: 'اتوار، 15 نومبر 2026',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'We warmly invite you to witness the solemn vows and share in our joy with heartfelt prayers.',
        ur: 'ہم آپ کو اس مبارک موقع پر دعاؤں اور محبتوں کے ساتھ شامل ہونے کی پُرتپاک دعوت دیتے ہیں۔',
      },
      venue: {
        name: {
          en: 'Grand Pavilion Estate',
          ur: 'گرینڈ پویلین اسٹیٹ',
        },
        address: {
          en: 'Boulevard Road, Garden Enclave',
          ur: 'بولیووارڈ روڈ، گارڈن انکلیو',
        },
        city: {
          en: 'Metropolis',
          ur: 'شہرِ خوباں',
        },
        googleMapsUrl: 'https://maps.google.com',
      },
      schedule: [
        {
          time: '06:30 PM',
          timeUrdu: 'شام 06:30 بجے',
          title: {
            en: 'Reception of Guests',
            ur: 'مہمانوں کا استقبال',
          },
          description: {
            en: 'Warm welcome and refreshments',
            ur: 'خوش آمدید اور مشروبات کی پیشکش',
          },
          iconName: 'reception',
        },
        {
          time: '07:30 PM',
          timeUrdu: 'شام 07:30 بجے',
          title: {
            en: 'Ceremonial Vows',
            ur: 'رسمِ عقد و ایجاب و قبول',
          },
          description: {
            en: 'Solemnization of marriage covenant',
            ur: 'نکاح کی باقاعدہ رسم و دعا',
          },
          iconName: 'ceremony',
        },
        {
          time: '08:30 PM',
          timeUrdu: 'رات 08:30 بجے',
          title: {
            en: 'Dinner Banquet',
            ur: 'ضیافتِ طعام',
          },
          description: {
            en: 'Traditional feast with family and friends',
            ur: 'پُرتکلف روایتی عشائیہ',
          },
          iconName: 'dinner',
        },
      ],
      travelGuidance: {
        originCity: {
          en: 'Main Transit Hub',
          ur: 'مرکزی رابطہ شہر',
        },
        estimatedDuration: {
          en: 'Approximately 45 minutes',
          ur: 'تقریباً 45 منٹ',
        },
        routeTitle: {
          en: 'Via Ring Road / Expressway',
          ur: 'بذریعہ ایکسپریس وے',
        },
        departureWindowNote: {
          en: 'Please plan departure accounting for evening rush hours.',
          ur: 'برائے مہربانی شام کے ٹریفک کے پیش نظر وقت پر روانگی کی منصوبہ بندی فرمائیں۔',
        },
        advisories: [
          {
            en: 'Dedicated complimentary valet parking available at the main gate.',
            ur: 'مرکزی گیٹ پر محفوظ کار پارکنگ اور والیٹ کا مکمل انتظام موجود ہے۔',
          },
          {
            en: 'Follow signage directing towards the Banquet Pavilion.',
            ur: 'مرکزی راستے پر لگے بینرز اور رہنمائی بورڈز پر توجہ فرمائیں۔',
          },
        ],
      },
    },
    reception: {
      id: 'reception',
      slug: 'reception',
      title: {
        en: 'Grand Wedding Reception',
        ur: 'دعوتِ ولیمہ و استقبالیہ',
      },
      ceremonyType: {
        en: 'Formal Celebration Feast',
        ur: 'پُروقار عشائیہ و مبارکباد',
      },
      dateISO: '2026-11-22T13:30:00+05:00',
      formattedDate: {
        en: 'Sunday, 22 November 2026',
        ur: 'اتوار، 22 نومبر 2026',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'Join us for a gracious afternoon reception honoring our guests and the blessed journey ahead.',
        ur: 'اس پُرمسرت دوپہر میں نو بیاہتا جوڑے کو دعاؤں اور تہنیتی کلمات سے نوازنے کے لیے تشریف لائیں۔',
      },
      venue: {
        name: {
          en: 'Crystal Palace Hall',
          ur: 'کرسٹل پیلس بینکوئٹ ہال',
        },
        address: {
          en: 'Club Avenue, Heritage District',
          ur: 'کلب ایونیو، ہیریٹیج ڈسٹرکٹ',
        },
        city: {
          en: 'Lahore',
          ur: 'لاہور',
        },
        googleMapsUrl: 'https://maps.google.com',
      },
      schedule: [
        {
          time: '01:30 PM',
          timeUrdu: 'دوپہر 01:30 بجے',
          title: {
            en: 'Arrival of Guests',
            ur: 'معزز مہمانوں کی آمد',
          },
          description: {
            en: 'Warm welcome in the reception foyer',
            ur: 'استقبالیہ لان میں خیر مقدم',
          },
          iconName: 'reception',
        },
        {
          time: '02:00 PM',
          timeUrdu: 'دوپہر 02:00 بجے',
          title: {
            en: 'Luncheon Banquet',
            ur: 'ضیافتِ ظہرانہ',
          },
          description: {
            en: 'Celebratory banquet feast',
            ur: 'پُرتکلف کھانا اور خیرسگالی',
          },
          iconName: 'dinner',
        },
      ],
    },
  },
  eventOrder: ['ceremony', 'reception'],
  audio: {
    enabledByDefault: true,
    ambientSoundEnabled: true,
    soundEffectsEnabled: true,
    ambientVolume: 0.25,
    effectsVolume: 0.4,
  },
};
