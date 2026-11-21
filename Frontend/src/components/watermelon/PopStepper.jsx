import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Ticket } from 'lucide-react';

/**
 * Watermelon UI - Pop Stepper
 * Spring-animated multi-step checkout progress with pop-in pills and status indicators.
 * Source: https://ui.watermelon.sh/animated-components/pop-stepper
 */
export const PopStepper = ({ currentStep = 1, steps = ['Guest & Pass Details', 'Confirmed Digital Pass'] }) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 py-3 select-none">
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = currentStep === stepNum;
        const isDone = currentStep > stepNum;

        return (
          <React.Fragment key={label}>
            {idx > 0 && (
              <div className="w-6 sm:w-12 h-0.5 bg-[#E5E2DA] relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-0 bg-[#E0533C]"
                  initial={false}
                  animate={{ scaleX: isDone || isActive ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  style={{ originX: 0 }}
                />
              </div>
            )}

            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors duration-200 ${
                isActive
                  ? 'bg-[#1A1917] text-white border-[#1A1917] shadow-sm'
                  : isDone
                  ? 'bg-[#ECF6F0] text-[#2D7A4F] border-[#CBE3D5]'
                  : 'bg-white text-[#827E74] border-[#E5E2DA]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isDone
                    ? 'bg-[#2D7A4F] text-white'
                    : 'bg-[#F3F1EC] text-[#827E74]'
                }`}
              >
                {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : stepNum}
              </span>
              <span className="hidden sm:inline tracking-tight">{label}</span>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PopStepper;
