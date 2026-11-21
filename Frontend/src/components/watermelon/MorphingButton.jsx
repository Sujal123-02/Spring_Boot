import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ArrowRight } from 'lucide-react';

/**
 * Watermelon UI - Morphing Button
 * Button that morphs smoothly into a loading state, then an expanded success state.
 * Source: https://ui.watermelon.sh/animated-components/morphing-button
 */
export const MorphingButton = ({
  children,
  onClick,
  className = '',
  disabled = false,
  variant = 'primary', // 'primary' | 'dark'
  successText = 'Pass Confirmed!',
}) => {
  const [state, setState] = useState('idle'); // 'idle' | 'loading' | 'success'

  const handleClick = async (e) => {
    if (disabled || state !== 'idle') return;
    setState('loading');
    if (onClick) {
      try {
        await onClick(e);
        setState('success');
      } catch (err) {
        setState('idle');
      }
    } else {
      setTimeout(() => setState('success'), 900);
    }
  };

  const bgStyles = {
    primary: 'bg-[#E0533C] hover:bg-[#C4422D] text-white',
    dark: 'bg-[#1A1917] hover:bg-[#2E2C28] text-white',
  };

  return (
    <motion.button
      layout
      type="button"
      onClick={handleClick}
      disabled={disabled || state !== 'idle'}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`
        relative overflow-hidden font-bold rounded-xl text-xs sm:text-sm px-6 py-3.5
        inline-flex items-center justify-center transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-[0.98]
        ${state === 'success' ? 'bg-[#2D7A4F] text-white' : bgStyles[variant] || bgStyles.primary}
        ${className}
      `}
    >
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            {children}
          </motion.span>
        )}

        {state === 'loading' && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Reserving your spot...</span>
          </motion.span>
        )}

        {state === 'success' && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex items-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{successText}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default MorphingButton;
