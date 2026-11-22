'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { weddingAudio } from '@/lib/audio';

export function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check initial state
    const state = weddingAudio.getState();
    setIsPlaying(state.isPlaying && !state.isMuted);

    const interval = setInterval(() => {
      const s = weddingAudio.getState();
      setIsPlaying(s.isPlaying && !s.isMuted);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const playing = weddingAudio.toggleMusic();
    setIsPlaying(playing);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause ceremonial music' : 'Play ceremonial music'}
        className={`group flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full border border-[#DFBF73]/60 bg-[#2C050B]/90 text-[#FFDF73] shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md hover:border-[#FFDF73] hover:scale-105 transition-all cursor-pointer ${
          isPlaying ? 'ring-2 ring-[#DFBF73]/50' : 'opacity-80'
        }`}
      >
        {/* Spinning Gold Music Disc */}
        <div
          className={`w-6 h-6 rounded-full border border-[#DFBF73] bg-gradient-to-tr from-[#8B0000] to-[#DFBF73] flex items-center justify-center shadow-inner ${
            isPlaying ? 'animate-disc-spin' : ''
          }`}
        >
          <Music className="w-3 h-3 text-[#FFDF73]" />
        </div>

        <span className="text-[11px] font-cinzel tracking-wider text-[#FFDF73] hidden sm:inline">
          {isPlaying ? 'Music Playing' : 'Play Music'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#FFDF73] animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-[#A68850]" />
        )}
      </button>
    </div>
  );
}
