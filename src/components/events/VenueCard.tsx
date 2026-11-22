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
    <div className="w-full my-6 p-6 sm:p-8 rounded-3xl border-2 border-[#B5965A]/40 bg-[#FCFAF6]/95 shadow-[0_8px_30px_rgba(52,44,38,0.06)] flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#702F3D]/10 border border-[#702F3D]/25 flex items-center justify-center mb-3 text-[#702F3D]">
        <MapPin className="w-6 h-6" />
      </div>

      {/* Venue Details Heading (Strictly One Line, Big & Bold) */}
      <h2
        className={`text-xl sm:text-2xl md:text-3xl font-black text-[#702F3D] uppercase tracking-wider whitespace-nowrap mb-2 ${
          lang === 'ur' ? 'font-sameer-zikran' : 'font-cinzel'
        }`}
      >
        {lang === 'ur' ? 'مقامِ تقریب و نقشہ کی تفصیلات' : 'The Venue Details & Location'}
      </h2>

      {/* Main Venue Name (Big & Bold, Distinct Font) */}
      <h3
        className={`leading-snug text-[#2E050B] text-2xl sm:text-3xl md:text-4xl font-black my-1 w-full truncate ${
          lang === 'ur' ? 'font-sameer-zikran' : 'font-playfair'
        }`}
        title={venue.name[lang]}
      >
        {venue.name[lang]}
      </h3>

      {venue.hallOrSection && (
        <span
          className={`text-xs sm:text-sm text-[#545B43] font-bold uppercase tracking-wider my-1.5 ${
            lang === 'ur' ? 'font-alqalam-taj text-sm' : 'font-sans'
          }`}
        >
          {venue.hallOrSection[lang]}
        </span>
      )}

      <p
        className={`text-xs sm:text-sm text-[#5A4D41] max-w-lg mt-1 mb-6 leading-relaxed ${
          lang === 'ur' ? 'font-nastaliq-body text-base leading-loose' : 'font-sans'
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
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#342C26] text-[#F8F5EE] text-xs font-sans font-bold tracking-wide hover:bg-[#545B43] transition-colors shadow-2xs"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{lang === 'ur' ? 'گوگل میپس میں راستہ دیکھیں' : 'Open in Google Maps'}</span>
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#B5965A]/40 bg-[#F8F5EE] text-[#342C26] text-xs font-sans font-bold tracking-wide hover:bg-[#EFE8DA] transition-colors shadow-2xs cursor-pointer"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-[#B5965A]" />
          )}
          <span>
            {copied
              ? lang === 'ur'
                ? 'پتہ کاپی ہوگیا!'
                : 'Address Copied!'
              : lang === 'ur'
              ? 'پتہ کاپی کریں'
              : 'Copy Address'}
          </span>
        </button>
      </div>
    </div>
  );
}
