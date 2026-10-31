import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';

interface VerifiedRedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  customText?: string;
  withGlow?: boolean;
}

export const VerifiedRedBadge: React.FC<VerifiedRedBadgeProps> = ({
  size = 'md',
  showText = true,
  customText = 'Verified Creator',
  withGlow = true,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-sm sm:text-base px-3.5 py-1.5 gap-2 font-semibold',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 18,
  };

  return (
    <div
      className={`inline-flex items-center rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-400 font-medium ${
        sizeClasses[size]
      } ${withGlow ? 'shadow-[0_0_12px_rgba(244,63,94,0.35)]' : ''}`}
      title="Official Verified Mentor & Course Creator"
    >
      {/* Red Tick Icon Circle */}
      <span className="relative flex items-center justify-center">
        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-sm ring-2 ring-rose-500/30">
          <Check size={iconSizes[size]} strokeWidth={3.5} className="text-white drop-shadow" />
        </span>
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
      </span>

      {showText && (
        <span className="tracking-wide flex items-center gap-1 text-rose-200 font-semibold">
          {customText}
        </span>
      )}
    </div>
  );
};
