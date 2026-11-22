'use client';

import React from 'react';
import { ScheduleItem, SupportedLanguage } from '@/types/wedding';
import { Clock, Utensils, Heart, Sparkles, Moon, Users, CalendarCheck } from 'lucide-react';

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
        return <Sparkles className="w-4 h-4 text-[#B5965A]" />;
    }
  };

  return (
    <div className="w-full my-6 text-left">
      {/* Left-Aligned Pixel-Perfect Section Header */}
      <div className="flex flex-col items-start mb-5">
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#702F3D] font-cinzel font-bold flex items-center gap-1.5 mb-1">
          <CalendarCheck className="w-3.5 h-3.5 text-[#B5965A]" />
          <span>{lang === 'ur' ? 'تقریب کے اوقات کار' : 'Ceremony Schedule'}</span>
        </span>
        <h2
          className={`text-2xl sm:text-3xl font-bold text-[#342C26] ${
            lang === 'ur' ? 'font-sameer-zikran text-3xl' : 'font-playfair'
          }`}
        >
          {lang === 'ur' ? 'مبارک تقریب کا تفصیلی شیڈول' : 'Timeline of Celebrations'}
        </h2>
        <div className="w-16 h-0.5 bg-[#B5965A] mt-2 rounded-full" />
      </div>

      {/* Left-Aligned Timeline Track */}
      <div className="relative pl-1">
        {/* Continuous Vertical Guide Line */}
        <div className="absolute left-[18px] sm:left-[21px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#B5965A] via-[#DFBF73]/70 to-[#B5965A]/30" />

        <div className="space-y-4">
          {schedule.map((item, index) => {
            const displayTime = lang === 'ur' && item.timeUrdu ? item.timeUrdu : item.time;

            return (
              <div key={index} className="relative flex items-start group">
                {/* Pixel-Perfect Centered Timeline Node */}
                <div className="absolute left-0 top-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FCFAF6] border-2 border-[#B5965A] shadow-xs flex items-center justify-center shrink-0 z-10 group-hover:scale-105 group-hover:border-[#702F3D] transition-transform">
                  {getIcon(item.iconName)}
                </div>

                {/* Milestone Content Card */}
                <div className="ml-12 sm:ml-14 w-full p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#B5965A]/30 shadow-2xs group-hover:border-[#B5965A]/60 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                    <h3
                      className={`text-base sm:text-lg font-bold text-[#2E050B] ${
                        lang === 'ur' ? 'font-sameer-zikran text-xl' : 'font-playfair'
                      }`}
                    >
                      {item.title[lang]}
                    </h3>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#545B43]/10 border border-[#545B43]/30 text-[#545B43] text-xs font-sans font-bold w-fit shadow-2xs">
                      <Clock className="w-3 h-3 text-[#B5965A]" />
                      <span>{displayTime}</span>
                    </div>
                  </div>

                  {item.description && (
                    <p
                      className={`text-xs sm:text-sm text-[#5A4D41] leading-relaxed mt-1 ${
                        lang === 'ur' ? 'font-nastaliq-body text-sm leading-loose' : 'font-sans'
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
