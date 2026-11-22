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
        return <Users className="w-4 h-4 text-[#B5965A]" />;
      case 'ceremony':
        return <Heart className="w-4 h-4 text-[#8B0000]" />;
      case 'dinner':
        return <Utensils className="w-4 h-4 text-[#545B43]" />;
      case 'departure':
        return <Moon className="w-4 h-4 text-[#8B0000]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#B5965A]" />;
    }
  };

  return (
    <div className="w-full my-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="w-8 h-[1px] bg-[#B5965A]/40" />
        <h2 className="text-xs uppercase tracking-[0.2em] text-[#8A8074] font-medium">
          {lang === 'ur' ? 'تقریب کے اوقات کار' : 'Ceremony Schedule'}
        </h2>
        <span className="w-8 h-[1px] bg-[#B5965A]/40" />
      </div>

      <div className="relative border-l border-[#B5965A]/30 ml-4 md:ml-32 pl-6 space-y-8">
        {schedule.map((item, index) => {
          const displayTime = lang === 'ur' && item.timeUrdu ? item.timeUrdu : item.time;

          return (
            <div key={index} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] top-0.5 w-7 h-7 rounded-full bg-[#F8F5EE] border border-[#B5965A] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                {getIcon(item.iconName)}
              </div>

              {/* Time Label */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <h3
                  className={`text-base md:text-lg text-[#342C26] font-medium ${
                    lang === 'ur' ? 'font-nastaliq-display text-lg md:text-xl text-[#5E0C12]' : 'font-serif'
                  }`}
                >
                  {item.title[lang]}
                </h3>

                <span
                  dir="ltr"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#545B43] bg-[#545B43]/10 px-2.5 py-0.5 rounded-full w-fit"
                >
                  <Clock className="w-3 h-3" />
                  <span>{displayTime}</span>
                </span>
              </div>

              {/* Description if present */}
              {item.description && (
                <p
                  className={`text-xs md:text-sm text-[#8A8074] ${
                    lang === 'ur' ? 'font-nastaliq-body' : 'font-sans font-light'
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
