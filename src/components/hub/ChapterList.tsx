import { useState, useEffect } from 'react';
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
  Download,
  X,
  Smartphone,
  CheckCircle2,
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
  onOpenPkn?: () => void;
  onOpenBahasa?: () => void;
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
  onOpenPkn,
  onOpenBahasa,
  playClick,
  equipped,
  screenTimeRemaining,
  isWakeLocked,
}) => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(CURRICULUM[0]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [showInstallGuide, setShowInstallGuide] = useState<boolean>(false);

  useEffect(() => {
    // Check if already in standalone/installed mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    playClick();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstalled(true);
      }
    } else {
      // Show instructional modal on iOS Safari or when browser has installed it
      setShowInstallGuide(true);
    }
  };

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

          {onOpenPkn && (
            <button
              onClick={() => {
                playClick();
                onOpenPkn();
              }}
              title="Pendidikan Pancasila & Kewarganegaraan (PKn) Kelas 3 SD"
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-2xl text-xs font-black shadow-sm btn-tactile"
            >
              <span>🇮🇩</span>
              <span>Modul PKn</span>
            </button>
          )}

          {onOpenBahasa && (
            <button
              onClick={() => {
                playClick();
                onOpenBahasa();
              }}
              title="Bahasa Indonesia Kelas 3 SD (Buku Kawan Seiring)"
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-2xl text-xs font-black shadow-sm btn-tactile"
            >
              <span>📚</span>
              <span>B. Indonesia</span>
            </button>
          )}

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

          {!isInstalled && (
            <button
              onClick={handleInstallApp}
              title="Pasang / Install Aplikasi di HP, Tablet, atau Laptop (Bisa Diakses Seperti Aplikasi Asli)"
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-3 py-1.5 rounded-2xl text-xs font-black shadow-md btn-tactile animate-pulse"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App 📲</span>
            </button>
          )}

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
            {onOpenPkn && (
              <button
                onClick={() => {
                  playClick();
                  onOpenPkn();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-sm btn-tactile border border-rose-700"
              >
                <span>🇮🇩</span>
                <span>Pendidikan Pancasila (PKn)</span>
              </button>
            )}
            {onOpenBahasa && (
              <button
                onClick={() => {
                  playClick();
                  onOpenBahasa();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-sm btn-tactile border border-blue-700"
              >
                <span>📚</span>
                <span>Bahasa Indonesia (SPOK & Cerita)</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 cursor-pointer" onClick={onOpenPetRoom}>
          <Mascot
            size="md"
            mood="happy"
            speechText="Ayo belajar matematika, PKn, bahasa Indonesia & Inggris bareng Mimi!"
            equipped={equipped}
          />
        </div>
      </div>

      {/* Showcase Grid: Semua Mata Pelajaran Kurikulum Merdeka Kelas 3 SD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <button
          onClick={() => {
            playClick();
            onOpenPkn?.();
          }}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-sm border-2 border-rose-400 text-left btn-tactile group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl group-hover:scale-110 transition-transform">🇮🇩</span>
              <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">Baru ✨</span>
            </div>
            <h4 className="font-black text-xs sm:text-sm">Pendidikan Pancasila</h4>
            <p className="text-[10px] text-rose-100 font-medium mt-0.5">
              5 Sila, Hak & Kewajiban, Bhinneka Tunggal Ika
            </p>
          </div>
          <span className="text-[10px] font-bold text-rose-200 mt-2 flex items-center gap-1">
            Buka Modul ➔
          </span>
        </button>

        <button
          onClick={() => {
            playClick();
            onOpenBahasa?.();
          }}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-sm border-2 border-indigo-400 text-left btn-tactile group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl group-hover:scale-110 transition-transform">📚</span>
              <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">Baru ✨</span>
            </div>
            <h4 className="font-black text-xs sm:text-sm">Bahasa Indonesia</h4>
            <p className="text-[10px] text-indigo-100 font-medium mt-0.5">
              Struktur SPOK, Sinonim-Antonim, Pantun
            </p>
          </div>
          <span className="text-[10px] font-bold text-indigo-200 mt-2 flex items-center gap-1">
            Buka Modul ➔
          </span>
        </button>

        <button
          onClick={() => {
            playClick();
            onOpenEnglish();
          }}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-sm border-2 border-emerald-400 text-left btn-tactile group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl group-hover:scale-110 transition-transform">🇬🇧</span>
              <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">English</span>
            </div>
            <h4 className="font-black text-xs sm:text-sm">English Zone</h4>
            <p className="text-[10px] text-emerald-100 font-medium mt-0.5">
              Tenses, Vocabulary, Dictionary & Kuis
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-200 mt-2 flex items-center gap-1">
            Buka Modul ➔
          </span>
        </button>

        <button
          onClick={() => {
            playClick();
            onOpenExam();
          }}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-sm border-2 border-pink-400 text-left btn-tactile group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl group-hover:scale-110 transition-transform">📝</span>
              <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">Ulangan</span>
            </div>
            <h4 className="font-black text-xs sm:text-sm">Ruang Ulangan</h4>
            <p className="text-[10px] text-pink-100 font-medium mt-0.5">
              20–100 Soal + Kertas Cakar Layar Penuh
            </p>
          </div>
          <span className="text-[10px] font-bold text-pink-200 mt-2 flex items-center gap-1">
            Mulai Ujian ➔
          </span>
        </button>
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

      {/* PWA Install Guide Modal */}
      {showInstallGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border-4 border-amber-300 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-100 text-emerald-700 rounded-2xl">
                  <Smartphone className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-black text-base text-slate-900">
                    Pasang Aplikasi Cia Belajar
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500">
                    Bisa dibuka tanpa perlu ketik alamat web lagi!
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowInstallGuide(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 font-semibold bg-amber-50 p-4 rounded-2xl border border-amber-200">
              <p className="font-black text-amber-950 text-sm flex items-center gap-1.5">
                <span>📱</span>
                <span>Cara Pasang di HP / Tablet / Laptop:</span>
              </p>

              <div className="space-y-2 pt-1">
                <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    1
                  </span>
                  <p>
                    <strong>Di Chrome / Edge (Android & PC):</strong> Klik menu titik tiga (⋮) di pojok kanan atas, lalu pilih <strong>"Install aplikasi"</strong> atau <strong>"Tambahkan ke layar utama"</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-amber-200">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    2
                  </span>
                  <p>
                    <strong>Di Safari (iPhone / iPad):</strong> Tekan tombol Bagikan / Share (ikon kotak dengan panah ke atas <span className="inline-block border px-1 rounded bg-slate-100 font-sans">↑</span>), gulir ke bawah dan pilih <strong>"Add to Home Screen (Tambah ke Layar Utama)"</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-bold text-[11px]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Setelah terpasang, ikon Cia Belajar akan langsung muncul di layar utama seperti aplikasi Play Store / App Store!</span>
              </div>
            </div>

            <button
              onClick={() => setShowInstallGuide(false)}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black text-xs shadow-md btn-tactile"
            >
              Saya Mengerti 👍
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
