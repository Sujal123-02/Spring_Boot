import React from 'react';

/**
 * Editorial Architectural Badge System (Airbnb/Stripe/Kinfolk Standard)
 * Clean typography, delicate hairline borders, and subtle tone-on-tone contrast.
 * Eliminates cheap pastel fills and noisy color blocks behind text.
 */
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 font-semibold tracking-wide',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-normal',
  };

  const variantStyles = {
    default: 'bg-white text-[#44403C] border border-[#E6E0D4] font-medium shadow-2xs',
    maroon: 'bg-[#7C1D2F] text-white font-semibold shadow-xs',
    terra: 'bg-white text-[#7C1D2F] border border-[#E6E0D4] font-semibold shadow-2xs',
    terraSolid: 'bg-[#7C1D2F] text-white font-bold shadow-xs',
    neutral: 'bg-[#FAF8F5] text-[#1C1917] border border-[#E6E0D4] font-medium',
    alpine: 'bg-white text-[#1C1917] border border-[#E6E0D4] font-semibold shadow-2xs',
    alpineSolid: 'bg-[#1C1917] text-white font-bold shadow-xs',
    success: 'bg-white text-[#1C1917] border border-[#E6E0D4] font-semibold shadow-2xs',
    warning: 'bg-white text-[#1C1917] border border-[#E6E0D4] font-semibold shadow-2xs',
    darkGlass: 'bg-white/95 backdrop-blur-md text-[#1C1917] border border-[#E6E0D4] font-semibold shadow-xs',
    accent: 'bg-white text-[#7C1D2F] border border-[#E6E0D4] font-bold shadow-2xs',
  };

  return (
    <span className={`inline-flex items-center rounded-full transition-colors duration-150 ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
