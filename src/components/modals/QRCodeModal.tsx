'use client';

import React, { useEffect, useState } from 'react';
import { generateQRCodeSVG } from '@/lib/qr';
import { SupportedLanguage } from '@/types/wedding';
import { X, Printer } from 'lucide-react';

interface QRCodeModalProps {
  url: string;
  title: string;
  lang: SupportedLanguage;
  isOpen: boolean;
  onClose: () => void;
}

export function QRCodeModal({ url, title, lang, isOpen, onClose }: QRCodeModalProps) {
  const [svgHtml, setSvgHtml] = useState<string>('');

  useEffect(() => {
    if (isOpen && url) {
      generateQRCodeSVG(url).then(setSvgHtml);
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 select-none">
      <div className="relative w-full max-w-sm rounded-xl bg-[#F8F5EE] border border-[#B5965A]/50 p-6 shadow-2xl text-center">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8A8074] hover:text-[#342C26] p-1 rounded-full hover:bg-[#EFE8DA] transition-colors cursor-pointer"
          aria-label="Close QR Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B5965A] font-medium block mb-1">
          {lang === 'ur' ? 'ڈیجیٹل دعوت نامہ کیو آر کوڈ' : 'Digital Invitation QR Code'}
        </span>

        <h3
          className={`text-lg text-[#342C26] font-medium mb-4 ${
            lang === 'ur' ? 'font-nastaliq leading-loose' : 'font-serif'
          }`}
        >
          {title}
        </h3>

        {/* QR Code Container with High-Contrast Ivory Quiet Zone */}
        <div className="mx-auto w-56 h-56 p-3 bg-white rounded-lg border border-[#B5965A]/30 shadow-inner flex items-center justify-center">
          {svgHtml ? (
            <div
              className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          ) : (
            <div className="text-xs text-[#8A8074]">Generating QR...</div>
          )}
        </div>

        <p className="text-xs text-[#8A8074] mt-4 mb-5 max-w-xs mx-auto">
          {lang === 'ur'
            ? 'موبائل کیمرے سے اسکین کر کے دعوت نامے کی تفصیلات دیکھیں۔'
            : 'Scan with smartphone camera to view full ceremony details and live updates.'}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B5965A]/40 text-xs font-medium text-[#342C26] hover:bg-[#EFE8DA] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#B5965A]" />
            <span>{lang === 'ur' ? 'پرنٹ کریں' : 'Print QR'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#545B43] text-[#F8F5EE] text-xs font-medium hover:bg-[#434935] transition-colors shadow-xs cursor-pointer"
          >
            {lang === 'ur' ? 'بند کریں' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}
