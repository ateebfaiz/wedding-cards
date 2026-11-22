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
    <div className="w-full my-5 flex flex-wrap items-center justify-center gap-3 select-none">
      {/* Calendar Action with Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowCalendarMenu(!showCalendarMenu)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B5965A]/40 bg-[#FCFAF6] text-[#342C26] text-xs font-sans font-medium tracking-wide hover:border-[#B5965A] hover:bg-[#EFE8DA]/50 transition-colors shadow-2xs cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#B5965A]" />
          <span>{lang === 'ur' ? 'کیلنڈر میں شامل کریں' : 'Add to Calendar'}</span>
        </button>

        {showCalendarMenu && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 rounded-xl bg-[#FCFAF6] border border-[#B5965A]/40 shadow-md py-1.5 z-30 text-xs font-sans">
            <button
              type="button"
              onClick={handleGoogleCalendar}
              className="w-full px-4 py-2 flex items-center justify-between text-left text-[#342C26] hover:bg-[#EFE8DA] transition-colors cursor-pointer"
            >
              <span>Google Calendar</span>
              <ExternalLink className="w-3 h-3 text-[#81776B]" />
            </button>
            <button
              type="button"
              onClick={handleDownloadICS}
              className="w-full px-4 py-2 flex items-center justify-between text-left text-[#342C26] hover:bg-[#EFE8DA] transition-colors cursor-pointer"
            >
              <span>Apple / Outlook (.ics)</span>
              <Download className="w-3 h-3 text-[#81776B]" />
            </button>
          </div>
        )}
      </div>

      {/* Share on WhatsApp */}
      <button
        type="button"
        onClick={handleShareWhatsApp}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-sans font-medium tracking-wide hover:opacity-95 transition-opacity shadow-2xs cursor-pointer"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span>{lang === 'ur' ? 'واٹس ایپ پر شیئر کریں' : 'Share on WhatsApp'}</span>
      </button>

      {/* Show QR Code */}
      <button
        type="button"
        onClick={() => setShowQR(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B5965A]/40 bg-[#FCFAF6] text-[#81776B] hover:text-[#342C26] hover:border-[#B5965A] text-xs font-sans font-medium tracking-wide transition-colors shadow-2xs cursor-pointer"
      >
        <QrCode className="w-3.5 h-3.5 text-[#B5965A]" />
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
