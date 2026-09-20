import React, { useState, useMemo } from 'react';
import {
  KIDS_DICTIONARY_ENTRIES,
  DICTIONARY_CATEGORIES,
  GRADE_FILTER_OPTIONS,
  type DictionaryEntry,
  type DictionaryCategory,
  type GradeLevel,
} from '../../data/englishDictionaryData';
import {
  Search,
  Volume2,
  Sparkles,
  BookOpen,
  Filter,
  X,
  Smile,
} from 'lucide-react';

interface EnglishDictionaryViewProps {
  playClick: () => void;
  speak: (text: string, lang?: 'id-ID' | 'en-US') => void;
  stopSpeech: () => void;
  isSpeaking: boolean;
}

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const EnglishDictionaryView: React.FC<EnglishDictionaryViewProps> = ({
  playClick,
  speak,
  stopSpeech,
  isSpeaking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DictionaryCategory>('all');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('all');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [activeAudioText, setActiveAudioText] = useState<string | null>(null);

  // Word of the Day (seeded by day of the month)
  const wordOfTheDay: DictionaryEntry = useMemo(() => {
    const todayIndex = new Date().getDate() % KIDS_DICTIONARY_ENTRIES.length;
    return KIDS_DICTIONARY_ENTRIES[todayIndex] || KIDS_DICTIONARY_ENTRIES[0];
  }, []);

  // Filter logic
  const filteredEntries = useMemo(() => {
    return KIDS_DICTIONARY_ENTRIES.filter(entry => {
      // 1. Text Search (matches English word or Indonesian translation)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesWord = entry.word.toLowerCase().includes(q);
        const matchesTrans = entry.translation.toLowerCase().includes(q);
        if (!matchesWord && !matchesTrans) return false;
      }

      // 2. Alphabet Filter
      if (selectedLetter) {
        if (!entry.word.toUpperCase().startsWith(selectedLetter)) return false;
      }

      // 3. Category Filter
      if (selectedCategory !== 'all' && entry.category !== selectedCategory) {
        return false;
      }

      // 4. Grade Filter
      if (selectedGrade !== 'all' && entry.gradeLevel !== selectedGrade) {
        return false;
      }

      return true;
    }).sort((a, b) => a.word.localeCompare(b.word));
  }, [searchQuery, selectedLetter, selectedCategory, selectedGrade]);

  // Audio helper
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

  const handleResetFilters = () => {
    playClick();
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedGrade('all');
    setSelectedLetter(null);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedGrade !== 'all' ||
    selectedLetter !== null;

  return (
    <div className="space-y-6 animate-pop">
      {/* Word of the Day Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-5 sm:p-6 text-white shadow-lg border-2 border-amber-300 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-2 flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/25 backdrop-blur-xs rounded-full text-xs font-black text-amber-950">
            <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
            <span>KATA HARI INI • WORD OF THE DAY</span>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="text-4xl p-2 bg-white/20 rounded-2xl">
              {wordOfTheDay.emoji}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-black tracking-wide">
                  {wordOfTheDay.word}
                </h3>
                <button
                  onClick={() => handleSpeakEnglish(wordOfTheDay.word)}
                  className="p-2 rounded-xl bg-white text-amber-700 hover:bg-amber-100 shadow-sm btn-tactile"
                  title="Dengarkan pelafalan bahasa Inggris"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm font-extrabold text-amber-950">
                Artinya: <span className="underline decoration-amber-300">{wordOfTheDay.translation}</span> • Cara baca: <em>"{wordOfTheDay.phonetic}"</em>
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-amber-100 italic bg-black/10 px-3 py-1.5 rounded-xl inline-block">
            "{wordOfTheDay.exampleSentence}" ({wordOfTheDay.sentenceTranslation})
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-xs p-3 rounded-2xl border border-white/30 text-xs font-bold shrink-0">
          <span>💡</span>
          <span className="max-w-[200px] leading-snug">
            Kuasai 1 kata baru setiap hari untuk memperkaya kosakata bahasa Inggrismu!
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border-2 border-indigo-100 shadow-sm space-y-4">
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari kata dalam bahasa Inggris atau Indonesia (contoh: cat, buku, makan)..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Grade Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-slate-600 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            Jenjang:
          </span>
          {GRADE_FILTER_OPTIONS.map(opt => {
            const isSelected = selectedGrade === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  playClick();
                  setSelectedGrade(opt.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all btn-tactile ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {DICTIONARY_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap flex items-center gap-1.5 transition-all btn-tactile shrink-0 ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-xs scale-102'
                    : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* A - Z Alphabet Quick Filter */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-black uppercase text-slate-400">
              Pilih Huruf Awalan (A–Z):
            </span>
            {selectedLetter && (
              <button
                onClick={() => setSelectedLetter(null)}
                className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Hapus filter huruf "{selectedLetter}"
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => {
                playClick();
                setSelectedLetter(null);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-black transition-all shrink-0 flex items-center justify-center ${
                selectedLetter === null
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua
            </button>
            {ALPHABETS.map(letter => {
              const isSelected = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => {
                    playClick();
                    setSelectedLetter(isSelected ? null : letter);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-black transition-all shrink-0 flex items-center justify-center ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs scale-110'
                      : 'bg-slate-50 text-slate-700 hover:bg-indigo-50 border border-slate-200'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result Count and Active Filters info */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-black text-slate-800">
            Ditemukan {filteredEntries.length} Kosakata
          </span>
          {selectedLetter && (
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              Awalan "{selectedLetter}"
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Reset Semua Filter
          </button>
        )}
      </div>

      {/* Dictionary Entries Grid */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-slate-200 space-y-3">
          <Smile className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-base font-black text-slate-700">
            Kata tidak ditemukan
          </h4>
          <p className="text-xs font-semibold text-slate-500 max-w-sm mx-auto">
            Coba periksa ejaan atau gunakan kata pencarian yang lain, atau tekan tombol reset filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-black rounded-xl hover:bg-indigo-700 shadow-sm"
          >
            Tampilkan Semua Kata
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredEntries.map(entry => (
            <div
              key={entry.id}
              className="bg-white rounded-2xl p-4 border-2 border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
            >
              {/* Header: Emoji, Word, Badge, & Audio */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-slate-50 rounded-2xl border border-slate-100 group-hover:scale-105 transition-transform">
                    {entry.emoji}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-slate-900">
                        {entry.word}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {entry.partOfSpeech}
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-emerald-700 leading-tight">
                      {entry.translation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                    {entry.gradeBadge}
                  </span>
                  <button
                    onClick={() => handleSpeakEnglish(entry.word)}
                    className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white transition-all btn-tactile"
                    title={`Dengarkan pelafalan "${entry.word}"`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Pronunciation Hint */}
              <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-xl flex items-center justify-between">
                <span>Cara baca: <strong className="text-indigo-950 font-bold">"{entry.phonetic}"</strong></span>
                <button
                  onClick={() => handleSpeakIndo(entry.translation)}
                  className="text-[10px] font-bold text-indigo-600 hover:underline"
                >
                  Lafalkan Arti
                </button>
              </div>

              {/* Practical Sentence Example */}
              <div className="p-3 bg-gradient-to-r from-indigo-50/80 to-purple-50/60 rounded-xl border border-indigo-100 flex items-center justify-between gap-2">
                <div className="text-xs space-y-0.5">
                  <p className="font-extrabold text-slate-900">
                    "{entry.exampleSentence}"
                  </p>
                  <p className="text-[11px] font-semibold text-slate-500">
                    {entry.sentenceTranslation}
                  </p>
                </div>
                <button
                  onClick={() => handleSpeakEnglish(entry.exampleSentence)}
                  className="p-2 rounded-xl bg-white text-indigo-700 hover:bg-indigo-600 hover:text-white shadow-xs btn-tactile shrink-0"
                  title="Dengarkan kalimat contoh"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
