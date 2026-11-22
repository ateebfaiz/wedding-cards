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
    <div className="w-full my-4 p-5 rounded-lg border border-[#B5965A]/30 bg-[#EFE8DA]/50 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3.5 text-center md:text-left">
        <div className="w-9 h-9 rounded-full bg-[#B5965A]/20 text-[#B5965A] flex items-center justify-center shrink-0">
          <Compass className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A8074] font-medium block">
            {meetingPoint.title[lang]}
          </span>
          <h4
            className={`text-base md:text-lg text-[#342C26] font-medium ${
              lang === 'ur' ? 'font-nastaliq leading-loose' : 'font-serif'
            }`}
          >
            {meetingPoint.location[lang]}
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          dir="ltr"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#545B43] bg-[#545B43]/15 px-3 py-1.5 rounded-full"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{displayTime}</span>
        </span>

        <a
          href={meetingPoint.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#545B43] text-[#F8F5EE] text-xs font-medium hover:bg-[#434935] transition-colors shadow-xs"
        >
          <Navigation className="w-3 h-3" />
          <span>{lang === 'ur' ? 'مقام' : 'Location'}</span>
        </a>
      </div>
    </div>
  );
}
