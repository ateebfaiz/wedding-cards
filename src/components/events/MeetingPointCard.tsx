'use client';

import React from 'react';
import { MeetingPoint, SupportedLanguage } from '@/types/wedding';
import { Compass, Clock, Navigation } from 'lucide-react';

interface MeetingPointCardProps {
  meetingPoint: MeetingPoint;
  lang: SupportedLanguage;
}

export function MeetingPointCard({ meetingPoint, lang }: MeetingPointCardProps) {
  const displayTime = lang === 'ur' && meetingPoint.assemblyTimeUrdu ? meetingPoint.assemblyTimeUrdu : meetingPoint.assemblyTime;

  return (
    <div className="w-full my-5 p-5 sm:p-6 rounded-2xl border-2 border-[#DFBF73]/60 bg-[#FAF7F2] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-full bg-[#8B0000]/10 text-[#8B0000] border border-[#8B0000]/30 flex items-center justify-center shrink-0">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B0000] font-cinzel font-bold block">
            {meetingPoint.title[lang]}
          </span>
          <h4
            className={`text-base sm:text-lg font-bold text-[#35050C] ${
              lang === 'ur' ? 'font-nastaliq-display text-xl' : 'font-playfair'
            }`}
          >
            {meetingPoint.location[lang]}
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span
          dir="ltr"
          className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold text-[#FFDF73] bg-[#2E050B] px-3.5 py-1.5 rounded-full shadow-2xs"
        >
          <Clock className="w-3.5 h-3.5 text-[#DFBF73]" />
          <span>{displayTime}</span>
        </span>

        <a
          href={meetingPoint.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl border-2 border-[#DFBF73] bg-[#FDFBF7] text-[#35050C] text-xs font-cinzel font-bold hover:bg-[#F5EFEB] transition-colors shadow-2xs"
        >
          <Navigation className="w-3.5 h-3.5 text-[#B5965A]" />
          <span>{lang === 'ur' ? 'مقام دیکھیں' : 'View Location'}</span>
        </a>
      </div>
    </div>
  );
}
