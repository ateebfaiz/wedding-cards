'use client';

import React from 'react';
import { BaraatStatus, SupportedLanguage } from '@/types/wedding';
import { Radio, CheckCircle, Navigation } from 'lucide-react';

interface BaraatStatusCardProps {
  status: BaraatStatus;
  lang: SupportedLanguage;
}

export function BaraatStatusCard({ status, lang }: BaraatStatusCardProps) {
  if (!status.enabled) return null;

  const stages: Array<{ id: BaraatStatus['currentStage']; labelEn: string; labelUr: string }> = [
    { id: 'Assembly', labelEn: 'Assembly', labelUr: 'روانگی کے لیے جمع ہونا' },
    { id: 'Departure', labelEn: 'Departure', labelUr: 'روانگی' },
    { id: 'EnRoute', labelEn: 'En Route', labelUr: 'راستے میں' },
    { id: 'Arrived', labelEn: 'Arrived', labelUr: 'پہنچ چکے ہیں' },
  ];

  const currentIdx = stages.findIndex((s) => s.id === status.currentStage);

  return (
    <div className="w-full my-6 p-5 rounded-lg border border-[#702F3D]/30 bg-[#702F3D]/5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#702F3D] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#702F3D]" />
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-[#702F3D] font-bold">
            {lang === 'ur' ? 'بارات کی براہِ راست صورتحال' : 'Baraat Progression'}
          </span>
        </div>

        {status.liveMapUrl && (
          <a
            href={status.liveMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#702F3D] font-medium hover:underline"
          >
            <Navigation className="w-3 h-3" />
            <span>{lang === 'ur' ? 'لائیو نقشہ دیکھیں' : 'Follow Live'}</span>
          </a>
        )}
      </div>

      {/* Progression Steps */}
      <div className="grid grid-cols-4 gap-1 text-center my-3">
        {stages.map((stage, idx) => {
          const isDone = idx < currentIdx;
          const isCurrent = idx === currentIdx;

          return (
            <div key={stage.id} className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold mb-1 transition-colors ${
                  isDone
                    ? 'bg-[#545B43] text-white'
                    : isCurrent
                    ? 'bg-[#702F3D] text-white ring-2 ring-[#702F3D]/40'
                    : 'bg-[#EFE8DA] text-[#8A8074]'
                }`}
              >
                {isDone ? <CheckCircle className="w-3.5 h-3.5" /> : idx + 1}
              </div>
              <span
                className={`text-[10px] md:text-xs ${
                  isCurrent ? 'font-bold text-[#702F3D]' : 'text-[#8A8074]'
                } ${lang === 'ur' ? 'font-nastaliq leading-loose' : ''}`}
              >
                {lang === 'ur' ? stage.labelUr : stage.labelEn}
              </span>
            </div>
          );
        })}
      </div>

      <p
        className={`text-xs text-center text-[#702F3D] mt-3 font-medium ${
          lang === 'ur' ? 'font-nastaliq leading-loose' : ''
        }`}
      >
        {status.statusNote[lang]}
      </p>
    </div>
  );
}
