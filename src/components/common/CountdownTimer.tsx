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
      <div className="my-6 px-5 py-3 bg-[#FAF7F2] border-2 border-[#DFBF73]/60 rounded-2xl text-center shadow-xs">
        <span className="text-xs uppercase tracking-[0.2em] text-[#8B0000] font-cinzel font-bold">
          {lang === 'ur' ? 'یہ مبارک تقریب جاری ہے یا مکمل ہو چکی ہے' : 'Celebration Commenced with Joy & Prayers'}
        </span>
      </div>
    );
  }

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
        <span className="text-xs uppercase tracking-[0.25em] text-[#8B0000] font-cinzel font-black">
          {l.heading}
        </span>
        <span className="w-8 h-[1px] bg-[#DFBF73]" />
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm w-full text-center">
        {/* Days */}
        <div className="bg-[#FAF7F2] border-2 border-[#DFBF73]/60 rounded-2xl py-2.5 px-1.5 flex flex-col items-center shadow-xs">
          <span className="font-cinzel text-2xl sm:text-3xl text-[#35050C] font-extrabold leading-tight">
            {countdown.days.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-[#8B6B38] font-cinzel font-bold uppercase tracking-wider mt-0.5">
            {l.days}
          </span>
        </div>

        {/* Hours */}
        <div className="bg-[#FAF7F2] border-2 border-[#DFBF73]/60 rounded-2xl py-2.5 px-1.5 flex flex-col items-center shadow-xs">
          <span className="font-cinzel text-2xl sm:text-3xl text-[#35050C] font-extrabold leading-tight">
            {countdown.hours.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-[#8B6B38] font-cinzel font-bold uppercase tracking-wider mt-0.5">
            {l.hours}
          </span>
        </div>

        {/* Minutes */}
        <div className="bg-[#FAF7F2] border-2 border-[#DFBF73]/60 rounded-2xl py-2.5 px-1.5 flex flex-col items-center shadow-xs">
          <span className="font-cinzel text-2xl sm:text-3xl text-[#35050C] font-extrabold leading-tight">
            {countdown.minutes.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-[#8B6B38] font-cinzel font-bold uppercase tracking-wider mt-0.5">
            {l.minutes}
          </span>
        </div>

        {/* Seconds */}
        <div className="bg-[#FAF7F2] border-2 border-[#DFBF73]/60 rounded-2xl py-2.5 px-1.5 flex flex-col items-center shadow-xs">
          <span className="font-cinzel text-2xl sm:text-3xl text-[#8B0000] font-extrabold leading-tight">
            {countdown.seconds.toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-[#8B6B38] font-cinzel font-bold uppercase tracking-wider mt-0.5">
            {l.seconds}
          </span>
        </div>
      </div>
    </div>
  );
}
