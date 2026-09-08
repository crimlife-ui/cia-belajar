import React, { useState, useEffect } from 'react';
import type { ConceptMaterial, ManipulativeType } from '../../types';
import { DienesBlocks } from '../manipulatives/DienesBlocks';
import { BalanceScale } from '../manipulatives/BalanceScale';
import { RulerScale } from '../manipulatives/RulerScale';
import { ShapeDetector } from '../manipulatives/ShapeDetector';
import { TallyTable } from '../manipulatives/TallyTable';
import { Mascot } from '../mascot/Mascot';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

interface ConceptCardProps {
  lessonTitle: string;
  material: ConceptMaterial;
  onStartQuiz: () => void;
  playClick: () => void;
  speak: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
  equipped: { hat?: string; glasses?: string; snack?: string };
}

export const ConceptCard: React.FC<ConceptCardProps> = ({
  lessonTitle,
  material,
  onStartQuiz,
  playClick,
  speak,
  stopSpeech,
  isSpeaking,
  equipped,
}) => {
  const [showInteractivePlayground, setShowInteractivePlayground] = useState(true);

  // Combine full text for text-to-speech reading
  const narrationText = `${lessonTitle}. ${material.headline}. ${material.storyContext}. ${material.keyPoints.map(p => `${p.title}: ${p.explanation}`).join('. ')}. ${material.funFactOrTip}`;

  useEffect(() => {
    // Read the headline and story context on load
    speak(`${material.headline}. ${material.storyContext}`);
    return () => {
      stopSpeech();
    };
  }, [material]);

  const renderManipulative = (type?: ManipulativeType, initial?: any) => {
    if (!type) return null;
    switch (type) {
      case 'dienes':
        return <DienesBlocks initialValue={initial} />;
      case 'balance':
        return <BalanceScale initialValue={initial} />;
      case 'ruler':
        return <RulerScale initialValue={initial} />;
      case 'shape':
        return <ShapeDetector initialValue={initial} />;
      case 'tally':
        return <TallyTable initialValue={initial} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 text-slate-800 animate-pop">
      {/* Header Phase Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-amber-400 text-amber-950 rounded-2xl shadow-sm">
            <BookOpen className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[11px] font-black uppercase text-amber-700 tracking-wider">
              Langkah 1: Pembahasan Materi
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900">{lessonTitle}</h2>
          </div>
        </div>

        {/* Read aloud button */}
        <button
          onClick={() => {
            if (isSpeaking) {
              stopSpeech();
            } else {
              speak(narrationText);
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border-2 text-xs font-black transition-colors ${
            isSpeaking
              ? 'bg-amber-100 border-amber-400 text-amber-800 animate-pulse'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
          title="Bacakan Seluruh Pembahasan"
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
          <span>{isSpeaking ? 'Berhenti' : 'Dengarkan'}</span>
        </button>
      </div>

      {/* Main Concept Board */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-amber-200 shadow-xl mb-6 space-y-6">
        {/* Headline & Story Context */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 p-4 rounded-2xl border border-amber-200">
          <h3 className="text-lg sm:text-xl font-black text-amber-950 mb-2 leading-snug">
            {material.headline}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
            {material.storyContext}
          </p>
        </div>

        {/* Key Points with Visual Badges */}
        <div>
          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">
            Konsep Penting yang Perlu Diingat:
          </h4>
          <div className="grid grid-cols-1 gap-2.5">
            {material.keyPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-50 hover:bg-amber-50/50 rounded-2xl border-2 border-slate-100 hover:border-amber-200 transition-colors flex items-start gap-3"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{point.icon || '📌'}</span>
                <div>
                  <h5 className="text-sm font-black text-slate-900 mb-0.5">{point.title}</h5>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {point.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Try-it-Out Playground (if manipulative exists) */}
        {material.manipulative && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <span>🎮</span> Coba Sendiri Alat Peraganya:
              </h4>
              <button
                onClick={() => {
                  playClick();
                  setShowInteractivePlayground(p => !p);
                }}
                className="text-[11px] font-bold text-amber-700 hover:underline"
              >
                {showInteractivePlayground ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>

            {showInteractivePlayground && (
              <div className="mb-2">
                {renderManipulative(material.manipulative, material.manipulativeInitialValue)}
              </div>
            )}
          </div>
        )}

        {/* Step-by-Step Sample Problem Breakdown */}
        <div className="p-4 bg-sky-50/70 rounded-2xl border-2 border-sky-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📝</span>
            <h4 className="text-sm font-black text-sky-900">
              Contoh Soal & Cara Menyelesaikannya:
            </h4>
          </div>

          <p className="text-xs sm:text-sm font-extrabold text-slate-800 mb-3 bg-white p-2.5 rounded-xl border border-sky-100">
            {material.sampleProblem.question}
          </p>

          <div className="space-y-1.5 pl-2 border-l-2 border-sky-300 mb-3">
            {material.sampleProblem.stepByStepSolution.map((step, sIdx) => (
              <div key={sIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-sky-200 text-sky-800 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                  {sIdx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="bg-sky-100 text-sky-950 p-2.5 rounded-xl text-xs font-black flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Kesimpulan: {material.sampleProblem.result}</span>
          </div>
        </div>

        {/* Fun Fact or Tip from Mimi */}
        <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 flex items-center gap-3">
          <Lightbulb className="w-7 h-7 text-amber-500 flex-shrink-0" />
          <p className="text-xs text-amber-950 font-bold leading-relaxed">
            {material.funFactOrTip}
          </p>
        </div>

        {/* Mascot Encouragement */}
        <div className="flex justify-center pt-2">
          <Mascot
            size="md"
            mood="happy"
            speechText="Gimana Cia, sudah siap mencoba latihan soalnya bareng Mimi?"
            equipped={equipped}
          />
        </div>

        {/* Big Action Button: Proceed to Quiz */}
        <div className="pt-2">
          <button
            onClick={() => {
              playClick();
              stopSpeech();
              onStartQuiz();
            }}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-2xl font-black text-base sm:text-lg shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all btn-tactile flex items-center justify-center gap-2.5"
          >
            <Sparkles className="w-5 h-5 animate-spin" />
            <span>Aku Sudah Paham! Yuk Mulai Latihan Soal 🚀</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
