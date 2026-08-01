import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ROMANTIC_REASONS } from '../data/defaultContent';
import { Clock, Heart, Sparkles, Calendar } from 'lucide-react';

interface JourneyCounterProps {
  anniversaryDate: string; // e.g., "2026-07-20T04:00:00"
  girlfriendName: string;
  reasons?: string[];
  onTriggerHeartBurst: () => void;
}

export const JourneyCounter: React.FC<JourneyCounterProps> = ({
  anniversaryDate,
  girlfriendName,
  reasons = ROMANTIC_REASONS,
  onTriggerHeartBurst
}) => {
  const [randomReason, setRandomReason] = useState<string | null>(null);

  // Time Together Counter State
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(anniversaryDate || "2026-07-20T04:00:00").getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - targetTime);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  const drawRandomReason = () => {
    const reasonList = reasons && reasons.length > 0 ? reasons : ROMANTIC_REASONS;
    const random = reasonList[Math.floor(Math.random() * reasonList.length)];
    setRandomReason(random);
    onTriggerHeartBurst();
  };

  // Format date readable
  const startDateFormatted = new Date(anniversaryDate || "2026-07-20T04:00:00").toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const activeReasonList = reasons && reasons.length > 0 ? reasons : ROMANTIC_REASONS;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4 space-y-8">
      {/* 1. Relationship Live Counter Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-rose-950/90 via-pink-950/80 to-amber-950/90 border border-rose-500/30 backdrop-blur-2xl shadow-2xl text-center space-y-6 relative overflow-hidden"
      >
        {/* Glow ambient circle */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs tracking-wider uppercase font-semibold">
          <Clock className="w-3.5 h-3.5 text-rose-400" />
          <span>Our Journey Together</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-rose-100">
            Loving You Every Single Second
          </h3>
          <p className="text-xs sm:text-sm text-rose-300/70 font-sans flex items-center justify-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-rose-400" />
            <span>Counting since {startDateFormatted}</span>
          </p>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-2xl mx-auto pt-2">
          <div className="bg-rose-950/40 p-4 sm:p-5 rounded-2xl border border-rose-500/25 shadow-inner">
            <span className="block text-3xl sm:text-5xl font-serif font-bold text-rose-200">{timeTogether.days}</span>
            <span className="text-xs text-rose-300/70 uppercase tracking-widest font-sans mt-1 block">Days</span>
          </div>
          <div className="bg-rose-950/40 p-4 sm:p-5 rounded-2xl border border-rose-500/25 shadow-inner">
            <span className="block text-3xl sm:text-5xl font-serif font-bold text-pink-200">{timeTogether.hours}</span>
            <span className="text-xs text-pink-300/70 uppercase tracking-widest font-sans mt-1 block">Hours</span>
          </div>
          <div className="bg-rose-950/40 p-4 sm:p-5 rounded-2xl border border-rose-500/25 shadow-inner">
            <span className="block text-3xl sm:text-5xl font-serif font-bold text-amber-200">{timeTogether.minutes}</span>
            <span className="text-xs text-amber-300/70 uppercase tracking-widest font-sans mt-1 block">Minutes</span>
          </div>
          <div className="bg-rose-950/40 p-4 sm:p-5 rounded-2xl border border-rose-500/25 shadow-inner">
            <span className="block text-3xl sm:text-5xl font-serif font-bold text-rose-400 animate-pulse">{timeTogether.seconds}</span>
            <span className="text-xs text-rose-400/80 uppercase tracking-widest font-sans mt-1 block">Seconds</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Reason Jar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-950 via-rose-950/40 to-slate-950 border border-rose-500/20 text-center space-y-4 relative"
      >
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 mx-auto flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/10">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-serif font-bold text-rose-100">
            Jar of Reasons Why I Love You
          </h3>
          <p className="text-xs text-rose-300/60 font-serif">
            Heartfelt love notes for {girlfriendName}
          </p>
        </div>
        
        {randomReason && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-5 rounded-2xl bg-rose-900/30 border border-rose-500/30 text-rose-100 font-serif italic max-w-lg mx-auto text-base sm:text-lg shadow-inner"
          >
            "{randomReason}"
          </motion.div>
        )}

        <div className="flex items-center justify-center pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={drawRandomReason}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Pick a Reason for {girlfriendName} 💌</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
