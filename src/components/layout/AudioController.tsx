'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingAudio } from '@/lib/audio';

export function AudioController() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMute = () => {
    const muted = weddingAudio.toggleMute();
    setIsMuted(muted);
    setIsPlaying(!muted);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      <button
        type="button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute wedding music' : 'Mute wedding music'}
        className="group flex items-center gap-2 px-3 py-2 rounded-full border border-[#B5965A]/40 bg-[#F8F5EE]/95 text-[#342C26] shadow-[0_4px_16px_rgba(52,44,38,0.12)] hover:border-[#B5965A] hover:bg-[#F8F5EE] transition-all backdrop-blur-xs cursor-pointer text-xs"
      >
        <span className="relative flex h-2 w-2">
          {!isMuted ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#545B43] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#545B43]" />
            </>
          ) : (
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8A8074]" />
          )}
        </span>

        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-[#8A8074]" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-[#545B43]" />
        )}

        <span className="text-[11px] font-medium tracking-wide text-[#545B43] hidden sm:inline">
          {isMuted ? 'Muted' : 'Ceremonial Music'}
        </span>
      </button>
    </div>
  );
}
