import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ENGLISH_LEVELS,
  type EnglishLevel,
  type EnglishTopic,
  type EnglishQuizQuestion,
  type EnglishLevelId,
} from '../../data/englishData';
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
  Globe,
} from 'lucide-react';

interface EnglishViewProps {
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

export const EnglishView: React.FC<EnglishViewProps> = ({
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
  const [selectedLevelId, setSelectedLevelId] = useState<EnglishLevelId>('basic');
  const [viewMode, setViewMode] = useState<'study' | 'quiz'>('study');
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  // Time Machine visualizer active tab
  const [timeMachineTab, setTimeMachineTab] = useState<'present' | 'continuous' | 'past'>('present');

  // Currently playing audio text (for UI indicator)
  const [activeAudioText, setActiveAudioText] = useState<string | null>(null);

  const activeLevel: EnglishLevel =
    ENGLISH_LEVELS.find(l => l.id === selectedLevelId) ?? ENGLISH_LEVELS[0];
  const activeTopic: EnglishTopic = activeLevel.topics[activeTopicIndex] ?? activeLevel.topics[0];

  // Quiz Mode State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ: EnglishQuizQuestion = activeLevel.quizQuestions[currentQIndex];

  // When switching topic or level, reset topic index if out of bounds
  useEffect(() => {
    setActiveTopicIndex(0);
  }, [selectedLevelId]);

  // Audio trigger helper for English sentences
  const handleSpeakEnglish = (text: string) => {
    playClick();
    if (isSpeaking && activeAudioText === text) {
      stopSpeech();
      setActiveAudioText(null);
    } else {
      setActiveAudioText(text);
      speak(text, 'en-US');
    }
  };

  // Audio trigger for Indonesian explanation
  const handleSpeakIndo = (text: string) => {
    playClick();
    if (isSpeaking && activeAudioText === text) {
      stopSpeech();
      setActiveAudioText(null);
    } else {
      setActiveAudioText(text);
      speak(text, 'id-ID');
    }
  };

  // Read question text aloud when question changes in quiz mode
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
      setScore(s => s + 1);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'],
      });
    } else {
      playWrong();
    }
  };

  const handleNextQuestion = () => {
    playClick();
    if (currentQIndex + 1 < activeLevel.quizQuestions.length) {
      setCurrentQIndex(i => i + 1);
    } else {
      // Quiz Finished!
      setIsQuizCompleted(true);
      playCelebration();
      playCoin();

      const stars = score >= 9 ? 3 : score >= 6 ? 2 : 1;
      const coins = stars * 20;
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

  return (
    <div className="max-w-5xl mx-auto p-4 text-slate-800 animate-pop">
      {/* Top Floating App Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-4 rounded-3xl border-2 border-indigo-200 shadow-sm mb-6">
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
          <span className="p-2 bg-indigo-600 text-white rounded-2xl shadow-sm animate-pulse">
            <Globe className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              English Adventure (Belajar Bahasa Inggris)
            </h1>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              Basic • Intermediate • Expert & Tenses Lengkap 🇬🇧
            </span>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClick();
              stopSpeech();
              setViewMode('study');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black transition-all btn-tactile ${
              viewMode === 'study'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Materi Belajar</span>
          </button>

          <button
            onClick={handleStartQuiz}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black transition-all btn-tactile ${
              viewMode === 'quiz'
                ? 'bg-amber-500 text-amber-950 shadow-md'
                : 'bg-amber-400 text-amber-950 hover:bg-amber-500'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Kuis 10 Soal</span>
          </button>
        </div>
      </div>

      {/* 3 Difficulty Level Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {ENGLISH_LEVELS.map(lvl => {
          const isSelected = selectedLevelId === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => {
                playClick();
                setSelectedLevelId(lvl.id);
                if (viewMode === 'quiz') {
                  setCurrentQIndex(0);
                  setIsSubmitted(false);
                  setIsQuizCompleted(false);
                }
              }}
              className={`p-4 rounded-3xl border-3 text-left transition-all btn-tactile relative overflow-hidden ${
                isSelected
                  ? `${lvl.badgeColor.bg} ${lvl.badgeColor.border} ring-4 ring-indigo-300 shadow-lg scale-102`
                  : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl">{lvl.symbol}</span>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {lvl.id}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900">{lvl.name}</h3>
              <p className="text-[11px] text-slate-600 font-semibold mt-0.5 line-clamp-2">
                {lvl.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* ========================================================
          MODE 1: MATERI & KOSAKATA LENGKAP (STUDY MODE)
      ======================================================== */}
      {viewMode === 'study' && (
        <div className="space-y-6">
          {/* Active Level Hero Banner */}
          <div
            className={`rounded-3xl p-6 border-4 ${activeLevel.badgeColor.border} ${activeLevel.badgeColor.bg} shadow-md flex flex-col sm:flex-row items-center justify-between gap-4`}
          >
            <div>
              <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-white/80 text-indigo-900 border border-indigo-200">
                Pilihan Materi: {activeLevel.name}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                {activeLevel.tagline}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1 max-w-xl leading-relaxed">
                Pilih topik di bawah ini untuk belajar kosakata baru, mendengarkan pelafalan bahasa Inggris asli, dan memahami rumus tenses dengan asyik!
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center">
              <Mascot
                size="md"
                mood="happy"
                speechText="Klik tombol speaker di tiap kata untuk mendengar suaraku berbicara bahasa Inggris!"
                equipped={equipped}
              />
            </div>
          </div>

          {/* Topic Pills inside Active Level */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {activeLevel.topics.map((top, tIdx) => {
              const isSelected = activeTopicIndex === tIdx;
              return (
                <button
                  key={top.id}
                  onClick={() => {
                    playClick();
                    setActiveTopicIndex(tIdx);
                  }}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-2xl font-black text-xs transition-all flex items-center gap-2 border-2 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-102'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{top.icon}</span>
                  <span>{top.title.split('(')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Topic Main Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-4 border-slate-200 shadow-xl space-y-6">
            {/* Header of Active Topic */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-3 bg-indigo-50 border border-indigo-200 rounded-2xl shadow-sm">
                  {activeTopic.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      {activeTopic.title}
                    </h3>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      {activeTopic.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    {activeTopic.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSpeakIndo(activeTopic.description)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 rounded-xl text-xs font-black btn-tactile"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Baca Deskripsi</span>
              </button>
            </div>

            {/* Topic Description & Mimi's Advice */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                  Materi Pembelajaran:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                  {activeTopic.description}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🐱</span>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-900 block mb-0.5">
                    Tips Mimi si Kucing Cerdas:
                  </span>
                  <p className="text-xs text-slate-800 font-bold leading-relaxed">
                    "{activeTopic.kikoTip}"
                  </p>
                </div>
              </div>
            </div>

            {/* Special Section: Grammar & Tenses Time Machine (if available) */}
            {activeTopic.grammarFocus && (
              <div className="p-5 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl border-3 border-indigo-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <h4 className="text-base font-black text-indigo-950">
                      {activeTopic.grammarFocus.title}
                    </h4>
                    <span className="text-[11px] font-bold text-indigo-700">
                      Perhatikan cara kata kerja berubah bentuk sesuai waktunya!
                    </span>
                  </div>
                </div>

                {/* Grammar Rules List */}
                <div className="space-y-1.5 pl-2 border-l-3 border-indigo-300">
                  {activeTopic.grammarFocus.rules.map((rule, rIdx) => (
                    <p key={rIdx} className="text-xs font-semibold text-slate-700">
                      {rule}
                    </p>
                  ))}
                </div>

                {/* Time Machine Interactive Visualizer (Past vs Present vs Continuous) */}
                {activeTopic.grammarFocus.tenseComparisons && (
                  <div className="bg-white p-4 rounded-2xl border-2 border-indigo-200 space-y-3 shadow-inner">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase text-indigo-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Mesin Waktu Interaktif (Klik 3 Waktu Berbeda):</span>
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            playClick();
                            setTimeMachineTab('present');
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-black transition-all btn-tactile ${
                            timeMachineTab === 'present'
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Present (Sekarang) ⏱️
                        </button>
                        <button
                          onClick={() => {
                            playClick();
                            setTimeMachineTab('continuous');
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-black transition-all btn-tactile ${
                            timeMachineTab === 'continuous'
                              ? 'bg-amber-500 text-amber-950 shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Continuous (Sedang) 🎥
                        </button>
                        <button
                          onClick={() => {
                            playClick();
                            setTimeMachineTab('past');
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-black transition-all btn-tactile ${
                            timeMachineTab === 'past'
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Past (Kemarin) ⏪
                        </button>
                      </div>
                    </div>

                    {/* Filtered Tense Card based on tab */}
                    {activeTopic.grammarFocus.tenseComparisons
                      .filter(tc => tc.timeline === timeMachineTab)
                      .map((tComp, tcIdx) => (
                        <div
                          key={tcIdx}
                          className="p-4 bg-slate-50 rounded-2xl border-2 border-indigo-300 space-y-2 animate-pop"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-indigo-900 bg-indigo-100 px-3 py-0.5 rounded-full">
                              {tComp.title}
                            </span>
                            <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                              Penanda Waktu: {tComp.timeSignal}
                            </span>
                          </div>

                          <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                            <div>
                              <p className="text-base sm:text-lg font-black text-slate-900">
                                "{tComp.sentence}"
                              </p>
                              <p className="text-xs text-slate-500 font-medium">
                                Artinya: {tComp.translation}
                              </p>
                            </div>
                            <button
                              onClick={() => handleSpeakEnglish(tComp.sentence)}
                              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm btn-tactile flex-shrink-0"
                              title="Dengarkan pengucapan kalimat"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3 text-[11px] font-bold text-slate-600 pt-1">
                            <span>Bentuk Kata Kerja: <strong className="text-indigo-700">{tComp.verbForm}</strong></span>
                            <span>•</span>
                            <span>Rumus: <code className="text-purple-700 font-mono">{tComp.formula}</code></span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* Vocabulary Flashcards Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black uppercase text-slate-800 tracking-wider flex items-center gap-2">
                  <span>Kartu Kosakata Penting (Klik Speaker Untuk Audio):</span>
                </h4>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {activeTopic.vocabularies.length} Kosakata
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeTopic.vocabularies.map(vocab => (
                  <div
                    key={vocab.id}
                    className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-indigo-400 shadow-sm hover:shadow-md transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl p-2 bg-slate-50 rounded-xl border border-slate-100">
                          {vocab.emoji}
                        </span>
                        <div>
                          <h5 className="text-base font-black text-slate-900 leading-tight">
                            {vocab.english}
                          </h5>
                          <span className="text-xs font-bold text-emerald-700">
                            {vocab.indonesian}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSpeakEnglish(vocab.english)}
                        className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-all btn-tactile"
                        title="Dengarkan pelafalan kata"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
                      <span>Cara baca: <em>"{vocab.pronunciationHint}"</em></span>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                        {vocab.category}
                      </span>
                    </div>

                    {/* Example Sentence with Audio */}
                    <div className="p-2.5 bg-indigo-50/60 rounded-xl border border-indigo-100 flex items-center justify-between gap-2">
                      <div className="text-xs">
                        <p className="font-bold text-indigo-950">
                          "{vocab.exampleSentence}"
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {vocab.sentenceMeaning}
                        </p>
                      </div>
                      <button
                        onClick={() => handleSpeakEnglish(vocab.exampleSentence)}
                        className="p-1.5 rounded-lg bg-white text-indigo-700 hover:bg-indigo-600 hover:text-white shadow-xs btn-tactile flex-shrink-0"
                        title="Dengarkan kalimat contoh"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Dialogue Conversation (if present) */}
            {activeTopic.conversation && (
              <div className="p-5 bg-amber-50/70 rounded-3xl border-2 border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-amber-950 flex items-center gap-2">
                    <span>💬 Contoh Percakapan Dua Sahabat ({activeTopic.conversation.characterA} & {activeTopic.conversation.characterB}):</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {activeTopic.conversation.dialogue.map((dlg, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-3 bg-white rounded-2xl border border-amber-200 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div>
                        <span className="text-[10px] font-black uppercase text-amber-800 block">
                          {dlg.speaker}:
                        </span>
                        <p className="text-xs sm:text-sm font-black text-slate-900">
                          "{dlg.text}"
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {dlg.meaning}
                        </p>
                      </div>

                      <button
                        onClick={() => handleSpeakEnglish(dlg.text)}
                        className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-all btn-tactile flex-shrink-0"
                        title="Dengarkan dialog"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Banner to Start Quiz */}
            <div className="p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl text-center text-white shadow-xl">
              <h3 className="text-xl font-black mb-1">
                Siap Menguji Kemampuan Bahasa Inggrismu?
              </h3>
              <p className="text-xs text-indigo-100 font-semibold mb-4">
                Uji pemahaman kosakata dan tenses dalam tantangan 10 soal di Level {activeLevel.name}!
              </p>
              <button
                onClick={handleStartQuiz}
                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-2xl font-black text-sm shadow-md btn-tactile inline-flex items-center gap-2"
              >
                <Award className="w-4 h-4 fill-amber-950" />
                <span>Mulai Kuis 10 Soal {activeLevel.name} 🚀</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODE 2: KUIS TANTANGAN 10 SOAL (QUIZ ARENA)
      ======================================================== */}
      {viewMode === 'quiz' && (
        <div>
          {/* Quiz Completed Card */}
          {isQuizCompleted ? (
            <div className="max-w-md mx-auto p-4 flex flex-col items-center justify-center min-h-[60vh] text-center animate-pop text-slate-800">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-2xl w-full flex flex-col items-center">
                <span className="text-5xl animate-bounce mb-2">🌟🏆🌟</span>
                <h2 className="text-2xl font-black text-indigo-950 mb-1">
                  Kuis Bahasa Inggris Tuntas!
                </h2>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-4">
                  {activeLevel.name}
                </span>

                {/* Score Display */}
                <div className="w-full bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-4 mb-5 text-center">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-800 block">
                    Skor Akhir Cia
                  </span>
                  <div className="text-4xl font-black text-indigo-600 my-1">
                    {score} <span className="text-lg text-slate-500 font-bold">/ 10</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-900">
                    {score === 10
                      ? '🌟 Sempurna! Kamu Hebat Sekali Berbahasa Inggris!'
                      : score >= 7
                      ? '🎉 Bagus Sekali! Kosakata & Tensesmu Sudah Mantap!'
                      : '💪 Keren! Terus ulangi materi & dengarkan audionya ya!'}
                  </span>
                </div>

                <div className="my-2">
                  <Mascot
                    mood="celebrating"
                    speechText={`Good job Cia! Kamu berhasil menjawab ${score} soal dengan benar!`}
                    equipped={equipped}
                  />
                </div>

                <div className="flex gap-3 w-full mt-4">
                  <button
                    onClick={handleStartQuiz}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-2xl flex items-center justify-center gap-1.5 btn-tactile"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Kuis</span>
                  </button>

                  <button
                    onClick={() => {
                      playClick();
                      setViewMode('study');
                    }}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-1.5 btn-tactile shadow-md"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Pelajari Materi</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Active Question Screen */
            <div className="max-w-2xl mx-auto bg-white rounded-3xl border-4 border-indigo-200 shadow-xl p-6 sm:p-8 space-y-6">
              {/* Question Header & Progress */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {activeLevel.name}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    Soal {currentQIndex + 1} dari 10
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Skor:</span>
                  <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-xl border border-emerald-200">
                    {score}
                  </span>
                </div>
              </div>

              {/* Progress Bar 1 to 10 */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQIndex + 1) / 10) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-2">
                <p className="text-base sm:text-lg font-black text-indigo-950 leading-snug">
                  {currentQ.question}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => speak(currentQ.question, 'id-ID')}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900 btn-tactile"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Dengar Soal</span>
                  </button>
                  <span className="text-[11px] font-bold text-amber-800">
                    💡 Tips: {currentQ.tip}
                  </span>
                </div>
              </div>

              {/* Options List */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, oIdx) => {
                  const isChosen = selectedOption === opt;
                  let optStyle =
                    'bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50 hover:border-indigo-300';

                  if (isSubmitted) {
                    if (opt === currentQ.correctAnswer) {
                      optStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-black';
                    } else if (isChosen && !isCorrect) {
                      optStyle = 'bg-rose-100 border-rose-400 text-rose-950 line-through';
                    }
                  } else if (isChosen) {
                    optStyle = 'bg-indigo-600 border-indigo-700 text-white font-black shadow-md';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full p-4 rounded-2xl border-2 text-left text-sm sm:text-base font-bold transition-all flex items-center justify-between btn-tactile ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && opt === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Explanation */}
              {isSubmitted && (
                <div
                  className={`p-4 rounded-2xl border-2 animate-pop ${
                    isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{isCorrect ? '🎉 Great Job!' : '💡 Pembahasan:'}</span>
                    <h4 className="font-black text-sm">
                      {isCorrect ? 'Jawaban Cia Tepat Sekali!' : 'Yuk Pelajari Penjelasannya:'}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Bottom Action Button */}
              <div className="flex justify-end gap-2 pt-2">
                {!isSubmitted ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className={`py-3 px-6 rounded-2xl font-black text-xs sm:text-sm transition-all btn-tactile ${
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
                    className="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md btn-tactile flex items-center gap-2"
                  >
                    <span>{currentQIndex + 1 === 10 ? 'Lihat Hasil Akhir' : 'Soal Selanjutnya'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
