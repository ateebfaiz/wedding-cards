'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';
import { AudioController } from './AudioController';
import { WaxSealEnvelope } from '../envelope/WaxSealEnvelope';
import { HeirloomAmbientBackground } from '../backgrounds/HeirloomAmbientBackground';
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
    // If a guest link is provided (e.g. ?to= or ?invite=), ALWAYS begin with the glowing envelope experience
    const autoOpen = searchParams.get('opened') === 'true';
    const isDirectGuestLink = searchParams.has('to') || searchParams.has('invite');

    if (!isDirectGuestLink) {
      const stored = sessionStorage.getItem(`envelope_opened_${config.meta.id}`);
      if (stored === 'true' || autoOpen) {
        setIsOpened(true);
      }
    } else if (autoOpen) {
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
    return <div className="min-h-screen bg-[#F8F5EE]" />;
  }

  return (
    <div
      className="min-h-screen bg-[#F8F5EE] text-[#342C26] flex flex-col items-center justify-start relative overflow-x-hidden selection:bg-[#B5965A]/25"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
    >
      {/* Dynamic Heirloom Background with Rotating Complementary Mandalas & Frosted Light Flares */}
      {isOpened && <HeirloomAmbientBackground variant="homepage" />}

      {/* Interactive Wax-Sealed Opening Experience (With Skip Button) */}
      {!isOpened && (
        <WaxSealEnvelope
          config={config}
          lang={lang}
          guestName={guestContext.guestName}
          onOpenComplete={handleOpenComplete}
        />
      )}

      {/* Floating Unobtrusive Language Toggle in Corner */}
      <div className="fixed top-4 right-4 z-40 select-none">
        <button
          type="button"
          onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
          aria-label="Toggle Language"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#B5965A]/40 bg-[#FCFAF6]/90 text-[#342C26] text-xs font-sans font-medium tracking-wide shadow-xs backdrop-blur-md hover:border-[#B5965A] hover:bg-[#EFE8DA] transition-all cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5 text-[#B5965A]" />
          <span>{lang === 'en' ? 'اردو' : 'English'}</span>
        </button>
      </div>

      {/* Full-Fledged Unwrapped Wedding Invitation Viewport */}
      <main className="w-full z-10 flex flex-col items-center">
        {children(lang, guestContext)}
      </main>

      {/* Floating Audio Controller */}
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
