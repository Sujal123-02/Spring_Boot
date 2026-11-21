import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

/**
 * Watermelon UI - Spring Animated Save / Favorite Heart Toggle
 * Bounces smoothly with physical spring dynamics on save.
 * Source: https://ui.watermelon.sh/animated-components/save-toggle
 */
export const SaveButton = ({
  initialSaved = false,
  onToggle,
  className = ''
}) => {
  const [saved, setSaved] = useState(initialSaved);

  const handleClick = (e) => {
    e.stopPropagation();
    const next = !saved;
    setSaved(next);
    if (onToggle) onToggle(next);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.85 }}
      animate={saved ? { scale: [1, 1.25, 1] } : { scale: 1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      aria-label={saved ? 'Remove from saved' : 'Save experience'}
      className={`
        w-8 h-8 rounded-full flex items-center justify-center transition-colors
        backdrop-blur-md shadow-xs
        ${
          saved
            ? 'bg-[#7C1D2F] text-white'
            : 'bg-black/40 hover:bg-black/60 text-white'
        }
        ${className}
      `}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-200 ${
          saved ? 'fill-current stroke-current scale-105' : 'stroke-white fill-transparent'
        }`}
      />
    </motion.button>
  );
};

export default SaveButton;
