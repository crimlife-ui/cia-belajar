export type ChapterId = 'bab-1' | 'bab-2' | 'bab-3' | 'bab-4' | 'bab-5';

export type ManipulativeType = 'dienes' | 'balance' | 'ruler' | 'shape' | 'tally' | 'none';

export interface Question {
  id: string;
  text: string;
  illustration?: string;
  type: 'multiple-choice' | 'number-input' | 'interactive';
  options?: (string | number)[];
  correctAnswer: string | number;
  explanation: string;
  hint: string;
  manipulative?: ManipulativeType;
  manipulativeInitialValue?: any;
}

export interface ConceptMaterial {
  headline: string;
  storyContext: string;
  keyPoints: { title: string; explanation: string; icon?: string }[];
  funFactOrTip: string;
  sampleProblem: {
    question: string;
    stepByStepSolution: string[];
    result: string;
  };
  manipulative?: ManipulativeType;
  manipulativeInitialValue?: any;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  chapterId: ChapterId;
  material: ConceptMaterial;
  questions: Question[];
}

export interface Chapter {
  id: ChapterId;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    badge: string;
  };
  iconName: string;
  lessons: Lesson[];
}

export interface AccessoryItem {
  id: string;
  name: string;
  type: 'hat' | 'glasses' | 'snack';
  price: number;
  icon: string;
  description: string;
}

export interface UserProgress {
  stars: number;
  coins: number;
  streak: number;
  lastPlayedDate: string;
  completedLessons: Record<string, number>; // lessonId -> stars (1-3)
  accuracyStats: Record<ChapterId, { totalAnswered: number; correct: number }>;
  equippedAccessories: {
    hat?: string;
    glasses?: string;
    snack?: string;
  };
  unlockedItems: string[];
}

export interface ParentSettings {
  pin: string;
  dailyScreenTimeMinutes: number;
  soundEnabled: boolean;
  voiceNarrationEnabled: boolean;
  timerActive: boolean;
}
