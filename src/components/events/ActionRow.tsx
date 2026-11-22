'use client';

import React, { useState } from 'react';
import { WeddingEvent, SupportedLanguage } from '@/types/wedding';
import { downloadICS, buildGoogleCalendarUrl } from '@/lib/calendar';
import { Calendar, Share2, QrCode, Download, ExternalLink } from 'lucide-react';
import { QRCodeModal } from '../modals/QRCodeModal';

interface ActionRowProps {
  event: WeddingEvent;
  coupleNames: string;
  lang: SupportedLanguage;
}

export function ActionRow({ event, coupleNames, lang }: ActionRowProps) {
  const [showQR, setShowQR] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://weddingcards.app/${event.slug}`;

  const handleShareWhatsApp = () => {
    const textEn = `*Wedding Invitation — ${event.title.en}*\nWe warmly request your prayers and presence for ${coupleNames}.\n\n📅 Date: ${event.formattedDate.en}\n📍 Venue: ${event.venue.name.en}, ${event.venue.city.en}\n\nView digital invitation: ${currentUrl}`;
    const textUr = `*دعوتِ شادی — ${event.title.ur}*\n${coupleNames} کی مبارک تقریب میں آپ کی شرکت اور دعاؤں کے متمنی ہیں۔\n\n📅 تاریخ: ${event.formattedDate.ur}\n📍 مقام: ${event.venue.name.ur}، ${event.venue.city.ur}\n\nڈیجیٹل دعوت نامہ دیکھیں: ${currentUrl}`;
    
    const message = lang === 'ur' ? textUr : textEn;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGoogleCalendar = () => {
    const url = buildGoogleCalendarUrl(event, coupleNames, lang);
    window.open(url, '_blank');
    setShowCalendarMenu(false);
  };

  const handleDownloadICS = () => {
    downloadICS(event, coupleNames, lang);
    setShowCalendarMenu(false);
  };

  return (
    <div className="w-full my-6 flex flex-wrap items-center justify-center gap-3">
      {/* Calendar Action with Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowCalendarMenu(!showCalendarMenu)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#B5965A]/40 bg-[#F8F5EE] text-[#342C26] text-xs font-medium tracking-wide hover:border-[#B5965A] hover:bg-[#EFE8DA]/40 transition-colors shadow-xs cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#B5965A]" />
          <span>{lang === 'ur' ? 'کیلنڈر میں شامل کریں' : 'Add to Calendar'}</span>
        </button>

        {showCalendarMenu && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 rounded-lg bg-[#F8F5EE] border border-[#B5965A]/40 shadow-lg py-1.5 z-30 text-xs">
            <button
              type="button"
              onClick={handleGoogleCalendar}
              className="w-full px-4 py-2 flex items-center justify-between text-left text-[#342C26] hover:bg-[#EFE8DA] transition-colors cursor-pointer"
            >
              <span>Google Calendar</span>
              <ExternalLink className="w-3 h-3 text-[#8A8074]" />
            </button>
            <button
              type="button"
              onClick={handleDownloadICS}
              className="w-full px-4 py-2 flex items-center justify-between text-left text-[#342C26] hover:bg-[#EFE8DA] transition-colors cursor-pointer"
            >
              <span>Apple / Outlook (.ics)</span>
              <Download className="w-3 h-3 text-[#8A8074]" />
            </button>
          </div>
        )}
      </div>

      {/* Share on WhatsApp */}
      <button
        type="button"
        onClick={handleShareWhatsApp}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#545B43]/30 bg-[#545B43]/10 text-[#545B43] text-xs font-medium tracking-wide hover:bg-[#545B43]/20 transition-colors shadow-xs cursor-pointer"
      >
        <Share2 className="w-4 h-4" />
        <span>{lang === 'ur' ? 'واٹس ایپ پر شیئر کریں' : 'Share on WhatsApp'}</span>
      </button>

      {/* Show QR Code */}
      <button
        type="button"
        onClick={() => setShowQR(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#B5965A]/30 bg-[#F8F5EE] text-[#8A8074] text-xs font-medium tracking-wide hover:text-[#342C26] hover:border-[#B5965A] transition-colors shadow-xs cursor-pointer"
      >
        <QrCode className="w-4 h-4 text-[#B5965A]" />
        <span>{lang === 'ur' ? 'کیو آر کوڈ' : 'Event QR'}</span>
      </button>

      {/* QR Modal */}
      <QRCodeModal
        url={currentUrl}
        title={event.title[lang]}
        lang={lang}
        isOpen={showQR}
        onClose={() => setShowQR(false)}
      />
    </div>
  );
}
