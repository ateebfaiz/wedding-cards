'use client';

import React from 'react';
import { BaraatStatus, SupportedLanguage } from '@/types/wedding';
import { Users, Sparkles, Utensils, Heart } from 'lucide-react';

interface BaraatStatusCardProps {
  status: BaraatStatus;
  lang: SupportedLanguage;
}

export function BaraatStatusCard({ status, lang }: BaraatStatusCardProps) {
  if (!status.enabled) return null;

  const stages = [
    {
      id: 'Assembly',
      labelEn: '1. Assembly',
      labelUr: '1. اجتماع',
      icon: Users,
    },
    {
      id: 'Welcome',
      labelEn: '2. Arrival & Welcome',
      labelUr: '2. آمدِ بارات',
      icon: Sparkles,
    },
    {
      id: 'Dinner',
      labelEn: '3. Dinner Banquet',
      labelUr: '3. ضیافتِ طعام',
      icon: Utensils,
    },
    {
      id: 'Rukhsati',
      labelEn: '4. Rukhsati',
      labelUr: '4. رخصتی',
      icon: Heart,
    },
  ];

  return (
    <div className="w-full my-6 p-5 sm:p-6 rounded-2xl border-2 border-[#DFBF73]/60 bg-[#FAF7F2] shadow-sm text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="w-8 h-[1px] bg-[#DFBF73]" />
        <h3 className="text-xs uppercase tracking-[0.25em] text-[#8B0000] font-cinzel font-black">
          {lang === 'ur' ? 'بارات کے روایتی مراحل' : 'Baraat Ceremonial Progression'}
        </h3>
        <span className="w-8 h-[1px] bg-[#DFBF73]" />
      </div>

      {/* 4 Dignified Ceremonial Progression Milestones (No Live Gimmicks) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {stages.map((stage) => {
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              className="flex flex-col items-center p-3 rounded-xl border border-[#DFBF73]/40 bg-[#FDFBF7] shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full bg-[#2E050B] text-[#FFDF73] flex items-center justify-center mb-2 shadow-xs">
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-xs font-bold text-[#35050C] ${
                  lang === 'ur' ? 'font-nastaliq-body text-sm' : 'font-cinzel'
                }`}
              >
                {lang === 'ur' ? stage.labelUr : stage.labelEn}
              </span>
            </div>
          );
        })}
      </div>

      <p
        className={`text-xs text-[#7A6A5D] mt-2 font-medium ${
          lang === 'ur' ? 'font-nastaliq-body text-sm' : 'font-serif italic'
        }`}
      >
        {status.statusNote[lang]}
      </p>
    </div>
  );
}
