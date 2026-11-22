import React from 'react';

/**
 * Weekend Brand Logo Component
 * Features a custom vector emblem representing the Golden Hour Sunrise over Trail Peaks,
 * paired with a distinctive, warm, personality-rich wordmark.
 */
export const BrandLogo = ({ variant = 'default', size = 'md', className = '' }) => {
  const sizeConfig = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-11 h-11', text: 'text-2xl', sub: 'text-xs' },
  };

  const { icon, text, sub } = sizeConfig[size] || sizeConfig.md;

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer select-none ${className}`}>
      {/* Custom Vector Emblem: Twin Sunlit Peaks + Rising Sun (Maroon Heritage Edition) */}
      <div className={`relative ${icon} rounded-2xl bg-gradient-to-br from-[#9E2A3F] via-[#7C1D2F] to-[#5C1321] p-1.5 shadow-[0_2px_10px_rgba(124,29,47,0.30)] group-hover:shadow-[0_4px_16px_rgba(124,29,47,0.40)] group-hover:scale-105 transition-all duration-200 flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Golden Sun Rising in Horizon */}
          <circle cx="16" cy="11" r="3.5" fill="#F8E7EA" />
          
          {/* Continuous Fluid Twin Peaks / W Ribbon */}
          <path
            d="M6 21L11.5 13.5L16 19.5L20.5 13.5L26 21"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle Trail Compass Spark */}
          <circle cx="16" cy="23" r="1.5" fill="#F8E7EA" />
        </svg>
      </div>

      {/* Styled Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span className={`${text} font-black tracking-[-0.035em] ${variant === 'light' ? 'text-[#FAF8F5]' : 'text-[#1A1917]'} leading-none`}>
            weekend
          </span>
          {/* Velvet Maroon dot accent */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C1D2F] ml-0.5 mb-0.5 inline-block"></span>
        </div>
        <span className={`${sub} font-semibold ${variant === 'light' ? 'text-[#A8A29E]' : 'text-[#827E74]'} tracking-[0.12em] uppercase leading-none mt-1`}>
          experiences
        </span>
      </div>
    </div>
  );
};
