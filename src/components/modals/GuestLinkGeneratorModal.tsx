'use client';

import React, { useState } from 'react';
import { WeddingConfig, SupportedLanguage } from '@/types/wedding';
import { GuestAccessTier } from '@/lib/audience';
import { copyToClipboard } from '@/lib/utils';
import { X, Copy, Check, Users, Share2 } from 'lucide-react';

interface GuestLinkGeneratorModalProps {
  config: WeddingConfig;
  lang: SupportedLanguage;
  isOpen: boolean;
  onClose: () => void;
}

export function GuestLinkGeneratorModal({ config, lang, isOpen, onClose }: GuestLinkGeneratorModalProps) {
  const [guestName, setGuestName] = useState('');
  const [tier, setTier] = useState<GuestAccessTier>('walima');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://weddingcards.app';
  const nameQuery = guestName.trim() ? `&to=${encodeURIComponent(guestName.trim())}` : '';
  const generatedLink = `${baseUrl}/?invite=${tier}${nameQuery}`;

  const coupleShortNames =
    lang === 'ur'
      ? `${config.couple.groom.shortName?.ur || config.couple.groom.fullName.ur} اور ${config.couple.bride.shortName?.ur || config.couple.bride.fullName.ur}`
      : `${config.couple.groom.shortName?.en || config.couple.groom.fullName.en} & ${config.couple.bride.shortName?.en || config.couple.bride.fullName.en}`;

  const getTierLabel = (t: GuestAccessTier) => {
    switch (t) {
      case 'walima':
        return lang === 'ur' ? 'صرف دعوتِ ولیمہ' : 'Walima Reception Only';
      case 'baraat':
        return lang === 'ur' ? 'صرف تقریبِ بارات' : 'Baraat Only';
      case 'nikkah':
        return lang === 'ur' ? 'صرف نکاح و رسمِ حنا' : 'Nikkah & Hina Only';
      case 'reception':
        return lang === 'ur' ? 'بارات و ولیمہ' : 'Baraat & Walima';
      case 'all':
      default:
        return lang === 'ur' ? 'تمام تقاریب (نکاح + بارات + ولیمہ)' : 'All Wedding Festivities';
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(generatedLink);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWhatsApp = () => {
    const greeting = guestName.trim()
      ? `Dear ${guestName.trim()},\n\n`
      : '';
    const messageEn = `${greeting}You are cordially invited to celebrate the wedding festivities of ${coupleShortNames}.\n\nInvitation: ${getTierLabel(tier)}\n\nPlease view your personalized digital invitation:\n${generatedLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageEn)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-md rounded-xl bg-[#F8F5EE] border border-[#B5965A]/50 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8A8074] hover:text-[#342C26] p-1 rounded-full hover:bg-[#EFE8DA] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#8B0000]">
          <Users className="w-5 h-5" />
          <span className="text-xs uppercase tracking-widest font-bold">
            {lang === 'ur' ? 'مخصوص مہمان کے لیے دعوت نامہ بنائیں' : 'Guest-Targeted Link Generator'}
          </span>
        </div>

        <h3
          className={`text-lg text-[#342C26] font-medium mb-4 ${
            lang === 'ur' ? 'font-nastaliq-display leading-relaxed' : 'font-serif'
          }`}
        >
          {lang === 'ur' ? 'مہمان کا نام اور تقریبات کا انتخاب کریں' : 'Target Events for Specific Guests'}
        </h3>

        <div className="space-y-4 text-xs">
          {/* Guest Name Input */}
          <div>
            <label className="block text-[#8A8074] font-medium mb-1">
              {lang === 'ur' ? 'مہمان کا نام (اختیاری):' : 'Guest / Family Name (Optional):'}
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Dr. Farooq & Family"
              className="w-full px-3 py-2 rounded-lg border border-[#B5965A]/40 bg-white text-[#342C26] focus:outline-hidden focus:border-[#8B0000]"
            />
          </div>

          {/* Target Event Selection */}
          <div>
            <label className="block text-[#8A8074] font-medium mb-1">
              {lang === 'ur' ? 'دعوت برائے:' : 'Invited To Ceremony:'}
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as GuestAccessTier)}
              className="w-full px-3 py-2 rounded-lg border border-[#B5965A]/40 bg-white text-[#342C26] focus:outline-hidden focus:border-[#8B0000]"
            >
              <option value="walima">{getTierLabel('walima')}</option>
              <option value="baraat">{getTierLabel('baraat')}</option>
              <option value="nikkah">{getTierLabel('nikkah')}</option>
              <option value="reception">{getTierLabel('reception')}</option>
              <option value="all">{getTierLabel('all')}</option>
            </select>
          </div>

          {/* Generated URL Box */}
          <div className="p-3 bg-[#EFE8DA]/60 rounded border border-[#B5965A]/30">
            <span className="text-[10px] text-[#8A8074] uppercase tracking-wider block mb-1">
              {lang === 'ur' ? 'تخلیق شدہ لنک:' : 'Personalized URL:'}
            </span>
            <p className="text-xs text-[#545B43] font-mono break-all select-all">
              {generatedLink}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 py-2.5 rounded-full border border-[#B5965A] text-[#342C26] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#EFE8DA] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#545B43]" />
                  <span>{lang === 'ur' ? 'کاپی ہو گیا' : 'Link Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#B5965A]" />
                  <span>{lang === 'ur' ? 'لنک کاپی کریں' : 'Copy Link'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-2.5 rounded-full bg-[#545B43] text-[#F8F5EE] font-medium text-xs flex items-center justify-center gap-2 hover:bg-[#434935] transition-colors shadow-xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{lang === 'ur' ? 'واٹس ایپ پر بھیجیں' : 'WhatsApp'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
