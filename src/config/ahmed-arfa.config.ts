import { WeddingConfig } from '@/types/wedding';

/**
 * Ahmed & Arfa — The Heirloom Digital Wedding Invitation Configuration
 * Specific instance loaded on the ahmad-arfa-invitation branch.
 */
export const ahmedArfaWeddingConfig: WeddingConfig = {
  meta: {
    id: 'ahmed-arfa-wedding',
    title: {
      en: 'Ahmed & Arfa — Wedding Invitation',
      ur: 'دعوتِ شادی — احمد و عرفہ',
    },
    description: {
      en: 'The digital wedding invitation festivities of Ahmed Sarfraz Khan & Arfa Khawar.',
      ur: 'احمد سرفراز خان اور عرفہ خاور کی شادی خانہ آبادی کا باوقار ڈیجیٹل دعوت نامہ۔',
    },
    url: 'https://ahmedarfa.com',
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
      en: 'A & A',
      ur: 'الف & ع',
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
        en: 'Ahmed Sarfraz Khan',
        ur: 'احمد سرفراز خان',
      },
      shortName: {
        en: 'Ahmed',
        ur: 'احمد',
      },
      parents: {
        en: 'Mr. & Mrs. Sarfraz Azam',
        ur: 'جناب و محترمہ سرفراز اعظم',
      },
    },
    bride: {
      fullName: {
        en: 'Arfa Khawar',
        ur: 'عرفہ خاور',
      },
      shortName: {
        en: 'Arfa',
        ur: 'عرفہ',
      },
      parents: {
        en: 'Mr. & Mrs. Khawar Hussain',
        ur: 'جناب و محترمہ خاور حسین',
      },
    },
  },
  invitationIntro: {
    hostsLine: {
      en: 'Mr. & Mrs. Sarfraz Azam',
      ur: 'جناب و محترمہ سرفراز اعظم',
    },
    greetingLine: {
      en: 'Request the pleasure of your company and heartfelt prayers at the wedding festivities of their beloved son',
      ur: 'مسرت کے اس مبارک موقع پر اپنے صاحبزادے کی تقریبِ مسرت میں آپ کی باوقار شرکت اور دعاؤں کے طلبگار ہیں',
    },
    celebrationLine: {
      en: 'We invite you to celebrate our wedding festivities with your gracious presence',
      ur: 'ہم آپ کو اپنے اس پرمسرت سفر کے آغاز میں خوش آمدید کہتے ہیں',
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
        en: 'Nikkah & Rasm-e-Hina',
        ur: 'رسمِ نکاح و حنا',
      },
      ceremonyType: {
        en: 'Sacred Covenant & Festive Hina',
        ur: 'رسمِ نکاح و تقریبِ حنا',
      },
      dateISO: '2026-11-15T18:30:00+05:00',
      formattedDate: {
        en: 'Sunday, 15 November 2026',
        ur: 'اتوار، 15 نومبر 2026',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'Mr. & Mrs. Sarfraz Azam request the pleasure of your company at the Nikkah & Rasm-e-Hina of their son Ahmed Sarfraz Khan with Arfa Khawar, daughter of Mr. & Mrs. Khawar Hussain.',
        ur: 'جناب و محترمہ سرفراز اعظم اپنے صاحبزادے احمد سرفراز خان کی رسمِ نکاح و حنا (عرفہ خاور دختر جناب و محترمہ خاور حسین) میں آپ کی شرکت اور دعاؤں کے متمنی ہیں۔',
      },
      venue: {
        name: {
          en: 'Farmhouse opposite Bright Fabrics',
          ur: 'برائٹ فیبرکس کے بالمقابل فارم ہاؤس',
        },
        address: {
          en: 'Masjid Ismail Road, Near Ismail City',
          ur: 'مسجد اسماعیل روڈ، بالمقابل اسماعیل سٹی',
        },
        city: {
          en: 'Faisalabad',
          ur: 'فیصل آباد',
        },
        googleMapsUrl: 'https://maps.google.com/?q=Farmhouse+opposite+Bright+Fabrics+Faisalabad',
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
            en: 'Welcome drinks and gathering in the courtyard',
            ur: 'خوش آمدید اور استقبالیہ مشروبات',
          },
          iconName: 'reception',
        },
        {
          time: '07:00 PM',
          timeUrdu: 'شام 07:00 بجے',
          title: {
            en: 'Nikkah Ceremony',
            ur: 'رسمِ نکاح',
          },
          description: {
            en: 'Solemnization of marriage covenant and prayers',
            ur: 'نکاح کی مبارک تقریب و دعائے خیر',
          },
          iconName: 'ceremony',
        },
        {
          time: '07:30 PM',
          timeUrdu: 'شام 07:30 بجے',
          title: {
            en: 'Rasm-e-Hina',
            ur: 'رسمِ حنا',
          },
          description: {
            en: 'Traditional henna celebration and blessings',
            ur: 'روایتی رسمِ حنا اور دعائیں',
          },
          iconName: 'celebration',
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
          en: 'Lahore',
          ur: 'لاہور',
        },
        estimatedDuration: {
          en: 'Approximately 3 hours via motorway',
          ur: 'تقریباً 3 گھنٹے بذریعہ موٹروے',
        },
        routeTitle: {
          en: 'M2 Motorway ➔ M3 Motorway (Faisalabad Interchange)',
          ur: 'ایم-2 موٹروے تا ایم-3 فیصل آباد انٹرچینج',
        },
        departureWindowNote: {
          en: 'Recommended departure from Lahore by 3:00 PM - 3:30 PM to ensure punctual arrival before sunset.',
          ur: 'لاہور سے سہ پہر 3:00 تا 3:30 بجے کے درمیان روانگی مناسب رہے گی تاکہ بروقت تشریف آوری ممکن ہو سکے۔',
        },
        advisories: [
          {
            en: 'Mid-November seasonal fog can develop after 8:30 PM on the motorway. Ensure fog lights are operational.',
            ur: 'نومبر کے وسط میں رات کے وقت موٹروے پر دھند کا امکان ہوتا ہے، لہٰذا گاڑی کی فوگ لائٹس درست حالت میں رکھیں۔',
          },
          {
            en: 'Exit at Faisalabad Interchange and follow signage toward Masjid Ismail Road near Ismail City.',
            ur: 'فیصل آباد انٹرچینج سے نکلنے کے بعد اسماعیل سٹی اور مسجد اسماعیل روڈ کے بینرز کی پیروی فرمائیں۔',
          },
          {
            en: 'Dedicated secure valet parking is provided at the farmhouse premises.',
            ur: 'فارم ہاؤس کے احاطے میں محفوظ والیٹ پارکنگ کا خصوصی انتظام موجود ہے۔',
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
      dateISO: '2026-11-20T18:15:00+05:00',
      formattedDate: {
        en: 'Friday, 20 November 2026',
        ur: 'جمعۃ المبارک، 20 نومبر 2026',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'We invite you to join the wedding procession and celebrate the union of Ahmed and Arfa with love, prayers, and joy.',
        ur: 'احمد اور عرفہ کی تقریبِ بارات میں شرکت فرما کر ہماری خوشیوں کو دوبالا کریں اور نو بیاہتا جوڑے کو اپنی دعاؤں سے نوازیں۔',
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
            en: 'Gathering of guests and family procession lineup',
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
            ur: 'دلہن کے اہلِ خانہ کی جانب سے خیر مقدم اور پھولوں کی نچھاور',
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
            ur: 'دلہن کی دعاؤں اور قرآنِ پاک کے سائے میں رخصتی',
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
      dateISO: '2026-11-22T13:30:00+05:00',
      formattedDate: {
        en: 'Sunday, 22 November 2026',
        ur: 'اتوار، 22 نومبر 2026',
      },
      timezone: 'Asia/Karachi',
      invitationNote: {
        en: 'Mr. & Mrs. Sarfraz Azam solicit the honor of your presence and blessings at the Walima Reception of their son Ahmed Sarfraz Khan with Arfa Khawar.',
        ur: 'جناب و محترمہ سرفراز اعظم اپنے فرزند احمد سرفراز خان کی دعوتِ ولیمہ میں آپ کی شرکت اور دعاؤں کے متمنی ہیں۔',
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
