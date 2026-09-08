import React, { useState } from 'react';

interface ShapeDetectorProps {
  initialValue?: { shape?: 'triangle' | 'square' | 'rectangle' | 'circle' };
}

export const ShapeDetector: React.FC<ShapeDetectorProps> = ({ initialValue }) => {
  const [shape, setShape] = useState<'triangle' | 'square' | 'rectangle' | 'circle'>(
    initialValue?.shape ?? 'triangle'
  );
  const [highlightMode, setHighlightMode] = useState<'sisi' | 'sudut' | 'titik'>('sisi');

  const shapeInfo = {
    triangle: {
      name: 'Segitiga',
      sisi: 3,
      sudut: 3,
      titikSudut: 3,
      jenisSudut: 'Lancip / Siku-siku',
      description: 'Dibatasi 3 ruas garis dan memiliki 3 titik sudut.',
    },
    square: {
      name: 'Persegi',
      sisi: 4,
      sudut: 4,
      titikSudut: 4,
      jenisSudut: '4 Sudut Siku-siku (90°)',
      description: 'Semua 4 sisinya SAMA PANJANG dan keempat sudutnya siku-siku.',
    },
    rectangle: {
      name: 'Persegi Panjang',
      sisi: 4,
      sudut: 4,
      titikSudut: 4,
      jenisSudut: '4 Sudut Siku-siku (90°)',
      description: 'Sisi yang berhadapan sama panjang dan keempat sudutnya siku-siku.',
    },
    circle: {
      name: 'Lingkaran',
      sisi: 1, // 1 sisi lengkung
      sudut: 0,
      titikSudut: 0,
      jenisSudut: 'Tidak memiliki sudut',
      description: 'Dibatasi oleh 1 kurva lengkung tertutup tanpa titik sudut.',
    },
  };

  const current = shapeInfo[shape];

  return (
    <div className="bg-white/95 rounded-3xl p-5 border-4 border-purple-200 shadow-lg text-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📐</span>
          <h3 className="font-extrabold text-lg text-purple-800">Laboratorium Bangun Datar</h3>
        </div>
      </div>

      {/* Shape Selector Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {(['triangle', 'square', 'rectangle', 'circle'] as const).map(s => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`py-2 px-1 rounded-2xl text-xs font-bold transition-all ${
              shape === s
                ? 'bg-purple-600 text-white shadow-md scale-105'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            {shapeInfo[s].name}
          </button>
        ))}
      </div>

      {/* Interactive Shape Canvas */}
      <div className="relative w-full h-44 bg-purple-50/60 rounded-2xl border-2 border-purple-100 flex items-center justify-center overflow-hidden">
        {shape === 'triangle' && (
          <svg className="w-36 h-36" viewBox="0 0 100 100">
            <polygon
              points="50,15 15,85 85,85"
              className={`fill-purple-200 transition-all duration-300 ${
                highlightMode === 'sisi' ? 'stroke-purple-600 stroke-[5]' : 'stroke-purple-400 stroke-2'
              }`}
            />
            {highlightMode === 'titik' && (
              <>
                <circle cx="50" cy="15" r="5" className="fill-rose-500 animate-ping" />
                <circle cx="50" cy="15" r="4" className="fill-rose-600" />
                <circle cx="15" cy="85" r="5" className="fill-rose-500 animate-ping" />
                <circle cx="15" cy="85" r="4" className="fill-rose-600" />
                <circle cx="85" cy="85" r="5" className="fill-rose-500 animate-ping" />
                <circle cx="85" cy="85" r="4" className="fill-rose-600" />
              </>
            )}
            {highlightMode === 'sudut' && (
              <>
                <path d="M 45,28 Q 50,33 55,28" fill="none" stroke="#f59e0b" strokeWidth="3" />
                <path d="M 28,80 Q 30,73 24,70" fill="none" stroke="#f59e0b" strokeWidth="3" />
                <path d="M 72,80 Q 70,73 76,70" fill="none" stroke="#f59e0b" strokeWidth="3" />
              </>
            )}
          </svg>
        )}

        {shape === 'square' && (
          <div
            className={`w-28 h-28 bg-purple-200 transition-all duration-300 relative flex items-center justify-center ${
              highlightMode === 'sisi' ? 'border-4 border-purple-600 shadow-md' : 'border-2 border-purple-400'
            }`}
          >
            {highlightMode === 'sudut' && (
              <>
                <div className="absolute top-0 left-0 w-4 h-4 border-b-2 border-r-2 border-amber-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-b-2 border-l-2 border-amber-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-t-2 border-r-2 border-amber-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-t-2 border-l-2 border-amber-500" />
              </>
            )}
            {highlightMode === 'titik' && (
              <>
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
              </>
            )}
          </div>
        )}

        {shape === 'rectangle' && (
          <div
            className={`w-36 h-20 bg-purple-200 transition-all duration-300 relative flex items-center justify-center ${
              highlightMode === 'sisi' ? 'border-4 border-purple-600 shadow-md' : 'border-2 border-purple-400'
            }`}
          >
            {highlightMode === 'sudut' && (
              <>
                <div className="absolute top-0 left-0 w-4 h-4 border-b-2 border-r-2 border-amber-500" />
                <div className="absolute top-0 right-0 w-4 h-4 border-b-2 border-l-2 border-amber-500" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-t-2 border-r-2 border-amber-500" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-t-2 border-l-2 border-amber-500" />
              </>
            )}
            {highlightMode === 'titik' && (
              <>
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
              </>
            )}
          </div>
        )}

        {shape === 'circle' && (
          <div
            className={`w-28 h-28 bg-purple-200 rounded-full transition-all duration-300 relative flex items-center justify-center ${
              highlightMode === 'sisi' ? 'border-4 border-purple-600 shadow-md' : 'border-2 border-purple-400'
            }`}
          >
            <span className="text-xs font-bold text-purple-700">1 Sisi Lengkung</span>
          </div>
        )}
      </div>

      {/* Feature Inspector Controls */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setHighlightMode('sisi')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            highlightMode === 'sisi'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-purple-100 text-purple-800'
          }`}
        >
          🔍 Sorot Sisi ({current.sisi})
        </button>
        <button
          onClick={() => setHighlightMode('sudut')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            highlightMode === 'sudut'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          📐 Sorot Sudut ({current.sudut})
        </button>
        <button
          onClick={() => setHighlightMode('titik')}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            highlightMode === 'titik'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'bg-rose-100 text-rose-800'
          }`}
        >
          🔴 Titik Sudut ({current.titikSudut})
        </button>
      </div>

      <div className="mt-3 p-3 bg-purple-50/80 rounded-xl border border-purple-100 text-center">
        <span className="text-xs font-extrabold text-purple-900 block mb-0.5">
          {current.name}: {current.description}
        </span>
        <span className="text-[11px] text-purple-700">
          Jenis Sudut: <strong>{current.jenisSudut}</strong>
        </span>
      </div>
    </div>
  );
};
