import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Info } from 'lucide-react';

/**
 * Watermelon UI - Pricing Widget
 * Animated financial breakdown with smooth spring transitions and responsive value updates.
 * Source: https://ui.watermelon.sh/animated-components/pricing-widget
 */
export const PricingWidget = ({
  unitPrice = 799,
  guestCount = 1,
  platformFee = 49,
  gstRate = 0.18,
}) => {
  const subtotal = unitPrice * guestCount;
  const gst = Math.round(subtotal * gstRate);
  const total = subtotal + platformFee + gst;

  return (
    <div className="bg-white rounded-2xl border border-[#E5E2DA] p-5 space-y-4 shadow-xs select-none">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DA]">
        <h4 className="font-bold text-sm text-[#1A1917]">Price Breakdown</h4>
        <span className="text-[11px] font-semibold text-[#2D7A4F] bg-[#ECF6F0] px-2.5 py-0.5 rounded-full border border-[#CBE3D5]">
          Best Rate Guaranteed
        </span>
      </div>

      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between items-center text-[#666257]">
          <span className="flex items-center gap-1.5">
            {guestCount}x Experience Pass
            <span className="text-[10px] text-[#827E74]">(₹{unitPrice} ea)</span>
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={subtotal}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="font-mono font-medium text-[#1A1917]"
            >
              ₹{subtotal}.00
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center text-[#666257]">
          <span className="flex items-center gap-1">
            Platform & Host Protection
            <Info className="w-3 h-3 text-[#827E74]" />
          </span>
          <span className="font-mono text-[#1A1917]">₹{platformFee}.00</span>
        </div>

        <div className="flex justify-between items-center text-[#666257]">
          <span>GST (18%)</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={gst}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="font-mono text-[#1A1917]"
            >
              ₹{gst}.00
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-baseline font-bold text-base text-[#1A1917] pt-3 border-t border-[#E5E2DA]">
          <div>
            <span>Total Payable</span>
            <span className="block text-[10px] font-normal text-[#827E74]">All taxes & fees included</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={total}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              className="font-mono text-lg font-extrabold text-[#7C1D2F]"
            >
              ₹{total}.00
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-2 text-[11px] text-[#827E74] space-y-1.5 border-t border-[#F3F1EC]">
        <div className="flex items-center gap-1.5 text-[#2D7A4F] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>100% Refundable up to 24h before activity</span>
        </div>
        <p className="text-[10px] leading-relaxed text-[#827E74]">
          Secure 256-bit SSL encrypted checkout. Spot is instantly reserved upon payment.
        </p>
      </div>
    </div>
  );
};

export default PricingWidget;
