import React, { useState } from 'react';
import { BIMBEL_MODULES } from '../../data/bimbelModules';
import type { BimbelChapterModule, BimbelSection } from '../../data/bimbelModules';
import { DienesBlocks } from '../manipulatives/DienesBlocks';
import { BalanceScale } from '../manipulatives/BalanceScale';
import { RulerScale } from '../manipulatives/RulerScale';
import { ShapeDetector } from '../manipulatives/ShapeDetector';
import { TallyTable } from '../manipulatives/TallyTable';
import { Mascot } from '../mascot/Mascot';
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  VolumeX,
  Printer,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  HelpCircle,
  Play,
  Target,
  ListChecks,
} from 'lucide-react';
import type { Lesson, ManipulativeType } from '../../types';
import { CURRICULUM } from '../../data/curriculum';

interface BimbelModuleViewProps {
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  playClick: () => void;
  speak: (text: string) => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
  equipped: { hat?: string; glasses?: string; snack?: string };
}

export const BimbelModuleView: React.FC<BimbelModuleViewProps> = ({
  onBack,
  onSelectLesson,
  playClick,
  speak,
  stopSpeech,
  isSpeaking,
  equipped,
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>(
    BIMBEL_MODULES[0].sections[0].id
  );

  const activeChapter: BimbelChapterModule = BIMBEL_MODULES[activeChapterIndex];
  const activeSection: BimbelSection =
    activeChapter.sections.find(s => s.id === activeSectionId) || activeChapter.sections[0];

  const handleSwitchChapter = (index: number) => {
    playClick();
    stopSpeech();
    setActiveChapterIndex(index);
    setActiveSectionId(BIMBEL_MODULES[index].sections[0].id);
  };

  const handleSwitchSection = (sectionId: string) => {
    playClick();
    stopSpeech();
    setActiveSectionId(sectionId);
  };

  // Text for TTS narration
  const getNarrationText = () => {
    let text = `Bab ${activeChapter.chapterNumber}: ${activeChapter.title}. ${activeSection.title}. ${activeSection.content}. `;
    if (activeSection.subsections) {
      activeSection.subsections.forEach(sub => {
        text += `${sub.subtitle}. ${sub.description}. `;
        if (sub.bulletPoints) {
          text += sub.bulletPoints.join('. ') + '. ';
        }
      });
    }
    if (activeSection.bimbelTips) {
      text += activeSection.bimbelTips.join('. ') + '. ';
    }
    return text;
  };

  const handlePrint = () => {
    window.print();
  };

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

  // Find corresponding curriculum chapter to launch exercises
  const currentCurriculumChapter = CURRICULUM.find(
    c => c.id === activeChapter.chapterId
  );

  return (
    <div className="max-w-5xl mx-auto p-4 text-slate-800 animate-pop">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md p-4 rounded-3xl border-2 border-amber-200 shadow-sm mb-6 print:hidden">
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
          <span className="p-2 bg-indigo-500 text-white rounded-2xl shadow-sm">
            <BookOpen className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              Modul Bimbingan Belajar Matematika SD Kelas 3
            </h1>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              Berdasarkan Buku Siswa Kurikulum Merdeka Kemendikbudristek
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* TTS Audio Read Button */}
          <button
            onClick={() => {
              if (isSpeaking) {
                stopSpeech();
              } else {
                speak(getNarrationText());
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border-2 text-xs font-black transition-colors btn-tactile ${
              isSpeaking
                ? 'bg-amber-100 border-amber-400 text-amber-800 animate-pulse'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Dengarkan Pembahasan Bagian Ini"
          >
            {isSpeaking ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-600" />
            )}
            <span>{isSpeaking ? 'Hentikan Audio' : 'Dengarkan Modul'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-2xl text-xs font-black btn-tactile"
            title="Cetak Ringkasan Modul Ini"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF</span>
          </button>
        </div>
      </div>

      {/* Chapter Selection Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none print:hidden">
        {BIMBEL_MODULES.map((mod, idx) => {
          const isSelected = activeChapterIndex === idx;
          return (
            <button
              key={mod.chapterId}
              onClick={() => handleSwitchChapter(idx)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 border-2 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[10px] flex items-center justify-center font-black">
                {mod.chapterNumber}
              </span>
              <span>{mod.title}</span>
            </button>
          );
        })}
      </div>

      {/* Chapter Hero & Competencies Box */}
      <div
        className={`rounded-3xl p-5 sm:p-6 border-4 ${activeChapter.themeColor.border} ${activeChapter.themeColor.bg} shadow-md mb-6`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <span
              className={`text-xs font-black uppercase px-3 py-1 rounded-full ${activeChapter.themeColor.badge}`}
            >
              Bab {activeChapter.chapterNumber} • Modul Bimbingan Belajar Lengkap
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {activeChapter.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1 max-w-2xl leading-relaxed">
              {activeChapter.overview}
            </p>
          </div>

          <div className="hidden sm:block flex-shrink-0">
            <Mascot
              size="sm"
              mood="happy"
              speechText="Yuk baca modul bimbingan belajar ini biar nilaimu 100!"
              equipped={equipped}
            />
          </div>
        </div>

        {/* Capaian Pembelajaran (CP) */}
        <div className="bg-white/80 rounded-2xl p-4 border border-slate-200/80">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
              Target Pemahaman Anak di Bab Ini (Capaian Pembelajaran):
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeChapter.learningCompetencies.map((comp, cIdx) => (
              <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{comp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Sub-Topics Menu & Detailed Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Topic Navigation Drawer */}
        <div className="lg:col-span-4 space-y-3 print:hidden">
          <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm sticky top-4">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
              <ListChecks className="w-4 h-4 text-slate-600" />
              Daftar Topik Pembahasan:
            </h3>

            <div className="space-y-2">
              {activeChapter.sections.map(section => {
                const isCurrent = activeSection.id === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSwitchSection(section.id)}
                    className={`w-full text-left p-3 rounded-2xl text-xs font-extrabold transition-all border-2 flex items-start justify-between gap-2 ${
                      isCurrent
                        ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-md scale-[1.02]'
                        : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-amber-50 hover:border-amber-200'
                    }`}
                  >
                    <div>
                      <span className="block leading-snug">{section.title}</span>
                      {section.badge && (
                        <span className="text-[10px] font-bold opacity-80 mt-0.5 block">
                          {section.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Practice Jump CTA */}
            {currentCurriculumChapter && currentCurriculumChapter.lessons.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 block mb-2">
                  Latihan Soal Terkait:
                </span>
                <button
                  onClick={() => {
                    playClick();
                    onSelectLesson(currentCurriculumChapter.lessons[0]);
                  }}
                  className="w-full py-2.5 px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-black shadow-sm btn-tactile flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Uji Pemahaman Bab Ini (Kuis)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Detailed Textbook Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-200 shadow-xl space-y-6">
            {/* Section Header */}
            <div>
              {activeSection.badge && (
                <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block mb-2">
                  {activeSection.badge}
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {activeSection.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mt-2">
                {activeSection.content}
              </p>
            </div>

            {/* Subsections: Rules, Tables, Formulations */}
            {activeSection.subsections && (
              <div className="space-y-5">
                {activeSection.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <h4 className="text-sm font-black text-slate-900 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      {sub.subtitle}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                      {sub.description}
                    </p>

                    {/* Formatted Comparison Table */}
                    {sub.tableData && (
                      <div className="overflow-x-auto my-3">
                        <table className="w-full text-left text-xs border-collapse rounded-xl overflow-hidden shadow-sm">
                          <thead>
                            <tr className="bg-amber-100 text-amber-950 font-black">
                              {sub.tableData.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-2.5 border border-amber-200">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sub.tableData.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className={rIdx % 2 === 0 ? 'bg-white' : 'bg-amber-50/40'}
                              >
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className="p-2.5 border border-slate-200 text-slate-700 font-medium"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Bullet Points */}
                    {sub.bulletPoints && (
                      <ul className="space-y-1.5 pl-2 my-2">
                        {sub.bulletPoints.map((pt, pIdx) => (
                          <li
                            key={pIdx}
                            className="text-xs text-slate-700 font-medium flex items-start gap-2"
                          >
                            <span className="text-amber-500 font-black">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Formula Callout Box */}
                    {sub.formulaBox && (
                      <div className="bg-amber-100/70 border-2 border-amber-300 rounded-xl p-3 text-xs font-black text-amber-950 whitespace-pre-line my-2">
                        {sub.formulaBox}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Embedded Interactive Manipulative */}
            {activeSection.manipulative && (
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🎮</span>
                  <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                    Alat Peraga Langsung (Bisa Dicoba):
                  </h4>
                </div>
                {renderManipulative(
                  activeSection.manipulative,
                  activeSection.manipulativeInitialValue
                )}
              </div>
            )}

            {/* Bimbel Tips & Mnemonic */}
            {activeSection.bimbelTips && activeSection.bimbelTips.length > 0 && (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  <h4 className="text-xs font-black uppercase text-amber-900 tracking-wider">
                    Tips Rahasia Bimbel & Cara Cepat:
                  </h4>
                </div>
                <div className="space-y-1.5">
                  {activeSection.bimbelTips.map((tip, tIdx) => (
                    <p key={tIdx} className="text-xs font-bold text-amber-950 leading-relaxed">
                      {tip}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Worked Step-by-Step Examples (Bedah Soal Nyata) */}
            {activeSection.workedExamples && activeSection.workedExamples.length > 0 && (
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-600" />
                  Bedah Contoh Soal Nyata (Soal Ujian):
                </h4>

                {activeSection.workedExamples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="bg-sky-50/70 border-2 border-sky-200 rounded-2xl p-4 sm:p-5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-md">
                        Contoh Kasus {exIdx + 1}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {ex.conceptApplied}
                      </span>
                    </div>

                    <h5 className="text-xs sm:text-sm font-black text-slate-900 bg-white p-3 rounded-xl border border-sky-100 mb-3">
                      {ex.question}
                    </h5>

                    {/* Numbered Steps */}
                    <div className="space-y-2 pl-2 border-l-2 border-sky-300 mb-4">
                      {ex.stepByStep.map((step, stIdx) => (
                        <div
                          key={stIdx}
                          className="text-xs text-slate-700 font-medium flex items-start gap-2"
                        >
                          <span className="w-4 h-4 rounded-full bg-sky-200 text-sky-900 text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                            {stIdx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Final Answer Banner */}
                    <div className="bg-sky-100 text-sky-950 p-2.5 rounded-xl text-xs font-black flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Jawaban Akhir: {ex.finalAnswer}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Exam Cheatsheet Summary Box */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/70 rounded-3xl p-6 border-4 border-emerald-300 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wider">
                Rangkuman Kilat untuk Ulangan Harian (Bab {activeChapter.chapterNumber}):
              </h4>
            </div>

            <div className="space-y-2">
              {activeChapter.examSummaryPoints.map((pt, ptIdx) => (
                <div
                  key={ptIdx}
                  className="flex items-start gap-2.5 text-xs text-emerald-950 font-bold bg-white/70 p-2.5 rounded-xl border border-emerald-200/80"
                >
                  <span className="text-emerald-600">✓</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Jump to Practice */}
            {currentCurriculumChapter && (
              <div className="mt-5 text-center">
                <button
                  onClick={() => {
                    playClick();
                    onSelectLesson(currentCurriculumChapter.lessons[0]);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-md btn-tactile inline-flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Mulai Latihan Kuis Bab {activeChapter.chapterNumber} Sekarang!
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
