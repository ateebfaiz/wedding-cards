'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';
import { AudioController } from './AudioController';
import { WaxSealEnvelope } from '../envelope/WaxSealEnvelope';
import { resolveGuestContext, filterEventsForTier, GuestContext } from '@/lib/audience';
import { Globe } from 'lucide-react';

interface InvitationShellProps {
  config: WeddingConfig;
  children: (lang: SupportedLanguage, guest: GuestContext) => React.ReactNode;
}

function InvitationShellInner({ config, children }: InvitationShellProps) {
  const searchParams = useSearchParams();
  const guestContext = resolveGuestContext(searchParams);

  const [lang, setLang] = useState<SupportedLanguage>(config.meta.defaultLanguage || 'en');
  const [isOpened, setIsOpened] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    // Check if opened during current session or requested via query parameter
    const autoOpen = searchParams.get('opened') === 'true';
    const stored = sessionStorage.getItem(`envelope_opened_${config.meta.id}`);
    if (stored === 'true' || autoOpen) {
      setIsOpened(true);
    }
    setHasCheckedStorage(true);
  }, [config.meta.id, searchParams]);

  const handleOpenComplete = () => {
    setIsOpened(true);
    try {
      sessionStorage.setItem(`envelope_opened_${config.meta.id}`, 'true');
    } catch {
      // ignore
    }
  };

  if (!hasCheckedStorage) {
    return <div className="min-h-screen bg-[#180306]" />;
  }

  return (
    <div
      className="min-h-screen bg-[#180306] text-[#342C26] flex flex-col items-center justify-center relative overflow-x-hidden selection:bg-[#DFBF73]/30"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Animated Deep Maroon & Gold Background with Slow Drift */}
      <div
        className="fixed inset-0 opacity-40 mix-blend-screen pointer-events-none animate-slow-drift"
        style={{
          backgroundImage: 'url(/assets/backgrounds/maroon-golden-opt.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Secondary Arabesque Pattern Layer */}
      <div
        className="fixed inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/backgrounds/golden-arabesque-opt.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Interactive Wax-Sealed Opening Experience (NO SKIP BUTTON) */}
      {!isOpened && (
        <WaxSealEnvelope
          config={config}
          lang={lang}
          guestName={guestContext.guestName}
          onOpenComplete={handleOpenComplete}
        />
      )}

      {/* Floating Unobtrusive Language Toggle in Corner (No Website Header) */}
      <div className="fixed top-4 right-4 z-40 select-none">
        <button
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
          aria-label="Toggle Language"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#DFBF73]/60 bg-[#2C050B]/90 text-[#FFDF73] text-xs font-cinzel tracking-wider shadow-lg backdrop-blur-md hover:border-[#FFDF73] hover:scale-105 transition-all cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-[#DFBF73]" />
          <span>{lang === 'en' ? 'اردو' : 'English'}</span>
        </button>
      </div>

      {/* Main Wedding Card Viewport (Mobile-Optimized Heirloom Folio) */}
      <main className="w-full max-w-xl px-3 py-6 sm:py-10 z-10 flex flex-col items-center justify-center">
        {children(lang, guestContext)}
      </main>

      {/* Floating Audio Controller */}
      <AudioController />
    </div>
  );
}

export function InvitationShell(props: InvitationShellProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#180306]" />}>
      <InvitationShellInner {...props} />
    </Suspense>
  );
}
