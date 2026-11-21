import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  disabled = false,
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold disabled:opacity-50 disabled:pointer-events-none rounded-xl transition-colors duration-150';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2 gap-2 h-10',
    lg: 'text-sm sm:text-base px-5 py-2.5 gap-2.5 h-12',
  };

  const variantStyles = {
    primary: 'bg-[#7C1D2F] text-white hover:bg-[#621422] shadow-sm hover:shadow-[0_4px_16px_rgba(124,29,47,0.25)] border border-transparent',
    secondary: 'bg-white text-[#1A1917] border border-[#E5E2DA] hover:bg-[#F3F1EC] hover:border-[#CCC8BD] shadow-xs',
    alpine: 'bg-[#2A5C43] text-white hover:bg-[#204734] shadow-sm border border-transparent',
    ghost: 'bg-transparent text-[#666257] hover:text-[#1A1917] hover:bg-[#F3F1EC] border border-transparent',
    destructive: 'bg-[#FDF2F2] text-[#C53030] border border-[#FECACA] hover:bg-[#C53030] hover:text-white',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </motion.button>
  );
};
