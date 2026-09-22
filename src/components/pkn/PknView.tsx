import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  PKN_CHAPTERS,
  PKN_QUIZ_QUESTIONS,
  type PknChapter,
  type PknTopic,
  type PknQuizQuestion,
} from '../../data/pknData';
import { Mascot } from '../mascot/Mascot';
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Award,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react';

interface PknViewProps {
  onBack: () => void;
  playClick: () => void;
  playCorrect: () => void;
  playWrong: () => void;
  playCelebration: () => void;
  playCoin: () => void;
  speak: (text: string, lang?: 'id-ID' | 'en-US') => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
  equipped: { hat?: string; glasses?: string; snack?: string };
  onFinishQuizRewards?: (stars: number, coins: number) => void;
}

type PknViewMode = 'study' | 'quiz';

export const PknView: React.FC<PknViewProps> = ({
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
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [viewMode, setViewMode] = useState<PknViewMode>('study');
  const [activeAudioText, setActiveAudioText] = useState<string | null>(null);

  // Active chapter and topic
  const activeChapter: PknChapter = PKN_CHAPTERS[selectedChapterIndex] ?? PKN_CHAPTERS[0];
  const activeTopic: PknTopic = activeChapter.topics[0];

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ: PknQuizQuestion = PKN_QUIZ_QUESTIONS[currentQIndex];

  // Audio helper
  const handleSpeak = (text: string) => {
    playClick();
    if (isSpeaking && activeAudioText === text) {
      stopSpeech();
      setActiveAudioText(null);
    } else {
      setActiveAudioText(text);
      speak(text, 'id-ID');
    }
  };

  // Read question text when question index changes in quiz mode
  useEffect(() => {
    if (viewMode === 'quiz' && !isQuizCompleted) {
      setSelectedOption(null);
      setIsSubmitted(false);
      setIsCorrect(false);
      speak(currentQ.question, 'id-ID');
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
  };

  const handleSelectOption = (opt: string) => {
    if (isSubmitted && isCorrect) return;
    playClick();
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === currentQ.correctAnswer;
    setIsSubmitted(true);
    setIsCorrect(correct);

    if (correct) {
      playCorrect();
      setScore(prev => prev + 1);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
      });
      speak('Hebat sekali Cia! Jawabanmu benar.', 'id-ID');
    } else {
      playWrong();
      speak(`Kurang tepat. Jawaban yang benar adalah: ${currentQ.correctAnswer}`, 'id-ID');
    }
  };

  const handleNextQuestion = () => {
    playClick();
    stopSpeech();
    if (currentQIndex < PKN_QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Complete quiz
      setIsQuizCompleted(true);
      playCelebration();
      if (score > 0) playCoin();
      const calculatedStars = Math.min(3, Math.max(1, Math.round((score / PKN_QUIZ_QUESTIONS.length) * 3)));
      const calculatedCoins = score * 10;
      onFinishQuizRewards?.(calculatedStars, calculatedCoins);
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-slate-800 animate-pop">
      {/* Top Header Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3.5 rounded-3xl border-2 border-rose-200 shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playClick();
              stopSpeech();
              onBack();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-xs text-slate-700 btn-tactile"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Menu Utama</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="p-2 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h1 className="font-black text-base sm:text-lg text-slate-900 leading-tight">
                Pendidikan Pancasila (PKn) 🇮🇩
              </h1>
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Fase B • Kurikulum Merdeka Kelas 3 SD
              </span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => {
              playClick();
              stopSpeech();
              setViewMode('study');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              viewMode === 'study'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Materi Belajar</span>
          </button>
          <button
            onClick={handleStartQuiz}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              viewMode === 'quiz'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Kuis Tantangan ({PKN_QUIZ_QUESTIONS.length} Soal)</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          VIEW MODE: STUDY / MATERI BELAJAR
         ========================================================================= */}
      {viewMode === 'study' && (
        <div className="space-y-6">
          {/* Chapter Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {PKN_CHAPTERS.map((chap, idx) => {
              const isSelected = idx === selectedChapterIndex;
              return (
                <button
                  key={chap.id}
                  onClick={() => {
                    playClick();
                    stopSpeech();
                    setSelectedChapterIndex(idx);
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition-all btn-tactile ${
                    isSelected
                      ? `${chap.themeColor.bg} ${chap.themeColor.border} shadow-md scale-[1.02]`
                      : 'bg-white border-slate-100 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{chap.icon}</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                        isSelected ? 'bg-white text-rose-600' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      Bab {chap.chapterNumber}
                    </span>
                  </div>
                  <h4 className={`text-xs font-black line-clamp-1 ${isSelected ? chap.themeColor.text : 'text-slate-800'}`}>
                    {chap.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{chap.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Chapter Header Banner */}
          <div className="bg-gradient-to-r from-rose-500 to-red-600 rounded-3xl p-5 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold">
                <span>{activeChapter.icon}</span>
                <span>Bab {activeChapter.chapterNumber} : {activeChapter.badge}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">{activeChapter.title}</h2>
              <p className="text-xs sm:text-sm text-rose-100 font-medium max-w-xl">
                {activeChapter.subtitle}
              </p>
            </div>
            <button
              onClick={() => handleSpeak(`${activeChapter.title}. ${activeChapter.subtitle}. ${activeTopic.summary}`)}
              className="flex items-center gap-2 bg-white text-rose-600 px-4 py-2 rounded-2xl text-xs font-black shadow-sm hover:bg-rose-50 btn-tactile shrink-0"
            >
              <Volume2 className="w-4 h-4" />
              <span>Dengarkan Mimi 🗣️</span>
            </button>
          </div>

          {/* Topic Summary Card */}
          <div className="bg-white rounded-3xl p-5 border-2 border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeTopic.icon}</span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">{activeTopic.title}</h3>
              </div>
              <span className="text-xs font-black bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full">
                {activeTopic.badge}
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-medium bg-rose-50/60 p-4 rounded-2xl border border-rose-100">
              {activeTopic.summary}
            </p>

            {/* Interactive Sila Cards if available */}
            {activeTopic.interactiveCards && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>5 Lambang Sila & Pengamalan Nyata</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeTopic.interactiveCards.map((card, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-amber-50/50 border-2 border-amber-200/80 hover:border-amber-400 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black px-2 py-0.5 bg-amber-400 text-amber-950 rounded-lg">
                          {card.label}
                        </span>
                        <span className="font-bold text-xs text-slate-800">{card.symbol}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium italic">"{card.meaning}"</p>
                      <div className="text-[11px] space-y-1 pt-1 border-t border-amber-200/60">
                        <p className="text-slate-800">
                          <strong className="text-amber-800">🏫 Sekolah:</strong> {card.attitudeInSchool}
                        </p>
                        <p className="text-slate-800">
                          <strong className="text-rose-800">🏠 Rumah:</strong> {card.attitudeAtHome}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Concept Points */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>Poin Penting Pelajaran</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeTopic.keyPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{pt.icon ?? '📌'}</span>
                      <h5 className="font-black text-xs sm:text-sm text-slate-900 leading-snug">
                        {pt.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{pt.description}</p>
                    {pt.examples && pt.examples.length > 0 && (
                      <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc marker:text-rose-500">
                        {pt.examples.map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mimi Mascot Tip */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3 mt-4">
              <Mascot mood="thinking" size="sm" equipped={equipped} />
              <div className="space-y-0.5">
                <span className="text-xs font-black text-amber-900 uppercase">Pesan Sahabat Mimi 🐱</span>
                <p className="text-xs text-amber-950 font-semibold leading-relaxed">
                  {activeTopic.mimiTip}
                </p>
              </div>
            </div>

            {/* Jump to Quiz Call-to-action */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleStartQuiz}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-2xl font-black text-xs shadow-md btn-tactile"
              >
                <span>Uji Pemahaman: Kuis Pancasila ({PKN_QUIZ_QUESTIONS.length} Soal)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE: QUIZ / KUIS TANTANGAN PKN
         ========================================================================= */}
      {viewMode === 'quiz' && (
        <div className="space-y-6">
          {!isQuizCompleted ? (
            <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-rose-100 shadow-md space-y-5">
              {/* Question Progress & Top Bar */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                  {currentQ.chapterTitle}
                </span>
                <span className="text-xs font-extrabold text-slate-500">
                  Soal {currentQIndex + 1} dari {PKN_QUIZ_QUESTIONS.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / PKN_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 flex items-start justify-between gap-3">
                <p className="text-sm sm:text-base font-black text-slate-900 leading-relaxed">
                  {currentQ.question}
                </p>
                <button
                  onClick={() => handleSpeak(currentQ.question)}
                  className="p-2 rounded-xl bg-white text-rose-600 border border-rose-200 hover:bg-rose-100 btn-tactile shrink-0"
                  title="Dengarkan soal"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 gap-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  let btnStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';

                  if (isSubmitted) {
                    if (opt === currentQ.correctAnswer) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-black';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted && isCorrect}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all btn-tactile flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xs shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSubmitted && opt === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Explanation Card */}
              {isSubmitted && (
                <div
                  className={`p-4 rounded-2xl border-2 space-y-1.5 animate-pop ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wide">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Jawaban Kamu Benar! (+1 Poin) 🎉</span>
                      </>
                    ) : (
                      <>
                        <span className="text-rose-600">❌</span>
                        <span>Kurang Tepat, Jangan Menyerah!</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs font-medium leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    playClick();
                    stopSpeech();
                    setViewMode('study');
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl btn-tactile"
                >
                  Kembali ke Materi
                </button>

                {!isSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleCheckAnswer}
                    className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-xs rounded-xl shadow-sm btn-tactile"
                  >
                    Periksa Jawaban
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white font-black text-xs rounded-xl shadow-md btn-tactile flex items-center gap-1.5"
                  >
                    <span>{currentQIndex < PKN_QUIZ_QUESTIONS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Quiz Completed Score Card */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-lg text-center space-y-5 animate-pop">
              <Mascot mood="celebrating" size="md" equipped={equipped} />
              <div className="space-y-1">
                <span className="text-xs font-black text-amber-600 bg-amber-100 px-3 py-1 rounded-full uppercase">
                  Selamat Cia! Kuis PKn Selesai 🎓
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  Skor Akhir: {score} / {PKN_QUIZ_QUESTIONS.length}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  {score >= 12
                    ? 'Luar biasa cerdas! Kamu sangat memahami nilai-nilai Pancasila dan Kewarganegaraan!'
                    : score >= 8
                    ? 'Bagus sekali! Tetap rajin belajar ya agar semakin memahami pelajaran PKn.'
                    : 'Terus semangat berlatih! Baca kembali materi di atas dan coba kuis lagi.'}
                </p>
              </div>

              <div className="flex justify-center gap-6 py-2">
                <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl text-center">
                  <span className="block text-2xl font-black text-amber-600">
                    +{Math.min(3, Math.max(1, Math.round((score / PKN_QUIZ_QUESTIONS.length) * 3)))} ⭐
                  </span>
                  <span className="text-[11px] font-bold text-amber-800">Bintang Didapat</span>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-2xl text-center">
                  <span className="block text-2xl font-black text-yellow-600">+{score * 10} 🪙</span>
                  <span className="text-[11px] font-bold text-yellow-800">Koin Mimi</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={handleStartQuiz}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-xs btn-tactile"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kuis</span>
                </button>
                <button
                  onClick={() => {
                    playClick();
                    stopSpeech();
                    setViewMode('study');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black text-xs shadow-md btn-tactile"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Kembali ke Materi Belajar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
