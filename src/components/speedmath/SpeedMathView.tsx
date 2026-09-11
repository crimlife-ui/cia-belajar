import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  SPEED_MATH_MODULES,
  SPEED_QUIZ_QUESTIONS,
  type SpeedOperationModule,
  type SpeedQuizQuestion,
} from '../../data/speedMathData';
import { Mascot } from '../mascot/Mascot';
import {
  ArrowLeft,
  Zap,
  BookOpen,
  Volume2,
  VolumeX,
  Timer,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SpeedMathViewProps {
  onBack: () => void;
  playClick: () => void;
  playCorrect: () => void;
  playWrong: () => void;
  playCelebration: () => void;
  playCoin: () => void;
  speak: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
  equipped: { hat?: string; glasses?: string; snack?: string };
  onFinishQuizRewards?: (stars: number, coins: number) => void;
}

export const SpeedMathView: React.FC<SpeedMathViewProps> = ({
  onBack,
  playClick,
  playCorrect,
  playWrong,
  playCelebration,
  playCoin,
  speak,
  stopSpeech,
  isSpeaking,
  equipped,
  onFinishQuizRewards,
}) => {
  const [viewMode, setViewMode] = useState<'learn' | 'quiz'>('learn');

  // Learn Mode State
  const [selectedOpIndex, setSelectedOpIndex] = useState(0);
  const activeModule: SpeedOperationModule = SPEED_MATH_MODULES[selectedOpIndex];

  // Interactive Mini Practice state per trick ID
  const [miniAnswers, setMiniAnswers] = useState<Record<string, string | number>>({});
  const [miniSubmitted, setMiniSubmitted] = useState<Record<string, boolean>>({});

  // Active step tab per trick ID (defaults to step 0 if not clicked)
  const [activeStepIndex, setActiveStepIndex] = useState<Record<string, number>>({});

  // Quiz Mode State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const currentQ: SpeedQuizQuestion = SPEED_QUIZ_QUESTIONS[currentQIndex];

  // Timer effect during quiz
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (viewMode === 'quiz' && isTimerRunning && !isQuizCompleted) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [viewMode, isTimerRunning, isQuizCompleted]);

  // Read question text aloud when question changes in quiz mode
  useEffect(() => {
    if (viewMode === 'quiz' && !isQuizCompleted) {
      setSelectedOption(null);
      setIsSubmitted(false);
      setIsCorrect(false);
      speak(currentQ.question);
    }
    return () => {
      stopSpeech();
    };
  }, [viewMode, currentQIndex, isQuizCompleted]);

  const handleStartQuiz = () => {
    playClick();
    stopSpeech();
    setViewMode('quiz');
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setIsQuizCompleted(false);
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  const handleSelectOption = (opt: string | number) => {
    if (isSubmitted && isCorrect) return;
    playClick();
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const correct = String(selectedOption) === String(currentQ.correctAnswer);
    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      playCorrect();
      setScore(s => s + 1);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
      });
    } else {
      playWrong();
    }
  };

  const handleNextQuestion = () => {
    playClick();
    if (currentQIndex + 1 < SPEED_QUIZ_QUESTIONS.length) {
      setCurrentQIndex(i => i + 1);
    } else {
      // Quiz Finished!
      setIsQuizCompleted(true);
      setIsTimerRunning(false);
      playCelebration();
      playCoin();

      const stars = score >= 9 ? 3 : score >= 6 ? 2 : 1;
      const coins = stars * 15;
      if (onFinishQuizRewards) {
        onFinishQuizRewards(stars, coins);
      }

      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-5xl mx-auto p-4 text-slate-800 animate-pop">
      {/* Top Floating App Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-4 rounded-3xl border-2 border-amber-200 shadow-sm mb-6">
        <button
          onClick={() => {
            playClick();
            stopSpeech();
            onBack();
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-2xl font-extrabold text-xs text-slate-700 btn-tactile"
        >
          <ArrowLeft className="w-4 h-4" />
          Menu Utama
        </button>

        <div className="flex items-center gap-2">
          <span className="p-2 bg-amber-400 text-amber-950 rounded-2xl shadow-sm animate-pulse">
            <Zap className="w-5 h-5 fill-amber-950" />
          </span>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              Arena Hitung Cepat (Speed Math)
            </h1>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              Trik Kilat Tambah (+), Kurang (-), Kali (×), Bagi (÷)
            </span>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClick();
              stopSpeech();
              setViewMode('learn');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black transition-all btn-tactile ${
              viewMode === 'learn'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Materi Trik</span>
          </button>

          <button
            onClick={handleStartQuiz}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black transition-all btn-tactile ${
              viewMode === 'quiz'
                ? 'bg-amber-500 text-amber-950 shadow-md'
                : 'bg-amber-400 text-amber-950 hover:bg-amber-500'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Kuis 10 Soal</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          MODE 1: MATERI TRIK HITUNG CEPAT (LEARN MODE)
      ======================================================== */}
      {viewMode === 'learn' && (
        <div className="space-y-6">
          {/* 4 Operations Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SPEED_MATH_MODULES.map((mod, idx) => {
              const isSelected = selectedOpIndex === idx;
              return (
                <button
                  key={mod.operation}
                  onClick={() => {
                    playClick();
                    setSelectedOpIndex(idx);
                  }}
                  className={`p-4 rounded-3xl border-3 flex flex-col items-center text-center transition-all btn-tactile ${
                    isSelected
                      ? `${mod.themeColor.bg} ${mod.themeColor.border} ring-4 ring-amber-300 shadow-lg scale-105`
                      : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
                  }`}
                >
                  <span className="text-3xl mb-1">{mod.symbol}</span>
                  <span className="text-xs font-black text-slate-900">{mod.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Operation Hero Banner */}
          <div
            className={`rounded-3xl p-6 border-4 ${activeModule.themeColor.border} ${activeModule.themeColor.bg} shadow-md flex flex-col sm:flex-row items-center justify-between gap-4`}
          >
            <div>
              <span
                className={`text-xs font-black uppercase px-3 py-1 rounded-full ${activeModule.themeColor.badge}`}
              >
                Koleksi Trik {activeModule.title}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                {activeModule.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1 max-w-xl leading-relaxed">
                {activeModule.intro}
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center">
              <Mascot
                size="md"
                mood="happy"
                speechText="Simak triknya, lalu uji kecepatanmu di Kuis 10 Soal!"
                equipped={equipped}
              />
            </div>
          </div>

          {/* List of Tricks Cards */}
          <div className="space-y-6">
            {activeModule.tricks.map((trick, tIdx) => {
              const currentStep = activeStepIndex[trick.id] ?? 0;
              const userMiniAnswer = miniAnswers[trick.id];
              const isMiniDone = miniSubmitted[trick.id] ?? false;
              const isMiniCorrect =
                isMiniDone && String(userMiniAnswer) === String(trick.miniPractice.correctAnswer);

              return (
                <div
                  key={trick.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border-4 border-slate-200 hover:border-amber-300 shadow-lg transition-all space-y-5"
                >
                  {/* Trick Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center shadow-sm">
                        {tIdx + 1}
                      </span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                          {trick.title}
                        </h3>
                        <span className="text-[11px] font-bold text-amber-800">
                          {trick.tagline}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                        {trick.badge}
                      </span>
                      <button
                        onClick={() => {
                          playClick();
                          if (isSpeaking) {
                            stopSpeech();
                          } else {
                            speak(`${trick.title}. ${trick.childAnalogy}. ${trick.kikoHint}`);
                          }
                        }}
                        className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-all btn-tactile"
                        title="Dengarkan penjelasan suara"
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-4 h-4 text-rose-600" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Child Story / Analogy Box */}
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">🧸</span>
                    <div>
                      <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider block">
                        Cerita & Analogi Seru:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed mt-0.5">
                        {trick.childAnalogy}
                      </p>
                    </div>
                  </div>

                  {/* Kiko's Secret Whisper Tip */}
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center gap-3">
                    <span className="text-xl">🦊</span>
                    <p className="text-xs text-indigo-950 font-bold">
                      <strong>Bisikan Rahasia Kiko:</strong> "{trick.kikoHint}"
                    </p>
                  </div>

                  {/* Formula Box */}
                  <div className="bg-slate-900 text-amber-300 font-black text-xs sm:text-sm p-3.5 rounded-2xl shadow-inner font-mono tracking-wide flex items-center justify-between">
                    <span>{trick.formula}</span>
                    <span className="text-[10px] text-slate-400 font-normal">Rumus Rahasia</span>
                  </div>

                  {/* Visual Helpers (Table Teman 10, Lompat Katak, dsb.) */}
                  {trick.visualHelperType === 'friends-table' && (
                    <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                      <span className="text-xs font-black uppercase text-emerald-900 block mb-2 text-center">
                        🤝 Pasangan Sahabat Teman 10 (Hafalkan Ini ya!):
                      </span>
                      <div className="grid grid-cols-5 gap-2 text-center">
                        <div className="bg-white p-2.5 rounded-xl border border-emerald-300 shadow-sm">
                          <span className="block text-sm font-black text-emerald-700">1 + 9</span>
                          <span className="text-[10px] font-bold text-slate-500">= 10</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-emerald-300 shadow-sm">
                          <span className="block text-sm font-black text-emerald-700">2 + 8</span>
                          <span className="text-[10px] font-bold text-slate-500">= 10</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-emerald-300 shadow-sm">
                          <span className="block text-sm font-black text-emerald-700">3 + 7</span>
                          <span className="text-[10px] font-bold text-slate-500">= 10</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-emerald-300 shadow-sm">
                          <span className="block text-sm font-black text-emerald-700">4 + 6</span>
                          <span className="text-[10px] font-bold text-slate-500">= 10</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-emerald-300 shadow-sm">
                          <span className="block text-sm font-black text-emerald-700">5 + 5</span>
                          <span className="text-[10px] font-bold text-slate-500">= 10</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {trick.visualHelperType === 'number-line-jump' && (
                    <div className="p-4 bg-rose-50 rounded-2xl border-2 border-rose-200">
                      <span className="text-xs font-black uppercase text-rose-900 block mb-2 text-center">
                        🐸 Garis Lompatan Katak Kiko (48 ke 73):
                      </span>
                      <div className="flex items-center justify-between px-4 py-2 bg-white rounded-xl border border-rose-200">
                        <div className="text-center">
                          <span className="text-xs font-black text-slate-700">Batu 48</span>
                          <span className="text-[10px] block text-slate-400">Mulai</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center px-2">
                          <span className="text-xs font-black text-amber-600 animate-bounce">
                            🐸 +2 Langkah
                          </span>
                          <div className="w-full h-1 bg-amber-400 rounded-full my-1"></div>
                        </div>
                        <div className="text-center bg-amber-100 px-3 py-1 rounded-xl">
                          <span className="text-xs font-black text-amber-900">Batu Bulat 50</span>
                          <span className="text-[10px] block text-amber-700">Singgah</span>
                        </div>
                        <div className="flex-1 flex flex-col items-center px-2">
                          <span className="text-xs font-black text-emerald-600 animate-bounce">
                            🐸 +23 Langkah
                          </span>
                          <div className="w-full h-1 bg-emerald-400 rounded-full my-1"></div>
                        </div>
                        <div className="text-center bg-emerald-100 px-3 py-1 rounded-xl">
                          <span className="text-xs font-black text-emerald-900">Batu 73</span>
                          <span className="text-[10px] block text-emerald-700">Tujuan!</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {trick.visualHelperType === 'finger-trick-9' && (
                    <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-200 text-center">
                      <span className="text-xs font-black uppercase text-sky-900 block mb-1">
                        🖐️ Trik 10 Jari Sakti untuk 9 × 4:
                      </span>
                      <p className="text-xs text-slate-700 font-semibold mb-2">
                        Rentangkan 10 jari, tekuk jari ke-4 dari kiri:
                      </p>
                      <div className="inline-flex items-center gap-3 bg-white p-3 rounded-2xl border border-sky-300 shadow-sm">
                        <div className="bg-sky-100 px-3 py-1.5 rounded-xl">
                          <span className="text-lg font-black text-sky-800">3 Jari di Kiri</span>
                          <span className="text-[10px] block font-bold text-sky-600">Puluhan (30)</span>
                        </div>
                        <span className="text-xl font-black text-slate-400">+</span>
                        <div className="bg-amber-100 px-3 py-1.5 rounded-xl">
                          <span className="text-lg font-black text-amber-900">6 Jari di Kanan</span>
                          <span className="text-[10px] block font-bold text-amber-700">Satuan (6)</span>
                        </div>
                        <span className="text-xl font-black text-slate-400">=</span>
                        <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-black text-xl">
                          36!
                        </div>
                      </div>
                    </div>
                  )}

                  {trick.visualHelperType === 'split-watermelon' && (
                    <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 text-center">
                      <span className="text-xs font-black uppercase text-amber-900 block mb-1">
                        🍉 Belah Semangka Jadi Dua, Lalu Belah Lagi (Bagi 4):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-xs font-bold">
                        <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                          <span className="text-slate-500 block text-[10px]">Semangka Utuh:</span>
                          <span className="text-base font-black text-slate-800">92</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-amber-200">
                          <span className="text-slate-500 block text-[10px]">Belah 1 (Bagi 2):</span>
                          <span className="text-base font-black text-amber-700">46</span>
                        </div>
                        <div className="bg-emerald-100 p-2.5 rounded-xl border border-emerald-300">
                          <span className="text-emerald-700 block text-[10px]">Belah 2 (Bagi 2 lagi):</span>
                          <span className="text-base font-black text-emerald-800">23 ✨</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {trick.visualHelperType === 'zero-cutter' && (
                    <div className="p-4 bg-purple-50 rounded-2xl border-2 border-purple-200 text-center">
                      <span className="text-xs font-black uppercase text-purple-900 block mb-1">
                        ⚔️ Tebasan Pedang Pemotong Nol Kembar:
                      </span>
                      <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-purple-200 text-lg font-black font-mono">
                        <span className="text-purple-700">45<span className="line-through text-rose-500">0</span></span>
                        <span>÷</span>
                        <span className="text-purple-700">5<span className="line-through text-rose-500">0</span></span>
                        <span>=</span>
                        <span className="text-emerald-600">45 ÷ 5 = 9!</span>
                      </div>
                    </div>
                  )}

                  {trick.visualHelperType === 'cross-star-3digit' && (
                    <div className="p-4 bg-gradient-to-r from-purple-50 via-amber-50 to-sky-50 rounded-2xl border-2 border-purple-300">
                      <div className="text-center mb-3">
                        <span className="text-xs font-black uppercase text-purple-900 block">
                          ⭐ Formasi 5 Jurus Bintang Ninja (Edu-Vid):
                        </span>
                        <p className="text-[11px] text-slate-600 font-bold">
                          Jalankan 5 jurus berurutan dari kanan ke kiri:
                        </p>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center">
                        <div className="bg-white p-2 sm:p-2.5 rounded-xl border-2 border-emerald-300 shadow-sm flex flex-col items-center">
                          <span className="text-base sm:text-lg font-black text-emerald-600">|</span>
                          <span className="text-[10px] font-black text-slate-800 mt-1">1. Lurus Kanan</span>
                          <span className="text-[9px] text-slate-500 font-bold">Satuan × Satuan</span>
                        </div>
                        <div className="bg-white p-2 sm:p-2.5 rounded-xl border-2 border-amber-300 shadow-sm flex flex-col items-center">
                          <span className="text-base sm:text-lg font-black text-amber-600">✕</span>
                          <span className="text-[10px] font-black text-slate-800 mt-1">2. Silang 2 Dig</span>
                          <span className="text-[9px] text-slate-500 font-bold">Silang Kanan</span>
                        </div>
                        <div className="bg-white p-2 sm:p-2.5 rounded-xl border-2 border-purple-400 shadow-sm flex flex-col items-center ring-2 ring-purple-300">
                          <span className="text-base sm:text-lg font-black text-purple-600">✱</span>
                          <span className="text-[10px] font-black text-slate-800 mt-1">3. Bintang 6</span>
                          <span className="text-[9px] text-slate-500 font-bold">Ujung + Tengah</span>
                        </div>
                        <div className="bg-white p-2 sm:p-2.5 rounded-xl border-2 border-sky-300 shadow-sm flex flex-col items-center">
                          <span className="text-base sm:text-lg font-black text-sky-600">✕</span>
                          <span className="text-[10px] font-black text-slate-800 mt-1">4. Silang 2 Dig</span>
                          <span className="text-[9px] text-slate-500 font-bold">Silang Kiri</span>
                        </div>
                        <div className="bg-white p-2 sm:p-2.5 rounded-xl border-2 border-emerald-300 shadow-sm flex flex-col items-center">
                          <span className="text-base sm:text-lg font-black text-emerald-600">|</span>
                          <span className="text-[10px] font-black text-slate-800 mt-1">5. Lurus Kiri</span>
                          <span className="text-[9px] text-slate-500 font-bold">Ratusan × Ratusan</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cara Biasa vs Cara Cepat (Perbandingan Nyata) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200">
                      <span className="text-[11px] font-black uppercase text-rose-700 block mb-1">
                        🐢 Cara Biasa (Lama & Bikin Lelah):
                      </span>
                      <p className="text-xs text-rose-950 font-bold leading-relaxed">
                        {trick.exampleProblem.normalWay}
                      </p>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300">
                      <span className="text-[11px] font-black uppercase text-emerald-700 block mb-1">
                        ⚡ Trik Kilat Cia (Dalam 2-3 Detik):
                      </span>
                      <p className="text-xs text-emerald-950 font-black leading-relaxed">
                        {trick.exampleProblem.speedTrickWay}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Step-by-Step Playground */}
                  <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Langkah Berpikir di Kepala (Klik Langkahnya):</span>
                      </h4>
                      <div className="flex items-center gap-1">
                        {trick.exampleProblem.visualSteps.map((_, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => {
                              playClick();
                              setActiveStepIndex(prev => ({ ...prev, [trick.id]: sIdx }));
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-black transition-all btn-tactile ${
                              currentStep === sIdx
                                ? 'bg-amber-400 text-amber-950 shadow-sm'
                                : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            Langkah {sIdx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Step Highlight Card */}
                    {trick.exampleProblem.visualSteps[currentStep] && (
                      <div className="p-4 bg-white rounded-2xl border-2 border-amber-300 shadow-sm space-y-2 animate-pop">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                              trick.exampleProblem.visualSteps[currentStep].badgeColor ??
                              'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {trick.exampleProblem.visualSteps[currentStep].title}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            Langkah {currentStep + 1} dari{' '}
                            {trick.exampleProblem.visualSteps.length}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                          {trick.exampleProblem.visualSteps[currentStep].explanation}
                        </p>
                        <div className="p-3 bg-slate-900 text-amber-300 rounded-xl font-mono text-xs sm:text-sm font-black text-center shadow-inner">
                          {trick.exampleProblem.visualSteps[currentStep].mathVisual}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mini Interactive Practice for This Trick */}
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-emerald-50 rounded-2xl border-2 border-amber-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🎯</span>
                        <h4 className="text-xs font-black uppercase tracking-wider text-amber-950">
                          Tantangan Coba Sendiri:
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        Latihan Langsung
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-extrabold text-slate-900">
                      {trick.miniPractice.question}
                    </p>

                    <p className="text-[11px] text-amber-900 font-medium italic">
                      💡 Petunjuk: {trick.miniPractice.hint}
                    </p>

                    {/* Options Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {trick.miniPractice.options.map((opt, oIdx) => {
                        const isChosen = userMiniAnswer === opt;
                        return (
                          <button
                            key={oIdx}
                            disabled={isMiniDone && isMiniCorrect}
                            onClick={() => {
                              playClick();
                              setMiniAnswers(prev => ({ ...prev, [trick.id]: opt }));
                              setMiniSubmitted(prev => ({ ...prev, [trick.id]: false }));
                            }}
                            className={`p-2.5 rounded-xl text-xs font-black transition-all btn-tactile ${
                              isChosen
                                ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-500 shadow-md'
                                : 'bg-white text-slate-800 border border-slate-300 hover:border-amber-400'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Check Mini Button or Feedback */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      {!isMiniDone ? (
                        <button
                          disabled={userMiniAnswer === undefined}
                          onClick={() => {
                            if (userMiniAnswer === undefined) return;
                            const ok =
                              String(userMiniAnswer) ===
                              String(trick.miniPractice.correctAnswer);
                            setMiniSubmitted(prev => ({ ...prev, [trick.id]: true }));
                            if (ok) {
                              playCorrect();
                              confetti({
                                particleCount: 40,
                                spread: 50,
                                origin: { y: 0.7 },
                              });
                            } else {
                              playWrong();
                            }
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-black btn-tactile ${
                            userMiniAnswer !== undefined
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Cek Jawaban Saya
                        </button>
                      ) : (
                        <div
                          className={`flex-1 p-3 rounded-xl border flex items-center justify-between text-xs font-bold animate-pop ${
                            isMiniCorrect
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                              : 'bg-rose-100 border-rose-300 text-rose-900'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{isMiniCorrect ? '🎉 Hebat, Benar!' : '😅 Belum Pas!'}</span>
                            <span className="text-[11px] font-medium">
                              {trick.miniPractice.explanation}
                            </span>
                          </div>
                          {!isMiniCorrect && (
                            <button
                              onClick={() => {
                                playClick();
                                setMiniSubmitted(prev => ({ ...prev, [trick.id]: false }));
                              }}
                              className="text-[11px] underline font-black text-rose-800 ml-2"
                            >
                              Coba Lagi
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA to start 10 questions quiz */}
          <div className="p-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl text-center shadow-xl">
            <h3 className="text-xl font-black text-amber-950 mb-1">
              Sudah Menguasai Semua Triknya?
            </h3>
            <p className="text-xs text-amber-950 font-bold mb-4">
              Uji kecepatan berhitungmu dalam tantangan 10 soal acak!
            </p>
            <button
              onClick={handleStartQuiz}
              className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm shadow-md btn-tactile inline-flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Mulai Kuis Tantangan 10 Soal Sekarang 🚀</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          MODE 2: KUIS TANTANGAN 10 SOAL (QUIZ ARENA)
      ======================================================== */}
      {viewMode === 'quiz' && (
        <div>
          {/* Completion Screen */}
          {isQuizCompleted ? (
            <div className="max-w-md mx-auto p-4 flex flex-col items-center justify-center min-h-[70vh] text-center animate-pop text-slate-800">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-2xl w-full flex flex-col items-center">
                <span className="text-5xl animate-bounce mb-2">⚡🏆⚡</span>
                <h2 className="text-2xl font-black text-amber-900 mb-1">
                  Tantangan 10 Soal Tuntas!
                </h2>
                <p className="text-xs font-bold text-slate-600 mb-4">
                  Waktu Penyelesaian: <strong>{formatTime(timerSeconds)}</strong>
                </p>

                {/* Score Big Display */}
                <div className="w-full bg-amber-50 border-2 border-amber-200 rounded-3xl p-4 mb-5 text-center">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-800 block">
                    Skor Akhir Cia
                  </span>
                  <div className="text-4xl font-black text-emerald-600 my-1">
                    {score} <span className="text-lg text-slate-500 font-bold">/ 10</span>
                  </div>
                  <span className="text-xs font-bold text-amber-900">
                    {score === 10
                      ? '🌟 Sempurna! Kamu Master Hitung Cepat!'
                      : score >= 7
                      ? '🔥 Luar Biasa! Berhitungmu Cepat Banget!'
                      : '💪 Keren! Sering-sering latihan triknya ya!'}
                  </span>
                </div>

                <div className="my-2">
                  <Mascot
                    mood="celebrating"
                    speechText={`Hebat Cia! Selesai 10 soal dalam ${formatTime(timerSeconds)}!`}
                    equipped={equipped}
                  />
                </div>

                {/* Action Buttons */}
                <div className="w-full space-y-2 mt-4">
                  <button
                    onClick={handleStartQuiz}
                    className="w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-2xl font-black text-sm shadow-md btn-tactile flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Ulangi Tantangan (Asah Waktu)
                  </button>
                  <button
                    onClick={() => {
                      playClick();
                      setViewMode('learn');
                    }}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black text-xs btn-tactile"
                  >
                    Kembali ke Materi Trik
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Active Question Screen (1 to 10) */
            <div className="max-w-2xl mx-auto space-y-4">
              {/* Question Progress & Timer Bar */}
              <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-3xl border-2 border-slate-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-800 bg-amber-100 px-3 py-1 rounded-full">
                    Soal {currentQIndex + 1} dari 10
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                    {currentQ.operationType}
                  </span>
                </div>

                {/* Timer Stopwatch */}
                <div className="flex items-center gap-1.5 font-mono text-sm font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-2xl">
                  <Timer className="w-4 h-4" />
                  <span>{formatTime(timerSeconds)}</span>
                </div>

                {/* Narration Speaker */}
                <button
                  onClick={() => {
                    if (isSpeaking) {
                      stopSpeech();
                    } else {
                      speak(currentQ.question);
                    }
                  }}
                  className={`p-2 rounded-2xl border-2 transition-colors ${
                    isSpeaking
                      ? 'bg-amber-100 border-amber-400 text-amber-800 animate-pulse'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  title="Bacakan Soal"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Progress Bar 10 segments */}
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / 10) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl space-y-5 animate-pop">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    Tantangan Hitung Cepat
                  </span>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    Gunakan: {currentQ.mentalTrickName}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = selectedOption === opt;
                    const isOptionCorrect =
                      isSubmitted && String(opt) === String(currentQ.correctAnswer);
                    const isOptionWrong = isSubmitted && isSelected && !isCorrect;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(opt)}
                        disabled={isSubmitted && isCorrect}
                        className={`p-4 rounded-2xl font-black text-base text-left flex items-center justify-between border-3 transition-all btn-tactile ${
                          isOptionCorrect
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400 shadow-md'
                            : isOptionWrong
                            ? 'bg-rose-50 border-rose-400 text-rose-800'
                            : isSelected
                            ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-md'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300'
                        }`}
                      >
                        <span>{opt}</span>
                        {isOptionCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback */}
                {isSubmitted && (
                  <div
                    className={`p-4 rounded-2xl border-2 animate-pop ${
                      isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{isCorrect ? '⚡🎉' : '💡'}</span>
                      <h4 className="font-black text-sm">
                        {isCorrect
                          ? 'Keren, Jawaban Kilatmu Benar!'
                          : 'Belum Pas, Ini Cara Cepatnya:'}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {currentQ.stepExplanation}
                    </p>
                    <p className="text-[11px] text-amber-900 font-bold mt-1.5">
                      ⚡ Tips: {currentQ.speedTip}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-2">
                  {!isSubmitted ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={selectedOption === null}
                      className={`py-3.5 px-7 rounded-2xl font-black text-sm transition-all btn-tactile ${
                        selectedOption !== null
                          ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-md'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      }`}
                    >
                      Kunci Jawaban
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="py-3.5 px-7 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-md btn-tactile flex items-center gap-2"
                    >
                      <span>{currentQIndex + 1 === 10 ? 'Lihat Hasil Akhir' : 'Soal Selanjutnya'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
