import React from 'react';

/**
 * Startup-Grade Architectural Badge System (Airbnb/Stripe Design System)
 * Crisp typography, refined borders, and subtle tone-on-tone contrast.
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
    default: 'bg-white text-[#33312B] border border-[#E6E0D4] shadow-2xs',
    maroon: 'bg-[#7C1D2F] text-white font-bold shadow-xs',
    terra: 'bg-[#7C1D2F] text-white font-bold shadow-xs',
    terraSolid: 'bg-[#7C1D2F] text-white font-bold shadow-xs',
    neutral: 'bg-[#FAF8F5] text-[#1C1917] border border-[#E6E0D4] font-semibold',
    alpine: 'bg-[#ECF6F0] text-[#24543C] border border-[#C6E2D2] font-semibold',
    alpineSolid: 'bg-[#24543C] text-white font-bold shadow-xs',
    success: 'bg-[#ECF6F0] text-[#24543C] border border-[#C6E2D2] font-semibold',
    warning: 'bg-white text-[#1C1917] border border-[#E6E0D4] font-semibold shadow-2xs',
    darkGlass: 'bg-black/75 backdrop-blur-md text-white border border-white/20 font-semibold shadow-sm',
    accent: 'bg-white text-[#7C1D2F] border border-[#E6E0D4] font-bold shadow-2xs',
  };

  return (
    <span className={`inline-flex items-center rounded-full transition-colors duration-150 ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.default} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
