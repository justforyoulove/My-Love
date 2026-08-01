export interface FlowerNote {
  id: string;
  name: string;
  flowerType: 'rose' | 'tulip' | 'sunflower' | 'orchid' | 'lily' | 'cherry';
  color: string;
  icon: string;
  title: string;
  message: string;
  unlocked?: boolean;
}

export interface ScratchCardItem {
  id: string;
  title: string;
  icon: string;
  secretReward: string;
  category: 'coupon' | 'promise' | 'secret';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface AppCustomization {
  girlfriendName: string;
  boyfriendName: string;
  anniversaryDate: string; // YYYY-MM-DDTHH:mm:ss format
  notificationTitle: string;
  notificationMessage: string;
  letterTitle: string;
  letterSubtitle: string;
  letterContent: string;
  theme: 'rosegold' | 'crimson' | 'blush' | 'midnight';
  flowerNotes: FlowerNote[];
  scratchCards: ScratchCardItem[];
  quizQuestions: QuizQuestion[];
  reasons: string[];
  customAudioUrl?: string;
  musicPreset: 'soothing_piano' | 'gentle_acoustic' | 'romantic_strings' | 'custom';
}

