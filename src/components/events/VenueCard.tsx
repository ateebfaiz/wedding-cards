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
    <div className="w-full my-6 p-6 rounded-lg border border-[#B5965A]/35 bg-[#EFE8DA]/40 shadow-xs flex flex-col items-center text-center">
      <div className="w-9 h-9 rounded-full bg-[#B5965A]/15 border border-[#B5965A]/40 flex items-center justify-center mb-3 text-[#B5965A]">
        <MapPin className="w-5 h-5" />
      </div>

      <span className="text-xs uppercase tracking-[0.2em] text-[#8A8074] font-medium mb-1">
        {lang === 'ur' ? 'مقامِ تقریب' : 'The Venue'}
      </span>

      <h3
        className={`text-xl md:text-2xl text-[#342C26] font-medium ${
          lang === 'ur' ? 'font-nastaliq leading-[2.2]' : 'font-serif'
        }`}
      >
        {venue.name[lang]}
      </h3>

      {venue.hallOrSection && (
        <span className="text-xs text-[#545B43] font-medium uppercase tracking-wider mb-1">
          {venue.hallOrSection[lang]}
        </span>
      )}

      <p className="text-xs md:text-sm text-[#8A8074] max-w-md mt-1 mb-4 font-light">
        {venue.address[lang]}, {venue.city[lang]}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full">
        <a
          href={venue.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#545B43] text-[#F8F5EE] text-xs font-medium tracking-wide hover:bg-[#434935] transition-colors shadow-xs"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>{lang === 'ur' ? 'راستہ دیکھیے (گوگل میپس)' : 'Get Directions'}</span>
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B5965A]/40 bg-[#F8F5EE] text-[#342C26] text-xs font-medium tracking-wide hover:border-[#B5965A] hover:bg-[#EFE8DA]/40 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#545B43]" />
              <span>{lang === 'ur' ? 'پتہ محفوظ ہو گیا' : 'Address Copied!'}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#8A8074]" />
              <span>{lang === 'ur' ? 'پتہ کاپی کریں' : 'Copy Address'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
