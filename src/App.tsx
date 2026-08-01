import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AppCustomization, QuizQuestion } from './types';
import { DEFAULT_CUSTOMIZATION } from './data/defaultContent';
import { HeartCanvas } from './components/HeartCanvas';
import { NotificationModal } from './components/NotificationModal';
import { LoveLetter3D } from './components/LoveLetter3D';
import { FlowerGarden } from './components/FlowerGarden';
import { JourneyCounter } from './components/JourneyCounter';
import { LoveQuiz } from './components/LoveQuiz';
import { MusicPlayer } from './components/MusicPlayer';
import { romanticAudio } from './utils/audioSynth';
import { Heart, Sparkles, Gift } from 'lucide-react';

export default function App() {
  const [customization, setCustomization] = useState<AppCustomization>(() => {
    const saved = localStorage.getItem('girlfriend_day_customization');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CUSTOMIZATION;
      }
    }
    return DEFAULT_CUSTOMIZATION;
  });

  const [showNotification, setShowNotification] = useState(true);
  const [triggerHeartBurst, setTriggerHeartBurst] = useState(false);

  const handleUpdateQuizQuestions = (questions: QuizQuestion[]) => {
    const updated = { ...customization, quizQuestions: questions };
    setCustomization(updated);
    localStorage.setItem('girlfriend_day_customization', JSON.stringify(updated));
  };

  const fireHeartBurst = () => {
    setTriggerHeartBurst(true);
    setTimeout(() => setTriggerHeartBurst(false), 200);
  };

  const handleNotificationClick = () => {
    setShowNotification(false);
    fireHeartBurst();
    romanticAudio.start();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-rose-100 font-sans selection:bg-rose-500 selection:text-white relative overflow-x-hidden pb-24">
      {/* 1. Fullscreen Floating Heart Particles Engine */}
      <HeartCanvas triggerBurst={triggerHeartBurst} />

      {/* 2. Top Navigation Bar */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-4 bg-slate-950/70 backdrop-blur-md border-b border-rose-500/15 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-rose-400 font-semibold block">Girlfriend's Day</span>
            <h1 className="text-sm sm:text-base font-serif font-bold text-rose-100">{customization.girlfriendName}</h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={fireHeartBurst}
            className="px-3.5 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            title="Burst hearts"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Send Hearts 💕</span>
          </motion.button>
        </div>
      </header>

      {/* 3. Initial Pop-Up Notification Modal */}
      <NotificationModal
        isOpen={showNotification}
        onOpenLetter={handleNotificationClick}
        title={customization.notificationTitle}
        message={customization.notificationMessage}
        girlfriendName={customization.girlfriendName}
      />

      {/* 4. Main Hero & Romantic Experience Container */}
      <main className="max-w-5xl mx-auto px-4 pt-6 sm:pt-10 space-y-16 relative z-20">
        {/* Banner Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs tracking-widest uppercase font-semibold"
          >
            <Gift className="w-3.5 h-3.5 text-rose-400" />
            <span>Dedicated to {customization.girlfriendName}</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-rose-100 leading-tight">
            Happy Girlfriend's Day, My Love
          </h2>

          <p className="text-sm sm:text-base text-rose-200/80 max-w-xl mx-auto font-serif italic">
            "You are the best decision I ever made, and my favorite reason to smile every day."
          </p>
        </motion.div>

        {/* 5. Interactive 3D Sealed Love Letter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <LoveLetter3D
            isOpen={!showNotification}
            onClose={() => {}}
            title={customization.letterTitle}
            subtitle={customization.letterSubtitle}
            content={customization.letterContent}
            girlfriendName={customization.girlfriendName}
            boyfriendName={customization.boyfriendName}
            onTriggerHeartBurst={fireHeartBurst}
          />
        </motion.div>

        {/* 6. Interactive Relationship Live Counter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <JourneyCounter
            anniversaryDate={customization.anniversaryDate}
            girlfriendName={customization.girlfriendName}
            reasons={customization.reasons}
            onTriggerHeartBurst={fireHeartBurst}
          />
        </motion.div>

        {/* 7. Relationship Love Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <LoveQuiz
            questions={customization.quizQuestions || []}
            girlfriendName={customization.girlfriendName}
            boyfriendName={customization.boyfriendName}
            onTriggerHeartBurst={fireHeartBurst}
            onUpdateQuestions={handleUpdateQuizQuestions}
          />
        </motion.div>

        {/* 8. Interactive Flower Garden */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <FlowerGarden
            flowers={customization.flowerNotes}
            onTriggerHeartBurst={fireHeartBurst}
          />
        </motion.div>
      </main>

      {/* 9. Floating Audio Music Player */}
      <MusicPlayer
        customAudioUrl={customization.customAudioUrl}
        musicPreset={customization.musicPreset}
      />

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-rose-400/50 space-y-1 font-serif">
        <p>Created with endless love by {customization.boyfriendName}</p>
        <p className="text-[10px] text-rose-500/30">Forever & Always • Girlfriend's Day Special</p>
      </footer>
    </div>
  );
}

