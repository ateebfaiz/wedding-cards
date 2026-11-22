'use client';

import React from 'react';
import { ScheduleItem, SupportedLanguage } from '@/types/wedding';
import { Clock, Utensils, Heart, Moon, Users, CalendarCheck } from 'lucide-react';

interface ScheduleTimelineProps {
  schedule: ScheduleItem[];
  lang: SupportedLanguage;
}

export function ScheduleTimeline({ schedule, lang }: ScheduleTimelineProps) {
  const getIcon = (name?: string) => {
    switch (name) {
      case 'reception':
        return <Users className="w-4 h-4 text-[#545B43]" />;
      case 'ceremony':
        return <Heart className="w-4 h-4 text-[#702F3D]" />;
      case 'dinner':
        return <Utensils className="w-4 h-4 text-[#B5965A]" />;
      case 'departure':
        return <Moon className="w-4 h-4 text-[#702F3D]" />;
      default:
        return <Clock className="w-4 h-4 text-[#B5965A]" />;
    }
  };

  return (
    <div className="w-full my-6 text-start">
      {/* Clean Section Header */}
      <div className="flex flex-col items-start mb-6">
        <span
          className={`text-xs tracking-[0.15em] text-[#702F3D] font-black flex items-center gap-1.5 mb-1.5 ${
            lang === 'ur' ? 'font-sameer-zikran text-sm' : 'font-cinzel uppercase tracking-[0.25em]'
          }`}
        >
          <CalendarCheck className="w-3.5 h-3.5 text-[#B5965A]" />
          <span>{lang === 'ur' ? 'تقریب کے اوقات کار' : 'Ceremony Schedule'}</span>
        </span>
        <h2
          className={`text-2xl sm:text-3xl font-black text-[#2E050B] ${
            lang === 'ur' ? 'font-sameer-zikran text-3xl sm:text-4xl' : 'font-playfair'
          }`}
        >
          {lang === 'ur' ? 'مبارک تقریب کا تفصیلی شیڈول' : 'Timeline of Celebrations'}
        </h2>
        <div className="w-16 h-1 bg-[#B5965A] mt-2 rounded-full" />
      </div>

      {/* Left-Aligned Natural Timeline Track (No heavy box wrappers around texts) */}
      <div className="relative pl-1">
        {/* Continuous Vertical Guide Line */}
        <div className="absolute left-[18px] sm:left-[20px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#B5965A] via-[#DFBF73]/60 to-[#B5965A]/20" />

        <div className="space-y-6">
          {schedule.map((item, index) => {
            const displayTime = lang === 'ur' && item.timeUrdu ? item.timeUrdu : item.time;

            return (
              <div key={index} className="relative flex items-start group">
                {/* Node Badge Centered on Guide Line */}
                <div className="absolute left-0 top-0.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FAF7F2] border-2 border-[#B5965A] shadow-xs flex items-center justify-center shrink-0 z-10 group-hover:scale-105 group-hover:border-[#702F3D] transition-transform">
                  {getIcon(item.iconName)}
                </div>

                {/* Natural Typography Flow (No Box Wrapper) */}
                <div className="ml-12 sm:ml-15 w-full">
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-1">
                    <h3
                      className={`text-lg sm:text-xl font-bold text-[#2E050B] ${
                        lang === 'ur' ? 'font-sameer-zikran text-2xl' : 'font-playfair'
                      }`}
                    >
                      {item.title[lang]}
                    </h3>

                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#545B43]/10 border border-[#545B43]/30 text-[#545B43] text-xs font-sans font-bold shadow-2xs">
                      <Clock className="w-3 h-3 text-[#B5965A]" />
                      <span>{displayTime}</span>
                    </div>
                  </div>

                  {item.description && (
                    <p
                      className={`text-xs sm:text-sm text-[#5A4D41] leading-relaxed mt-0.5 ${
                        lang === 'ur' ? 'font-nastaliq-body text-base leading-loose' : 'font-sans'
                      }`}
                    >
                      {item.description[lang]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
