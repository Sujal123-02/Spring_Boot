import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Watermelon UI - Spring Animated Split Accordion
 * Smoothly expands to reveal itinerary, what's included, and FAQs.
 * Source: https://ui.watermelon.sh/animated-components/card-split-accordian
 */
export const WatermelonAccordion = ({
  items = [],
  className = '',
  allowMultiple = false
}) => {
  const [openIndices, setOpenIndices] = useState([0]); // First item open by default

  const toggleIndex = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);

        return (
          <div
            key={item.id || idx}
            className={`
              rounded-2xl border transition-all duration-200 overflow-hidden bg-white
              ${isOpen ? 'border-[#DDD9D0] shadow-xs' : 'border-[#E5E2DA] hover:border-[#CCC8BD]'}
            `}
          >
            <button
              type="button"
              onClick={() => toggleIndex(idx)}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left select-none"
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <div className="w-8 h-8 rounded-xl bg-[#FAF9F7] border border-[#E5E2DA] flex items-center justify-center text-[#1A1917] shrink-0">
                    {typeof item.icon === 'function' || (typeof item.icon === 'object' && item.icon.$$typeof) ? (
                      <item.icon className="w-4 h-4 text-[#1A1917]" strokeWidth={1.8} />
                    ) : (
                      <span className="text-sm">{item.icon}</span>
                    )}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-[#1A1917] tracking-tight">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <span className="text-xs text-[#827E74] block mt-0.5">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>

              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-7 h-7 rounded-lg bg-[#FAF9F7] flex items-center justify-center text-[#666257] shrink-0"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { type: 'spring', stiffness: 500, damping: 35 },
                      opacity: { duration: 0.25 }
                    }
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.2 },
                      opacity: { duration: 0.15 }
                    }
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 text-xs sm:text-sm text-[#45433E] leading-relaxed border-t border-[#F2F0EB]">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default WatermelonAccordion;
