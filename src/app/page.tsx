'use client';

import React from 'react';
import Link from 'next/link';
import { getWeddingConfig } from '@/config/default';
import { InvitationShell } from '@/components/layout/InvitationShell';
import { OrnamentalBorder } from '@/components/common/OrnamentalBorder';
import { BismillahHeader } from '@/components/common/BismillahHeader';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const config = getWeddingConfig();

  return (
    <InvitationShell config={config}>
      {(lang) => {
        const coupleNames =
          lang === 'ur'
            ? `${config.couple.groom.shortName?.ur || config.couple.groom.fullName.ur} اور ${config.couple.bride.shortName?.ur || config.couple.bride.fullName.ur}`
            : `${config.couple.groom.shortName?.en || config.couple.groom.fullName.en} & ${config.couple.bride.shortName?.en || config.couple.bride.fullName.en}`;

        return (
          <div className="w-full flex flex-col items-center">
            <OrnamentalBorder className="w-full max-w-2xl my-2">
              {/* Sacred Invocations */}
              <BismillahHeader
                arabic={config.bismillah.arabic}
                translation={config.bismillah.translation}
                lang={lang}
              />

              {/* Host Invitation Lines */}
              <div className="text-center my-6 space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-[#B5965A] font-medium">
                  {config.invitationIntro.hostsLine[lang]}
                </p>

                <p
                  className={`text-sm md:text-base text-[#8A8074] max-w-md mx-auto ${
                    lang === 'ur' ? 'font-nastaliq leading-loose' : 'font-light leading-relaxed'
                  }`}
                >
                  {config.invitationIntro.greetingLine[lang]}
                </p>
              </div>

              {/* Couple's Names Presentation */}
              <div className="my-8 text-center border-y border-[#B5965A]/20 py-8 space-y-4">
                {/* Groom */}
                <div>
                  <h2
                    className={`text-2xl md:text-4xl text-[#342C26] font-normal ${
                      lang === 'ur' ? 'font-nastaliq leading-[2.2]' : 'font-serif'
                    }`}
                  >
                    {config.couple.groom.fullName[lang]}
                  </h2>
                  <p className="text-xs text-[#8A8074] mt-1">
                    {lang === 'ur'
                      ? `فرزندِ ارجمند ${config.couple.groom.parents[lang]}`
                      : `Son of ${config.couple.groom.parents[lang]}`}
                  </p>
                </div>

                {/* Decorative Amper-knot */}
                <div className="flex items-center justify-center gap-3 text-[#B5965A]">
                  <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#B5965A]/50" />
                  <span className="font-serif italic text-xl md:text-2xl">
                    {lang === 'ur' ? 'اور' : '&'}
                  </span>
                  <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#B5965A]/50" />
                </div>

                {/* Bride */}
                <div>
                  <h2
                    className={`text-2xl md:text-4xl text-[#342C26] font-normal ${
                      lang === 'ur' ? 'font-nastaliq leading-[2.2]' : 'font-serif'
                    }`}
                  >
                    {config.couple.bride.fullName[lang]}
                  </h2>
                  <p className="text-xs text-[#8A8074] mt-1">
                    {lang === 'ur'
                      ? `دخترِ نیک اختر ${config.couple.bride.parents[lang]}`
                      : `Daughter of ${config.couple.bride.parents[lang]}`}
                  </p>
                </div>
              </div>

              {/* Celebration Note */}
              <p
                className={`text-xs md:text-sm text-[#8A8074] text-center max-w-md mx-auto my-6 ${
                  lang === 'ur' ? 'font-nastaliq leading-loose' : 'font-light leading-relaxed'
                }`}
              >
                {config.invitationIntro.celebrationLine[lang]}
              </p>
            </OrnamentalBorder>

            {/* Event Cards Section */}
            <div className="w-full max-w-2xl mt-8 mb-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-10 h-[1px] bg-[#B5965A]/35" />
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#8A8074] font-medium">
                  {lang === 'ur' ? 'تقاریب کی تفصیلات' : 'Wedding Festivities'}
                </h3>
                <span className="w-10 h-[1px] bg-[#B5965A]/35" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.eventOrder.map((eventId) => {
                  const event = config.events[eventId];
                  if (!event) return null;

                  return (
                    <Link
                      key={event.id}
                      href={`/${event.slug}`}
                      className="group p-5 rounded-lg border border-[#B5965A]/30 bg-[#EFE8DA]/40 hover:bg-[#EFE8DA]/80 hover:border-[#B5965A] transition-all shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#B5965A] font-medium block">
                          {event.ceremonyType[lang]}
                        </span>
                        <h4
                          className={`text-lg md:text-xl text-[#342C26] font-medium my-1.5 group-hover:text-[#545B43] transition-colors ${
                            lang === 'ur' ? 'font-nastaliq leading-loose' : 'font-serif'
                          }`}
                        >
                          {event.title[lang]}
                        </h4>

                        <div className="space-y-1.5 text-xs text-[#8A8074] mt-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#B5965A] shrink-0" />
                            <span>{event.formattedDate[lang]}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-[#B5965A] shrink-0" />
                            <span className="truncate">{event.venue.name[lang]}, {event.venue.city[lang]}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#B5965A]/20 flex items-center justify-between text-xs font-medium text-[#545B43]">
                        <span>{lang === 'ur' ? 'تفصیلات و دعوت نامہ' : 'View Ceremony Details'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }}
    </InvitationShell>
  );
}
