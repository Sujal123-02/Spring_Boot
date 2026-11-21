import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';

/**
 * Watermelon UI - Continuous Tabs
 * Button-like tabs with a smooth spring-animated sliding background pill.
 * Source: https://ui.watermelon.sh/animated-components/continuous-tabs
 */
export const ContinuousTabs = ({
  tabs = [],
  activeId,
  onChange,
  className = '',
  pillColor = 'bg-white',
  activeTextColor = 'text-[#1A1917]',
  inactiveTextColor = 'text-[#706D65]',
  layoutId = 'watermelon-active-pill'
}) => {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id || '');
  const active = activeId !== undefined ? activeId : internalActive;

  const handleSelect = (id) => {
    setInternalActive(id);
    if (onChange) onChange(id);
  };

  return (
    <LayoutGroup id={layoutId}>
      <nav
        className={`
          relative inline-flex items-center gap-1 p-1 rounded-2xl
          border border-[#E8E5DE] bg-[#F2F0EB]
          shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]
          transition-all duration-200 select-none
          ${className}
        `}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelect(tab.id)}
              className="relative px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold outline-none transition-colors duration-150 flex items-center gap-2"
            >
              {/* Smooth spring sliding background pill */}
              {isActive && (
                <motion.div
                  layoutId={layoutId}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 32,
                    mass: 0.8
                  }}
                  className={`
                    absolute inset-0 rounded-xl ${pillColor}
                    shadow-[0_1px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]
                    border border-black/[0.04]
                  `}
                />
              )}

              {/* Icon if provided */}
              {tab.icon && (
                <span className={`relative z-10 text-sm ${isActive ? 'text-[#7C1D2F]' : 'opacity-70'}`}>
                  {tab.icon}
                </span>
              )}

              {/* Label */}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  isActive ? activeTextColor : `${inactiveTextColor} hover:text-[#1A1917]`
                }`}
              >
                {tab.label}
              </span>

              {/* Optional counter badge */}
              {tab.count !== undefined && (
                <span
                  className={`
                    relative z-10 px-1.5 py-0.2 rounded-md text-[10px] font-bold tabular-nums transition-colors
                    ${isActive ? 'bg-[#FAF9F7] text-[#1A1917] border border-[#DDD9D0]' : 'bg-black/[0.05] text-[#8A867C]'}
                  `}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </LayoutGroup>
  );
};

export default ContinuousTabs;
