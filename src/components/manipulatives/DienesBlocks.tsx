import React, { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface DienesBlocksProps {
  initialValue?: { hundreds: number; tens: number; ones: number };
}

export const DienesBlocks: React.FC<DienesBlocksProps> = ({ initialValue }) => {
  const [hundreds, setHundreds] = useState(initialValue?.hundreds ?? 2);
  const [tens, setTens] = useState(initialValue?.tens ?? 3);
  const [ones, setOnes] = useState(initialValue?.ones ?? 5);

  const total = hundreds * 100 + tens * 10 + ones;

  const reset = () => {
    setHundreds(initialValue?.hundreds ?? 0);
    setTens(initialValue?.tens ?? 0);
    setOnes(initialValue?.ones ?? 0);
  };

  return (
    <div className="bg-white/95 rounded-3xl p-5 border-4 border-emerald-200 shadow-lg text-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧱</span>
          <h3 className="font-extrabold text-lg text-emerald-800">Alat Peraga: Balok Nilai Tempat</h3>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Value Summary Display */}
      <div className="bg-emerald-50 rounded-2xl p-3 border-2 border-emerald-200 mb-5 text-center">
        <div className="text-sm font-semibold text-emerald-700 mb-1">
          {hundreds} Ratusan ({hundreds * 100}) + {tens} Puluhan ({tens * 10}) + {ones} Satuan ({ones})
        </div>
        <div className="text-3xl font-black text-emerald-600 tracking-wider">
          = {total}
        </div>
      </div>

      {/* Grid of 3 Columns: Ratusan, Puluhan, Satuan */}
      <div className="grid grid-cols-3 gap-3">
        {/* Ratusan Column */}
        <div className="bg-emerald-50/70 rounded-2xl p-3 border-2 border-emerald-100 flex flex-col items-center">
          <span className="text-xs font-bold uppercase text-emerald-700 mb-1">Ratusan (100)</span>
          <div className="flex items-center gap-2 my-2">
            <button
              onClick={() => setHundreds(h => Math.max(0, h - 1))}
              className="w-8 h-8 rounded-full bg-emerald-200 hover:bg-emerald-300 active:scale-95 flex items-center justify-center font-bold text-emerald-800 transition-transform"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xl font-black w-6 text-center text-emerald-900">{hundreds}</span>
            <button
              onClick={() => setHundreds(h => Math.min(9, h + 1))}
              className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 flex items-center justify-center font-bold text-white transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {/* Visual Hundreds Plates */}
          <div className="w-full min-h-[90px] max-h-[140px] overflow-y-auto flex flex-wrap justify-center gap-1.5 p-1 bg-white rounded-xl border border-emerald-100">
            {Array.from({ length: hundreds }).map((_, i) => (
              <div
                key={i}
                title="Lempeng 100"
                className="w-10 h-10 bg-emerald-400 border-2 border-emerald-600 rounded-md grid grid-cols-3 grid-rows-3 gap-[1px] p-0.5 shadow-sm animate-pop"
              >
                {Array.from({ length: 9 }).map((_, j) => (
                  <div key={j} className="bg-emerald-300 rounded-[1px]" />
                ))}
              </div>
            ))}
            {hundreds === 0 && <span className="text-xs text-slate-400 my-auto">Kosong</span>}
          </div>
        </div>

        {/* Puluhan Column */}
        <div className="bg-sky-50/70 rounded-2xl p-3 border-2 border-sky-100 flex flex-col items-center">
          <span className="text-xs font-bold uppercase text-sky-700 mb-1">Puluhan (10)</span>
          <div className="flex items-center gap-2 my-2">
            <button
              onClick={() => setTens(t => Math.max(0, t - 1))}
              className="w-8 h-8 rounded-full bg-sky-200 hover:bg-sky-300 active:scale-95 flex items-center justify-center font-bold text-sky-800 transition-transform"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xl font-black w-6 text-center text-sky-900">{tens}</span>
            <button
              onClick={() => setTens(t => Math.min(9, t + 1))}
              className="w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-600 active:scale-95 flex items-center justify-center font-bold text-white transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {/* Visual Tens Bars */}
          <div className="w-full min-h-[90px] max-h-[140px] overflow-y-auto flex flex-wrap justify-center gap-1.5 p-1 bg-white rounded-xl border border-sky-100">
            {Array.from({ length: tens }).map((_, i) => (
              <div
                key={i}
                title="Batang 10"
                className="w-3.5 h-12 bg-sky-400 border-2 border-sky-600 rounded-sm flex flex-col justify-between p-[1px] shadow-sm animate-pop"
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="h-[2px] bg-sky-200 rounded-[1px]" />
                ))}
              </div>
            ))}
            {tens === 0 && <span className="text-xs text-slate-400 my-auto">Kosong</span>}
          </div>
        </div>

        {/* Satuan Column */}
        <div className="bg-amber-50/70 rounded-2xl p-3 border-2 border-amber-100 flex flex-col items-center">
          <span className="text-xs font-bold uppercase text-amber-700 mb-1">Satuan (1)</span>
          <div className="flex items-center gap-2 my-2">
            <button
              onClick={() => setOnes(o => Math.max(0, o - 1))}
              className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 active:scale-95 flex items-center justify-center font-bold text-amber-800 transition-transform"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xl font-black w-6 text-center text-amber-900">{ones}</span>
            <button
              onClick={() => setOnes(o => Math.min(9, o + 1))}
              className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 flex items-center justify-center font-bold text-white transition-transform"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {/* Visual Ones Cubes */}
          <div className="w-full min-h-[90px] max-h-[140px] overflow-y-auto flex flex-wrap justify-center content-start gap-1.5 p-1 bg-white rounded-xl border border-amber-100">
            {Array.from({ length: ones }).map((_, i) => (
              <div
                key={i}
                title="Kubus 1"
                className="w-3.5 h-3.5 bg-amber-400 border-2 border-amber-600 rounded-sm shadow-sm animate-pop"
              />
            ))}
            {ones === 0 && <span className="text-xs text-slate-400 my-auto">Kosong</span>}
          </div>
        </div>
      </div>
      <p className="text-xs text-center text-slate-500 mt-3 italic">
        💡 Tekan tombol (+) atau (-) untuk menyusun balok dan menemukan jawabannya!
      </p>
    </div>
  );
};
