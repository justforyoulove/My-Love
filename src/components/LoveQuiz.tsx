import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, Heart, RefreshCw, HelpCircle, Trophy } from 'lucide-react';

interface LoveQuizProps {
  questions: QuizQuestion[];
  girlfriendName: string;
  boyfriendName: string;
  onTriggerHeartBurst: () => void;
  onUpdateQuestions?: (updated: QuizQuestion[]) => void;
}

export const LoveQuiz: React.FC<LoveQuizProps> = ({
  questions,
  girlfriendName,
  boyfriendName,
  onTriggerHeartBurst
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
      onTriggerHeartBurst();
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      onTriggerHeartBurst();
      // Continuous burst celebration for completing
      setTimeout(onTriggerHeartBurst, 300);
      setTimeout(onTriggerHeartBurst, 600);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-12 px-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs tracking-wider uppercase font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>Interactive Couple Game</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-rose-100">
          The Relationship Love Quiz
        </h3>
        <p className="text-xs sm:text-sm text-rose-200/70 max-w-md mx-auto font-serif italic">
          Test how well you know our story, {girlfriendName}! Answer correctly for heart explosions 💕
        </p>
      </div>

      {/* QUIZ GAME CONTAINER */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-950 via-rose-950/30 to-slate-950 border border-rose-500/30 shadow-2xl relative overflow-hidden">
        {!isCompleted ? (
          <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between text-xs text-rose-300 font-semibold border-b border-rose-500/20 pb-3">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-amber-300 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                Score: {score}
              </span>
            </div>

            {/* Question Text */}
            <h4 className="text-lg sm:text-xl font-serif font-bold text-rose-100 leading-snug">
              {currentQ.question}
            </h4>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyle = "bg-slate-900/90 border-rose-500/20 text-rose-100 hover:bg-rose-900/30 hover:border-rose-500/40";
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 font-semibold shadow-lg shadow-emerald-950/50";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200 line-through opacity-70";
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="flex-1">{opt}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Answer Feedback / Explanation */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm font-serif space-y-2 ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                  }`}
                >
                  <p className="font-bold flex items-center gap-1.5">
                    {selectedOption === currentQ.correctIndex ? (
                      <>🎉 Correct! ❤️</>
                    ) : (
                      <>💕 Close! The sweet answer was:</>
                    )}
                  </p>
                  <p>{currentQ.explanation}</p>

                  <div className="pt-2 text-right">
                    <button
                      onClick={handleNextQuestion}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold text-xs shadow-md shadow-pink-600/30 cursor-pointer"
                    >
                      {currentIdx + 1 < questions.length ? "Next Question 💕" : "See Final Score 🏆"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* QUIZ COMPLETED CELEBRATION CARD */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-6 space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 mx-auto flex items-center justify-center text-white shadow-2xl shadow-rose-500/40 animate-bounce">
              <Trophy className="w-10 h-10 fill-white" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
                Official Love Certificate
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif font-bold text-rose-100">
                Congratulations, {girlfriendName}!
              </h4>
              <p className="text-sm text-rose-200/80 font-serif italic max-w-md mx-auto">
                You scored <span className="font-bold text-amber-300 text-lg">{score} / {questions.length}</span>!
                You know our love story inside and out, and you hold my entire heart forever.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-900/30 border border-rose-500/30 max-w-sm mx-auto text-xs text-rose-200 space-y-1 font-serif">
              <p className="font-bold">Signed with Eternal Devotion,</p>
              <p className="text-rose-400 font-sans">{boyfriendName} ❤️</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestartQuiz}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-semibold shadow-lg shadow-pink-600/30 inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Play Quiz Again</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

