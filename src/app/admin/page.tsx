'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getWeddingConfig } from '@/config/default';
import { GuestAccessTier } from '@/lib/audience';
import { copyToClipboard } from '@/lib/utils';
import { InteractiveArabicBackground } from '@/components/backgrounds/InteractiveArabicBackground';
import {
  Copy,
  Check,
  Share2,
  QrCode,
  Eye,
  ArrowLeft,
} from 'lucide-react';
import { QRCodeModal } from '@/components/modals/QRCodeModal';

export default function AdminInvitePage() {
  const config = getWeddingConfig();
  const [guestName, setGuestName] = useState('');
  const [tier, setTier] = useState<GuestAccessTier>('walima');
  const [langPref, setLangPref] = useState<'ur' | 'en'>('ur');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [origin, setOrigin] = useState('https://weddingcards.app');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const nameQuery = guestName.trim() ? `&to=${encodeURIComponent(guestName.trim())}` : '';
  const guestUrl = `${origin}/?invite=${tier}${nameQuery}`;

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
    const messageUr = `${greetingUr}السلام علیکم و رحمتہ اللہ\n\nاللہ تعالیٰ کے فضل و کرم سے ${coupleNamesUr} کی شادی خانہ آبادی کی مبارک تقریب طے پائی ہے۔\n\nہم آپ کو ${currentTierInfo.titleUr} میں شرکت اور دعاؤں کے لیے پُرخلوص دعوت دیتے ہیں۔\n\nبراہِ کرم اپنا مخصوص ڈیجیٹل کارڈ ملاحظہ فرمائیں:\n${guestUrl}\n\nطالبِ دعا:\nجناب و محترمہ سرفراز اعظم`;

    const greetingEn = guestName.trim() ? `Dear ${guestName.trim()} & Family,\n\n` : '';
    const messageEn = `${greetingEn}With the blessings of Almighty Allah, we cordially invite you to celebrate the wedding festivities of ${coupleNamesEn}.\n\nInvitation: ${currentTierInfo.titleEn}\n\nPlease tap to open your personalized digital wedding invitation:\n${guestUrl}\n\nWarm regards,\nMr. & Mrs. Sarfraz Azam`;

    const message = langPref === 'ur' ? messageUr : messageEn;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#140205] text-[#F8F5EE] py-6 sm:py-10 px-3 sm:px-4 flex flex-col items-center select-none overflow-x-hidden relative">
      {/* Interactive Full Bleed Arabic Background */}
      <InteractiveArabicBackground showDiscAnimation={false} />

      <div className="relative w-full max-w-lg bg-[#200408]/95 border-2 border-[#DFBF73]/50 rounded-3xl p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-md">
        {/* Header with Royal Shield Seal Logo */}
        <div className="flex items-center justify-between border-b border-[#DFBF73]/30 pb-4 mb-5">
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
              <span className="text-[10px] uppercase tracking-widest text-[#DFBF73] font-cinzel font-bold block">
                Host Private Portal
              </span>
              <h1 className="text-lg sm:text-xl font-cinzel font-bold text-[#FFDF73] whitespace-nowrap">
                Guest Invitation Manager
              </h1>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          {/* Guest / Family Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#DFBF73] font-cinzel font-bold mb-1.5 whitespace-nowrap">
              1. Guest / Family Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Dr. & Mrs. Farooq Khan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#DFBF73]/50 bg-[#35050C] text-[#FFF] placeholder-[#A68850] text-sm focus:outline-hidden focus:border-[#FFDF73] focus:ring-1 focus:ring-[#FFDF73]"
            />
          </div>

          {/* Invitation Tier Selection (No awkward wraps) */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#DFBF73] font-cinzel font-bold mb-1.5 whitespace-nowrap">
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
                        ? 'border-[#FFDF73] bg-[#8B0000]/60 ring-1 ring-[#FFDF73]'
                        : 'border-[#DFBF73]/30 bg-[#2C050B]/60 hover:border-[#DFBF73]/60'
                    }`}
                  >
                    <span className="text-xs font-bold text-[#FFDF73] block mb-0.5 whitespace-nowrap truncate">
                      {info.titleEn}
                    </span>
                    <span className="text-[11px] font-nastaliq text-[#EFE8DA]/85 block whitespace-nowrap truncate">
                      {info.titleUr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* WhatsApp Language Preference (No wrap) */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#DFBF73] font-cinzel font-bold mb-1.5 whitespace-nowrap">
              3. WhatsApp Message Language
            </label>
            <div className="inline-flex rounded-xl border border-[#DFBF73]/40 p-1 bg-[#2C050B]">
              <button
                type="button"
                onClick={() => setLangPref('ur')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-nastaliq transition-colors cursor-pointer whitespace-nowrap ${
                  langPref === 'ur' ? 'bg-[#8B0000] text-[#FFDF73] font-bold shadow-xs' : 'text-[#EFE8DA]/70'
                }`}
              >
                اردو دعوت نامہ
              </button>
              <button
                type="button"
                onClick={() => setLangPref('en')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-cinzel transition-colors cursor-pointer whitespace-nowrap ${
                  langPref === 'en' ? 'bg-[#8B0000] text-[#FFDF73] font-bold shadow-xs' : 'text-[#EFE8DA]/70'
                }`}
              >
                English Text
              </button>
            </div>
          </div>

          {/* Generated URL Box */}
          <div className="p-3.5 rounded-xl bg-[#180205] border border-[#DFBF73]/40 space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#DFBF73] font-bold block whitespace-nowrap">
              Personalized Guest Link:
            </span>
            <p className="text-xs font-mono text-[#FFDF73] break-all select-all leading-relaxed">
              {guestUrl}
            </p>
            <div className="text-[10px] text-[#A68850] flex flex-wrap items-center gap-1 pt-1">
              <span className="whitespace-nowrap">Included:</span>
              <span className="text-[#EFE8DA] font-medium">{currentTierInfo.events.join(' · ')}</span>
            </div>
          </div>

          {/* Action Buttons: 100% Mobile Optimized with ZERO Awkward Wraps */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-1">
            {/* Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-[#DFBF73] text-[#FFDF73] font-cinzel text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#8B0000]/40 transition-colors cursor-pointer shadow-md whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="whitespace-nowrap">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#DFBF73] shrink-0" />
                  <span className="whitespace-nowrap">Copy Private Link</span>
                </>
              )}
            </button>

            {/* Send WhatsApp Button */}
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-cinzel text-xs font-bold flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shadow-lg cursor-pointer whitespace-nowrap shrink-0"
            >
              <Share2 className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Send WhatsApp</span>
            </button>

            {/* QR Button */}
            <button
              type="button"
              onClick={() => setShowQR(true)}
              className="w-full sm:w-auto py-3 px-4 rounded-xl border border-[#DFBF73]/60 bg-[#2C050B] text-[#DFBF73] hover:text-[#FFDF73] hover:border-[#FFDF73] flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="Generate QR code"
            >
              <QrCode className="w-4 h-4 shrink-0" />
              <span className="text-xs font-cinzel font-bold sm:hidden whitespace-nowrap">View QR</span>
            </button>
          </div>

          {/* Test Live Preview Link */}
          <div className="text-center pt-2">
            <a
              href={guestUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#DFBF73] hover:text-[#FFDF73] hover:underline whitespace-nowrap"
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
