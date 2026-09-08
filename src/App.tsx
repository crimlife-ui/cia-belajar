import { useState, useEffect } from 'react';
import { useProgress } from './hooks/useProgress';
import { useAudio } from './hooks/useAudio';
import { useSpeech } from './hooks/useSpeech';
import { ChapterList } from './components/hub/ChapterList';
import { LessonView } from './components/lesson/LessonView';
import { PetRoom } from './components/mascot/PetRoom';
import { ParentGate } from './components/parent/ParentGate';
import { AnalyticsDashboard } from './components/parent/AnalyticsDashboard';
import { ScreenBreakModal } from './components/parent/ScreenBreakModal';
import { BimbelModuleView } from './components/bimbel/BimbelModuleView';
import type { Lesson } from './types';

type Screen = 'hub' | 'lesson' | 'pet-room' | 'parent-dashboard' | 'bimbel-module';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('hub');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showParentGate, setShowParentGate] = useState(false);
  const [showScreenBreak, setShowScreenBreak] = useState(false);

  const {
    progress,
    parentSettings,
    setParentSettings,
    addReward,
    recordAnswer,
    buyItem,
    equipItem,
    resetAllProgress,
  } = useProgress();

  const { playClick, playCorrect, playWrong, playCoin, playCelebration } = useAudio(
    parentSettings.soundEnabled
  );

  const { speak, stop: stopSpeech, isSpeaking } = useSpeech(parentSettings.voiceNarrationEnabled);

  // Screen Time Timer logic
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    return parentSettings.timerActive && parentSettings.dailyScreenTimeMinutes > 0
      ? parentSettings.dailyScreenTimeMinutes * 60
      : 1800;
  });

  useEffect(() => {
    if (!parentSettings.timerActive || parentSettings.dailyScreenTimeMinutes === 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          setShowScreenBreak(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [parentSettings.timerActive, parentSettings.dailyScreenTimeMinutes]);

  const handleStartLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentScreen('lesson');
  };

  const handleFinishLesson = (stars: number, coins: number) => {
    if (activeLesson) {
      addReward(stars, coins, activeLesson.id);
    }
    setCurrentScreen('hub');
    setActiveLesson(null);
  };

  const handleUnlockMoreTime = (extraMinutes: number) => {
    setSecondsRemaining(extraMinutes * 60);
    setShowScreenBreak(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/40 to-amber-100/60 pb-12">
      {/* Screen Break Resting Modal */}
      {showScreenBreak && (
        <ScreenBreakModal
          onUnlockMoreTime={handleUnlockMoreTime}
          correctPin={parentSettings.pin}
          playClick={playClick}
        />
      )}

      {/* Parent Gate PIN Modal */}
      {showParentGate && (
        <ParentGate
          correctPin={parentSettings.pin}
          onSuccess={() => {
            setShowParentGate(false);
            setCurrentScreen('parent-dashboard');
          }}
          onClose={() => setShowParentGate(false)}
          playClick={playClick}
          playWrong={playWrong}
        />
      )}

      {/* Main View Router */}
      <main className="container mx-auto">
        {currentScreen === 'hub' && (
          <ChapterList
            progress={progress}
            onSelectLesson={handleStartLesson}
            onOpenPetRoom={() => setCurrentScreen('pet-room')}
            onOpenParentPortal={() => setShowParentGate(true)}
            onOpenBimbelModule={() => setCurrentScreen('bimbel-module')}
            playClick={playClick}
            equipped={progress.equippedAccessories}
            screenTimeRemaining={
              parentSettings.timerActive && parentSettings.dailyScreenTimeMinutes > 0
                ? secondsRemaining
                : undefined
            }
          />
        )}

        {currentScreen === 'lesson' && activeLesson && (
          <LessonView
            lesson={activeLesson}
            onFinishLesson={handleFinishLesson}
            onExit={() => {
              stopSpeech();
              setCurrentScreen('hub');
              setActiveLesson(null);
            }}
            playClick={playClick}
            playCorrect={playCorrect}
            playWrong={playWrong}
            playCelebration={playCelebration}
            playCoin={playCoin}
            speak={speak}
            stopSpeech={stopSpeech}
            isSpeaking={isSpeaking}
            equipped={progress.equippedAccessories}
            recordAnswer={recordAnswer}
          />
        )}

        {currentScreen === 'pet-room' && (
          <PetRoom
            coins={progress.coins}
            unlockedItems={progress.unlockedItems}
            equipped={progress.equippedAccessories}
            onBuyItem={buyItem}
            onEquipItem={equipItem}
            onBack={() => setCurrentScreen('hub')}
            playClick={playClick}
            playCoin={playCoin}
          />
        )}

        {currentScreen === 'parent-dashboard' && (
          <AnalyticsDashboard
            progress={progress}
            settings={parentSettings}
            onUpdateSettings={setParentSettings}
            onResetProgress={resetAllProgress}
            onBack={() => setCurrentScreen('hub')}
            playClick={playClick}
          />
        )}

        {currentScreen === 'bimbel-module' && (
          <BimbelModuleView
            onBack={() => {
              stopSpeech();
              setCurrentScreen('hub');
            }}
            onSelectLesson={handleStartLesson}
            playClick={playClick}
            speak={speak}
            stopSpeech={stopSpeech}
            isSpeaking={isSpeaking}
            equipped={progress.equippedAccessories}
          />
        )}
      </main>
    </div>
  );
}
