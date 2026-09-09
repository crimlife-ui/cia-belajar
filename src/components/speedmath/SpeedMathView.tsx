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
            {activeModule.tricks.map((trick, tIdx) => (
              <div
                key={trick.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border-4 border-slate-200 hover:border-amber-300 shadow-lg transition-all space-y-4"
              >
                {/* Trick Header */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center">
                      {tIdx + 1}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">{trick.title}</h3>
                  </div>
                  <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    {trick.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-extrabold text-amber-800 bg-amber-50 p-3 rounded-2xl border border-amber-200">
                  💡 {trick.tagline}
                </p>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {trick.explanation}
                </p>

                {/* Formula Box */}
                <div className="bg-slate-900 text-amber-300 font-black text-xs sm:text-sm p-3.5 rounded-2xl shadow-inner font-mono">
                  {trick.formula}
                </div>

                {/* Cara Biasa vs Cara Cepat (Perbandingan Nyata) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200">
                    <span className="text-[11px] font-black uppercase text-rose-700 block mb-1">
                      🐢 Cara Biasa (Lama):
                    </span>
                    <p className="text-xs text-rose-950 font-bold leading-relaxed">
                      {trick.exampleProblem.normalWay}
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300">
                    <span className="text-[11px] font-black uppercase text-emerald-700 block mb-1">
                      ⚡ Cara Cepat (Super Kilat):
                    </span>
                    <p className="text-xs text-emerald-950 font-black leading-relaxed">
                      {trick.exampleProblem.speedTrickWay}
                    </p>
                  </div>
                </div>

                {/* Step-by-step breakdown */}
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200">
                  <h4 className="text-xs font-black uppercase text-sky-900 tracking-wider mb-2">
                    Langkah Pengerjaan di Kepala:
                  </h4>
                  <div className="space-y-1.5 pl-2 border-l-2 border-sky-300">
                    {trick.exampleProblem.stepExplanation.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="text-xs text-slate-700 font-medium flex items-start gap-2"
                      >
                        <span className="text-sky-600 font-black">✓</span>
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practice prompt */}
                <div className="p-3 bg-amber-100/70 border border-amber-300 rounded-2xl text-xs font-bold text-amber-950">
                  🎯 <strong>Tantangan Coba:</strong> {trick.practicePrompt}
                </div>
              </div>
            ))}
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
