import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Check, Tag } from 'lucide-react';

/**
 * Watermelon UI - Filter Disclosure
 * Smooth expanding filter component with active state indicators and spring physics.
 * Source: https://ui.watermelon.sh/animated-components/filter-disclosure
 */
export const FilterDisclosure = ({
  filters = [
    { id: 'all', label: 'All Prices' },
    { id: 'under600', label: 'Budget (Under ₹600)' },
    { id: '600to1000', label: 'Mid-Tier (₹600 – ₹1000)' },
    { id: 'over1000', label: 'Premium (₹1000+)' },
  ],
  activeFilter = 'all',
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeItem = filters.find((f) => f.id === activeFilter) || filters[0];

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all duration-150 active:scale-98
          ${activeFilter !== 'all' ? 'bg-[#1A1917] text-white border-[#1A1917]' : 'bg-white text-[#45433E] border-[#E5E2DA] hover:bg-[#FAF9F7]'}
        `}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Price: <span className="font-bold">{activeItem.label}</span></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 6 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              className="absolute left-0 top-full mt-2 w-56 rounded-2xl bg-white border border-[#E5E2DA] p-2 shadow-lg z-30 space-y-1"
            >
              <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#827E74]">
                Filter by Experience Price
              </div>
              {filters.map((filter) => {
                const isSelected = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => {
                      onChange?.(filter.id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors duration-150
                      ${isSelected ? 'bg-[#1A1917] text-white font-bold shadow-xs' : 'text-[#1A1917] hover:bg-[#FAF9F7]'}
                    `}
                  >
                    <span>{filter.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDisclosure;
