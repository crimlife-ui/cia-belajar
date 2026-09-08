import React from 'react';
import { PET_ACCESSORIES } from '../../data/accessories';

interface MascotProps {
  mood?: 'idle' | 'happy' | 'thinking' | 'celebrating';
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  equipped?: {
    hat?: string;
    glasses?: string;
    snack?: string;
  };
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'idle',
  speechText,
  size = 'md',
  equipped = {},
}) => {
  const hatItem = PET_ACCESSORIES.find(i => i.id === equipped.hat);
  const glassesItem = PET_ACCESSORIES.find(i => i.id === equipped.glasses);
  const snackItem = PET_ACCESSORIES.find(i => i.id === equipped.snack);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44',
  };

  return (
    <div className="flex items-end gap-3 select-none">
      {/* Animated SVG Character */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0 animate-float`}>
        {/* Equipped Hat */}
        {hatItem && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl z-20 animate-bounce">
            {hatItem.icon}
          </div>
        )}

        {/* Mascot Body (Mimi the Cat) */}
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Ears */}
          <polygon points="25,45 15,10 48,28" fill="#fb923c" stroke="#c2410c" strokeWidth="3" />
          <polygon points="30,40 22,18 44,30" fill="#fed7aa" />

          <polygon points="95,45 105,10 72,28" fill="#fb923c" stroke="#c2410c" strokeWidth="3" />
          <polygon points="90,40 98,18 76,30" fill="#fed7aa" />

          {/* Head */}
          <ellipse cx="60" cy="62" rx="44" ry="38" fill="#f97316" stroke="#c2410c" strokeWidth="3.5" />

          {/* White Belly/Cheeks patch */}
          <ellipse cx="60" cy="74" rx="30" ry="22" fill="#fff7ed" />

          {/* Rosy Cheeks */}
          <circle cx="33" cy="70" r="7" fill="#f43f5e" opacity="0.4" />
          <circle cx="87" cy="70" r="7" fill="#f43f5e" opacity="0.4" />

          {/* Eyes depending on mood */}
          {mood === 'happy' || mood === 'celebrating' ? (
            // Happy curved eyes ^ ^
            <>
              <path d="M 38,55 Q 45,46 52,55" fill="none" stroke="#431407" strokeWidth="4" strokeLinecap="round" />
              <path d="M 68,55 Q 75,46 82,55" fill="none" stroke="#431407" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : mood === 'thinking' ? (
            // Pondering eyes
            <>
              <ellipse cx="45" cy="52" rx="4" ry="6" fill="#431407" />
              <ellipse cx="75" cy="50" rx="5" ry="7" fill="#431407" />
              <path d="M 40,44 L 50,46" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 70,43 L 80,47" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            // Big cute sparkly eyes
            <>
              <ellipse cx="45" cy="54" rx="5.5" ry="7.5" fill="#431407" />
              <circle cx="43" cy="51" r="2.5" fill="#ffffff" />
              <circle cx="47" cy="56" r="1.2" fill="#ffffff" />

              <ellipse cx="75" cy="54" rx="5.5" ry="7.5" fill="#431407" />
              <circle cx="73" cy="51" r="2.5" fill="#ffffff" />
              <circle cx="77" cy="56" r="1.2" fill="#ffffff" />
            </>
          )}

          {/* Little Nose */}
          <polygon points="57,66 63,66 60,70" fill="#f43f5e" />

          {/* Cute Mouth */}
          <path d="M 55,70 Q 60,74 60,71 Q 60,74 65,70" fill="none" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />

          {/* Whiskers */}
          <line x1="20" y1="64" x2="35" y2="67" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="72" x2="35" y2="72" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
          <line x1="100" y1="64" x2="85" y2="67" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
          <line x1="102" y1="72" x2="85" y2="72" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Equipped Glasses */}
        {glassesItem && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-2xl z-10">
            {glassesItem.icon}
          </div>
        )}

        {/* Equipped Snack beside mascot */}
        {snackItem && (
          <div className="absolute -bottom-2 -right-2 text-2xl animate-wiggle">
            {snackItem.icon}
          </div>
        )}
      </div>

      {/* Speech Bubble */}
      {speechText && (
        <div className="relative bg-white border-2 border-orange-200 rounded-2xl rounded-bl-none px-4 py-2.5 shadow-md max-w-xs animate-pop">
          <p className="text-xs sm:text-sm font-bold text-slate-700 leading-snug">
            {speechText}
          </p>
        </div>
      )}
    </div>
  );
};
