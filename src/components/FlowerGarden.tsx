import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlowerNote } from '../types';
import { Sparkles, Heart, X, Lock } from 'lucide-react';

interface FlowerGardenProps {
  flowers: FlowerNote[];
  onTriggerHeartBurst: () => void;
}

export const FlowerGarden: React.FC<FlowerGardenProps> = ({ flowers, onTriggerHeartBurst }) => {
  const [selectedFlower, setSelectedFlower] = useState<FlowerNote | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  const handleFlowerClick = (flower: FlowerNote) => {
    setUnlockedIds(prev => new Set(prev).add(flower.id));
    setSelectedFlower(flower);
    onTriggerHeartBurst();
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-10 px-4">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs tracking-wider uppercase font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Interactive Flower Garden</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-100">
          Tap Each Flower for Sweet Notes
        </h2>
        <p className="text-xs sm:text-sm text-rose-200/70 max-w-md mx-auto">
          Every flower holds a secret reason why you mean the world to me.
        </p>

        {/* Counter Pill */}
        <div className="pt-2">
          <span className="text-xs font-medium text-pink-300 bg-pink-950/60 px-3 py-1 rounded-full border border-pink-500/30">
            Unlocked {unlockedIds.size} / {flowers.length} Flowers 🌸
          </span>
        </div>
      </div>

      {/* Flower Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {flowers.map((flower, idx) => {
          const isUnlocked = unlockedIds.has(flower.id);

          return (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlowerClick(flower)}
              className="relative rounded-3xl p-5 bg-gradient-to-b from-rose-900/30 via-slate-900/60 to-rose-950/80 border border-rose-500/20 hover:border-rose-400/50 backdrop-blur-md flex flex-col items-center justify-between text-center cursor-pointer group shadow-xl transition-all h-48"
            >
              {/* Flower Icon Glow Circle */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner transition-transform group-hover:rotate-12 group-hover:scale-110"
                style={{ backgroundColor: `${flower.color}20`, border: `1px solid ${flower.color}40` }}
              >
                <span>{flower.icon}</span>
              </div>

              {/* Title & Status */}
              <div className="mt-3">
                <h4 className="text-sm font-semibold text-rose-100 group-hover:text-pink-300 transition">
                  {flower.name}
                </h4>
                <p className="text-[11px] text-rose-300/60 mt-0.5 line-clamp-1">
                  {flower.title}
                </p>
              </div>

              {/* Action Badge */}
              <div className="mt-2 text-[10px] font-medium tracking-wide text-rose-300/80 flex items-center gap-1 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>{isUnlocked ? "Read Again" : "Tap to Bloom"}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Flower Secret Message Modal */}
      <AnimatePresence>
        {selectedFlower && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedFlower(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl bg-gradient-to-b from-rose-950 via-slate-950 to-pink-950 p-6 sm:p-8 border border-rose-500/40 shadow-2xl relative text-rose-100"
            >
              {/* Close Icon */}
              <button
                onClick={() => setSelectedFlower(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-rose-900/40 text-rose-300 hover:text-white hover:bg-rose-800/60 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col items-center text-center space-y-3 mb-6">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl shadow-lg border"
                  style={{ backgroundColor: `${selectedFlower.color}25`, borderColor: `${selectedFlower.color}50` }}
                >
                  <span>{selectedFlower.icon}</span>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-rose-400 font-medium">Sweet Love Note</span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-rose-100 mt-1">
                    {selectedFlower.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body Text */}
              <div className="bg-rose-900/20 p-5 rounded-2xl border border-rose-500/20 text-rose-200/90 text-sm sm:text-base leading-relaxed font-serif italic text-center mb-6">
                "{selectedFlower.message}"
              </div>

              {/* Bottom Heart Action */}
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onTriggerHeartBurst();
                    setSelectedFlower(null);
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Send Love Petals 💖</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
