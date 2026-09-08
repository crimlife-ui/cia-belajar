import React, { useState } from 'react';
import type { UserProgress, ParentSettings } from '../../types';
import { CURRICULUM } from '../../data/curriculum';
import {
  ArrowLeft,
  Award,
  Clock,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  progress: UserProgress;
  settings: ParentSettings;
  onUpdateSettings: (newSettings: ParentSettings) => void;
  onResetProgress: () => void;
  onBack: () => void;
  playClick: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  progress,
  settings,
  onUpdateSettings,
  onResetProgress,
  onBack,
  playClick,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Calculate total lessons and completed
  const totalLessons = CURRICULUM.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedCount = Object.keys(progress.completedLessons).length;
  const overallPercentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="max-w-2xl mx-auto p-4 animate-pop text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => {
            playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-2xl border-2 border-slate-200 text-slate-700 font-extrabold hover:bg-slate-50 btn-tactile"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <h2 className="text-xl font-black text-slate-800">Dashboard Orang Tua</h2>
        <div className="w-20" />
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3.5 text-center">
          <Award className="w-6 h-6 text-amber-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-amber-700">{progress.stars}</span>
          <span className="text-xs font-bold text-amber-900 block">Total Bintang</span>
        </div>

        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-3.5 text-center">
          <BookOpen className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-indigo-700">{overallPercentage}%</span>
          <span className="text-xs font-bold text-indigo-900 block">Kurikulum Tuntas</span>
        </div>

        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3.5 text-center">
          <Sparkles className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
          <span className="text-2xl font-black text-emerald-700">{progress.streak} Hari</span>
          <span className="text-xs font-bold text-emerald-900 block">Rutinitas Belajar</span>
        </div>
      </div>

      {/* Chapter Mastery Breakdown */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm mb-6">
        <h3 className="font-extrabold text-base text-slate-800 mb-3 flex items-center gap-2">
          <span>📊</span> Penguasaan Materi per Bab
        </h3>

        <div className="space-y-3">
          {CURRICULUM.map(chapter => {
            const stats = progress.accuracyStats[chapter.id] || { totalAnswered: 0, correct: 0 };
            const accuracy =
              stats.totalAnswered > 0 ? Math.round((stats.correct / stats.totalAnswered) * 100) : 0;

            const chapterCompletedLessons = chapter.lessons.filter(
              l => progress.completedLessons[l.id]
            ).length;

            return (
              <div key={chapter.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-extrabold text-slate-800">
                    Bab {chapter.number}: {chapter.title}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {chapterCompletedLessons}/{chapter.lessons.length} Level
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: `${(chapterCompletedLessons / chapter.lessons.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
                  <span>Akurasi: {accuracy}% ({stats.correct} dari {stats.totalAnswered} soal)</span>
                  <span className={accuracy >= 80 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                    {accuracy >= 80 ? '🌟 Sangat Lancar' : stats.totalAnswered === 0 ? 'Belum Dikerjakan' : 'Perlu Didampingi'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Screen Time & Controls */}
      <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm mb-6">
        <h3 className="font-extrabold text-base text-slate-800 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          Pengaturan Waktu Layar & Suara
        </h3>

        {/* Screen Time Select */}
        <div className="mb-4">
          <label className="text-xs font-bold text-slate-600 block mb-2">
            Batas Waktu Belajar Harian (Screen Time Limit):
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[15, 30, 45, 0].map(mins => (
              <button
                key={mins}
                onClick={() => {
                  playClick();
                  onUpdateSettings({
                    ...settings,
                    dailyScreenTimeMinutes: mins,
                    timerActive: mins > 0,
                  });
                }}
                className={`py-2 px-1 rounded-xl text-xs font-extrabold transition-all ${
                  settings.dailyScreenTimeMinutes === mins
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {mins === 0 ? 'Tanpa Batas' : `${mins} Menit`}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Toggles */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              playClick();
              onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled });
            }}
            className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-extrabold text-slate-700"
          >
            <span className="flex items-center gap-2">
              {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              Efek Suara (SFX)
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${settings.soundEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
              {settings.soundEnabled ? 'Aktif' : 'Mati'}
            </span>
          </button>

          <button
            onClick={() => {
              playClick();
              onUpdateSettings({ ...settings, voiceNarrationEnabled: !settings.voiceNarrationEnabled });
            }}
            className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs font-extrabold text-slate-700"
          >
            <span className="flex items-center gap-2">
              <span>🗣️</span> Bacakan Soal
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${settings.voiceNarrationEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
              {settings.voiceNarrationEnabled ? 'Aktif' : 'Mati'}
            </span>
          </button>
        </div>
      </div>

      {/* Reset Progress Danger Zone */}
      <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-center">
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 mx-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Ulang Seluruh Progres Belajar
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-extrabold text-rose-700">
              Yakin ingin menghapus seluruh bintang, koin, dan data latihan?
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onResetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1 rounded-xl bg-rose-600 text-white text-xs font-bold"
              >
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
