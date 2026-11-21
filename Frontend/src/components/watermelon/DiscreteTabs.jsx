import React from 'react';
import { motion } from 'framer-motion';

/**
 * Watermelon UI - Discrete Tabs
 * Animated tabs with smooth morphing transitions and spring physical bounds.
 * Source: https://ui.watermelon.sh/animated-components/discrete-tabs
 */
export const DiscreteTabs = ({
  tabs = [],
  activeId,
  onChange,
  layoutId = 'watermelon-discrete-tabs',
  className = ''
}) => {
  return (
    <div className={`relative flex items-center gap-1 p-1 rounded-2xl bg-[#F3F1EC] border border-[#E5E2DA] select-none ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange?.(tab.id)}
            className={`
              relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors duration-150 outline-none
              ${isActive ? 'text-[#1A1917]' : 'text-[#827E74] hover:text-[#1A1917]'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 32,
                  mass: 0.8
                }}
                className="absolute inset-0 rounded-xl bg-white shadow-xs border border-[#E5E2DA]"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default DiscreteTabs;
