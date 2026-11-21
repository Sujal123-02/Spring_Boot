import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

/**
 * Watermelon UI - Status Picker
 * Animated status picker that smoothly transitions between selectable states.
 * Source: https://ui.watermelon.sh/animated-components/status-picker
 */
export const StatusPicker = ({
  status = 'AVAILABLE', // 'AVAILABLE' | 'SOLD_OUT' | 'CANCELLED' | 'LIVE' | 'DRAFT'
  onChange,
  options = [
    { id: 'AVAILABLE', label: 'Open for Booking', color: '#2D7A4F', bg: '#ECF6F0' },
    { id: 'SOLD_OUT', label: 'Fully Booked', color: '#C53030', bg: '#FDF2F2' },
    { id: 'CANCELLED', label: 'Cancelled', color: '#827E74', bg: '#F3F1EC' },
  ],
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeOption = options.find((o) => o.id === status) || options[0];

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#E5E2DA] bg-white hover:bg-[#FAF9F7] text-xs font-semibold shadow-xs transition-colors duration-150 active:scale-95"
      >
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: activeOption.color }}
        />
        <span style={{ color: activeOption.color }} className="font-bold">
          {activeOption.label}
        </span>
        <ChevronDown className="w-3 h-3 text-[#827E74]" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 4 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              className="absolute left-0 top-full mt-1.5 w-48 rounded-2xl bg-white border border-[#E5E2DA] p-1.5 shadow-lg z-40 space-y-1"
            >
              {options.map((opt) => {
                const isSelected = opt.id === status;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onChange?.(opt.id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold text-left transition-colors duration-150
                      ${isSelected ? 'bg-[#F3F1EC]' : 'hover:bg-[#FAF9F7]'}
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: opt.color }}
                      />
                      <span style={{ color: opt.color }}>{opt.label}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#1A1917]" />}
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

export default StatusPicker;
