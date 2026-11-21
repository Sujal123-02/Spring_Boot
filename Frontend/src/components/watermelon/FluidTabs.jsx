import React from 'react';
import { motion } from 'framer-motion';

/**
 * Watermelon UI - Fluid Tabs
 * Fluid, spring-animated tab component with floating active indicator and icon scaling.
 * Source: https://ui.watermelon.sh/animated-components/fluid-tabs
 */
export const FluidTabs = ({
  tabs = [],
  activeId,
  onChange,
  layoutId = 'watermelon-fluid-tabs',
  className = ''
}) => {
  return (
    <div className={`relative flex items-center p-1 rounded-full bg-[#F3F1EC] border border-[#E5E2DA] select-none ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange?.(tab.id)}
            className={`
              relative flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs font-bold transition-colors duration-200 outline-none
              ${isActive ? 'text-[#1A1917]' : 'text-[#827E74] hover:text-[#1A1917]'}
            `}
          >
            {/* Active Floating Pill */}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 30,
                  mass: 0.8
                }}
                className="absolute inset-0 rounded-full bg-white shadow-xs border border-[#E5E2DA]"
              />
            )}

            {Icon && (
              <motion.span
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="relative z-10"
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E0533C]' : 'text-[#827E74]'}`} />
              </motion.span>
            )}

            <span className="relative z-10 tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FluidTabs;
