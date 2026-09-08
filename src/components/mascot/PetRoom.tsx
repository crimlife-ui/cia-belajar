import React from 'react';
import { PET_ACCESSORIES } from '../../data/accessories';
import { Mascot } from './Mascot';
import { Coins, Check, Lock, ArrowLeft } from 'lucide-react';

interface PetRoomProps {
  coins: number;
  unlockedItems: string[];
  equipped: { hat?: string; glasses?: string; snack?: string };
  onBuyItem: (itemId: string, price: number) => boolean;
  onEquipItem: (type: 'hat' | 'glasses' | 'snack', itemId?: string) => void;
  onBack: () => void;
  playClick: () => void;
  playCoin: () => void;
}

export const PetRoom: React.FC<PetRoomProps> = ({
  coins,
  unlockedItems,
  equipped,
  onBuyItem,
  onEquipItem,
  onBack,
  playClick,
  playCoin,
}) => {
  const [selectedTab, setSelectedTab] = React.useState<'hat' | 'glasses' | 'snack'>('hat');

  const filteredItems = PET_ACCESSORIES.filter(item => item.type === selectedTab);

  const handleAction = (item: typeof PET_ACCESSORIES[0]) => {
    const isUnlocked = unlockedItems.includes(item.id) || item.price === 0;
    const isEquipped = equipped[item.type] === item.id;

    if (isEquipped) {
      // Unequip
      playClick();
      onEquipItem(item.type, undefined);
    } else if (isUnlocked) {
      // Equip
      playClick();
      onEquipItem(item.type, item.id);
    } else {
      // Buy
      if (coins >= item.price) {
        const success = onBuyItem(item.id, item.price);
        if (success) {
          playCoin();
          onEquipItem(item.type, item.id);
        }
      } else {
        playClick();
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 animate-pop">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-2xl border-2 border-slate-200 text-slate-700 font-extrabold hover:bg-slate-50 btn-tactile"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>

        <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-100 border-2 border-amber-300 rounded-2xl shadow-sm">
          <Coins className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span className="text-lg font-black text-amber-900">{coins} Koin</span>
        </div>
      </div>

      {/* Mascot Wardrobe Stage */}
      <div className="bg-gradient-to-b from-orange-100 via-amber-50 to-white rounded-3xl p-6 border-4 border-orange-200 shadow-xl flex flex-col items-center mb-6">
        <span className="text-xs font-black uppercase tracking-wider text-orange-600 mb-2">
          Kamar Lemari & Camilan Mimi
        </span>

        <div className="my-2">
          <Mascot
            size="lg"
            mood="happy"
            speechText="Meow! Aku makin keren kalau pakai topi dan kacamata baru!"
            equipped={equipped}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-4">
        {(['hat', 'glasses', 'snack'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => {
              playClick();
              setSelectedTab(tab);
            }}
            className={`flex-1 py-2.5 rounded-2xl text-xs font-black uppercase transition-all ${
              selectedTab === tab
                ? 'bg-orange-500 text-white shadow-md scale-105'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-orange-50'
            }`}
          >
            {tab === 'hat' ? '👒 Topi' : tab === 'glasses' ? '👓 Kacamata' : '🍩 Camilan'}
          </button>
        ))}
      </div>

      {/* Item Catalog Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filteredItems.map(item => {
          const isUnlocked = unlockedItems.includes(item.id) || item.price === 0;
          const isEquipped = equipped[item.type] === item.id;
          const canAfford = coins >= item.price;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-4 border-2 flex flex-col items-center text-center shadow-sm transition-all ${
                isEquipped
                  ? 'border-emerald-400 bg-emerald-50/40 ring-2 ring-emerald-300'
                  : 'border-slate-200 hover:border-orange-300'
              }`}
            >
              <span className="text-4xl mb-2">{item.icon}</span>
              <h4 className="font-extrabold text-sm text-slate-800">{item.name}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{item.description}</p>

              <button
                onClick={() => handleAction(item)}
                disabled={!isUnlocked && !canAfford}
                className={`mt-3 w-full py-2 px-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-transform btn-tactile ${
                  isEquipped
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : isUnlocked
                    ? 'bg-sky-500 text-white hover:bg-sky-600'
                    : canAfford
                    ? 'bg-amber-400 text-amber-950 hover:bg-amber-500'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                {isEquipped ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Dipakai
                  </>
                ) : isUnlocked ? (
                  'Pakai'
                ) : (
                  <>
                    {canAfford ? <Coins className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    {item.price} Koin
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
