import React from 'react';
import { motion } from 'framer-motion';

/**
 * Watermelon UI - Executive Discrete Tabs
 * Premium segmented tab bar with spring physics, contextual icons, and live counter chips.
 * Eliminates cheap grey capsule styling in favor of an architectural SaaS command strip.
 */
export const DiscreteTabs = ({
  tabs = [],
  activeId,
  onChange,
  layoutId = 'watermelon-discrete-tabs',
  className = ''
}) => {
  return (
    <div className={`relative inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#EFECE6] border border-[#DDD6C8] select-none shadow-2xs max-w-full overflow-x-auto no-scrollbar ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange?.(tab.id)}
            className={`
              relative px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 outline-none flex items-center gap-2 whitespace-nowrap shrink-0
              ${isActive
                ? 'text-[#1A1917]'
                : 'text-[#78716C] hover:text-[#1A1917] hover:bg-white/40'
              }
            `}
          >
            {/* Active Morphing Spring Pill */}
            {isActive && (
              <motion.div
                layoutId={layoutId}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 32,
                  mass: 0.8
                }}
                className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_8px_rgba(28,25,23,0.08)] border border-[#DDD6C8]"
              />
            )}

            {/* Optional Vector Icon */}
            {Icon && (
              <span className="relative z-10">
                <Icon className={`w-3.5 h-3.5 transition-colors duration-150 ${isActive ? 'text-[#7C1D2F]' : 'text-[#827E74]'}`} />
              </span>
            )}

            <span className="relative z-10">{tab.label}</span>

            {/* Optional Counter / Status Pill */}
            {tab.badge && (
              <span
                className={`relative z-10 text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-colors ${
                  tab.badgeColor || (isActive ? 'bg-[#F2EDE4] text-[#7C1D2F]' : 'bg-[#E5E0D5] text-[#57544C]')
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default DiscreteTabs;
