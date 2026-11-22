import { WeddingConfig } from '@/types/wedding';

/**
 * Ateeb & Nimra — The Heirloom Digital Wedding Invitation Configuration
 * Configured with authentic family names, parentage, chronological ceremony details,
 * and emergency/RSVP contacts.
 */
export const ateebNimraWeddingConfig: WeddingConfig = {
  meta: {
    id: 'ateeb-nimra-wedding',
    title: {
      en: 'Ateeb & Nimra — Wedding Invitation',
      ur: 'دعوتِ شادی — اطیب و نمرہ',
    },
    description: {
      en: 'The digital wedding invitation festivities of Ateeb Faiz & Nimra Javed.',
      ur: 'اطیب فیض اور نمرہ جاوید کی شادی خانہ آبادی کا باوقار ڈیجیٹل دعوت نامہ۔',
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
      ur: 'اط & ن',
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
        ur: 'اطیب فیض',
      },
      shortName: {
        en: 'Ateeb',
        ur: 'اطیب',
      },
      parents: {
        en: 'Respected Faiz Rasool Cheema & Yasmeen Tahira',
        ur: 'محترم فیض رسول چیمہ اور یاسمین طاہرہ',
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
        ur: 'جاوید اقبال سلطانی اور زاہدہ پروین',
      },
    },
  },
  invitationIntro: {
    hostsLine: {
      en: 'Respected Faiz Rasool Cheema & Yasmeen Tahira',
      ur: 'محترم فیض رسول چیمہ اور یاسمین طاہرہ',
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
  eventInstructions: {
    en: 'Please come on time and follow our lead and the details and event details on the map in your personalized invitation card.',
    ur: 'براہِ کرم وقت کی پابندی فرمائیں، ہماری رہنمائی پر عمل کریں اور اپنے ذاتی دعوتی کارڈ پر دیے گئے نقشے اور تقریب کی تفصیلات ملاحظہ فرمائیں۔',
  },
  contacts: [
    {
      name: {
        en: 'Faiz Rasool Cheema',
        ur: 'فیض رسول چیمہ',
      },
      relation: {
        en: 'Father',
        ur: 'والدِ محترم',
      },
      phone: '03186587882',
      whatsappUrl: 'https://wa.me/923186587882',
    },
    {
      name: {
        en: 'Muneeb Faiz',
        ur: 'منیب فیض',
      },
      relation: {
        en: 'Brother',
        ur: 'برادر',
      },
      phone: '03126587882',
      whatsappUrl: 'https://wa.me/923126587882',
    },
  ],
  events: {
    nikkah: {
      id: 'nikkah',
      slug: 'nikkah',
      title: {
        en: 'Nikkah Ceremony',
        ur: 'رسمِ نکاح',
      },
      ceremonyType: {
        en: 'Sacred Daylight Covenant Ceremony',
        ur: 'پُروقار دن کی تقریبِ عقدِ نکاح',
      },
      dateISO: '2026-12-01T11:00:00+05:00',
      formattedDate: {
        en: 'Tuesday, 1 December 2026 (Daylight)',
        ur: 'منگل، 1 دسمبر 2026 (دن کا وقت)',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'Respected Faiz Rasool Cheema & Yasmeen Tahira and Javed Iqbal Sultani & Zahida Parveen request the honor of your presence and heartfelt prayers at the sacred Daylight Nikkah Ceremony of Ateeb Faiz and Nimra Javed.',
        ur: 'محترم فیض رسول چیمہ و یاسمین طاہرہ اور جاوید اقبال سلطانی و زاہدہ پروین اپنے بچوں اطیب فیض اور نمرہ جاوید کے مبارک عقدِ نکاح کی تقریبِ روز (دن کے وقت) میں آپ کی باوقار شرکت اور دعاؤں کے متمنی ہیں۔',
      },
      venue: {
        name: {
          en: "Javed Iqbal Sultani Sahib's House",
          ur: 'رہائش گاہ جاوید اقبال سلطانی صاحب',
        },
        hallOrSection: {
          en: 'Daylight Ceremony right at New Islamia Public Model School Building',
          ur: 'دن کا فنکشن، نیو اسلامیہ پبلک ماڈل اسکول بلڈنگ',
        },
        address: {
          en: 'Right at New Islamia Public Model School Building, Opposite GT Road Wazirabad, Veroke Cheema',
          ur: 'نیو اسلامیہ پبلک ماڈل اسکول بلڈنگ، بالمقابل جی ٹی روڈ وزیرآباد، ویروکے چیمہ',
        },
        city: {
          en: 'Veroke Cheema',
          ur: 'ویروکے چیمہ',
        },
        googleMapsUrl: 'https://maps.google.com/?q=Veroke+Cheema',
      },
      schedule: [
        {
          time: 'Daylight (11:00 AM onwards)',
          timeUrdu: 'دن 11:00 بجے سے آگے',
          title: {
            en: 'Reception of Guests',
            ur: 'معزز مہمانوں کا استقبال',
          },
          description: {
            en: 'Warm welcome of family and esteemed guests in daylight',
            ur: 'خوش آمدید اور پُروقار استقبالیہ',
          },
          iconName: 'reception',
        },
        {
          time: 'Daylight (11:30 AM)',
          timeUrdu: 'دن 11:30 بجے',
          title: {
            en: 'Solemnization of Sacred Nikkah',
            ur: 'رسمِ نکاح و ایجاب و قبول',
          },
          description: {
            en: 'Sacred covenant of marriage and prayers for the couple',
            ur: 'عقدِ نکاح اور نو بیاہتا جوڑے کے لیے دعائے خیر',
          },
          iconName: 'ceremony',
        },
        {
          time: 'Daylight (12:00 PM)',
          timeUrdu: 'دوپہر 12:00 بجے',
          title: {
            en: 'Celebratory Refreshments & Sweets',
            ur: 'ضیافت و مٹھائی کی تقسیم',
          },
          description: {
            en: 'Traditional celebratory banquet with family',
            ur: 'پُرتکلف ضیافت اور مبارکباد',
          },
          iconName: 'dinner',
        },
      ],
      travelGuidance: {
        originCity: {
          en: 'Wazirabad, Manzoorabad, Sialkot & Surrounding Areas',
          ur: 'وزیرآباد، منظور آباد، سیالکوٹ اور گردونواح',
        },
        estimatedDuration: {
          en: 'Direct access via GT Road & Sialkot-Wazirabad Road to Veroke Cheema',
          ur: 'بالمقابل جی ٹی روڈ اور سیالکوٹ روڈ تا ویروکے چیمہ',
        },
        routeTitle: {
          en: 'Veroke Cheema (Near New Islamia Public Model School)',
          ur: 'ویروکے چیمہ (نزد نیو اسلامیہ پبلک ماڈل اسکول)',
        },
        departureWindowNote: {
          en: 'Daylight ceremony. Guests are kindly requested to arrive on time and follow event details on the map.',
          ur: 'دن کا فنکشن۔ معزز مہمانوں سے گزارش ہے کہ بروقت تشریف لائیں اور کارڈ میں دی گئی تفصیلات و رہنمائی پر عمل فرمائیں۔',
        },
        advisories: [
          {
            en: 'From Manzoorabad / Wazirabad: Take GT Road northbound, direct right turn into Veroke Cheema opposite New Islamia Public Model School Building.',
            ur: 'منظور آباد اور وزیرآباد سے: جی ٹی روڈ سے ویروکے چیمہ کی طرف سیدھا راستہ، نیو اسلامیہ پبلک ماڈل اسکول بلڈنگ کے عین سامنے۔',
          },
          {
            en: 'From Sialkot & Sambrial: Travel via Sialkot-Wazirabad Road connecting to GT Road junction towards Veroke Cheema.',
            ur: 'سیالکوٹ اور سمبڑیال سے: براستہ سیالکوٹ-وزیرآباد روڈ تا جی ٹی روڈ جنکشن ویروکے چیمہ۔',
          },
          {
            en: 'Ample guest parking is arranged within the compound premises.',
            ur: 'احاطے اور اسکول گراؤنڈ میں تمام معزز مہمانوں کے لیے کشادہ کار پارکنگ کی بہترین سہولت موجود ہے۔',
          },
        ],
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
        en: 'Celebratory Evening Banquet',
        ur: 'پُروقار ضیافتِ ولیمہ',
      },
      dateISO: '2026-12-25T20:00:00+05:00',
      formattedDate: {
        en: 'Friday, 25 December 2026',
        ur: 'جمعۃ المبارک، 25 دسمبر 2026',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'Respected Faiz Rasool Cheema & Yasmeen Tahira solicit the honor of your presence and blessings at the Walima Reception of their son Ateeb Faiz with Nimra Javed.',
        ur: 'محترم فیض رسول چیمہ اور یاسمین طاہرہ اپنے فرزند اطیب فیض کی دعوتِ ولیمہ (ہمراہ نمرہ جاوید) میں آپ کی شرکت اور دعاؤں کے متمنی ہیں۔',
      },
      venue: {
        name: {
          en: 'Walima Reception',
          ur: 'دعوتِ ولیمہ',
        },
        hallOrSection: {
          en: 'Night Function (Times & Dishes will be updated soon)',
          ur: 'رات کا فنکشن (اوقات اور کھانوں کی تفصیلات جلد اپ ڈیٹ کی جائیں گی)',
        },
        address: {
          en: 'Night function, times and dishes will be updated soon',
          ur: 'رات کا فنکشن، اوقات اور کھانوں کی تفصیلات جلد اپ ڈیٹ کی جائیں گی',
        },
        city: {
          en: 'Wazirabad / Gujranwala',
          ur: 'وزیرآباد / گوجرانوالہ',
        },
        googleMapsUrl: 'https://maps.google.com/?q=Wazirabad',
      },
      schedule: [
        {
          time: 'Night Function',
          timeUrdu: 'رات کا وقت',
          title: {
            en: 'Walima Reception & Banquet',
            ur: 'آمدِ مہمانان و ضیافتِ ولیمہ',
          },
          description: {
            en: 'Dishes and detailed night times will be updated soon.',
            ur: 'کھانوں اور رات کے اوقات کی تفصیلی شیڈول جلد اپ ڈیٹ کر دیا جائے گا۔',
          },
          iconName: 'dinner',
        },
      ],
    },
    baraat: {
      id: 'baraat',
      slug: 'baraat',
      title: {
        en: 'The Wedding Baraat',
        ur: 'آمدِ بارات و تقریبِ رخصتی',
      },
      ceremonyType: {
        en: 'Daylight Wedding Ceremony',
        ur: 'پُروقار دن کی تقریبِ بارات',
      },
      dateISO: '2026-12-26T12:00:00+05:00',
      formattedDate: {
        en: 'Saturday, 26 December 2026',
        ur: 'ہفتہ، 26 دسمبر 2026',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'We warmly invite you to join the wedding procession and celebrate the marriage of Ateeb Faiz and Nimra Javed with heartfelt prayers and joy.',
        ur: 'اطیب فیض اور نمرہ جاوید کی تقریبِ بارات میں شرکت فرما کر ہماری خوشیوں کو دوبالا کریں اور نو بیاہتا جوڑے کو اپنی دعاؤں سے نوازیں۔',
      },
      venue: {
        name: {
          en: 'Ashraf Palace',
          ur: 'اشرف پیلس',
        },
        address: {
          en: 'Ashraf Palace daylight function, times of barat, walima and dishes will be updated soon',
          ur: 'اشرف پیلس دن کا فنکشن، بارات، ولیمہ کے اوقات اور کھانوں کی تفصیلات جلد اپ ڈیٹ کی جائیں گی',
        },
        city: {
          en: 'Wazirabad / Gujranwala',
          ur: 'وزیرآباد / گوجرانوالہ',
        },
        googleMapsUrl: 'https://maps.google.com/?q=Ashraf+Palace+Wazirabad',
      },
      meetingPoint: {
        title: {
          en: 'Ashraf Palace Main Foyer',
          ur: 'اشرف پیلس مین فوائر',
        },
        location: {
          en: 'Ashraf Palace Daylight Function Gate',
          ur: 'اشرف پیلس گیٹ',
        },
        assemblyTime: 'Daylight',
        assemblyTimeUrdu: 'دن کے وقت',
        directionsUrl: 'https://maps.google.com/?q=Ashraf+Palace+Wazirabad',
      },
      schedule: [
        {
          time: 'Daylight Function',
          timeUrdu: 'دن کا وقت',
          title: {
            en: 'Arrival of Baraat & Banquet',
            ur: 'آمدِ بارات و ضیافتِ طعام',
          },
          description: {
            en: 'Daylight function at Ashraf Palace. Times and dishes will be updated soon.',
            ur: 'اشرف پیلس دن کا فنکشن۔ بارات کے اوقات اور کھانوں کی تفصیلات جلد اپ ڈیٹ کی جائیں گی۔',
          },
          iconName: 'celebration',
        },
        {
          time: 'Afternoon',
          timeUrdu: 'بعد از دوپہر',
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
          en: 'Daylight function at Ashraf Palace. Times will be updated soon.',
          ur: 'اشرف پیلس دن کا فنکشن۔ اوقات جلد اپ ڈیٹ کیے جائیں گے۔',
        },
        liveMapUrl: 'https://maps.google.com/?q=Ashraf+Palace+Wazirabad',
      },
    },
  },
  eventOrder: ['nikkah', 'walima', 'baraat'],
  audio: {
    enabledByDefault: true,
    ambientSoundEnabled: true,
    soundEffectsEnabled: true,
    ambientVolume: 0.25,
    effectsVolume: 0.4,
  },
};
