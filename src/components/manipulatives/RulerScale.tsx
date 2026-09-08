import React, { useState } from 'react';
import { Ruler, Gauge } from 'lucide-react';

interface RulerScaleProps {
  initialValue?: { lengthCm?: number; objectName?: string };
}

export const RulerScale: React.FC<RulerScaleProps> = ({ initialValue }) => {
  const [activeTab, setActiveTab] = useState<'ruler' | 'dial'>('ruler');
  const [measuredCm, setMeasuredCm] = useState(initialValue?.lengthCm ?? 14);
  const [weightGrams, setWeightGrams] = useState(550);

  return (
    <div className="bg-white/95 rounded-3xl p-5 border-4 border-amber-200 shadow-lg text-slate-800">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('ruler')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'ruler'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            Penggaris (Panjang)
          </button>
          <button
            onClick={() => setActiveTab('dial')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'dial'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            Timbangan (Berat)
          </button>
        </div>
      </div>

      {activeTab === 'ruler' ? (
        <div className="flex flex-col items-center">
          {/* Object on top of ruler */}
          <div className="relative w-full max-w-sm h-16 flex items-center justify-start px-4">
            <div
              className="h-8 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-r-full border-2 border-amber-700 flex items-center justify-center text-xs font-extrabold text-amber-950 shadow-md transition-all"
              style={{
                width: `${(measuredCm / 20) * 100}%`,
                minWidth: '40px',
              }}
            >
              ✏️ {initialValue?.objectName ?? 'Pensil'} ({measuredCm} cm)
            </div>
          </div>

          {/* Interactive Ruler Display */}
          <div className="w-full max-w-sm h-16 bg-amber-200 border-2 border-amber-400 rounded-xl flex flex-col justify-end px-4 shadow-inner relative overflow-hidden">
            {/* 0 to 20 cm marks */}
            <div className="flex justify-between items-end h-10 w-full">
              {Array.from({ length: 21 }).map((_, cm) => (
                <div key={cm} className="flex flex-col items-center">
                  <div
                    className={`w-[1.5px] bg-slate-800 ${
                      cm % 5 === 0 ? 'h-6 bg-slate-900 w-[2px]' : cm % 2 === 0 ? 'h-4' : 'h-2.5'
                    }`}
                  />
                  {cm % 2 === 0 && (
                    <span className="text-[10px] font-bold text-slate-700 -mt-0.5">{cm}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Slider Controller */}
          <div className="w-full max-w-xs mt-4 flex flex-col items-center">
            <label className="text-xs font-bold text-amber-800 mb-1">
              Geser untuk mengubah panjang benda:
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={measuredCm}
              onChange={e => setMeasuredCm(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-sm font-black text-amber-700 mt-1">
              Panjang: {measuredCm} cm = {measuredCm * 10} mm
            </span>
          </div>
        </div>
      ) : (
        /* Dial Weight Scale */
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 bg-white border-4 border-amber-300 rounded-full flex items-center justify-center shadow-md">
            {/* Scale Markings */}
            <span className="absolute top-2 text-[11px] font-black text-slate-700">0 / 1000g</span>
            <span className="absolute right-2 text-[11px] font-bold text-slate-500">250g</span>
            <span className="absolute bottom-2 text-[11px] font-bold text-slate-500">500g</span>
            <span className="absolute left-2 text-[11px] font-bold text-slate-500">750g</span>

            {/* Dial Needle Pointer */}
            <div
              className="absolute w-1 h-16 bg-rose-600 rounded-full origin-bottom bottom-1/2 left-[calc(50%-2px)] shadow transition-transform duration-200 ease-out"
              style={{
                transform: `rotate(${(weightGrams / 1000) * 360}deg)`,
              }}
            />
            {/* Center Pin */}
            <div className="w-4 h-4 bg-slate-800 border-2 border-white rounded-full z-10" />
          </div>

          {/* Weight Controls */}
          <div className="w-full max-w-xs mt-4 flex flex-col items-center">
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={weightGrams}
              onChange={e => setWeightGrams(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="text-center mt-2">
              <span className="text-base font-black text-amber-900">{weightGrams} gram</span>
              <span className="text-xs text-slate-500 block">
                ({weightGrams >= 1000 ? '1 kg' : `${weightGrams / 1000} kg`})
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
