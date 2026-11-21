import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles } from 'lucide-react';

/**
 * Watermelon UI - Switch Mode
 * Animated mode toggle switch with smooth spring physics and sliding icon states.
 * Source: https://ui.watermelon.sh/animated-components/switch-mode
 */
export const SwitchMode = ({
  role = 'USER', // 'USER' | 'HOST'
  onChange,
}) => {
  const isHost = role === 'HOST';

  const toggle = () => {
    onChange?.(isHost ? 'USER' : 'HOST');
  };

  return (
    <div className="flex items-center justify-center gap-3 select-none">
      <span className={`text-xs font-semibold transition-colors duration-150 ${!isHost ? 'text-[#1A1917] font-bold' : 'text-[#827E74]'}`}>
        Weekend Seeker
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isHost}
        onClick={toggle}
        className={`
          relative w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none shadow-inner
          ${isHost ? 'bg-[#2A5C43]' : 'bg-[#1A1917]'}
        `}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          animate={{ x: isHost ? 24 : 0 }}
          className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          {isHost ? (
            <Sparkles className="w-3.5 h-3.5 text-[#2A5C43]" />
          ) : (
            <Compass className="w-3.5 h-3.5 text-[#1A1917]" />
          )}
        </motion.div>
      </button>

      <span className={`text-xs font-semibold transition-colors duration-150 ${isHost ? 'text-[#2A5C43] font-bold' : 'text-[#827E74]'}`}>
        Experience Host
      </span>
    </div>
  );
};

export default SwitchMode;
