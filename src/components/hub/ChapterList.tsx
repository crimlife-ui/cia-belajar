import { useState } from 'react';
import type { Chapter, Lesson, UserProgress } from '../../types';
import { CURRICULUM } from '../../data/curriculum';
import { Mascot } from '../mascot/Mascot';
import {
  Coins,
  ShieldCheck,
  Star,
  Play,
  Flame,
  Clock,
  BookOpen,
  Zap,
  Globe,
  Sun,
  GraduationCap,
} from 'lucide-react';

interface ChapterListProps {
  progress: UserProgress;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenPetRoom: () => void;
  onOpenParentPortal: () => void;
  onOpenBimbelModule: () => void;
  onOpenSpeedMath: () => void;
  onOpenEnglish: () => void;
  onOpenExam: () => void;
  playClick: () => void;
  equipped: { hat?: string; glasses?: string; snack?: string };
  screenTimeRemaining?: number;
  isWakeLocked?: boolean;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  progress,
  onSelectLesson,
  onOpenPetRoom,
  onOpenParentPortal,
  onOpenBimbelModule,
  onOpenSpeedMath,
  onOpenEnglish,
  onOpenExam,
  playClick,
  equipped,
  screenTimeRemaining,
  isWakeLocked,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(CURRICULUM[0]);

  return (
    <div className="max-w-4xl mx-auto p-4 text-slate-800">
      {/* Top Floating App Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3.5 rounded-3xl border-2 border-amber-200 shadow-sm mb-6">
        {/* Brand & Kid Profile */}
        <div className="flex items-center gap-2.5">
          <span className="text-3xl">🐱</span>
          <div>
            <h1 className="font-black text-lg text-slate-900 leading-tight">Cia Math Adventure</h1>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              Matematika Kelas 3 SD
            </span>
          </div>
        </div>

        {/* Stats: Streak, Stars, Coins & Timer & WakeLock */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isWakeLocked && (
            <div
              title="Layar Tetap Menyala (Layar Tidak Terkunci Otomatis Saat Cia Belajar)"
              className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-2xl text-xs font-black text-amber-700 select-none shadow-xs"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span className="hidden sm:inline">Layar Aktif</span>
            </div>
          )}

          {screenTimeRemaining !== undefined && (
            <div
              title="Sisa Waktu Belajar"
              className="flex items-center gap-1 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-2xl text-xs font-black text-indigo-700"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{Math.ceil(screenTimeRemaining / 60)}m</span>
            </div>
          )}

          <div
            title="Hari Belajar Berurutan"
            className="flex items-center gap-1 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-2xl text-xs font-black text-rose-600"
          >
            <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{progress.streak}</span>
          </div>

          <div
            title="Total Bintang"
            className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-2xl text-xs font-black text-amber-600"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{progress.stars}</span>
          </div>

          <button
            onClick={() => {
              playClick();
              onOpenSpeedMath();
            }}
            title="Arena Hitung Cepat (+, -, ×, ÷)"
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 px-3 py-1.5 rounded-2xl text-xs font-black shadow-sm btn-tactile"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-950" />
            <span>Hitung Cepat</span>
          </button>

          <button
            onClick={() => {
              playClick();
              onOpenBimbelModule();
            }}
            title="Buku Pembahasan Materi Bimbel"
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-2xl text-xs font-black shadow-sm btn-tactile"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Modul Bimbel</span>
          </button>

          <button
            onClick={() => {
              playClick();
              onOpenEnglish();
            }}
            title="English Zone 🇬🇧 (Basic, Intermediate, Expert)"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-2xl text-xs font-black shadow-sm btn-tactile"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>English Zone 🇬🇧</span>
          </button>

          <button
            onClick={() => {
              playClick();
              onOpenExam();
            }}
            title="Ruang Ulangan & Try Out (Pilihan 20 hingga 100 Soal + Canvas Kertas Cakar)"
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-3 py-1.5 rounded-2xl text-xs font-black shadow-sm btn-tactile"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Ruang Ulangan 📝</span>
          </button>

          <button
            onClick={() => {
              playClick();
              onOpenPetRoom();
            }}
            title="Buka Kamar Mimi"
            className="flex items-center gap-1 bg-amber-400 hover:bg-amber-500 text-amber-950 px-3 py-1.5 rounded-2xl text-xs font-black shadow-sm btn-tactile"
          >
            <Coins className="w-3.5 h-3.5 fill-amber-900 text-amber-900" />
            <span>{progress.coins}</span>
          </button>

          <button
            onClick={() => {
              playClick();
              onOpenParentPortal();
            }}
            title="Area Orang Tua"
            className="p-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 btn-tactile"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Mascot Welcome Greeting */}
      <div className="bg-gradient-to-r from-amber-200 via-orange-200 to-amber-100 rounded-3xl p-5 border-4 border-amber-300 shadow-md mb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase text-amber-900 tracking-wider">
            Halo Cia! Selamat Datang Kembali 👋
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-amber-950 mt-0.5">
            Hari ini kita mau berpetualang ke bab apa?
          </h2>
          <p className="text-xs text-amber-900 font-semibold mt-1">
            Kumpulkan bintang dan koin emas untuk mendandani Mimi si Kucing Cerdas!
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => {
                playClick();
                onOpenSpeedMath();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl text-xs font-black shadow-sm btn-tactile border border-amber-500"
            >
              <Zap className="w-4 h-4 fill-amber-950" />
              <span>Arena Hitung Cepat (+, -, ×, ÷) ⚡</span>
            </button>
            <button
              onClick={() => {
                playClick();
                onOpenExam();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-black shadow-sm btn-tactile border border-rose-600"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Ruang Ulangan (20–100 Soal + Cakar) 📝</span>
            </button>
            <button
              onClick={() => {
                playClick();
                onOpenBimbelModule();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 hover:bg-white text-indigo-900 rounded-xl text-xs font-black shadow-sm btn-tactile border border-amber-300"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Modul Bimbel Lengkap ➔</span>
            </button>
            <button
              onClick={() => {
                playClick();
                onOpenEnglish();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-sm btn-tactile border border-emerald-700"
            >
              <Globe className="w-4 h-4" />
              <span>English Zone (Tenses & Quiz) 🇬🇧</span>
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 cursor-pointer" onClick={onOpenPetRoom}>
          <Mascot
            size="md"
            mood="happy"
            speechText="Ayo belajar matematika & bahasa Inggris bareng Mimi!"
            equipped={equipped}
          />
        </div>
      </div>

      {/* Speed Math Highlight Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-4 sm:p-5 border-4 border-amber-300 shadow-md mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-amber-950">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 bg-white/90 rounded-2xl shadow-sm animate-bounce">
            ⚡
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black">
                Arena Hitung Cepat: Tambah, Kurang, Kali, Bagi!
              </h3>
              <span className="text-[10px] font-black uppercase bg-slate-900 text-amber-300 px-2 py-0.5 rounded-full">
                10 Soal Kuis
              </span>
            </div>
            <p className="text-xs font-bold text-amber-950/80 mt-0.5">
              Pelajari trik mental math teman 10, lompat katak, perkalian 9 & 5, lalu uji kecepatanmu!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playClick();
            onOpenSpeedMath();
          }}
          className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black shadow-md btn-tactile flex items-center justify-center gap-1.5 flex-shrink-0"
        >
          <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>Mulai Tantangan ⚡</span>
        </button>
      </div>

      {/* English Zone Highlight Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl p-4 sm:p-5 border-4 border-emerald-300 shadow-md mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 bg-white/20 backdrop-blur-sm rounded-2xl shadow-sm">
            🇬🇧
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black">
                English Zone: Basic, Intermediate & Expert!
              </h3>
              <span className="text-[10px] font-black uppercase bg-emerald-950/80 text-emerald-200 px-2 py-0.5 rounded-full">
                Tenses & 30 Soal Kuis
              </span>
            </div>
            <p className="text-xs font-bold text-emerald-50 mt-0.5">
              Kuasai Simple Present, Present Continuous, & Past Tense dengan audio pronunciation & Mesin Waktu visual!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playClick();
            onOpenEnglish();
          }}
          className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-950 rounded-2xl text-xs font-black shadow-md btn-tactile flex items-center justify-center gap-1.5 flex-shrink-0"
        >
          <Globe className="w-4 h-4 text-emerald-600" />
          <span>Buka English Zone 🇬🇧</span>
        </button>
      </div>

      {/* Chapter Selection Horizontal Scroller / Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {CURRICULUM.map(chap => {
          const isSelected = selectedChapter.id === chap.id;
          const completedInChap = chap.lessons.filter(l => progress.completedLessons[l.id]).length;

          return (
            <button
              key={chap.id}
              onClick={() => {
                playClick();
                setSelectedChapter(chap);
              }}
              className={`flex-shrink-0 px-4 py-2.5 rounded-2xl font-black text-xs transition-all flex items-center gap-2 border-2 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[10px] flex items-center justify-center">
                {chap.number}
              </span>
              <span>{chap.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {completedInChap}/{chap.lessons.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Chapter Details & Lesson Roadmap */}
      <div className={`rounded-3xl p-6 border-4 ${selectedChapter.themeColor.border} ${selectedChapter.themeColor.bg} shadow-md`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-full ${selectedChapter.themeColor.badge}`}>
              Bab {selectedChapter.number} • Kurikulum Merdeka
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              {selectedChapter.title}
            </h3>
            <p className="text-xs text-slate-600 font-semibold mt-1 max-w-xl">
              {selectedChapter.description}
            </p>
          </div>
        </div>

        {/* Lessons List in the Chapter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selectedChapter.lessons.map((lesson, idx) => {
            const starCount = progress.completedLessons[lesson.id] || 0;
            const isCompleted = starCount > 0;

            return (
              <div
                key={lesson.id}
                className="bg-white rounded-2xl p-4 border-2 border-slate-200/80 shadow-sm hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      Level {selectedChapter.number}.{idx + 1}
                    </span>

                    {/* Star Rating Earned */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(s => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= starCount
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="font-black text-sm text-slate-900 mb-1 leading-snug">
                    {lesson.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2">
                    {lesson.description}
                  </p>
                </div>

                <button
                  onClick={() => {
                    playClick();
                    onSelectLesson(lesson);
                  }}
                  className={`mt-4 w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-transform btn-tactile ${
                    isCompleted
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'bg-amber-400 hover:bg-amber-500 text-amber-950'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isCompleted ? 'Mainkan Lagi (Latihan)' : 'Mulai Petualangan'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
