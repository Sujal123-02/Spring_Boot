import React from 'react';
import { motion } from 'framer-motion';

/**
 * Watermelon UI - Labeled Progress Indicator
 * Animated progress indicator with dynamic labels and spring fill.
 * Source: https://ui.watermelon.sh/animated-components/labeled-progress-indicator
 */
export const LabeledProgressIndicator = ({
  percent = 50,
  label = 'Step Progress',
  valueLabel = '50%',
  color = '#E0533C',
  className = ''
}) => {
  return (
    <div className={`space-y-1.5 select-none ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-[#45433E]">{label}</span>
        <span className="font-mono font-bold text-[#1A1917]">{valueLabel}</span>
      </div>

      <div className="w-full h-2 rounded-full bg-[#EAE7DF] overflow-hidden relative">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(percent, 0), 100)}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        />
      </div>
    </div>
  );
};

export default LabeledProgressIndicator;
