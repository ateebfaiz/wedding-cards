'use client';

import React from 'react';
import Link from 'next/link';
import { SupportedLanguage } from '@/types/wedding';
import { weddingAudio } from '@/lib/audio';
import { Volume2, VolumeX, Globe } from 'lucide-react';

interface EventNavigationHeaderProps {
  currentSlug: string;
  lang: SupportedLanguage;
  onToggleLang: () => void;
  showEventTabs?: boolean;
}

export function EventNavigationHeader({
  currentSlug,
  lang,
  onToggleLang,
  showEventTabs = true,
}: EventNavigationHeaderProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    if (weddingAudio && typeof weddingAudio.isMusicPlaying === 'function') {
      setIsPlaying(weddingAudio.isMusicPlaying());
    }
  }, []);

  const handleToggleAudio = () => {
    if (weddingAudio && typeof weddingAudio.toggleMusic === 'function') {
      const next = weddingAudio.toggleMusic();
      setIsPlaying(next);
    }
  };

  const events = [
    { slug: 'nikkah', labelEn: 'Nikkah', labelUr: 'نکاح' },
    { slug: 'baraat', labelEn: 'Baraat', labelUr: 'بارات' },
    { slug: 'walima', labelEn: 'Walima', labelUr: 'ولیمہ' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F8F5EE]/90 backdrop-blur-md border-b border-[#B5965A]/25 select-none transition-all">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 h-13 flex items-center justify-between gap-1 sm:gap-2">
        {/* Left: Home / All Events link */}
        {showEventTabs ? (
          <Link
            href="/"
            className="text-xs font-serif font-bold text-[#342C26] hover:text-[#702F3D] flex items-center gap-1 transition-colors shrink-0"
          >
            <span className="text-[#B5965A] text-xs">✦</span>
            <span className={lang === 'ur' ? 'font-nastaliq-display text-xs sm:text-sm' : 'font-sans text-[11px] sm:text-xs'}>
              {lang === 'ur' ? 'مرکزی کارڈ' : 'Main Card'}
            </span>
          </Link>
        ) : (
          <Link
            href="/"
            className="text-xs font-serif font-bold text-[#342C26] hover:text-[#702F3D] flex items-center gap-1 transition-colors shrink-0"
          >
            <span className="text-[#B5965A] text-xs">✦</span>
            <span className="font-serif tracking-wide text-xs">
              Ateeb & Nimra
            </span>
          </Link>
        )}

        {/* Center: Event Navigation Switcher (ONLY when showEventTabs is true) */}
        {showEventTabs && (
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden shrink">
            {events.map((ev) => {
              const isActive = currentSlug === ev.slug;
              return (
                <Link
                  key={ev.slug}
                  href={`/${ev.slug}`}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#342C26] text-[#F8F5EE] font-bold shadow-2xs'
                      : 'text-[#81776B] hover:text-[#342C26] hover:bg-[#EFE8DA]/60'
                  } ${lang === 'ur' ? 'font-nastaliq-display text-xs' : 'font-sans'}`}
                >
                  {lang === 'ur' ? ev.labelUr : ev.labelEn}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right: Controls (Language + Audio) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 ml-auto">
          {/* Audio Mute/Unmute */}
          <button
            type="button"
            onClick={handleToggleAudio}
            aria-label={isPlaying ? 'Mute Music' : 'Play Music'}
            className="p-1.5 rounded-full border border-[#B5965A]/30 text-[#81776B] hover:text-[#342C26] hover:border-[#B5965A] transition-colors cursor-pointer bg-white/70 shadow-2xs"
          >
            {isPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-[#545B43]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#B5965A]/40 bg-[#EFE8DA]/70 text-[#342C26] text-[11px] sm:text-xs font-sans font-medium hover:bg-[#EFE8DA] transition-colors cursor-pointer shadow-2xs"
          >
            <Globe className="w-3 h-3 text-[#B5965A]" />
            <span>{lang === 'en' ? 'اردو' : 'EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
