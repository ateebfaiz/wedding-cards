import { WeddingConfig } from '@/types/wedding';

/**
 * Ateeb & Nimra — The Heirloom Digital Wedding Invitation Configuration
 * Configured with authentic family names, parentage, and ceremony details.
 */
export const ateebNimraWeddingConfig: WeddingConfig = {
  meta: {
    id: 'ateeb-nimra-wedding',
    title: {
      en: 'Ateeb & Nimra — Wedding Invitation',
      ur: 'دعوتِ شادی — عاطب و نمرہ',
    },
    description: {
      en: 'The digital wedding invitation festivities of Ateeb Faiz & Nimra Javed.',
      ur: 'عاطب فیض اور نمرہ جاوید کی شادی خانہ آبادی کا باوقار ڈیجیٹل دعوت نامہ۔',
    },
    url: 'https://weddingcards.app',
    defaultLanguage: 'en',
    theme: {
      palette: {
        ivory: '#FDFBF7',
        warmPaper: '#FAF7F2',
        antiqueGold: '#B5965A',
        deepOlive: '#545B43',
        darkEspresso: '#2E050B',
        mutedTaupe: '#7D7266',
        burgundy: '#8B0000',
      },
      typography: {
        englishSerif: 'Playfair Display',
        englishSans: 'Plus Jakarta Sans',
        urduNastaliq: 'Gulzar',
      },
    },
  },
  seal: {
    monogram: {
      en: 'A & N',
      ur: 'ع & ن',
    },
    sealSubtitle: {
      en: 'An invitation for you',
      ur: 'ایک پُروقار دعوت نامہ برائے معزز مہمان',
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
        en: 'Ateeb Faiz',
        ur: 'عاطب فیض',
      },
      shortName: {
        en: 'Ateeb',
        ur: 'عاطب',
      },
      parents: {
        en: 'Respected Faiz Rasool Cheema & Yasmeen Tahira',
        ur: 'محترم میاں فیض رسول چیمہ اور یاسمین طاہرہ',
      },
    },
    bride: {
      fullName: {
        en: 'Nimra Javed',
        ur: 'نمرہ جاوید',
      },
      shortName: {
        en: 'Nimra',
        ur: 'نمرہ',
      },
      parents: {
        en: 'Javed Iqbal Sultani & Zahida Parveen',
        ur: 'میاں جاوید اقبال سلطانی اور زاہدہ پروین',
      },
    },
  },
  invitationIntro: {
    hostsLine: {
      en: 'Respected Faiz Rasool Cheema & Yasmeen Tahira',
      ur: 'محترم میاں فیض رسول چیمہ اور یاسمین طاہرہ',
    },
    greetingLine: {
      en: 'Request the pleasure of your company and heartfelt prayers at the wedding festivities of their beloved son',
      ur: 'مسرت کے اس مبارک موقع پر اپنے فرزندِ ارجمند کی تقریبِ مسرت میں آپ کی باوقار شرکت اور دعاؤں کے طلبگار ہیں',
    },
    celebrationLine: {
      en: 'We invite you to celebrate our wedding festivities with your gracious presence',
      ur: 'ہم آپ کو اس مبارک اور پُرمسرت سفر کے آغاز میں خوش آمدید کہتے ہیں',
    },
    closingBlessing: {
      en: 'Your gracious presence and prayers are our greatest blessing',
      ur: 'آپ کی تشریف آوری اور پُرخلوص دعائیں ہمارے لیے باعثِ برکت ہوں گی',
    },
  },
  events: {
    nikkah: {
      id: 'nikkah',
      slug: 'nikkah',
      title: {
        en: 'Nikkah Ceremony',
        ur: 'رسمِ نکاح',
      },
      ceremonyType: {
        en: 'Sacred Covenant Ceremony',
        ur: 'مبارک تقریبِ عقدِ نکاح',
      },
      dateISO: '2026-12-01T15:00:00+05:00',
      formattedDate: {
        en: 'Tuesday, 1 December 2026',
        ur: 'منگل، 1 دسمبر 2026',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'Respected Faiz Rasool Cheema & Yasmeen Tahira and Javed Iqbal Sultani & Zahida Parveen request the honor of your presence and heartfelt prayers at the sacred Nikkah Ceremony of Ateeb Faiz and Nimra Javed.',
        ur: 'محترم میاں فیض رسول چیمہ و یاسمین طاہرہ اور میاں جاوید اقبال سلطانی و زاہدہ پروین اپنے بچوں عاطب فیض اور نمرہ جاوید کے مبارک عقدِ نکاح کے پرمسرت موقع پر آپ کی باوقار شرکت اور دعاؤں کے متمنی ہیں۔',
      },
      venue: {
        name: {
          en: 'Residence of Mian Javed Iqbal Sultani Sahib',
          ur: 'رہائش گاہ میاں جاوید اقبال سلطانی صاحب',
        },
        address: {
          en: 'Veroke Cheema',
          ur: 'ویروکے چیمہ',
        },
        city: {
          en: 'Veroke Cheema',
          ur: 'ویروکے چیمہ',
        },
        googleMapsUrl: 'https://maps.google.com/?q=Veroke+Cheema',
      },
      schedule: [
        {
          time: '03:00 PM',
          timeUrdu: 'سہ پہر 03:00 بجے',
          title: {
            en: 'Reception of Guests',
            ur: 'معزز مہمانوں کا استقبال',
          },
          description: {
            en: 'Warm welcome of family and esteemed guests',
            ur: 'خوش آمدید اور استقبالیہ',
          },
          iconName: 'reception',
        },
        {
          time: '03:45 PM',
          timeUrdu: 'سہ پہر 03:45 بجے',
          title: {
            en: 'Solemnization of Sacred Nikkah',
            ur: 'رسمِ نکاح و ایجاب و قبول',
          },
          description: {
            en: 'Covenant of marriage and prayers for the couple',
            ur: 'عقدِ نکاح اور نو بیاہتا جوڑے کے لیے دعائے خیر',
          },
          iconName: 'ceremony',
        },
        {
          time: '04:30 PM',
          timeUrdu: 'شام 04:30 بجے',
          title: {
            en: 'Festive High Tea & Refreshments',
            ur: 'ضیافت و عصرانہ',
          },
          description: {
            en: 'Traditional celebratory refreshments with family',
            ur: 'پُرتکلف عصرانہ اور مٹھائی کی تقسیم',
          },
          iconName: 'dinner',
        },
      ],
      travelGuidance: {
        originCity: {
          en: 'Wazirabad / Gujranwala',
          ur: 'وزیرآباد / گوجرانوالہ',
        },
        estimatedDuration: {
          en: 'Direct access to Veroke Cheema',
          ur: 'براہِ راست ویروکے چیمہ',
        },
        routeTitle: {
          en: 'Veroke Cheema Main Road',
          ur: 'ویروکے چیمہ روڈ',
        },
        departureWindowNote: {
          en: 'Guests are kindly requested to arrive by 03:00 PM.',
          ur: 'معزز مہمانوں سے گزارش ہے کہ سہ پہر 03:00 بجے تک تشریف لائیں۔',
        },
        advisories: [
          {
            en: 'Follow the main approach road to Veroke Cheema. Ample guest parking is available at the premises.',
            ur: 'ویروکے چیمہ کی مرکزی سڑک کی پیروی فرمائیں۔ احاطے میں مہمانوں کے لیے پارکنگ کی وسیع جگہ موجود ہے۔',
          },
        ],
      },
    },
    baraat: {
      id: 'baraat',
      slug: 'baraat',
      title: {
        en: 'The Wedding Baraat',
        ur: 'آمدِ بارات و تقریبِ رخصتی',
      },
      ceremonyType: {
        en: 'Ceremonial Wedding Procession',
        ur: 'پُروقار تقریبِ بارات',
      },
      dateISO: '2026-12-04T18:15:00+05:00',
      formattedDate: {
        en: 'Friday, 4 December 2026',
        ur: 'جمعۃ المبارک، 4 دسمبر 2026',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'We warmly invite you to join the wedding procession and celebrate the marriage of Ateeb Faiz and Nimra Javed with heartfelt prayers and joy.',
        ur: 'عاطب فیض اور نمرہ جاوید کی تقریبِ بارات میں شرکت فرما کر ہماری خوشیوں کو دوبالا کریں اور نو بیاہتا جوڑے کو اپنی دعاؤں سے نوازیں۔',
      },
      venue: {
        name: {
          en: 'Imperial Banquet Pavilion',
          ur: 'امپیریل بینکوئٹ پویلین',
        },
        address: {
          en: 'Main Boulevard, Gulberg',
          ur: 'مین بولیووارڈ، گلبرگ',
        },
        city: {
          en: 'Lahore',
          ur: 'لاہور',
        },
        googleMapsUrl: 'https://maps.google.com/?q=Gulberg+Lahore',
      },
      meetingPoint: {
        title: {
          en: 'Baraat Assembly Point',
          ur: 'بارات کا اجتماع مقام',
        },
        location: {
          en: 'Assemble near the Venue Main Foyer Gate',
          ur: 'مین فوائر گیٹ کے بالمقابل',
        },
        assemblyTime: '06:15 PM',
        assemblyTimeUrdu: 'شام 06:15 بجے',
        directionsUrl: 'https://maps.google.com/?q=Gulberg+Lahore',
      },
      schedule: [
        {
          time: '06:15 PM',
          timeUrdu: 'شام 06:15 بجے',
          title: {
            en: 'Baraat Assembly',
            ur: 'بارات کا اجتماع',
          },
          description: {
            en: 'Gathering of guests and procession lineup',
            ur: 'معزز مہمانوں کا باقاعدہ اجتماع',
          },
          iconName: 'reception',
        },
        {
          time: '06:30 PM',
          timeUrdu: 'شام 06:30 بجے',
          title: {
            en: 'Arrival & Welcome of Baraat',
            ur: 'آمدِ بارات و پُرتپاک استقبال',
          },
          description: {
            en: 'Grand entrance and greeting by the bride’s family',
            ur: 'دلہن کے اہلِ خانہ کی جانب سے خیر مقدم',
          },
          iconName: 'celebration',
        },
        {
          time: '07:30 PM',
          timeUrdu: 'شام 07:30 بجے',
          title: {
            en: 'Dinner Banquet',
            ur: 'ضیافتِ طعام',
          },
          description: {
            en: 'Traditional celebratory dinner',
            ur: 'پُرتکلف روایتی کھانا',
          },
          iconName: 'dinner',
        },
        {
          time: '09:00 PM',
          timeUrdu: 'رات 09:00 بجے',
          title: {
            en: 'Rukhsati',
            ur: 'رخصتی',
          },
          description: {
            en: 'Departing blessings for the bride and groom',
            ur: 'دلہن کی دعاؤں کے سائے میں رخصتی',
          },
          iconName: 'departure',
        },
      ],
      baraatStatus: {
        enabled: true,
        currentStage: 'Assembly',
        statusNote: {
          en: 'Guests are kindly requested to assemble by 06:15 PM for the entrance procession.',
          ur: 'معزز مہمانوں سے گزارش ہے کہ شام 06:15 بجے تک تشریف لائیں۔',
        },
        liveMapUrl: 'https://maps.google.com/?q=Gulberg+Lahore',
      },
    },
    walima: {
      id: 'walima',
      slug: 'walima',
      title: {
        en: 'Walima Reception',
        ur: 'دعوتِ ولیمہ',
      },
      ceremonyType: {
        en: 'Celebratory Luncheon Feast',
        ur: 'پُروقار ضیافتِ ولیمہ',
      },
      dateISO: '2026-12-06T13:30:00+05:00',
      formattedDate: {
        en: 'Sunday, 6 December 2026',
        ur: 'اتوار، 6 دسمبر 2026',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'Respected Faiz Rasool Cheema & Yasmeen Tahira solicit the honor of your presence and blessings at the Walima Reception of their son Ateeb Faiz with Nimra Javed.',
        ur: 'محترم میاں فیض رسول چیمہ اور یاسمین طاہرہ اپنے فرزند عاطب فیض کی دعوتِ ولیمہ (ہمراہ نمرہ جاوید) میں آپ کی شرکت اور دعاؤں کے متمنی ہیں۔',
      },
      venue: {
        name: {
          en: 'Château d’Amour (Hall No. 20)',
          ur: 'شاتو دِ امور (ہال نمبر 20)',
        },
        hallOrSection: {
          en: 'Garrison Golf & Country Club',
          ur: 'گیریژن گالف اینڈ کنٹری کلب',
        },
        address: {
          en: 'Garrison Golf & Country Club, Cantt',
          ur: 'گیریژن گالف اینڈ کنٹری کلب، کینٹ',
        },
        city: {
          en: 'Lahore',
          ur: 'لاہور',
        },
        googleMapsUrl: 'https://maps.google.com/?q=Garrison+Golf+and+Country+Club+Lahore',
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
            en: 'Reception in Hall 20 foyer',
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
            en: 'Formal celebratory banquet lunch',
            ur: 'پُرتکلف کھانا اور خیرسگالی',
          },
          iconName: 'dinner',
        },
      ],
    },
  },
  eventOrder: ['nikkah', 'baraat', 'walima'],
  audio: {
    enabledByDefault: true,
    ambientSoundEnabled: true,
    soundEffectsEnabled: true,
    ambientVolume: 0.25,
    effectsVolume: 0.4,
  },
};
