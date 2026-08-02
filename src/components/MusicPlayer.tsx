import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { romanticAudio } from '../utils/audioSynth';
import { Volume2, VolumeX, Disc, Play, Pause } from 'lucide-react';

interface MusicPlayerProps {
  customAudioUrl?: string;
  musicPreset: 'soothing_piano' | 'gentle_acoustic' | 'romantic_strings' | 'custom';
}

const DEFAULT_BGM_URL = "/lolhi.mp3";

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  customAudioUrl,
  musicPreset
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSrc = customAudioUrl || DEFAULT_BGM_URL;

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        romanticAudio.stop();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Fallback to Web Audio synthesizer if audio element streaming is blocked
            const active = romanticAudio.toggle();
            setIsPlaying(active);
          });
      }
    } else {
      const active = romanticAudio.toggle();
      setIsPlaying(active);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (isMuted) {
      romanticAudio.setVolume(0.5);
      setIsMuted(false);
    } else {
      romanticAudio.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {/* Floating Vinyl Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleMusic}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-slate-900/90 via-rose-950/90 to-slate-900/90 border border-rose-500/30 text-rose-100 shadow-xl backdrop-blur-xl group cursor-pointer"
      >
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-md"
        >
          <Disc className="w-4 h-4" />
        </motion.div>

        <div className="text-left hidden sm:block pr-1">
          <p className="text-[11px] font-semibold tracking-wide text-rose-200">Romantic BGM 🎵</p>
          <p className="text-[9px] text-rose-300/60">{isPlaying ? "Now Playing" : "Tap to Play Music"}</p>
        </div>

        {isPlaying ? <Pause className="w-3.5 h-3.5 text-rose-300" /> : <Play className="w-3.5 h-3.5 text-rose-300" />}
      </motion.button>

      {/* Mute Button */}
      {isPlaying && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          className="p-2.5 rounded-full bg-slate-900/90 border border-rose-500/30 text-rose-300 hover:text-white backdrop-blur-xl transition cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </motion.button>
      )}
    </div>
  );
};
