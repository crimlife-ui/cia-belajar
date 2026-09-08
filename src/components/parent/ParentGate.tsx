import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface ParentGateProps {
  correctPin: string;
  onSuccess: () => void;
  onClose: () => void;
  playClick: () => void;
  playWrong: () => void;
}

export const ParentGate: React.FC<ParentGateProps> = ({
  correctPin,
  onSuccess,
  onClose,
  playClick,
  playWrong,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Also offer simple adult challenge (e.g. 8 x 7 = 56)
  const mathChallenge = { q: '8 × 7 = ?', a: '56' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === correctPin || pinInput === mathChallenge.a) {
      playClick();
      onSuccess();
    } else {
      playWrong();
      setErrorMsg('PIN atau jawaban hitungan belum tepat.');
      setPinInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-slate-300 shadow-2xl animate-pop text-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <h3 className="font-extrabold text-lg text-slate-800">Area Orang Tua</h3>
          </div>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Masukkan PIN orang tua (default: <strong>1234</strong>) atau jawab tantangan khusus dewasa di bawah:
        </p>

        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 text-center mb-4">
          <span className="text-xs font-bold text-indigo-800 block">Tantangan Cepat:</span>
          <span className="text-xl font-black text-indigo-950">{mathChallenge.q}</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            maxLength={6}
            placeholder="Ketik PIN atau Jawaban..."
            value={pinInput}
            onChange={e => {
              setErrorMsg('');
              setPinInput(e.target.value);
            }}
            className="w-full text-center text-lg font-black tracking-widest py-2.5 px-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500"
            autoFocus
          />

          {errorMsg && <p className="text-xs text-rose-500 font-bold text-center">{errorMsg}</p>}

          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                playClick();
                onClose();
              }}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-extrabold text-xs hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs hover:bg-indigo-700 btn-tactile"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
