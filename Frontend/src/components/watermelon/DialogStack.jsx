import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Watermelon UI - Dialog Stack
 * Layered modal component that stacks dialogs with smooth spring-weighted transitions.
 * Source: https://ui.watermelon.sh/animated-components/dialog-stack
 */
export const DialogStack = ({
  isOpen = false,
  onClose,
  title,
  children,
  className = ''
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className={`relative w-full max-w-lg bg-white rounded-3xl border border-[#E5E2DA] shadow-2xl p-6 overflow-hidden z-10 space-y-4 ${className}`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DA]">
              <h3 className="font-bold text-base text-[#1A1917] tracking-tight">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#827E74] hover:text-[#1A1917] hover:bg-[#FAF9F7] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DialogStack;
