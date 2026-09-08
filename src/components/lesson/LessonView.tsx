import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Lesson, Question, ChapterId } from '../../types';
import { ConceptCard } from './ConceptCard';
import { DienesBlocks } from '../manipulatives/DienesBlocks';
import { BalanceScale } from '../manipulatives/BalanceScale';
import { RulerScale } from '../manipulatives/RulerScale';
import { ShapeDetector } from '../manipulatives/ShapeDetector';
import { TallyTable } from '../manipulatives/TallyTable';
import { Mascot } from '../mascot/Mascot';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onFinishLesson: (starsEarned: number, coinsEarned: number) => void;
  onExit: () => void;
  playClick: () => void;
  playCorrect: () => void;
  playWrong: () => void;
  playCelebration: () => void;
  playCoin: () => void;
  speak: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
  equipped: { hat?: string; glasses?: string; snack?: string };
  recordAnswer: (chapterId: ChapterId, isCorrect: boolean) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onFinishLesson,
  onExit,
  playClick,
  playCorrect,
  playWrong,
  playCelebration,
  playCoin,
  speak,
  stopSpeech,
  isSpeaking,
  equipped,
  recordAnswer,
}) => {
  // 'concept' (pembahasan materi) first, then 'quiz' (latihan soal)
  const [stage, setStage] = useState<'concept' | 'quiz'>('concept');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showManipulative, setShowManipulative] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isLessonFinished, setIsLessonFinished] = useState(false);
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'thinking' | 'celebrating'>('idle');
  const [mascotSpeech, setMascotSpeech] = useState<string>('Yuk kita selesaikan soal ini bersama!');

  const question: Question = lesson.questions[currentIdx];

  // Read question automatically on load if enabled and in quiz mode
  useEffect(() => {
    if (stage !== 'quiz') return;

    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setMascotMood('idle');
    setMascotSpeech('Perhatikan soalnya baik-baik ya Cia!');

    // Read question text aloud
    speak(question.text);

    return () => {
      stopSpeech();
    };
  }, [stage, currentIdx, question?.text]);

  const handleSelectOption = (opt: string | number) => {
    if (isAnswerSubmitted && isCorrect) return; // already solved
    playClick();
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;

    const correct = String(selectedOption) === String(question.correctAnswer);
    setIsAnswerSubmitted(true);
    setIsCorrect(correct);
    recordAnswer(lesson.chapterId, correct);

    if (correct) {
      playCorrect();
      setCorrectCount(c => c + 1);
      setMascotMood('happy');
      setMascotSpeech('HEBAT BANGET! Jawaban Cia tepat sekali! 🌟');

      // Trigger Confetti Party!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
      });
    } else {
      playWrong();
      setMascotMood('thinking');
      setMascotSpeech(question.hint);
      setShowHint(true);
    }
  };

  const handleNextQuestion = () => {
    playClick();
    if (currentIdx + 1 < lesson.questions.length) {
      setCurrentIdx(i => i + 1);
    } else {
      // Completed all questions in lesson!
      setIsLessonFinished(true);
      playCelebration();

      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  };

  // Calculate stars and coins
  const totalQuestions = lesson.questions.length;
  const starsEarned = correctCount === totalQuestions ? 3 : correctCount >= Math.ceil(totalQuestions / 2) ? 2 : 1;
  const coinsEarned = starsEarned * 10;

  // Render appropriate manipulative
  const renderManipulative = () => {
    if (!question.manipulative) return null;
    switch (question.manipulative) {
      case 'dienes':
        return <DienesBlocks initialValue={question.manipulativeInitialValue} />;
      case 'balance':
        return <BalanceScale initialValue={question.manipulativeInitialValue} />;
      case 'ruler':
        return <RulerScale initialValue={question.manipulativeInitialValue} />;
      case 'shape':
        return <ShapeDetector initialValue={question.manipulativeInitialValue} />;
      case 'tally':
        return <TallyTable initialValue={question.manipulativeInitialValue} />;
      default:
        return null;
    }
  };

  // 1. CONCEPT EXPLANATION STAGE (Pembahasan Materi dulu)
  if (stage === 'concept') {
    return (
      <div className="pb-10">
        <div className="max-w-2xl mx-auto px-4 pt-3 flex items-center justify-between">
          <button
            onClick={() => {
              playClick();
              stopSpeech();
              onExit();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-2xl border-2 border-slate-200 text-slate-700 font-extrabold text-xs hover:bg-slate-50 btn-tactile shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Daftar Level
          </button>
        </div>

        <ConceptCard
          lessonTitle={lesson.title}
          material={lesson.material}
          onStartQuiz={() => {
            setStage('quiz');
          }}
          playClick={playClick}
          speak={speak}
          stopSpeech={stopSpeech}
          isSpeaking={isSpeaking}
          equipped={equipped}
        />
      </div>
    );
  }

  // 2. COMPLETION REWARD STAGE
  if (isLessonFinished) {
    return (
      <div className="max-w-md mx-auto p-4 flex flex-col items-center justify-center min-h-[80vh] text-center animate-pop text-slate-800">
        <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-2xl w-full flex flex-col items-center">
          <span className="text-4xl animate-bounce mb-1">🏆</span>
          <h2 className="text-2xl font-black text-amber-900 mb-1">Misi Berhasil Diselesaikan!</h2>
          <p className="text-xs font-bold text-slate-600 mb-4">{lesson.title}</p>

          {/* Stars display */}
          <div className="flex gap-2 my-2">
            {[1, 2, 3].map(starIdx => (
              <span
                key={starIdx}
                className={`text-5xl transition-all duration-500 ${
                  starIdx <= starsEarned
                    ? 'scale-110 drop-shadow-md animate-pop'
                    : 'opacity-30 grayscale'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          <div className="my-4">
            <Mascot
              mood="celebrating"
              speechText={`Luar biasa! Cia berhasil dapat ${starsEarned} Bintang dan +${coinsEarned} Koin!`}
              equipped={equipped}
            />
          </div>

          <div className="w-full bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 mb-5 flex justify-around items-center">
            <div>
              <span className="text-xs font-bold text-amber-800 block">Benar</span>
              <span className="text-xl font-black text-emerald-600">
                {correctCount} / {totalQuestions}
              </span>
            </div>
            <div className="w-px h-8 bg-amber-200" />
            <div>
              <span className="text-xs font-bold text-amber-800 block">Koin Mimi</span>
              <span className="text-xl font-black text-amber-600">+{coinsEarned} 🪙</span>
            </div>
          </div>

          <button
            onClick={() => {
              playCoin();
              onFinishLesson(starsEarned, coinsEarned);
            }}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-black text-base shadow-lg hover:from-emerald-600 hover:to-teal-600 btn-tactile flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Klaim Hadiah & Selesai!
          </button>
        </div>
      </div>
    );
  }

  // 3. QUIZ & PRACTICE STAGE
  return (
    <div className="max-w-2xl mx-auto p-4 text-slate-800">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <button
          onClick={() => {
            playClick();
            stopSpeech();
            onExit();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-2xl border-2 border-slate-200 text-slate-700 font-extrabold text-xs hover:bg-slate-50 btn-tactile"
        >
          <ArrowLeft className="w-4 h-4" />
          Keluar
        </button>

        {/* Peek Material Button */}
        <button
          onClick={() => {
            playClick();
            stopSpeech();
            setStage('concept');
          }}
          className="flex items-center gap-1 text-xs font-black text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-2xl transition-colors shadow-sm"
          title="Buka Pembahasan Materi"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Lihat Materi</span>
        </button>

        {/* Question progress bar */}
        <div className="flex-1 mx-2">
          <div className="flex justify-between text-[11px] font-extrabold text-slate-600 mb-1">
            <span className="truncate max-w-[120px]">{lesson.title}</span>
            <span>
              Soal {currentIdx + 1}/{lesson.questions.length}
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIdx + 1) / lesson.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Audio narration button */}
        <button
          onClick={() => {
            if (isSpeaking) {
              stopSpeech();
            } else {
              speak(question.text);
            }
          }}
          className={`p-2 rounded-2xl border-2 transition-colors ${
            isSpeaking
              ? 'bg-amber-100 border-amber-400 text-amber-700 animate-pulse'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
          title="Bacakan Soal"
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Mascot Assistant Banner */}
      <div className="mb-4">
        <Mascot size="sm" mood={mascotMood} speechText={mascotSpeech} equipped={equipped} />
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl p-5 border-4 border-amber-200 shadow-xl mb-4 animate-pop">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
            Langkah 2: Latihan Soal
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-black text-slate-800 mb-4 leading-relaxed">
          {question.text}
        </h3>

        {/* Toggle Manipulative Button */}
        {question.manipulative && (
          <div className="mb-4">
            <button
              onClick={() => {
                playClick();
                setShowManipulative(s => !s);
              }}
              className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
            >
              <span>🧱</span>
              {showManipulative ? 'Sembunyikan Alat Peraga' : 'Buka Alat Peraga Bantuan'}
            </button>
          </div>
        )}

        {/* Interactive Manipulative Workspace */}
        {showManipulative && question.manipulative && (
          <div className="mb-5">{renderManipulative()}</div>
        )}

        {/* Multiple Choice Options */}
        {question.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isOptionCorrect = isAnswerSubmitted && String(opt) === String(question.correctAnswer);
              const isOptionWrong = isAnswerSubmitted && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswerSubmitted && isCorrect}
                  className={`p-3.5 rounded-2xl font-black text-sm text-left flex items-center justify-between border-3 transition-all btn-tactile ${
                    isOptionCorrect
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900 shadow-md ring-2 ring-emerald-400'
                      : isOptionWrong
                      ? 'bg-rose-50 border-rose-400 text-rose-800'
                      : isSelected
                      ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50/50 hover:border-amber-300'
                  }`}
                >
                  <span>{opt}</span>
                  {isOptionCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback / Explanation Box */}
        {isAnswerSubmitted && (
          <div
            className={`p-4 rounded-2xl border-2 mb-4 animate-pop ${
              isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{isCorrect ? '🎉' : '💡'}</span>
              <h4 className="font-black text-sm">
                {isCorrect ? 'Hebat, Jawaban Benar!' : 'Belum Pas, Yuk Coba Lagi!'}
              </h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {isCorrect ? question.explanation : showHint ? question.hint : 'Coba baca lagi petunjuk di atas ya.'}
            </p>
          </div>
        )}

        {/* Action Button: Periksa Jawaban / Lanjut */}
        <div className="flex justify-end gap-2 pt-2">
          {!isAnswerSubmitted ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className={`py-3 px-6 rounded-2xl font-black text-sm transition-all btn-tactile ${
                selectedOption !== null
                  ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-md'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              Periksa Jawaban
            </button>
          ) : isCorrect ? (
            <button
              onClick={handleNextQuestion}
              className="py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-md btn-tactile flex items-center gap-1.5"
            >
              Soal Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                playClick();
                setIsAnswerSubmitted(false);
                setSelectedOption(null);
              }}
              className="py-3 px-6 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-sm shadow-md btn-tactile flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Coba Lagi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
