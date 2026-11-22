'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getWeddingConfig } from '@/config/default';
import { GuestAccessTier } from '@/lib/audience';
import { copyToClipboard } from '@/lib/utils';
import { HeirloomAmbientBackground } from '@/components/backgrounds/HeirloomAmbientBackground';
import {
  Copy,
  Check,
  Share2,
  QrCode,
  Eye,
  Lock,
} from 'lucide-react';
import { QRCodeModal } from '@/components/modals/QRCodeModal';

export default function AdminInvitePage() {
  const config = getWeddingConfig();
  const [guestName, setGuestName] = useState('');
  const [tier, setTier] = useState<GuestAccessTier>('walima');
  const [langPref, setLangPref] = useState<'ur' | 'en'>('ur');
  const [allowNav, setAllowNav] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [origin, setOrigin] = useState('https://weddingcards.app');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const isSingleEvent = tier === 'walima' || tier === 'nikkah' || tier === 'baraat';
  const targetRoute = isSingleEvent ? `/${tier}` : '';
  const navParam = isSingleEvent ? '&nav=0' : `&nav=${allowNav ? '1' : '0'}`;
  const nameQuery = guestName.trim() ? `&to=${encodeURIComponent(guestName.trim())}` : '';
  const guestUrl = `${origin}${targetRoute}?invite=${tier}${nameQuery}${navParam}`;

  const coupleNamesEn = `${config.couple.groom.fullName.en} & ${config.couple.bride.fullName.en}`;
  const coupleNamesUr = `${config.couple.groom.fullName.ur} اور ${config.couple.bride.fullName.ur}`;

  const tierDescriptions: Record<GuestAccessTier, { titleEn: string; titleUr: string; events: string[] }> = {
    walima: {
      titleEn: 'Walima Only (Colleagues & Network)',
      titleUr: 'صرف دعوتِ ولیمہ (احباب و رفقاء)',
      events: ['Walima Reception (Hall 20, Garrison Club Lahore)'],
    },
    all: {
      titleEn: 'All Events (Family & Close Friends)',
      titleUr: 'تمام تقریبات (نکاح، بارات اور ولیمہ)',
      events: ['Nikkah Ceremony (Veroke Cheema)', 'The Wedding Baraat (Lahore)', 'Walima Reception (Lahore)'],
    },
    reception: {
      titleEn: 'Baraat & Walima',
      titleUr: 'بارات و ولیمہ',
      events: ['The Wedding Baraat (Lahore)', 'Walima Reception (Lahore)'],
    },
    nikkah: {
      titleEn: 'Nikkah Ceremony Only',
      titleUr: 'صرف تقریبِ نکاح',
      events: ['Nikkah Ceremony (Veroke Cheema)'],
    },
    baraat: {
      titleEn: 'Baraat Only',
      titleUr: 'صرف تقریبِ بارات',
      events: ['The Wedding Baraat (Lahore)'],
    },
  };

  const currentTierInfo = tierDescriptions[tier];

  const handleCopyLink = async () => {
    const success = await copyToClipboard(guestUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const greetingUr = guestName.trim()
      ? `بخدمتِ گرامی قدر ${guestName.trim()} و اہلِ خانہ،\n\n`
      : '';
    const messageUr = `${greetingUr}السلام علیکم و رحمتہ اللہ\n\nاللہ تعالیٰ کے فضل و کرم سے ${coupleNamesUr} کی شادی خانہ آبادی کی مبارک تقریب طے پائی ہے۔\n\nہم آپ کو ${currentTierInfo.titleUr} میں شرکت اور دعاؤں کے لیے پُرخلوص دعوت دیتے ہیں۔\n\nبراہِ کرم اپنا مخصوص ڈیجیٹل کارڈ ملاحظہ فرمائیں:\n${guestUrl}\n\nطالبِ دعا:\nجناب و محترمہ فیض رسول چیمہ`;

    const greetingEn = guestName.trim() ? `Dear ${guestName.trim()} & Family,\n\n` : '';
    const messageEn = `${greetingEn}With the blessings of Almighty Allah, we cordially invite you to celebrate the wedding festivities of ${coupleNamesEn}.\n\nInvitation: ${currentTierInfo.titleEn}\n\nPlease tap to open your personalized digital wedding invitation:\n${guestUrl}\n\nWarm regards,\nMr. & Mrs. Faiz Rasool Cheema`;

    const message = langPref === 'ur' ? messageUr : messageEn;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#342C26] py-8 sm:py-12 px-4 flex flex-col items-center select-none overflow-x-hidden relative selection:bg-[#B5965A]/25">
      {/* Ambient Rotating Mandala Background */}
      <HeirloomAmbientBackground opacityMultiplier={0.6} />

      <div className="relative z-10 w-full max-w-lg bg-[#FCFAF6]/95 backdrop-blur-md border border-[#B5965A]/40 rounded-3xl p-5 sm:p-8 shadow-[0_12px_40px_rgba(52,44,38,0.08)]">
        {/* Header with Royal Shield Seal Logo */}
        <div className="flex items-center justify-between border-b border-[#B5965A]/25 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="/assets/seal/wedding-seal-opt.webp"
                alt="Wedding Seal Logo"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B5965A] font-sans font-semibold block">
                Host Private Portal
              </span>
              <h1 className="text-lg sm:text-xl font-serif text-[#342C26] whitespace-nowrap">
                Guest Invitation Manager
              </h1>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          {/* Guest / Family Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#5A4D41] font-sans font-semibold mb-1.5 whitespace-nowrap">
              1. Guest / Family Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Dr. & Mrs. Farooq Khan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#B5965A]/35 bg-white text-[#342C26] placeholder-[#81776B]/60 text-sm focus:outline-hidden focus:border-[#B5965A] focus:ring-1 focus:ring-[#B5965A] shadow-2xs"
            />
          </div>

          {/* Invitation Tier Selection (No awkward wraps) */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#5A4D41] font-sans font-semibold mb-1.5 whitespace-nowrap">
              2. Invited Ceremony Access
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(['walima', 'all', 'reception', 'nikkah', 'baraat'] as GuestAccessTier[]).map((tKey) => {
                const info = tierDescriptions[tKey];
                const isSelected = tier === tKey;

                return (
                  <button
                    key={tKey}
                    type="button"
                    onClick={() => setTier(tKey)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#545B43] bg-[#545B43]/10 ring-1 ring-[#545B43]'
                        : 'border-[#B5965A]/25 bg-white hover:border-[#B5965A]/50 shadow-2xs'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#342C26] block mb-0.5 whitespace-nowrap truncate">
                      {info.titleEn}
                    </span>
                    <span className="text-[11px] font-nastaliq text-[#5A4D41] block whitespace-nowrap truncate">
                      {info.titleUr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Bar & Event Browsing Control */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#5A4D41] font-sans font-semibold mb-1.5 whitespace-nowrap">
              3. Ceremony Navigation & Browsing
            </label>
            {isSingleEvent ? (
              <div className="p-3 rounded-xl bg-white/80 border border-[#B5965A]/35 flex items-center gap-2.5 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-[#702F3D]/10 text-[#702F3D] flex items-center justify-center shrink-0 border border-[#702F3D]/20">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#342C26] block">
                    Navigation Disabled (Single Event Locked)
                  </span>
                  <span className="text-[11px] text-[#81776B] block leading-tight">
                    Guest cannot browse or view other ceremonies. Navigation header and related events are completely removed.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="inline-flex rounded-xl border border-[#B5965A]/30 p-1 bg-[#EFE8DA]/60">
                  <button
                    type="button"
                    onClick={() => setAllowNav(true)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-colors cursor-pointer whitespace-nowrap ${
                      allowNav ? 'bg-[#545B43] text-white font-medium shadow-xs' : 'text-[#5A4D41]'
                    }`}
                  >
                    Show Navigation Bar
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllowNav(false)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-colors cursor-pointer whitespace-nowrap ${
                      !allowNav ? 'bg-[#702F3D] text-white font-medium shadow-xs' : 'text-[#5A4D41]'
                    }`}
                  >
                    Hide Navigation (Locked)
                  </button>
                </div>
                <span className="text-[11px] text-[#81776B]">
                  {allowNav ? 'Guest can switch between ceremonies' : 'Guest sees only this card'}
                </span>
              </div>
            )}
          </div>

          {/* WhatsApp Language Preference */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#5A4D41] font-sans font-semibold mb-1.5 whitespace-nowrap">
              4. WhatsApp Message Language
            </label>
            <div className="inline-flex rounded-xl border border-[#B5965A]/30 p-1 bg-[#EFE8DA]/60">
              <button
                type="button"
                onClick={() => setLangPref('ur')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-nastaliq transition-colors cursor-pointer whitespace-nowrap ${
                  langPref === 'ur' ? 'bg-[#545B43] text-white font-medium shadow-xs' : 'text-[#5A4D41]'
                }`}
              >
                اردو دعوت نامہ
              </button>
              <button
                type="button"
                onClick={() => setLangPref('en')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-sans transition-colors cursor-pointer whitespace-nowrap ${
                  langPref === 'en' ? 'bg-[#545B43] text-white font-medium shadow-xs' : 'text-[#5A4D41]'
                }`}
              >
                English Text
              </button>
            </div>
          </div>

          {/* Generated URL Box */}
          <div className="p-3.5 rounded-xl bg-[#EFE8DA]/40 border border-[#B5965A]/30 space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#B5965A] font-bold block whitespace-nowrap">
              Personalized Guest Link:
            </span>
            <p className="text-xs font-mono text-[#342C26] break-all select-all leading-relaxed bg-white/70 p-2 rounded-lg border border-[#B5965A]/20">
              {guestUrl}
            </p>
            <div className="text-[10px] text-[#81776B] flex flex-wrap items-center gap-1 pt-1">
              <span className="whitespace-nowrap font-medium">Included:</span>
              <span className="text-[#342C26]">{currentTierInfo.events.join(' · ')}</span>
            </div>
          </div>

          {/* Action Buttons: 100% Mobile Optimized with ZERO Awkward Wraps */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-1">
            {/* Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-[#B5965A] bg-white text-[#342C26] font-sans text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#EFE8DA] transition-colors cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="whitespace-nowrap">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#B5965A] shrink-0" />
                  <span className="whitespace-nowrap">Copy Private Link</span>
                </>
              )}
            </button>

            {/* Send WhatsApp Button */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <Share2 className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Send WhatsApp</span>
            </button>

            {/* QR Button */}
            <button
              type="button"
              onClick={() => setShowQR(true)}
              className="w-full sm:w-auto py-3 px-4 rounded-xl border border-[#B5965A]/50 bg-white text-[#5A4D41] hover:text-[#342C26] hover:border-[#B5965A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
              title="Generate QR code"
            >
              <QrCode className="w-4 h-4 shrink-0" />
              <span className="text-xs font-sans font-semibold sm:hidden whitespace-nowrap">View QR</span>
            </button>
          </div>

          {/* Test Live Preview Link */}
          <div className="text-center pt-2">
            <a
              href={guestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#B5965A] hover:text-[#342C26] hover:underline whitespace-nowrap font-medium"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>Test Live Card exactly as this guest will see it ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <QRCodeModal
        url={guestUrl}
        title={guestName.trim() ? `Invitation for ${guestName}` : currentTierInfo.titleEn}
        lang={langPref}
        isOpen={showQR}
        onClose={() => setShowQR(false)}
      />
    </div>
  );
}
