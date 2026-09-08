import { useState, useEffect } from 'react';
import type { UserProgress, ParentSettings, ChapterId } from '../types';

const INITIAL_PROGRESS: UserProgress = {
  stars: 0,
  coins: 50, // Starting welcome coins so child can try the pet shop
  streak: 1,
  lastPlayedDate: new Date().toISOString().split('T')[0],
  completedLessons: {},
  accuracyStats: {
    'bab-1': { totalAnswered: 0, correct: 0 },
    'bab-2': { totalAnswered: 0, correct: 0 },
    'bab-3': { totalAnswered: 0, correct: 0 },
    'bab-4': { totalAnswered: 0, correct: 0 },
    'bab-5': { totalAnswered: 0, correct: 0 },
  },
  equippedAccessories: {},
  unlockedItems: ['hat-topi-koki'],
};

const INITIAL_PARENT_SETTINGS: ParentSettings = {
  pin: '1234',
  dailyScreenTimeMinutes: 30,
  soundEnabled: true,
  voiceNarrationEnabled: true,
  timerActive: false,
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('cia_math_progress');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PROGRESS;
  });

  const [parentSettings, setParentSettings] = useState<ParentSettings>(() => {
    try {
      const saved = localStorage.getItem('cia_math_parent_settings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PARENT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('cia_math_progress', JSON.stringify(progress));
    } catch {}
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem('cia_math_parent_settings', JSON.stringify(parentSettings));
    } catch {}
  }, [parentSettings]);

  // Streak check on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (progress.lastPlayedDate !== today) {
      const last = new Date(progress.lastPlayedDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));

      setProgress(prev => ({
        ...prev,
        lastPlayedDate: today,
        streak: diffDays === 1 ? prev.streak + 1 : diffDays === 0 ? prev.streak : 1,
      }));
    }
  }, []);

  const addReward = (starsToAdd: number, coinsToAdd: number, lessonId: string) => {
    setProgress(prev => {
      const currentLessonStars = prev.completedLessons[lessonId] || 0;
      const newLessonStars = Math.max(currentLessonStars, starsToAdd);
      const starDiff = newLessonStars - currentLessonStars;

      return {
        ...prev,
        stars: prev.stars + starDiff,
        coins: prev.coins + coinsToAdd,
        completedLessons: {
          ...prev.completedLessons,
          [lessonId]: newLessonStars,
        },
      };
    });
  };

  const recordAnswer = (chapterId: ChapterId, isCorrect: boolean) => {
    setProgress(prev => {
      const current = prev.accuracyStats[chapterId] || { totalAnswered: 0, correct: 0 };
      return {
        ...prev,
        accuracyStats: {
          ...prev.accuracyStats,
          [chapterId]: {
            totalAnswered: current.totalAnswered + 1,
            correct: current.correct + (isCorrect ? 1 : 0),
          },
        },
      };
    });
  };

  const buyItem = (itemId: string, price: number) => {
    if (progress.coins < price || progress.unlockedItems.includes(itemId)) return false;
    setProgress(prev => ({
      ...prev,
      coins: prev.coins - price,
      unlockedItems: [...prev.unlockedItems, itemId],
    }));
    return true;
  };

  const equipItem = (type: 'hat' | 'glasses' | 'snack', itemId?: string) => {
    setProgress(prev => ({
      ...prev,
      equippedAccessories: {
        ...prev.equippedAccessories,
        [type]: itemId,
      },
    }));
  };

  const resetAllProgress = () => {
    setProgress(INITIAL_PROGRESS);
  };

  return {
    progress,
    parentSettings,
    setParentSettings,
    addReward,
    recordAnswer,
    buyItem,
    equipItem,
    resetAllProgress,
  };
}
