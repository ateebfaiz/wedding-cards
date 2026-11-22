'use client';

import React, { useState, useEffect } from 'react';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';
import { LanguageSwitcher } from './LanguageSwitcher';
import { EventNav } from './EventNav';
import { AudioController } from './AudioController';
import { WaxSealEnvelope } from '../envelope/WaxSealEnvelope';

interface InvitationShellProps {
  config: WeddingConfig;
  children: (lang: SupportedLanguage) => React.ReactNode;
}

export function InvitationShell({ config, children }: InvitationShellProps) {
  const [lang, setLang] = useState<SupportedLanguage>(config.meta.defaultLanguage || 'en');
  const [isOpened, setIsOpened] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    // Check if user already opened during this browsing session
    const stored = sessionStorage.getItem(`envelope_opened_${config.meta.id}`);
    if (stored === 'true') {
      setIsOpened(true);
    }
    setHasCheckedStorage(true);
  }, [config.meta.id]);

  const handleOpenComplete = () => {
    setIsOpened(true);
    try {
      sessionStorage.setItem(`envelope_opened_${config.meta.id}`, 'true');
    } catch {
      // sessionStorage unavailable
    }
  };

  if (!hasCheckedStorage) {
    // Prevent layout flash
    return <div className="min-h-screen bg-[#F8F5EE]" />;
  }

  return (
    <div
      className="min-h-screen bg-[#F8F5EE] text-[#342C26] flex flex-col items-center justify-between selection:bg-[#B5965A]/20"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Interactive Wax-Sealed Opening Experience if not opened yet */}
      {!isOpened && (
        <WaxSealEnvelope
          config={config}
          lang={lang}
          onOpenComplete={handleOpenComplete}
        />
      )}

      {/* Top Header Chrome */}
      <header className="w-full max-w-4xl px-4 py-6 flex items-center justify-between border-b border-[#B5965A]/15 z-30">
        {/* Subtle Monogram / Brand mark */}
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full border border-[#B5965A]/50 flex items-center justify-center font-serif text-xs font-bold text-[#B5965A]">
            {lang === 'ur' ? config.seal.monogram.ur : config.seal.monogram.en}
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-[#8A8074] font-medium hidden sm:inline">
            {config.meta.title[lang]}
          </span>
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
      </header>

      {/* Event Navigation */}
      <div className="w-full max-w-4xl px-4">
        <EventNav config={config} lang={lang} />
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-3xl px-4 py-4 md:py-8 flex-1 flex flex-col items-center">
        {children(lang)}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl px-4 py-8 border-t border-[#B5965A]/15 text-center my-8 text-xs text-[#8A8074]">
        <p className={lang === 'ur' ? 'font-nastaliq leading-loose' : 'font-serif italic'}>
          {config.invitationIntro.closingBlessing[lang]}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-[#B5965A]/80 mt-3 font-sans">
          Heirloom Wedding Stationery Platform
        </p>
      </footer>

      {/* Persistent Audio Controls */}
      <AudioController />
    </div>
  );
}
