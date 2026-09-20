import React, { useState, useEffect, useRef } from 'react';
import type { ExamQuestion, ExamCategory, DigitOption } from '../../data/examBank';
import { generateExamQuestions, EXAM_CATEGORIES, DIGIT_OPTIONS } from '../../data/examBank';
import { ScratchpadModal } from './ScratchpadModal';
import { Mascot } from '../mascot/Mascot';
import {
  ArrowLeft,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Grid,
  CheckSquare,
} from 'lucide-react';

interface ExamViewProps {
  onBack: () => void;
  playClick: () => void;
  playCorrect: () => void;
  playWrong: () => void;
  playCelebration: () => void;
  playCoin: () => void;
  speak: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
  equipped?: { hat?: string; glasses?: string; snack?: string };
  onFinishExamRewards?: (stars: number, coins: number) => void;
}

type ExamStage = 'setup' | 'in_progress' | 'completed';

const QUESTION_COUNT_PRESETS = [20, 40, 60, 80, 100];

const TIMER_PRESETS = [
  { label: 'Santai (Tanpa Batas)', value: 0 },
  { label: '30 Menit', value: 30 },
  { label: '45 Menit', value: 45 },
  { label: '60 Menit', value: 60 },
  { label: '90 Menit', value: 90 },
];

export const ExamView: React.FC<ExamViewProps> = ({
  onBack,
  playClick,
  playCorrect,
  playCelebration,
  playCoin,
  speak,
  stopSpeech,
  isSpeaking,
  equipped,
  onFinishExamRewards,
}) => {
  // Navigation / Stage state
  const [stage, setStage] = useState<ExamStage>('setup');

  // Setup options
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory>('all');
  const [selectedDigits, setSelectedDigits] = useState<DigitOption[]>([1, 2, 3, 4]);
  const [selectedCount, setSelectedCount] = useState<number>(20);
  const [selectedTimerMins, setSelectedTimerMins] = useState<number>(0);

  // Active Exam state
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [doubtful, setDoubtful] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  // Modals & Drawers
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [isGridModalOpen, setIsGridModalOpen] = useState<boolean>(false);
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState<boolean>(false);

  // Review / Completed state
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');
  const [rewardClaimed, setRewardClaimed] = useState<boolean>(false);

  const timerRef = useRef<any>(null);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stopSpeech]);

  // Toggle selected digit (multi-select, keep at least 1)
  const toggleDigit = (d: DigitOption) => {
    playClick();
    setSelectedDigits(prev => {
      if (prev.includes(d)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(item => item !== d);
      } else {
        return [...prev, d].sort((a, b) => a - b);
      }
    });
  };

  // Timer interval during exam
  useEffect(() => {
    if (stage !== 'in_progress') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);

      if (secondsRemaining !== null) {
        setSecondsRemaining(prev => {
          if (prev === null) return null;
          if (prev <= 1) {
            // Auto submit when time is up
            handleFinalSubmit();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage, secondsRemaining]);

  // Start Exam
  const handleStartExam = () => {
    playClick();
    const generated = generateExamQuestions(selectedCount, selectedCategory, selectedDigits);
    setQuestions(generated);
    setCurrentIndex(0);
    setAnswers({});
    setDoubtful({});
    setSecondsElapsed(0);
    setSecondsRemaining(selectedTimerMins > 0 ? selectedTimerMins * 60 : null);
    setRewardClaimed(false);
    setStage('in_progress');
  };

  // Select answer for current question
  const handleSelectAnswer = (option: string) => {
    playClick();
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: option,
    }));
  };

  // Toggle doubtful flag
  const handleToggleDoubtful = () => {
    playClick();
    const currentQ = questions[currentIndex];
    if (!currentQ) return;
    setDoubtful(prev => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  // Final Submit
  const handleFinalSubmit = () => {
    stopSpeech();
    setIsSubmitConfirmOpen(false);
    setIsGridModalOpen(false);
    setIsScratchpadOpen(false);

    // Calculate score
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);

    if (score >= 70) {
      playCelebration();
    } else {
      playCorrect();
    }

    // Grant rewards once
    if (!rewardClaimed) {
      const starsEarned = score >= 90 ? 3 : score >= 70 ? 2 : 1;
      const coinsEarned = Math.round(score / 2) + 20; // 20 to 70 coins
      onFinishExamRewards?.(starsEarned, coinsEarned);
      playCoin();
      setRewardClaimed(true);
    }

    setStage('completed');
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // Stats calculation
  const totalAnswered = Object.keys(answers).length;
  const totalDoubtful = Object.values(doubtful).filter(Boolean).length;
  const totalUnanswered = questions.length - totalAnswered;

  // =================== STAGE 1: SETUP SCREEN ===================
  if (stage === 'setup') {
    return (
      <div className="max-w-3xl mx-auto p-4 animate-pop text-slate-800">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              playClick();
              onBack();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-2xl border-2 border-slate-200 text-slate-700 font-extrabold hover:bg-slate-50 btn-tactile"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Menu</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <h1 className="text-lg sm:text-xl font-black text-slate-900">
              Ruang Ulangan & Try Out
            </h1>
          </div>
          <div className="w-20" />
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 text-white shadow-lg mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="inline-block bg-white/20 backdrop-blur-xs text-amber-950 font-black text-xs px-3 py-1 rounded-full mb-2">
              ⭐ Ujian Komprehensif Kelas 3 SD
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-2 drop-shadow-xs">
              Uji Kemampuan Matematikamu!
            </h2>
            <p className="text-amber-100 text-sm max-w-md font-semibold leading-relaxed">
              Pilih jumlah soal yang ingin dikerjakan (20 hingga 100 soal). Dilengkapi{' '}
              <strong>Canvas Buku Pencakar 📝</strong> untuk coret-coretan hitung susun!
            </p>
          </div>
          <div className="shrink-0 scale-90 sm:scale-100">
            <Mascot mood="happy" equipped={equipped} size="md" />
          </div>
        </div>

        {/* Configuration Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm space-y-6">
          {/* 1. Pilih Kategori Ujian Khusus */}
          <div>
            <label className="text-sm font-black text-slate-800 flex items-center justify-between mb-3">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                  1
                </span>
                Pilih Jenis / Kategori Ujian:
              </span>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {EXAM_CATEGORIES.find(c => c.id === selectedCategory)?.badge}
              </span>
            </label>

            {/* Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
              {EXAM_CATEGORIES.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all btn-tactile flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-100/70 border-amber-500 shadow-md scale-[1.02]'
                        : 'bg-slate-50 border-slate-200 hover:bg-amber-50/50 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-2xl">{cat.icon}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-slate-900 leading-snug">
                        {cat.name}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-500 block mt-0.5">
                        {cat.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Description Banner */}
            <div className="bg-amber-50/70 rounded-2xl p-3 border border-amber-200 text-xs font-semibold text-amber-900 flex items-center gap-2">
              <span className="text-lg">
                {EXAM_CATEGORIES.find(c => c.id === selectedCategory)?.icon}
              </span>
              <span>
                {EXAM_CATEGORIES.find(c => c.id === selectedCategory)?.description}
              </span>
            </div>
          </div>

          {/* 2. Pilih Rentang Digit Angka (Multi-Select) */}
          {['addition', 'subtraction', 'multiplication', 'division', 'arithmetic', 'all'].includes(selectedCategory) && (
            <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 rounded-2xl p-4 border-2 border-amber-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <label className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shadow-xs">
                    2
                  </span>
                  <span>Pilihan Rentang Digit Angka:</span>
                  <span className="text-[11px] font-bold text-amber-800 bg-white/80 px-2 py-0.5 rounded-full border border-amber-200">
                    Bisa pilih &gt; 1 digit
                  </span>
                </label>
                <div className="flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-200/70 px-2.5 py-1 rounded-xl self-start sm:self-auto">
                  <CheckSquare className="w-3.5 h-3.5 text-amber-700" />
                  <span>
                    {selectedDigits.length === 4
                      ? 'Semua Digit (1 s/d 4 Digit)'
                      : `Aktif: ${selectedDigits.map(d => `${d} Digit`).join(', ')}`}
                  </span>
                </div>
              </div>

              {/* Multi-Select Digit Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {DIGIT_OPTIONS.map(opt => {
                  const isChecked = selectedDigits.includes(opt.digit);
                  return (
                    <button
                      key={opt.digit}
                      type="button"
                      onClick={() => toggleDigit(opt.digit)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all btn-tactile relative overflow-hidden flex flex-col justify-between ${
                        isChecked
                          ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-400/50'
                          : 'bg-white/60 border-slate-200 text-slate-400 hover:bg-white hover:border-slate-300 opacity-60'
                      }`}
                    >
                      {isChecked && (
                        <div className="absolute top-2 right-2 text-amber-600">
                          <CheckSquare className="w-4 h-4 fill-amber-100" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-xl">{opt.icon}</span>
                          <span className={`text-xs font-black ${isChecked ? 'text-slate-900' : 'text-slate-500'}`}>
                            {opt.label}
                          </span>
                        </div>
                        <span className={`text-[11px] font-extrabold block ${isChecked ? 'text-amber-700' : 'text-slate-400'}`}>
                          {opt.name} ({opt.rangeText})
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 block mt-2 bg-slate-50 px-1.5 py-0.5 rounded-lg border border-slate-100">
                        {opt.example}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] font-bold text-amber-800/80 mt-2.5 flex items-center gap-1">
                <span>💡</span>
                <span>Klik pada kotak untuk mencentang atau menghapus pilihan digit yang diinginkan.</span>
              </p>
            </div>
          )}

          {/* 3. Pilih Jumlah Soal (20 - 100) */}
          <div>
            <label className="text-sm font-black text-slate-800 flex items-center justify-between mb-3">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                  {['addition', 'subtraction', 'multiplication', 'division', 'arithmetic', 'all'].includes(selectedCategory) ? '3' : '2'}
                </span>
                Pilih Jumlah Soal:
              </span>
              <span className="text-amber-600 font-extrabold text-base">
                {selectedCount} Soal
              </span>
            </label>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-5 gap-2 mb-3">
              {QUESTION_COUNT_PRESETS.map(cnt => (
                <button
                  key={cnt}
                  onClick={() => {
                    playClick();
                    setSelectedCount(cnt);
                  }}
                  className={`py-2.5 px-1 rounded-2xl text-xs sm:text-sm font-black transition-all btn-tactile ${
                    selectedCount === cnt
                      ? 'bg-amber-500 text-white shadow-md scale-105 border-2 border-amber-600'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-transparent'
                  }`}
                >
                  {cnt} Soal
                </button>
              ))}
            </div>

            {/* Custom Slider */}
            <div className="flex items-center gap-3 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-slate-500">20</span>
              <input
                type="range"
                min={20}
                max={100}
                step={5}
                value={selectedCount}
                onChange={e => setSelectedCount(Number(e.target.value))}
                className="flex-1 accent-amber-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-500">100</span>
            </div>
          </div>

          {/* Pilih Mode Waktu / Timer */}
          <div>
            <label className="text-sm font-black text-slate-800 flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs">
                {['addition', 'subtraction', 'multiplication', 'division', 'arithmetic', 'all'].includes(selectedCategory) ? '4' : '3'}
              </span>
              Pilih Batasan Waktu:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TIMER_PRESETS.map(preset => (
                <button
                  key={preset.value}
                  onClick={() => {
                    playClick();
                    setSelectedTimerMins(preset.value);
                  }}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-black text-left transition-all btn-tactile ${
                    selectedTimerMins === preset.value
                      ? 'bg-indigo-600 text-white shadow-md border-2 border-indigo-700'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-transparent'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartExam}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 btn-tactile transition-all"
          >
            <span>
              Mulai Ujian {EXAM_CATEGORIES.find(c => c.id === selectedCategory)?.name} ({selectedCount} Soal)
            </span>
            <Sparkles className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>
    );
  }

  // Current Question
  const currentQ = questions[currentIndex];
  const isDoubtful = currentQ && doubtful[currentQ.id];

  // =================== STAGE 2: IN PROGRESS (TAKING EXAM) ===================
  if (stage === 'in_progress' && currentQ) {
    return (
      <div className="max-w-4xl mx-auto p-3 sm:p-4 text-slate-800">
        {/* Floating Canvas Scratchpad Modal */}
        <ScratchpadModal
          isOpen={isScratchpadOpen}
          onClose={() => setIsScratchpadOpen(false)}
          playClick={playClick}
        />

        {/* Top Control Bar */}
        <header className="flex flex-wrap items-center justify-between gap-2.5 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border-2 border-amber-200 shadow-sm mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                setIsGridModalOpen(true);
              }}
              title="Buka Kisi-kisi Nomor Soal"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-xl font-black text-xs transition-colors"
            >
              <Grid className="w-4 h-4" />
              <span>Kisi-kisi ({currentIndex + 1}/{questions.length})</span>
            </button>

            {/* Scratchpad Trigger Button */}
            <button
              onClick={() => {
                playClick();
                setIsScratchpadOpen(true);
              }}
              title="Buka Buku Pencakar (Canvas Kertas Cakar)"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 rounded-xl font-black text-xs shadow-xs transition-all border border-amber-400 active:scale-95"
            >
              <span>📝</span>
              <span className="font-extrabold">Buku Pencakar</span>
            </button>
          </div>

          {/* Active Category Badge */}
          <div className="hidden md:flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl text-xs font-black text-amber-900 shadow-xs">
            <span>{EXAM_CATEGORIES.find(c => c.id === selectedCategory)?.icon}</span>
            <span>{EXAM_CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
          </div>

          {/* Center Timer / Elapsed */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-xl text-xs font-black text-slate-700">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {secondsRemaining !== null
                ? `Sisa: ${formatTime(secondsRemaining)}`
                : `Waktu: ${formatTime(secondsElapsed)}`}
            </span>
          </div>

          {/* Finish & Submit Button */}
          <button
            onClick={() => {
              playClick();
              setIsSubmitConfirmOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs shadow-xs transition-all btn-tactile"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kumpulkan</span>
          </button>
        </header>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
          />
        </div>

        {/* Main Question Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-amber-200 shadow-md mb-4">
          {/* Question Tag & Audio Button */}
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500 text-white font-black text-xs rounded-xl shadow-xs">
                Soal Nomor {currentIndex + 1}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                {currentQ.chapterTitle}
              </span>
              {currentQ.category && (
                <span className="text-[11px] font-black text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-200">
                  {currentQ.category}
                </span>
              )}
            </div>

            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeech();
                } else {
                  speak(currentQ.question);
                }
              }}
              title="Dengarkan Suara Pembaca Soal"
              className={`p-2 rounded-xl border flex items-center gap-1 text-xs font-bold transition-all ${
                isSpeaking
                  ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Berhenti' : 'Baca Soal'}</span>
            </button>
          </div>

          {/* Question Text */}
          <h3 className="text-base sm:text-lg font-black text-slate-900 mb-6 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const optLetter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = answers[currentQ.id] === opt;

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-amber-100/80 border-amber-500 text-amber-950 shadow-sm scale-[1.01]'
                      : 'bg-slate-50/70 border-slate-200 text-slate-800 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-white'
                        : 'bg-white border border-slate-300 text-slate-600'
                    }`}
                  >
                    {optLetter}
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Actions: Prev, Doubtful, Next */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-slate-100">
            {/* Prev Button */}
            <button
              onClick={() => {
                playClick();
                setCurrentIndex(prev => Math.max(0, prev - 1));
              }}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 px-4 py-2 bg-slate-100 text-slate-700 font-extrabold text-xs rounded-xl hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            {/* Doubtful Button */}
            <button
              onClick={handleToggleDoubtful}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all ${
                isDoubtful
                  ? 'bg-amber-400 text-amber-950 border border-amber-500 shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${isDoubtful ? 'text-amber-900' : 'text-slate-500'}`} />
              <span>{isDoubtful ? 'Ragu-ragu (Ditandai)' : 'Tandai Ragu-ragu'}</span>
            </button>

            {/* Next Button */}
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => {
                  playClick();
                  setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1));
                }}
                className="flex items-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  playClick();
                  setIsSubmitConfirmOpen(true);
                }}
                className="flex items-center gap-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors"
              >
                <span>Kumpulkan ➔</span>
              </button>
            )}
          </div>
        </div>

        {/* Question Grid Modal / Drawer */}
        {isGridModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/40 backdrop-blur-xs animate-pop">
            <div className="bg-white rounded-3xl p-5 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border-4 border-indigo-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-black text-slate-800 text-sm sm:text-base flex items-center gap-2">
                  <Grid className="w-4 h-4 text-indigo-600" />
                  <span>Kisi-kisi Navigasi Soal</span>
                </h3>
                <button
                  onClick={() => setIsGridModalOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                >
                  Tutup
                </button>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 text-xs mb-3 font-bold">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  Dijawab ({totalAnswered})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  Ragu-ragu ({totalDoubtful})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-slate-200" />
                  Belum ({totalUnanswered})
                </span>
              </div>

              {/* Grid of question numbers */}
              <div className="flex-1 overflow-y-auto grid grid-cols-5 sm:grid-cols-8 gap-2 p-1">
                {questions.map((q, idx) => {
                  const answered = answers[q.id] !== undefined;
                  const isQDouble = doubtful[q.id];
                  const isCurrent = idx === currentIndex;

                  let bgColor = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                  if (isQDouble) {
                    bgColor = 'bg-amber-400 text-amber-950 font-black';
                  } else if (answered) {
                    bgColor = 'bg-emerald-500 text-white font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        playClick();
                        setCurrentIndex(idx);
                        setIsGridModalOpen(false);
                      }}
                      className={`h-10 rounded-xl text-xs font-black flex items-center justify-center transition-all ${bgColor} ${
                        isCurrent ? 'ring-3 ring-indigo-500 scale-105 shadow-sm' : ''
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 text-center">
                <button
                  onClick={() => setIsGridModalOpen(false)}
                  className="w-full py-2 bg-indigo-600 text-white font-black text-xs rounded-xl"
                >
                  Kembali ke Soal Nomor {currentIndex + 1}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal Before Final Submit */}
        {isSubmitConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/50 backdrop-blur-xs animate-pop">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-300 text-center">
              <span className="text-4xl block mb-2">📋</span>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                Sudah Yakin Ingin Mengumpulkan?
              </h3>

              <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 text-xs font-bold text-slate-700 mb-4 space-y-1">
                <div>• Total Soal: <strong>{questions.length} Soal</strong></div>
                <div>• Sudah Dijawab: <strong className="text-emerald-700">{totalAnswered} Soal</strong></div>
                {totalDoubtful > 0 && (
                  <div className="text-amber-700">• Masih Ragu-ragu: <strong>{totalDoubtful} Soal</strong></div>
                )}
                {totalUnanswered > 0 && (
                  <div className="text-rose-700 font-extrabold">• Belum Dijawab: <strong>{totalUnanswered} Soal</strong></div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsSubmitConfirmOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs hover:bg-slate-200"
                >
                  Periksa Lagi
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm"
                >
                  Ya, Kumpulkan Sekarang!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =================== STAGE 3: COMPLETED & REVIEW SCREEN ===================
  if (stage === 'completed') {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correctCount++;
    });
    const wrongCount = totalAnswered - correctCount;
    const unansweredCount = questions.length - totalAnswered;
    const finalScore = Math.round((correctCount / questions.length) * 100);

    const filteredQuestions = questions.filter(q => {
      const isCorrect = answers[q.id] === q.correctAnswer;
      if (reviewFilter === 'wrong') return !isCorrect;
      if (reviewFilter === 'correct') return isCorrect;
      return true;
    });

    return (
      <div className="max-w-4xl mx-auto p-4 animate-pop text-slate-800">
        {/* Floating Canvas Scratchpad Modal available in review too */}
        <ScratchpadModal
          isOpen={isScratchpadOpen}
          onClose={() => setIsScratchpadOpen(false)}
          playClick={playClick}
        />

        {/* Score Card Hero */}
        <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 text-white shadow-xl mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3.5 py-1 rounded-full text-xs font-black mb-2">
            <span>{EXAM_CATEGORIES.find(c => c.id === selectedCategory)?.icon}</span>
            <span>Evaluasi: {EXAM_CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-1">
            {finalScore >= 80 ? 'Luar Biasa, Hebat Sekali! 🌟' : finalScore >= 60 ? 'Bagus Sekali, Terus Berlatih! 💪' : 'Semangat, Coba Lagi Ya! 🌈'}
          </h2>

          {/* Big Score Display */}
          <div className="my-4">
            <span className="text-6xl sm:text-7xl font-black tracking-tight drop-shadow-md">
              {finalScore}
            </span>
            <span className="text-xl font-bold text-amber-100"> / 100</span>
          </div>

          {/* Quick Stats Pills */}
          <div className="flex flex-wrap justify-center gap-2 text-xs font-extrabold max-w-md mx-auto">
            <span className="bg-emerald-500/80 px-3 py-1 rounded-full">
              ✅ Benar: {correctCount} Soal
            </span>
            <span className="bg-rose-500/80 px-3 py-1 rounded-full">
              ❌ Salah: {wrongCount} Soal
            </span>
            <span className="bg-slate-700/80 px-3 py-1 rounded-full">
              ⏱️ Waktu: {formatTime(secondsElapsed)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            onClick={() => {
              playClick();
              onBack();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-2xl border-2 border-slate-200 text-slate-700 font-extrabold hover:bg-slate-50 btn-tactile text-xs sm:text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Menu</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                setIsScratchpadOpen(true);
              }}
              title="Buka Buku Pencakar untuk Menghitung Ulang"
              className="flex items-center gap-1 px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-2xl font-black text-xs btn-tactile"
            >
              <span>📝</span>
              <span>Buku Pencakar</span>
            </button>

            <button
              onClick={() => {
                playClick();
                setStage('setup');
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-sm text-xs sm:text-sm btn-tactile"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Ulangan Lagi</span>
            </button>
          </div>
        </div>

        {/* Review & Explanations Section */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
            <h3 className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-2">
              <span>📖</span> Pembahasan Lengkap Semua Soal
            </h3>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-extrabold">
              <button
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1 rounded-xl transition-all ${
                  reviewFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua ({questions.length})
              </button>
              <button
                onClick={() => setReviewFilter('wrong')}
                className={`px-3 py-1 rounded-xl transition-all ${
                  reviewFilter === 'wrong'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-rose-600 hover:text-rose-700'
                }`}
              >
                Salah ({wrongCount + unansweredCount})
              </button>
              <button
                onClick={() => setReviewFilter('correct')}
                className={`px-3 py-1 rounded-xl transition-all ${
                  reviewFilter === 'correct'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'text-emerald-600 hover:text-emerald-700'
                }`}
              >
                Benar ({correctCount})
              </button>
            </div>
          </div>

          {/* Questions List with Explanations */}
          <div className="space-y-6">
            {filteredQuestions.map((q) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isCorrect
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                          isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                        }`}
                      >
                        {q.number}
                      </span>
                      <span className="text-xs font-extrabold text-slate-500">
                        {q.chapterTitle}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? '✅ Jawaban Benar' : '❌ Kurang Tepat'}
                    </span>
                  </div>

                  {/* Question Text */}
                  <p className="font-extrabold text-slate-800 text-sm sm:text-base mb-3">
                    {q.question}
                  </p>

                  {/* User Answer vs Correct Answer */}
                  <div className="flex flex-wrap gap-3 text-xs font-bold mb-3">
                    <div className="p-2 rounded-xl bg-white border border-slate-200">
                      Jawabanmu:{' '}
                      <span className={isCorrect ? 'text-emerald-700 font-black' : 'text-rose-600 font-black'}>
                        {userAns || '(Tidak dijawab)'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-black">
                        Kunci Jawaban: {q.correctAnswer}
                      </div>
                    )}
                  </div>

                  {/* Step-by-Step Explanation */}
                  <div className="bg-white/80 rounded-xl p-3 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <div className="font-black text-indigo-700 mb-1 flex items-center gap-1">
                      <span>💡</span>
                      <span>Pembahasan Lengkap:</span>
                    </div>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
