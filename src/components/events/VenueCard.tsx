'use client';

import React, { useState } from 'react';
import { VenueInfo, SupportedLanguage } from '@/types/wedding';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface VenueCardProps {
  venue: VenueInfo;
  lang: SupportedLanguage;
}

export function VenueCard({ venue, lang }: VenueCardProps) {
  const [copied, setCopied] = useState(false);

  const fullAddress = `${venue.name[lang]}, ${venue.address[lang]}, ${venue.city[lang]}`;

  const handleCopy = async () => {
    const success = await copyToClipboard(fullAddress);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full my-6 p-6 rounded-2xl border-2 border-[#DFBF73]/60 bg-[#FAF7F2] shadow-sm flex flex-col items-center text-center">
      <div className="w-10 h-10 rounded-full bg-[#8B0000]/10 border border-[#8B0000]/30 flex items-center justify-center mb-3 text-[#8B0000]">
        <MapPin className="w-5 h-5" />
      </div>

      <span className="text-xs uppercase tracking-[0.25em] text-[#8B0000] font-cinzel font-bold mb-1">
        {lang === 'ur' ? 'مقامِ تقریب' : 'The Venue'}
      </span>

      <h3
        className={`leading-snug ${
          lang === 'ur'
            ? 'font-nastaliq-display text-3xl md:text-4xl text-[#4A0810] font-bold'
            : 'font-playfair text-2xl md:text-3xl font-extrabold text-[#2A0E12]'
        }`}
      >
        {venue.name[lang]}
      </h3>

      {venue.hallOrSection && (
        <span
          className={`text-xs text-[#8B6B38] font-cinzel font-bold uppercase tracking-wider my-1 ${
            lang === 'ur' ? 'font-nastaliq-body text-sm' : ''
          }`}
        >
          {venue.hallOrSection[lang]}
        </span>
      )}

      <p
        className={`text-xs md:text-sm text-[#5C4D43] max-w-md mt-1 mb-5 ${
          lang === 'ur' ? 'font-nastaliq-body' : 'font-serif'
        }`}
      >
        {venue.address[lang]}, {venue.city[lang]}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <a
          href={venue.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2E050B] text-[#FFDF73] text-xs font-cinzel font-bold tracking-wide hover:bg-[#450912] transition-colors shadow-sm"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{lang === 'ur' ? 'گوگل میپس میں دیکھیں' : 'Open in Google Maps'}</span>
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[#DFBF73] bg-[#FDFBF7] text-[#35050C] text-xs font-cinzel font-bold tracking-wide hover:bg-[#F5EFEB] transition-colors shadow-sm cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#B5965A]" />}
          <span>{copied ? (lang === 'ur' ? 'کاپی ہوگیا!' : 'Copied!') : (lang === 'ur' ? 'پتہ کاپی کریں' : 'Copy Address')}</span>
        </button>
      </div>
    </div>
  );
}
