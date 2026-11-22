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
    <div className="w-full my-6 p-6 sm:p-8 rounded-2xl border border-[#B5965A]/35 bg-[#FCFAF6] shadow-xs flex flex-col items-center text-center">
      <div className="w-10 h-10 rounded-full bg-[#702F3D]/10 border border-[#702F3D]/25 flex items-center justify-center mb-3 text-[#702F3D]">
        <MapPin className="w-5 h-5" />
      </div>

      <span className="text-[10px] uppercase tracking-[0.25em] text-[#81776B] font-sans font-bold mb-1">
        {lang === 'ur' ? 'مقامِ تقریب' : 'The Venue'}
      </span>

      <h3
        className={`leading-snug text-[#342C26] ${
          lang === 'ur'
            ? 'font-nastaliq-display text-2xl sm:text-3xl font-bold'
            : 'font-serif text-2xl sm:text-3xl font-bold'
        }`}
      >
        {venue.name[lang]}
      </h3>

      {venue.hallOrSection && (
        <span
          className={`text-xs text-[#545B43] font-sans font-bold uppercase tracking-wider my-1 ${
            lang === 'ur' ? 'font-nastaliq-body text-xs' : ''
          }`}
        >
          {venue.hallOrSection[lang]}
        </span>
      )}

      <p
        className={`text-xs sm:text-sm text-[#81776B] max-w-md mt-1 mb-5 leading-relaxed ${
          lang === 'ur' ? 'font-nastaliq-body' : 'font-sans'
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
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#342C26] text-[#F8F5EE] text-xs font-sans font-medium tracking-wide hover:bg-[#545B43] transition-colors shadow-2xs"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{lang === 'ur' ? 'گوگل میپس میں دیکھیں' : 'Get Directions'}</span>
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#B5965A]/40 bg-[#F8F5EE] text-[#342C26] text-xs font-sans font-medium tracking-wide hover:bg-[#EFE8DA] transition-colors shadow-2xs cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#B5965A]" />}
          <span>{copied ? (lang === 'ur' ? 'پتہ کاپی ہوگیا!' : 'Address Copied!') : (lang === 'ur' ? 'پتہ کاپی کریں' : 'Copy Address')}</span>
        </button>
      </div>
    </div>
  );
}
