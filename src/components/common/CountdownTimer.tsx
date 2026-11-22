'use client';

import React, { useEffect, useState } from 'react';
import { calculateCountdown, CountdownState } from '@/lib/utils';
import { SupportedLanguage } from '@/types/wedding';

interface CountdownTimerProps {
  targetDateISO: string;
  lang: SupportedLanguage;
}

export function CountdownTimer({ targetDateISO, lang }: CountdownTimerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState>(() => calculateCountdown(targetDateISO));

  useEffect(() => {
    setIsMounted(true);
    setCountdown(calculateCountdown(targetDateISO));
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(targetDateISO));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateISO]);

  // 1. STATE: Happening Now / Happening Today (Countdown times up and celebration is underway)
  if (isMounted && countdown.status === 'happening_now') {
    return (
      <div className="my-7 w-full max-w-xl mx-auto p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] border-2 border-[#DFBF73] shadow-[0_14px_45px_rgba(223,191,115,0.28)] text-center relative overflow-hidden transition-all duration-700 animate-fade-in">
        {/* Subtle luminous top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#DFBF73] to-transparent" />

        {/* Live Pulsing Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-600/30 text-emerald-800 mb-3.5 shadow-2xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
          </span>
          <span className="text-[11px] sm:text-xs font-cinzel font-black uppercase tracking-[0.2em]">
            {lang === 'ur' ? 'آج کی مبارک تقریب • جاری و ساری ہے' : "Happening Now • Today's Blessed Celebration"}
          </span>
        </div>

        <h3
          className={`text-xl sm:text-2xl font-bold text-[#35050C] mb-2 leading-tight ${
            lang === 'ur' ? 'font-taj' : 'font-cinzel'
          }`}
        >
          {lang === 'ur'
            ? 'یہ مبارک تقریب اس وقت بفضلِ خدا جاری و ساری ہے'
            : 'The Auspicious Celebration Is Underway'}
        </h3>

        <p
          className={`text-xs sm:text-sm text-[#5A4D41] leading-relaxed max-w-md mx-auto ${
            lang === 'ur' ? 'font-nastaliq-body text-base' : 'font-serif'
          }`}
        >
          {lang === 'ur'
            ? 'تمام معزز و محترم مہمانوں کو صمیمِ قلب سے خوش آمدید۔ دعا ہے کہ باری تعالیٰ اس بابرکت تقریب کو دونوں خاندانوں کے لیے باعثِ مسرت و برکت فرمائے اور نئے بندھن میں دائمی الفت و سکون عطا فرمائے۔'
            : 'Heartfelt welcome to all our cherished guests gracing this joyous occasion today. May Allah Ta’ala shower infinite barakah, love, and serene peace upon this sacred milestone.'}
        </p>

        {/* Decorative Golden Divider */}
        <div className="flex items-center justify-center gap-2 mt-4 text-[#DFBF73]">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#DFBF73]" />
          <span className="text-xs">✦</span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#DFBF73]" />
        </div>
      </div>
    );
  }

  // 2. STATE: Concluded Gracefully / Happily Ever After (Celebration elapsed)
  if (isMounted && countdown.status === 'happened') {
    return (
      <div className="my-7 w-full max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE3] to-[#ECE3D2] border-2 border-[#DFBF73]/80 shadow-[0_14px_45px_rgba(53,5,12,0.1)] text-center relative overflow-hidden transition-all duration-700 animate-fade-in">
        {/* Subtle luminous top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#DFBF73] to-transparent" />

        {/* Completed Gracefully Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DFBF73]/15 border border-[#DFBF73]/60 text-[#35050C] mb-3.5 shadow-2xs">
          <span className="text-xs">✨</span>
          <span className="text-[11px] sm:text-xs font-cinzel font-black uppercase tracking-[0.2em] text-[#8B0000]">
            {lang === 'ur'
              ? 'بحسن و خوبی پایہ تکمیل کو پہنچی • ہمیشہ شاد و آباد'
              : 'Happily Ever After • Event Concluded Gracefully'}
          </span>
          <span className="text-xs">✨</span>
        </div>

        <h3
          className={`text-xl sm:text-2xl font-bold text-[#35050C] mb-2 leading-tight ${
            lang === 'ur' ? 'font-taj' : 'font-cinzel'
          }`}
        >
          {lang === 'ur'
            ? 'دعاؤں اور مسرتوں کے سنگ تقریب بحسن و خوبی مکمل ہوئی'
            : 'Completed With Divine Grace, Love & Cherished Memories'}
        </h3>

        <p
          className={`text-xs sm:text-sm text-[#5A4D41] leading-relaxed max-w-md mx-auto ${
            lang === 'ur' ? 'font-nastaliq-body text-base' : 'font-serif'
          }`}
        >
          {lang === 'ur'
            ? 'یہ بابرکت تقریب تمام تر رعنائیوں، خلوص اور دعاؤں کے سائے میں پایہ تکمیل کو پہنچی۔ تمام معزز مہمانوں، بزرگوں اور احباب کی تشریف آوری اور محبتوں کا صمیمِ قلب سے شکریہ۔ اللہ تعالیٰ اس مبارک جوڑے کو سدا ہنستا، مسکراتا اور شاد و آباد رکھے۔ آمین۔'
            : 'This sacred celebration has concluded gracefully. Heartfelt gratitude to all beloved elders, family, and dear friends for gracing us with your warm presence and earnest prayers. Wishing Ateeb & Nimra a lifetime of everlasting happiness.'}
        </p>

        {/* Golden Blessing Seal */}
        <div className="flex items-center justify-center gap-2 mt-4 text-[#8B6B38]">
          <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#DFBF73]" />
          <span className="text-xs font-cinzel font-bold tracking-widest text-[#8B0000]">
            آمین • ALHAMDULILLAH • HAPPILY EVER AFTER
          </span>
          <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#DFBF73]" />
        </div>
      </div>
    );
  }

  // 3. STATE: Upcoming (Active Countdown Timer)
  const labels = {
    en: {
      heading: 'Countdown to the Celebration',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds',
    },
    ur: {
      heading: 'مبارک گھڑیوں کا انتظار',
      days: 'دن',
      hours: 'گھنٹے',
      minutes: 'منٹ',
      seconds: 'سیکنڈ',
    },
  };

  const l = labels[lang] || labels.en;

  return (
    <div className="my-7 flex flex-col items-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="w-8 h-[1px] bg-[#DFBF73]" />
        <span
          className={`text-xs uppercase tracking-[0.25em] text-[#8B0000] font-black ${
            lang === 'ur' ? 'font-taj text-sm' : 'font-cinzel'
          }`}
        >
          {l.heading}
        </span>
        <span className="w-8 h-[1px] bg-[#DFBF73]" />
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm w-full text-center">
        {/* Days */}
        <div className="bg-[#FAF7F2] border-2 border-[#DFBF73]/60 rounded-2xl py-2.5 px-1.5 flex flex-col items-center shadow-xs">
          <span
            suppressHydrationWarning
            className="font-cinzel text-2xl sm:text-3xl text-[#35050C] font-extrabold leading-tight"
          >
            {countdown.days.toString().padStart(2, '0')}
          </span>
          <span
            className={`text-[10px] sm:text-xs text-[#8B6B38] font-bold uppercase tracking-wider mt-0.5 ${
              lang === 'ur' ? 'font-taj text-xs' : 'font-cinzel'
            }`}
          >
            {l.days}
          </span>
        </div>

        {/* Hours */}
        <div className="bg-[#FAF7F2] border-2 border-[#DFBF73]/60 rounded-2xl py-2.5 px-1.5 flex flex-col items-center shadow-xs">
          <span
            suppressHydrationWarning
            className="font-cinzel text-2xl sm:text-3xl text-[#35050C] font-extrabold leading-tight"
          >
            {countdown.hours.toString().padStart(2, '0')}
          </span>
          <span
            className={`text-[10px] sm:text-xs text-[#8B6B38] font-bold uppercase tracking-wider mt-0.5 ${
              lang === 'ur' ? 'font-taj text-xs' : 'font-cinzel'
            }`}
          >
            {l.hours}
          </span>
        </div>

        {/* Minutes */}
        <div className="bg-[#FAF7F2] border-2 border-[#DFBF73]/60 rounded-2xl py-2.5 px-1.5 flex flex-col items-center shadow-xs">
          <span
            suppressHydrationWarning
            className="font-cinzel text-2xl sm:text-3xl text-[#35050C] font-extrabold leading-tight"
          >
            {countdown.minutes.toString().padStart(2, '0')}
          </span>
          <span
            className={`text-[10px] sm:text-xs text-[#8B6B38] font-bold uppercase tracking-wider mt-0.5 ${
              lang === 'ur' ? 'font-taj text-xs' : 'font-cinzel'
            }`}
          >
            {l.minutes}
          </span>
        </div>

        {/* Seconds */}
        <div className="bg-[#FAF7F2] border-2 border-[#DFBF73]/60 rounded-2xl py-2.5 px-1.5 flex flex-col items-center shadow-xs">
          <span
            suppressHydrationWarning
            className="font-cinzel text-2xl sm:text-3xl text-[#8B0000] font-extrabold leading-tight"
          >
            {countdown.seconds.toString().padStart(2, '0')}
          </span>
          <span
            className={`text-[10px] sm:text-xs text-[#8B6B38] font-bold uppercase tracking-wider mt-0.5 ${
              lang === 'ur' ? 'font-taj text-xs' : 'font-cinzel'
            }`}
          >
            {l.seconds}
          </span>
        </div>
      </div>
    </div>
  );
}
