import React, { useState } from 'react';
import { Eye, ShieldCheck } from 'lucide-react';
import { Mascot } from '../mascot/Mascot';

interface ScreenBreakModalProps {
  onUnlockMoreTime: (extraMinutes: number) => void;
  correctPin: string;
  playClick: () => void;
}

export const ScreenBreakModal: React.FC<ScreenBreakModalProps> = ({
  onUnlockMoreTime,
  correctPin,
  playClick,
}) => {
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin || pin === '56') {
      playClick();
      onUnlockMoreTime(15); // Add 15 more minutes
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-indigo-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-indigo-300 shadow-2xl text-center animate-pop text-slate-800">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-indigo-200">
          <Eye className="w-8 h-8 text-indigo-600 animate-pulse" />
        </div>

        <h2 className="text-2xl font-black text-indigo-950 mb-1">
          Waktunya Istirahatkan Matamu! 👀
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Hebat banget belajarnya hari ini! Sekarang yuk minum air putih, regangkan badan, dan lihat pemandangan jauh.
        </p>

        <div className="flex justify-center my-3">
          <Mascot mood="happy" speechText="Mimi juga mau tidur siang sebentar ya, Meow~" />
        </div>

        {!showPinInput ? (
          <button
            onClick={() => setShowPinInput(true)}
            className="mt-4 text-xs font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1.5 mx-auto"
          >
            <ShieldCheck className="w-4 h-4" />
            Buka Waktu Tambahan (Untuk Orang Tua)
          </button>
        ) : (
          <form onSubmit={handleUnlock} className="mt-4 p-3 bg-indigo-50 rounded-2xl border border-indigo-100">
            <span className="text-xs font-bold text-indigo-900 block mb-2">
              Ketik PIN orang tua untuk tambah 15 menit:
            </span>
            <div className="flex gap-2 justify-center">
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={e => {
                  setError(false);
                  setPin(e.target.value);
                }}
                placeholder="PIN"
                className="w-24 text-center font-bold py-1.5 px-2 border-2 border-indigo-300 rounded-xl focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 btn-tactile"
              >
                Tambah
              </button>
            </div>
            {error && <span className="text-[11px] text-rose-500 font-bold mt-1 block">PIN salah.</span>}
          </form>
        )}
      </div>
    </div>
  );
};
