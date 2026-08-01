import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, ChevronRight, Lock } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onOpenLetter: () => void;
  title: string;
  message: string;
  girlfriendName: string;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onOpenLetter,
  title,
  message,
  girlfriendName
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
          {/* Simulated Lockscreen / Phone Header */}
          <div className="absolute top-6 flex items-center gap-2 text-rose-200/80 text-xs tracking-widest uppercase font-mono">
            <Lock className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Encrypted Love Note • Just for {girlfriendName}</span>
          </div>

          <motion.div
            initial={{ scale: 0.85, y: -40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-b from-rose-950/90 via-pink-950/95 to-slate-950/95 p-6 shadow-2xl shadow-rose-950/80 border border-rose-500/30 backdrop-blur-xl relative group"
          >
            {/* Glow Orbs */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Notification App Header */}
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-lg shadow-rose-500/40">
                  <Heart className="w-4 h-4 fill-white animate-bounce" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-rose-200 tracking-wide uppercase">Forever Heart</h4>
                  <p className="text-[10px] text-rose-300/60">Just now</p>
                </div>
              </div>

              <span className="flex items-center gap-1 text-[11px] font-medium text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Priority
              </span>
            </div>

            {/* Main Message Body */}
            <div className="space-y-3 mb-6">
              <h3 className="text-xl font-serif text-rose-100 font-bold leading-tight">
                {title}
              </h3>
              <p className="text-sm text-rose-200/90 leading-relaxed font-sans bg-rose-900/20 p-3.5 rounded-2xl border border-rose-500/15">
                "{message}"
              </p>
            </div>

            {/* Action Touch Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenLetter}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-400 hover:to-pink-500 text-white font-medium text-sm shadow-xl shadow-rose-600/40 flex items-center justify-between group transition-all border border-rose-300/30 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                </div>
                <span className="tracking-wide">Touch to Open Romantic Letter</span>
              </div>
              <ChevronRight className="w-5 h-5 text-rose-100 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
