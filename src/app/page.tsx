'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getWeddingConfig } from '@/config/default';
import { InvitationShell } from '@/components/layout/InvitationShell';
import { IslamicIlluminatedFrame } from '@/components/svg/IslamicIlluminatedBorder';
import { BismillahCalligraphySvg } from '@/components/svg/BismillahCalligraphySvg';
import { IslamicCoverArt } from '@/components/svg/IslamicCoverArt';
import { filterEventsForTier } from '@/lib/audience';
import { Calendar, MapPin, ArrowRight, Heart } from 'lucide-react';

function HomeContent() {
  const config = getWeddingConfig();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';

  return (
    <InvitationShell config={config}>
      {(lang, guest) => {
        const { allowedOrder } = filterEventsForTier(config, guest.tier);

        return (
          <div className="w-full flex flex-col items-center">
            {/* Main Illuminated Frontispiece Frame */}
            <IslamicIlluminatedFrame className="w-full max-w-2xl my-2">
              {/* Grand Islamic Mughal Cover Art */}
              <IslamicCoverArt className="opacity-95" />

              {/* Vector Arabic Thuluth Bismillah */}
              <BismillahCalligraphySvg width="320" height="60" className="my-2" />

              {/* Personalized Guest Welcome Banner */}
              {guest.guestName && (
                <div className="my-4 mx-auto max-w-md p-3 rounded-lg bg-[#8B0000]/5 border border-[#8B0000]/20 text-center">
                  <span className="text-[10px] uppercase tracking-widest text-[#8B0000] font-bold block mb-0.5">
                    {lang === 'ur' ? 'خصوصی دعوت نامہ' : 'Personal Invitation'}
                  </span>
                  <p
                    className={`text-base md:text-lg text-[#342C26] font-medium ${
                      lang === 'ur' ? 'font-nastaliq-display leading-relaxed' : 'font-serif'
                    }`}
                  >
                    {lang === 'ur'
                      ? `بخدمتِ محترم: ${guest.guestName} و اہلِ خانہ`
                      : `Specially Invited: ${guest.guestName} & Family`}
                  </p>
                </div>
              )}

              {/* Host Invitation Lines */}
              <div className="text-center my-6 space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-[#B5965A] font-semibold">
                  {config.invitationIntro.hostsLine[lang]}
                </p>

                <p
                  className={`text-sm md:text-base text-[#8A8074] max-w-md mx-auto ${
                    lang === 'ur' ? 'font-nastaliq-body leading-loose text-base' : 'font-light leading-relaxed'
                  }`}
                >
                  {config.invitationIntro.greetingLine[lang]}
                </p>
              </div>

              {/* Couple Presentation with Calligraphic Contrast */}
              <div className="my-8 text-center border-y border-[#B5965A]/25 py-8 space-y-5">
                {/* Groom */}
                <div>
                  <h2
                    className={`text-3xl md:text-5xl text-[#342C26] font-normal ${
                      lang === 'ur' ? 'font-nastaliq-display text-4xl md:text-5xl text-[#5E0C12]' : 'font-serif'
                    }`}
                  >
                    {config.couple.groom.fullName[lang]}
                  </h2>
                  <p
                    className={`text-xs md:text-sm text-[#8A8074] mt-1 ${
                      lang === 'ur' ? 'font-nastaliq-body' : ''
                    }`}
                  >
                    {lang === 'ur'
                      ? `فرزندِ ارجمند ${config.couple.groom.parents[lang]}`
                      : `Son of ${config.couple.groom.parents[lang]}`}
                  </p>
                </div>

                {/* Decorative Floral Nexus */}
                <div className="flex items-center justify-center gap-3 text-[#B5965A]">
                  <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#B5965A]/60" />
                  <Heart className="w-4 h-4 text-[#8B0000] fill-[#8B0000]/20" />
                  <span
                    className={`italic text-xl md:text-2xl ${
                      lang === 'ur' ? 'font-nastaliq-display text-[#8B0000]' : 'font-serif'
                    }`}
                  >
                    {lang === 'ur' ? 'اور' : '&'}
                  </span>
                  <Heart className="w-4 h-4 text-[#8B0000] fill-[#8B0000]/20" />
                  <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#B5965A]/60" />
                </div>

                {/* Bride */}
                <div>
                  <h2
                    className={`text-3xl md:text-5xl text-[#342C26] font-normal ${
                      lang === 'ur' ? 'font-nastaliq-display text-4xl md:text-5xl text-[#5E0C12]' : 'font-serif'
                    }`}
                  >
                    {config.couple.bride.fullName[lang]}
                  </h2>
                  <p
                    className={`text-xs md:text-sm text-[#8A8074] mt-1 ${
                      lang === 'ur' ? 'font-nastaliq-body' : ''
                    }`}
                  >
                    {lang === 'ur'
                      ? `دخترِ نیک اختر ${config.couple.bride.parents[lang]}`
                      : `Daughter of ${config.couple.bride.parents[lang]}`}
                  </p>
                </div>
              </div>

              {/* Celebration Note */}
              <p
                className={`text-xs md:text-sm text-[#8A8074] text-center max-w-md mx-auto my-4 ${
                  lang === 'ur' ? 'font-nastaliq-body leading-loose text-sm' : 'font-light leading-relaxed'
                }`}
              >
                {config.invitationIntro.celebrationLine[lang]}
              </p>
            </IslamicIlluminatedFrame>

            {/* Target-Specific Event Cards Section */}
            <div className="w-full max-w-2xl mt-8 mb-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-10 h-[1px] bg-[#B5965A]/40" />
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#8A8074] font-medium">
                  {lang === 'ur' ? 'آپ کے لیے مخصوص تقاریب' : 'Your Invited Celebrations'}
                </h3>
                <span className="w-10 h-[1px] bg-[#B5965A]/40" />
              </div>

              <div className={`grid gap-4 ${allowedOrder.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {allowedOrder.map((eventId) => {
                  const event = config.events[eventId];
                  if (!event) return null;

                  return (
                    <Link
                      key={event.id}
                      href={`/${event.slug}${queryString}`}
                      className="group p-6 rounded-lg border border-[#B5965A]/35 bg-[#EFE8DA]/50 hover:bg-[#EFE8DA]/90 hover:border-[#8B0000] transition-all shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B0000] font-bold block mb-1">
                          {event.ceremonyType[lang]}
                        </span>
                        <h4
                          className={`text-xl md:text-2xl text-[#342C26] font-medium my-1 group-hover:text-[#8B0000] transition-colors ${
                            lang === 'ur' ? 'font-nastaliq-display leading-relaxed' : 'font-serif'
                          }`}
                        >
                          {event.title[lang]}
                        </h4>

                        <div className="space-y-2 text-xs text-[#8A8074] mt-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#B5965A] shrink-0" />
                            <span className={lang === 'ur' ? 'font-nastaliq-body' : ''}>
                              {event.formattedDate[lang]}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#B5965A] shrink-0" />
                            <span className={`truncate ${lang === 'ur' ? 'font-nastaliq-body' : ''}`}>
                              {event.venue.name[lang]}, {event.venue.city[lang]}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#B5965A]/20 flex items-center justify-between text-xs font-medium text-[#545B43]">
                        <span className={lang === 'ur' ? 'font-nastaliq-body' : ''}>
                          {lang === 'ur' ? 'تفصیلات، وقت اور مقام کا نقشہ ↗' : 'View Schedule & Directions ↗'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1 text-[#8B0000]" />
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

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F5EE]" />}>
      <HomeContent />
    </Suspense>
  );
}
