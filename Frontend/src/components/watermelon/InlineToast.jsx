import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, CheckCheck } from 'lucide-react';

/**
 * Watermelon UI - Inline Toast
 * Contextual inline notification with built-in action (copy pass code, confirmation feedback).
 * Source: https://ui.watermelon.sh/animated-components/inline-toast
 */
export const InlineToast = ({
  code = 'WKD-7829-PNE',
  label = 'Booking Reference ID',
  copyDuration = 2200,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), copyDuration);
    } catch (err) {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), copyDuration);
    }
  };

  return (
    <motion.div
      layout="position"
      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
      className={`relative flex items-center justify-between overflow-hidden rounded-2xl border border-[#E5E2DA] bg-white px-4 py-3 shadow-xs ${className}`}
    >
      {/* Background progress fill when copied */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: copyDuration / 1000, ease: 'linear' }}
            className="absolute inset-0 bg-[#ECF6F0] -z-0 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col text-left">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#827E74]">
          {label}
        </span>
        <span className="font-mono text-sm font-bold text-[#1A1917] tracking-tight">
          {code}
        </span>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 ${
          copied
            ? 'bg-[#2D7A4F] text-white shadow-xs'
            : 'bg-[#FAF9F7] text-[#1A1917] hover:bg-[#F3F1EC] border border-[#E5E2DA]'
        }`}
      >
        {copied ? (
          <>
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-[#827E74]" />
            <span>Copy Code</span>
          </>
        )}
      </button>
    </motion.div>
  );
};

export default InlineToast;
