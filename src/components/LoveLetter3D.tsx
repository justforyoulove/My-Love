import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Feather, Volume2, RotateCcw, Copy, Check } from 'lucide-react';

interface LoveLetter3DProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  content: string;
  girlfriendName: string;
  boyfriendName: string;
  onTriggerHeartBurst: () => void;
}

export const LoveLetter3D: React.FC<LoveLetter3DProps> = ({
  isOpen,
  title,
  subtitle,
  content,
  girlfriendName,
  boyfriendName,
  onTriggerHeartBurst
}) => {
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOpenEnvelope = () => {
    setIsSealBroken(true);
    onTriggerHeartBurst();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${title}\n\n${content}\n\n${boyfriendName}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      {/* Container with 3D Perspective */}
      <div className="perspective-1000 relative">
        <AnimatePresence mode="wait">
          {!isSealBroken ? (
            /* Closed 3D Wax-Sealed Envelope */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.9, rotateX: 15, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.95, rotateX: -20, opacity: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-w-md mx-auto rounded-3xl bg-gradient-to-br from-amber-100 via-rose-100 to-amber-200 p-8 shadow-2xl border-4 border-amber-300/60 flex flex-col items-center justify-between cursor-pointer group hover:shadow-rose-500/30 transition-all transform hover:-translate-y-2"
              onClick={handleOpenEnvelope}
            >
              {/* Envelope Flap Overlay */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-rose-200/90 to-amber-100/40 rounded-t-3xl border-b border-rose-300/40 clip-triangle shadow-sm" />

              {/* Top Stamp / Label */}
              <div className="z-10 flex items-center justify-between w-full border-b border-rose-900/10 pb-3">
                <div className="flex items-center gap-1.5 text-xs font-serif italic text-rose-900/70">
                  <Feather className="w-4 h-4 text-rose-700" />
                  <span>Personal & Confidential</span>
                </div>
                <div className="w-10 h-12 bg-rose-900/10 rounded border border-rose-800/30 p-1 flex flex-col items-center justify-center text-[10px] text-rose-950 font-serif">
                  <Heart className="w-3.5 h-3.5 text-rose-700 fill-rose-700 mb-0.5" />
                  <span>LOVE</span>
                </div>
              </div>

              {/* Envelope Center Address */}
              <div className="z-10 text-center my-auto space-y-1">
                <p className="text-xs uppercase tracking-widest text-rose-800/60 font-semibold">For My Dearest</p>
                <h3 className="text-2xl sm:text-3xl font-serif text-rose-950 font-bold tracking-wide">
                  {girlfriendName}
                </h3>
                <p className="text-xs italic text-rose-700/80 font-serif">With endless love from {boyfriendName}</p>
              </div>

              {/* Wax Seal Center Button */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="z-20 -mb-4 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 shadow-xl shadow-rose-900/50 border-2 border-amber-200 flex flex-col items-center justify-center text-white cursor-pointer"
              >
                <Heart className="w-7 h-7 fill-amber-100 text-amber-100 animate-pulse" />
                <span className="text-[9px] tracking-wider uppercase font-semibold text-amber-200 -mt-0.5">TAP SEAL</span>
              </motion.div>
            </motion.div>
          ) : (
            /* Opened Long Romantic Letter */
            <motion.div
              key="opened-letter"
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="relative w-full rounded-3xl bg-gradient-to-b from-amber-50/95 via-rose-50/90 to-amber-100/95 p-6 sm:p-10 shadow-2xl border border-amber-200/80 text-rose-950 shadow-rose-900/20 backdrop-blur-xl"
            >
              {/* Decorative Header */}
              <div className="flex items-center justify-between pb-6 border-b border-rose-900/15 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-rose-500/15 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest font-semibold text-rose-800/70">{subtitle}</span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-rose-950">{title}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-rose-900/5 hover:bg-rose-900/10 text-rose-800 transition"
                    title="Copy letter text"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSealBroken(false)}
                    className="p-2 rounded-xl bg-rose-900/5 hover:bg-rose-900/10 text-rose-800 transition"
                    title="Fold envelope"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Letter Paragraph Content */}
              <div className="prose prose-rose max-w-none text-rose-900/90 font-serif text-base sm:text-lg leading-relaxed whitespace-pre-wrap space-y-4 my-6 italic border-l-2 border-rose-400/40 pl-4 sm:pl-6">
                {content}
              </div>

              {/* Sender Sign Off */}
              <div className="pt-6 border-t border-rose-900/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-rose-800/60 uppercase tracking-widest">Forever Yours,</p>
                  <p className="text-xl font-serif font-bold text-rose-950 mt-1">{boyfriendName}</p>
                </div>

                {/* Heart Burst Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onTriggerHeartBurst}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Fill Screen With Hearts 💕</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
