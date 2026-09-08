import React, { useState } from 'react';
import { Plus, Minus, Scale } from 'lucide-react';

interface BalanceScaleProps {
  initialValue?: { left: number; right: number; unknown?: 'left' | 'right' };
}

export const BalanceScale: React.FC<BalanceScaleProps> = ({ initialValue }) => {
  const [leftKnown] = useState(initialValue?.left ?? 150);
  const [rightTotal] = useState(initialValue?.right ?? 300);
  const [mysteryValue, setMysteryValue] = useState(100);

  const leftSum = leftKnown + mysteryValue;
  const isBalanced = leftSum === rightTotal;
  const diff = leftSum - rightTotal;

  // Tilt angle between -15 deg (left heavier) and +15 deg (right heavier)
  const angle = Math.min(15, Math.max(-15, -diff / 15));

  return (
    <div className="bg-white/95 rounded-3xl p-5 border-4 border-sky-200 shadow-lg text-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Scale className="w-6 h-6 text-sky-600" />
          <h3 className="font-extrabold text-lg text-sky-800">Neraca Keseimbangan Matematika</h3>
        </div>
        <span
          className={`text-xs font-black px-3 py-1 rounded-full transition-all ${
            isBalanced
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-300 animate-pulse'
              : 'bg-amber-100 text-amber-700 border border-amber-300'
          }`}
        >
          {isBalanced ? '⚖️ SEIMBANG (SAMA)!' : diff > 0 ? 'Kiri Lebih Berat' : 'Kanan Lebih Berat'}
        </span>
      </div>

      {/* SVG Interactive Balance Scale */}
      <div className="relative w-full h-44 flex items-center justify-center my-2 bg-gradient-to-b from-sky-50/50 to-sky-100/50 rounded-2xl border border-sky-100 overflow-hidden">
        {/* Fulcrum (Pusat Segitiga Penopang) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <div className="w-0 h-0 border-x-[20px] border-x-transparent border-b-[40px] border-b-slate-600 drop-shadow-md" />
          <div className="w-16 h-3 bg-slate-700 rounded-full" />
        </div>

        {/* Rotating Lever Arm */}
        <div
          className="absolute top-12 left-1/2 w-72 h-3.5 bg-amber-600 rounded-full origin-center transition-transform duration-300 ease-out shadow-md"
          style={{
            transform: `translateX(-50%) rotate(${angle}deg)`,
          }}
        >
          {/* Fulcrum pin center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-amber-400 border-2 border-amber-700 z-20" />

          {/* Left Pan */}
          <div className="absolute left-2 top-3.5 flex flex-col items-center">
            {/* Strings */}
            <div className="w-14 h-12 border-x-2 border-slate-400 border-t-0" />
            {/* Pan plate */}
            <div className="w-24 h-12 -mt-1 bg-amber-100 border-2 border-amber-400 rounded-b-xl flex flex-col items-center justify-center shadow-md">
              <span className="text-xs font-bold text-slate-600">{leftKnown} + ⬜</span>
              <span className="text-sm font-black text-sky-800">= {leftSum}</span>
            </div>
          </div>

          {/* Right Pan */}
          <div className="absolute right-2 top-3.5 flex flex-col items-center">
            {/* Strings */}
            <div className="w-14 h-12 border-x-2 border-slate-400 border-t-0" />
            {/* Pan plate */}
            <div className="w-24 h-12 -mt-1 bg-amber-100 border-2 border-amber-400 rounded-b-xl flex flex-col items-center justify-center shadow-md">
              <span className="text-xs font-bold text-slate-600">Total Kanan</span>
              <span className="text-sm font-black text-emerald-700">{rightTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Mystery Box */}
      <div className="mt-4 p-3 bg-sky-50 rounded-2xl border-2 border-sky-200 flex flex-col items-center">
        <span className="text-xs font-bold text-sky-700 mb-2">
          Ubah Nilai Kotak Misteri (⬜) agar neraca seimbang:
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMysteryValue(v => Math.max(0, v - 10))}
            className="w-10 h-10 rounded-xl bg-sky-200 hover:bg-sky-300 active:scale-95 flex items-center justify-center font-bold text-sky-800 transition-transform shadow-sm"
          >
            <Minus className="w-5 h-5" />
          </button>
          <div className="w-24 py-1.5 px-3 bg-white border-2 border-sky-400 rounded-xl text-center shadow-inner">
            <span className="text-2xl font-black text-sky-700">{mysteryValue}</span>
          </div>
          <button
            onClick={() => setMysteryValue(v => Math.min(500, v + 10))}
            className="w-10 h-10 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 flex items-center justify-center font-bold text-white transition-transform shadow-sm"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="text-xs text-center text-slate-500 mt-2 italic">
        💡 Cari angka untuk ⬜ sampai kedua sisi neraca berada pada ketinggian yang sama!
      </p>
    </div>
  );
};
