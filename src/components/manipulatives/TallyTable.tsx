import React, { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

interface TallyTableProps {
  initialValue?: { count?: number };
}

export const TallyTable: React.FC<TallyTableProps> = ({ initialValue }) => {
  const [count, setCount] = useState(initialValue?.count ?? 8);

  const fullBundles = Math.floor(count / 5);
  const remaining = count % 5;

  return (
    <div className="bg-white/95 rounded-3xl p-5 border-4 border-rose-200 shadow-lg text-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <h3 className="font-extrabold text-lg text-rose-800">Papan Turus (Tally Marks)</h3>
        </div>
        <button
          onClick={() => setCount(0)}
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Nol
        </button>
      </div>

      {/* Visual Tally Board */}
      <div className="w-full min-h-[110px] bg-rose-50/70 border-2 border-rose-100 rounded-2xl p-4 flex flex-wrap items-center justify-center gap-4">
        {Array.from({ length: fullBundles }).map((_, bIdx) => (
          <div
            key={`bundle-${bIdx}`}
            title="Satu ikat (5)"
            className="relative w-14 h-16 flex items-center justify-between px-1.5 py-1 bg-white rounded-xl border-2 border-rose-300 shadow-sm animate-pop"
          >
            {/* 4 Vertical lines */}
            <div className="w-1.5 h-11 bg-rose-600 rounded-full" />
            <div className="w-1.5 h-11 bg-rose-600 rounded-full" />
            <div className="w-1.5 h-11 bg-rose-600 rounded-full" />
            <div className="w-1.5 h-11 bg-rose-600 rounded-full" />

            {/* 1 Diagonal strike */}
            <div className="absolute top-1/2 left-0 w-16 h-1.5 bg-rose-800 rounded-full -rotate-45 origin-center shadow" />
          </div>
        ))}

        {remaining > 0 && (
          <div
            title={`${remaining} satuan`}
            className="relative w-14 h-16 flex items-center justify-start gap-2 px-2.5 py-1 bg-white rounded-xl border-2 border-rose-200 shadow-sm animate-pop"
          >
            {Array.from({ length: remaining }).map((_, rIdx) => (
              <div key={`rem-${rIdx}`} className="w-1.5 h-11 bg-rose-500 rounded-full" />
            ))}
          </div>
        )}

        {count === 0 && (
          <span className="text-sm font-semibold text-slate-400">Belum ada turus. Tekan (+) di bawah!</span>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCount(c => Math.max(0, c - 1))}
            className="w-10 h-10 rounded-xl bg-rose-200 hover:bg-rose-300 active:scale-95 flex items-center justify-center font-bold text-rose-800 transition-transform shadow-sm"
          >
            <Minus className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCount(c => Math.min(30, c + 1))}
            className="w-10 h-10 rounded-xl bg-rose-500 hover:bg-rose-600 active:scale-95 flex items-center justify-center font-bold text-white transition-transform shadow-sm"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-slate-500 block">Total Frekuensi:</span>
          <span className="text-2xl font-black text-rose-700">{count}</span>
        </div>
      </div>
      <p className="text-xs text-center text-slate-500 mt-2 italic">
        💡 Setiap kelipatan 5, garis miring akan otomatis mengikat 4 garis tegak!
      </p>
    </div>
  );
};
