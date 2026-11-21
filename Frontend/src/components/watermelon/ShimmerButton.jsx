import React from 'react';

/**
 * Watermelon UI - Shimmer Button
 * Button with an animated ambient shimmer sweep effect on hover.
 * Source: https://ui.watermelon.sh/animated-components/shimmer-button
 */
export const ShimmerButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary', // 'primary' (Terra Sol), 'dark' (Obsidian), 'alpine' (Alpine Moss)
  size = 'md',
  disabled = false,
  type = 'button',
  icon: Icon,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#7C1D2F] hover:bg-[#621422] text-white shadow-[0_2px_12px_rgba(124,29,47,0.3)]',
    dark: 'bg-[#1A1917] hover:bg-[#2E2C28] text-white shadow-xs',
    alpine: 'bg-[#2A5C43] hover:bg-[#1E4330] text-white shadow-[0_2px_10px_rgba(42,92,67,0.3)]'
  };

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-xs sm:text-sm',
    lg: 'px-6 py-3.5 text-sm sm:text-base'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl font-bold transition-all duration-300
        active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group
        inline-flex items-center justify-center gap-2
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
      {...props}
    >
      {/* Icon if provided */}
      {Icon && <Icon className="w-4 h-4 relative z-10 transition-transform group-hover:scale-110" />}

      {/* Button Text */}
      <span className="relative z-10 tracking-tight">{children}</span>

      {/* Watermelon Light Sweep Shimmer Effect */}
      <div
        className="
          absolute inset-0 -translate-x-full
          bg-gradient-to-r from-transparent via-white/25 to-transparent
          group-hover:translate-x-full transition-transform duration-700 ease-in-out
          pointer-events-none
        "
      />
    </button>
  );
};

export default ShimmerButton;
