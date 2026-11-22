'use client';

import React, { useEffect, useState } from 'react';
import { calculateCountdown, CountdownState } from '@/lib/utils';
import { SupportedLanguage } from '@/types/wedding';

interface CountdownTimerProps {
  targetDateISO: string;
  lang: SupportedLanguage;
}

export function CountdownTimer({ targetDateISO, lang }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<CountdownState>(() => calculateCountdown(targetDateISO));

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(targetDateISO));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateISO]);

  if (countdown.isPast) {
    return (
      <div className="my-6 px-4 py-3 bg-[#545B43]/10 border border-[#545B43]/25 rounded text-center">
        <span className="text-xs uppercase tracking-widest text-[#545B43] font-medium">
          {lang === 'ur' ? 'یہ مبارک تقریب جاری ہے یا مکمل ہو چکی ہے' : 'Celebration Commenced with Joy & Prayers'}
        </span>
      </div>
    );
  }

  const labels = {
    en: {
      heading: 'Until We Celebrate',
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
    <div className="my-8 flex flex-col items-center">
      <span className="text-xs uppercase tracking-[0.2em] text-[#8A8074] mb-3 font-medium">
        {l.heading}
      </span>

      <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-sm w-full text-center">
        {/* Days */}
        <div className="bg-[#EFE8DA]/60 border border-[#B5965A]/25 rounded py-2 px-1 flex flex-col items-center shadow-xs">
          <span className="font-serif text-2xl md:text-3xl text-[#342C26] font-semibold">
            {countdown.days.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] md:text-xs text-[#8A8074] uppercase tracking-wider mt-0.5">
            {l.days}
          </span>
        </div>

        {/* Hours */}
        <div className="bg-[#EFE8DA]/60 border border-[#B5965A]/25 rounded py-2 px-1 flex flex-col items-center shadow-xs">
          <span className="font-serif text-2xl md:text-3xl text-[#342C26] font-semibold">
            {countdown.hours.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] md:text-xs text-[#8A8074] uppercase tracking-wider mt-0.5">
            {l.hours}
          </span>
        </div>

        {/* Minutes */}
        <div className="bg-[#EFE8DA]/60 border border-[#B5965A]/25 rounded py-2 px-1 flex flex-col items-center shadow-xs">
          <span className="font-serif text-2xl md:text-3xl text-[#342C26] font-semibold">
            {countdown.minutes.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] md:text-xs text-[#8A8074] uppercase tracking-wider mt-0.5">
            {l.minutes}
          </span>
        </div>

        {/* Seconds */}
        <div className="bg-[#EFE8DA]/60 border border-[#B5965A]/25 rounded py-2 px-1 flex flex-col items-center shadow-xs">
          <span className="font-serif text-2xl md:text-3xl text-[#B5965A] font-semibold">
            {countdown.seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] md:text-xs text-[#8A8074] uppercase tracking-wider mt-0.5">
            {l.seconds}
          </span>
        </div>
      </div>
    </div>
  );
}
