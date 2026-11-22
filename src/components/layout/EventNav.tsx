'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';

interface EventNavProps {
  config: WeddingConfig;
  lang: SupportedLanguage;
  allowedEventSlugs?: string[];
}

export function EventNav({ config, lang, allowedEventSlugs }: EventNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Preserve query string (e.g. ?invite=walima&to=Uncle+Saleem) across navigation
  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';

  const visibleSlugs = allowedEventSlugs && allowedEventSlugs.length > 0
    ? allowedEventSlugs
    : config.eventOrder;

  return (
    <nav className="flex items-center justify-center my-6 select-none" aria-label="Wedding Events Navigation">
      <div className="inline-flex items-center gap-1.5 p-1 rounded-full border border-[#B5965A]/30 bg-[#F8F5EE]/90 backdrop-blur-xs shadow-xs max-w-full overflow-x-auto">
        {/* Main Overview Link */}
        <Link
          href={`/${queryString}`}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
            pathname === '/'
              ? 'bg-[#545B43] text-[#F8F5EE] shadow-xs'
              : 'text-[#8A8074] hover:text-[#342C26] hover:bg-[#EFE8DA]/50'
          }`}
        >
          {lang === 'ur' ? 'مرکزی کارڈ' : 'Main Card'}
        </Link>

        <span className="text-[#B5965A]/40 text-xs">·</span>

        {/* Dynamic Filtered Event Links */}
        {visibleSlugs.map((eventId, idx) => {
          const event = config.events[eventId];
          if (!event) return null;
          const href = `/${event.slug}${queryString}`;
          const isActive = pathname === `/${event.slug}`;

          return (
            <React.Fragment key={event.id}>
              <Link
                href={href}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all whitespace-nowrap ${
                  lang === 'ur' ? 'font-nastaliq-body leading-relaxed' : 'font-medium tracking-wide'
                } ${
                  isActive
                    ? 'bg-[#545B43] text-[#F8F5EE] shadow-xs'
                    : 'text-[#8A8074] hover:text-[#342C26] hover:bg-[#EFE8DA]/50'
                }`}
              >
                {event.title[lang]}
              </Link>
              {idx < visibleSlugs.length - 1 && (
                <span className="text-[#B5965A]/40 text-xs">·</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
