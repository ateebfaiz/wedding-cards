'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';
import { LanguageSwitcher } from './LanguageSwitcher';
import { EventNav } from './EventNav';
import { AudioController } from './AudioController';
import { WaxSealEnvelope } from '../envelope/WaxSealEnvelope';
import { resolveGuestContext, filterEventsForTier, GuestContext } from '@/lib/audience';
import { GuestLinkGeneratorModal } from '../modals/GuestLinkGeneratorModal';
import { Users } from 'lucide-react';

interface InvitationShellProps {
  config: WeddingConfig;
  children: (lang: SupportedLanguage, guest: GuestContext) => React.ReactNode;
}

function InvitationShellInner({ config, children }: InvitationShellProps) {
  const searchParams = useSearchParams();
  const guestContext = resolveGuestContext(searchParams);
  const { allowedOrder } = filterEventsForTier(config, guestContext.tier);

  const [lang, setLang] = useState<SupportedLanguage>(config.meta.defaultLanguage || 'en');
  const [isOpened, setIsOpened] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  const [showLinkGen, setShowLinkGen] = useState(false);

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
    return <div className="min-h-screen bg-[#F8F5EE]" />;
  }

  return (
    <div
      className="min-h-screen bg-[#F8F5EE] text-[#342C26] flex flex-col items-center justify-between selection:bg-[#8B0000]/20"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Interactive Royal Red Wax-Sealed Opening Experience */}
      {!isOpened && (
        <WaxSealEnvelope
          config={config}
          lang={lang}
          guestName={guestContext.guestName}
          onOpenComplete={handleOpenComplete}
        />
      )}

      {/* Top Header Chrome */}
      <header className="w-full max-w-4xl px-4 py-5 flex items-center justify-between border-b border-[#B5965A]/20 z-30">
        {/* Monogram / Brand mark */}
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full border border-[#8B0000] bg-[#8B0000]/5 flex items-center justify-center font-serif text-xs font-bold text-[#8B0000] shadow-xs">
            {lang === 'ur' ? config.seal.monogram.ur : config.seal.monogram.en}
          </span>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#342C26] font-medium block">
              {config.meta.title[lang]}
            </span>
            {guestContext.guestName && (
              <span className="text-[10px] text-[#8B0000] font-medium">
                {lang === 'ur' ? `بخدمت: ${guestContext.guestName}` : `Invited: ${guestContext.guestName}`}
              </span>
            )}
          </div>
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
      </header>

      {/* Targeted Event Navigation */}
      <div className="w-full max-w-4xl px-4">
        <EventNav config={config} lang={lang} allowedEventSlugs={allowedOrder} />
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-3xl px-4 py-4 md:py-8 flex-1 flex flex-col items-center">
        {children(lang, guestContext)}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl px-4 py-8 border-t border-[#B5965A]/15 text-center my-8 text-xs text-[#8A8074] space-y-3">
        <p className={lang === 'ur' ? 'font-nastaliq-display leading-relaxed text-sm' : 'font-serif italic'}>
          {config.invitationIntro.closingBlessing[lang]}
        </p>

        {/* Host Link Generator Trigger */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowLinkGen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#B5965A]/30 text-[11px] text-[#8A8074] hover:text-[#8B0000] hover:border-[#8B0000] bg-[#EFE8DA]/40 transition-colors cursor-pointer"
          >
            <Users className="w-3 h-3" />
            <span>{lang === 'ur' ? 'مخصوص مہمان کا لنک بنائیں' : 'Generate Guest-Targeted Link'}</span>
          </button>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-[#B5965A]/80 font-sans">
          Heirloom Wedding Stationery Platform
        </p>
      </footer>

      {/* Host Link Generator Modal */}
      <GuestLinkGeneratorModal
        config={config}
        lang={lang}
        isOpen={showLinkGen}
        onClose={() => setShowLinkGen(false)}
      />

      {/* Persistent Audio Controls */}
      <AudioController />
    </div>
  );
}

export function InvitationShell(props: InvitationShellProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F5EE]" />}>
      <InvitationShellInner {...props} />
    </Suspense>
  );
}
