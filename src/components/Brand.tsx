import React from 'react';
import logoMark from '../assets/images/evolvix-mark.png';

interface BrandProps {
  compact?: boolean;
  className?: string;
}

export const Brand: React.FC<BrandProps> = ({ compact = false, className = '' }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <img
      src={logoMark}
      alt=""
      aria-hidden="true"
      className={`${compact ? 'w-8 h-8' : 'w-11 h-11'} shrink-0 object-contain`}
    />
    <span className="inline-flex items-baseline whitespace-nowrap">
      <span className={`${compact ? 'text-[17px]' : 'text-xl'} font-semibold tracking-[-0.04em] text-white`}>
        Evolvex
      </span>
      <span
        className={`${compact ? 'ml-1.5 w-7 h-7 text-[10px]' : 'ml-2 w-9 h-9 text-[11px]'} inline-flex items-center justify-center rounded-full border border-orange-300/40 bg-gradient-to-br from-[#ff8a4c] via-[#ef4d78] to-[#9b4de4] font-mono font-bold tracking-[0.08em] text-white shadow-[0_5px_18px_rgba(239,77,109,0.24)]`}
        aria-label="AI"
      >
        AI
      </span>
    </span>
  </span>
);
