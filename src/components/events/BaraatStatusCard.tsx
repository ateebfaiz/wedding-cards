'use client';

import React from 'react';
import { BaraatStatus, SupportedLanguage } from '@/types/wedding';
import { Users, Utensils, Heart } from 'lucide-react';

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
      icon: Users,
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
    <div className="w-full my-6 py-6 border-y border-[#B5965A]/35 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="w-8 h-[1px] bg-[#B5965A]" />
        <h3
          className={`text-xs tracking-[0.15em] text-[#702F3D] font-black ${
            lang === 'ur' ? 'font-sameer-zikran text-sm' : 'font-cinzel uppercase tracking-[0.25em]'
          }`}
        >
          {lang === 'ur' ? 'بارات کے روایتی مراحل' : 'Baraat Ceremonial Progression'}
        </h3>
        <span className="w-8 h-[1px] bg-[#B5965A]" />
      </div>

      {/* 4 Dignified Ceremonial Progression Milestones (No Live Gimmicks) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        {stages.map((stage) => {
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              className="flex flex-col items-center p-3 rounded-2xl border border-[#B5965A]/30 bg-[#FCFAF6]/60 backdrop-blur-xs shadow-2xs"
            >
              <div className="w-8 h-8 rounded-full bg-[#702F3D] text-[#FFDF73] flex items-center justify-center mb-2 shadow-xs">
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-xs font-bold text-[#2E050B] ${
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
        className={`text-xs text-[#5A4D41] mt-2 font-medium ${
          lang === 'ur' ? 'font-nastaliq-body text-sm' : 'font-serif italic'
        }`}
      >
        {status.statusNote[lang]}
      </p>
    </div>
  );
}
