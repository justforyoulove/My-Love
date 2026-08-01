import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, X, RefreshCw } from 'lucide-react';

interface SecretScratchModalProps {
  isOpen: boolean;
  onClose: () => void;
  girlfriendName: string;
  boyfriendName: string;
  onTriggerHeartBurst: () => void;
}

export const SecretScratchModal: React.FC<SecretScratchModalProps> = ({
  isOpen,
  onClose,
  girlfriendName,
  boyfriendName,
  onTriggerHeartBurst,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  // Initialize canvas when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsRevealed(false);
      setScratchPercent(0);
      setTimeout(() => {
        initCanvas();
      }, 100);
    }
  }, [isOpen]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth || 320;
    const height = canvas.offsetHeight || 220;
    canvas.width = width;
    canvas.height = height;

    // Create luxury rose-gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#f43f5e');
    grad.addColorStop(0.3, '#fb7185');
    grad.addColorStop(0.6, '#e11d48');
    grad.addColorStop(1, '#9f1239');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Add subtle shimmer dots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add instruction text on foil
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 4;
    ctx.fillText('✨ Scratch Here to Reveal Secret 💕', width / 2, height / 2 - 10);
    ctx.font = 'italic 12px serif';
    ctx.fillText('Drag your finger or mouse across!', width / 2, height / 2 + 15);
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchProgress();
  };

  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      // Sample every 16th pixel for performance
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const totalSampled = pixels.length / 16;
      const percent = Math.round((transparentPixels / totalSampled) * 100);
      setScratchPercent(percent);

      if (percent > 35 && !isRevealed) {
        setIsRevealed(true);
        onTriggerHeartBurst();
      }
    } catch (e) {
      // Ignore security/context errors
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleRevealAll = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    onTriggerHeartBurst();
  };

  const handleResetScratch = () => {
    setIsRevealed(false);
    setScratchPercent(0);
    initCanvas();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-rose-950/40 to-slate-950 border border-rose-500/40 rounded-3xl p-6 shadow-2xl overflow-hidden text-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Hidden Easter Egg Found!</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-rose-100">
              Secret Scratch Card 💌
            </h3>
            <p className="text-xs text-rose-200/70 font-serif italic">
              Scratch off the rose gold cover to reveal a secret note written just for {girlfriendName}!
            </p>
          </div>

          {/* Scratch Card Outer Box */}
          <div className="relative w-full h-56 rounded-2xl bg-gradient-to-br from-rose-950 via-slate-900 to-pink-950 border-2 border-rose-500/40 p-5 flex flex-col justify-center items-center overflow-hidden shadow-inner select-none">
            {/* Underlying Secret Message Content */}
            <div className="space-y-3 text-center px-2">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 mx-auto flex items-center justify-center text-rose-300 border border-rose-500/30 shadow-md">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
              </div>
              <p className="text-sm font-serif font-bold text-rose-100 leading-snug">
                "Out of 8 billion people on this planet, my heart chose you. You are my today, my tomorrow, and my forever."
              </p>
              <p className="text-xs font-serif italic text-rose-300/90">
                I love you more than words could ever express, AARU 💕
              </p>
              <span className="inline-block text-[10px] font-sans text-amber-300/90 font-semibold uppercase tracking-wider">
                Forever Yours, {boyfriendName}
              </span>
            </div>

            {/* Overlay Scratch Canvas */}
            {!isRevealed && (
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                className="absolute inset-0 w-full h-full cursor-crosshair rounded-2xl touch-none transition-opacity duration-500"
              />
            )}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between gap-3 text-xs">
            {!isRevealed ? (
              <>
                <span className="text-rose-300/70 font-serif">
                  Scratched: <strong className="text-rose-200">{scratchPercent}%</strong>
                </span>
                <button
                  onClick={handleRevealAll}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-rose-600/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reveal Secret</span>
                </button>
              </>
            ) : (
              <div className="w-full flex items-center justify-between">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-emerald-400" />
                  Secret Unlocked!
                </span>
                <button
                  onClick={handleResetScratch}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-200 font-semibold flex items-center gap-1.5 transition cursor-pointer border border-rose-500/30"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Scratch Again</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
