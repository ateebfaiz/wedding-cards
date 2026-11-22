'use client';

import React from 'react';
import { ScheduleItem, SupportedLanguage } from '@/types/wedding';
import { Clock, Utensils, Heart, Sparkles, Moon, Users } from 'lucide-react';

interface ScheduleTimelineProps {
  schedule: ScheduleItem[];
  lang: SupportedLanguage;
}

export function ScheduleTimeline({ schedule, lang }: ScheduleTimelineProps) {
  const getIcon = (name?: string) => {
    switch (name) {
      case 'reception':
        return <Users className="w-3.5 h-3.5 text-[#545B43]" />;
      case 'ceremony':
        return <Heart className="w-3.5 h-3.5 text-[#702F3D]" />;
      case 'dinner':
        return <Utensils className="w-3.5 h-3.5 text-[#B5965A]" />;
      case 'departure':
        return <Moon className="w-3.5 h-3.5 text-[#702F3D]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-[#B5965A]" />;
    }
  };

  return (
    <div className="w-full my-7">
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="w-8 h-[1px] bg-[#B5965A]/40" />
        <h2 className="text-xs uppercase tracking-[0.25em] text-[#81776B] font-sans font-bold">
          {lang === 'ur' ? 'تقریب کے اوقات کار' : 'Ceremony Schedule'}
        </h2>
        <span className="w-8 h-[1px] bg-[#B5965A]/40" />
      </div>

      <div className="relative border-l-2 border-[#B5965A]/30 ml-4 sm:ml-28 pl-6 space-y-6">
        {schedule.map((item, index) => {
          const displayTime = lang === 'ur' && item.timeUrdu ? item.timeUrdu : item.time;

          return (
            <div key={index} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] top-0.5 w-7 h-7 rounded-full bg-[#FCFAF6] border-2 border-[#B5965A]/60 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform">
                {getIcon(item.iconName)}
              </div>

              {/* Step Title & Time */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <h3
                  className={`text-base sm:text-lg font-bold text-[#342C26] ${
                    lang === 'ur' ? 'font-nastaliq-display text-lg sm:text-xl' : 'font-serif'
                  }`}
                >
                  {item.title[lang]}
                </h3>

                <span
                  dir="ltr"
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#545B43] bg-[#545B43]/10 px-3 py-1 rounded-full w-fit shadow-2xs"
                >
                  <Clock className="w-3 h-3 text-[#B5965A]" />
                  <span>{displayTime}</span>
                </span>
              </div>

              {/* Description */}
              {item.description && (
                <p
                  className={`text-xs sm:text-sm text-[#81776B] leading-relaxed ${
                    lang === 'ur' ? 'font-nastaliq-body' : 'font-sans'
                  }`}
                >
                  {item.description[lang]}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
