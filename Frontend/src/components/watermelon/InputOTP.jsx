import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Watermelon UI - Input OTP
 * Polished segmented OTP input boxes with auto-focus advance, spring cursor, and active border feedback.
 * Source: https://ui.watermelon.sh/components/input-otp
 */
export const InputOTP = ({
  length = 6,
  value = '',
  onChange,
  disabled = false,
}) => {
  const inputRefs = useRef([]);

  const digits = value.split('').slice(0, length);
  while (digits.length < length) {
    digits.push('');
  }

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;

    const char = val[val.length - 1]; // take the newest character
    const newDigits = [...digits];
    newDigits[idx] = char;
    const nextValue = newDigits.join('');
    onChange?.(nextValue);

    // Auto advance focus
    if (idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      if (!digits[idx] && idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[idx] = '';
        onChange?.(newDigits.join(''));
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (paste) {
      onChange?.(paste);
      const focusIndex = Math.min(paste.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
      {digits.map((digit, idx) => {
        const isFilled = Boolean(digit);

        return (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <input
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              disabled={disabled}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`
                w-10 h-12 sm:w-11 sm:h-13 rounded-xl text-center font-mono text-base font-extrabold outline-none transition-all duration-150
                ${
                  isFilled
                    ? 'bg-white border-2 border-[#1A1917] text-[#1A1917] shadow-xs'
                    : 'bg-[#FAF9F7] border border-[#E5E2DA] text-[#827E74] focus:border-[#E0533C] focus:bg-white focus:ring-2 focus:ring-[#E0533C]/20'
                }
              `}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default InputOTP;
