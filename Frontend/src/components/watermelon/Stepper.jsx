import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

/**
 * Watermelon UI - Stepper
 * Spring-animated numeric stepper with rolling digits and directional blur.
 * Source: https://ui.watermelon.sh/animated-components/stepper
 */
export const Stepper = ({
  value = 1,
  min = 1,
  max = 10,
  onChange,
  label = 'Guests'
}) => {
  const [direction, setDirection] = React.useState(1);

  const handleDecrement = () => {
    if (value > min) {
      setDirection(-1);
      onChange?.(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      setDirection(1);
      onChange?.(value + 1);
    }
  };

  const digitVariants = {
    initial: (dir) => ({
      y: dir > 0 ? 14 : -14,
      opacity: 0,
      scale: 0.8,
      filter: 'blur(2px)',
    }),
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (dir) => ({
      y: dir > 0 ? -14 : 14,
      opacity: 0,
      scale: 0.8,
      filter: 'blur(2px)',
    }),
  };

  return (
    <div className="inline-flex items-center gap-3 bg-white px-2 py-1.5 rounded-2xl border border-[#E5E2DA] shadow-xs select-none">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="w-7 h-7 rounded-xl flex items-center justify-center bg-[#FAF9F7] text-[#1A1917] hover:bg-[#F3F1EC] disabled:opacity-35 disabled:hover:bg-[#FAF9F7] transition-colors border border-[#E5E2DA] active:scale-95"
        aria-label="Decrease guest count"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-center gap-1.5 min-w-[50px] justify-center text-xs font-bold text-[#1A1917]">
        <div className="relative h-5 w-4 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.span
              key={value}
              custom={direction}
              variants={digitVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              className="absolute font-mono text-sm font-bold text-[#1A1917]"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-[11px] text-[#827E74] font-medium">{label}</span>
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="w-7 h-7 rounded-xl flex items-center justify-center bg-[#1A1917] text-white hover:bg-[#2E2C28] disabled:opacity-35 transition-colors active:scale-95 shadow-xs"
        aria-label="Increase guest count"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default Stepper;
