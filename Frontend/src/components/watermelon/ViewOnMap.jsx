import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Plus, Minus, Layers, Compass } from 'lucide-react';

/**
 * Watermelon UI - View On Map
 * Map view component displaying interactive location pins, zoom controls, and card previews.
 * Source: https://ui.watermelon.sh/animated-components/view-on-map
 */
export const ViewOnMap = ({
  experiences = [],
  onSelectExperience,
  className = ''
}) => {
  const [zoom, setZoom] = useState(1);
  const [activePin, setActivePin] = useState(experiences[0] || null);

  return (
    <div className={`relative h-[640px] bg-[#EFECE6] rounded-3xl border border-[#E5E2DA] overflow-hidden flex flex-col justify-between p-4 shadow-sm select-none ${className}`}>
      {/* Map Header Status */}
      <div className="flex items-center justify-between z-10">
        <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E2DA] text-xs font-bold text-[#1A1917] shadow-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#7C1D2F] animate-pulse" />
          <span>Pune Live Geographic Feed</span>
        </div>

        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-[#E5E2DA] shadow-xs">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(z + 0.15, 1.45))}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#FAF9F7] text-[#1A1917] transition-colors"
            aria-label="Zoom in"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(z - 0.15, 0.85))}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#FAF9F7] text-[#1A1917] transition-colors"
            aria-label="Zoom out"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stylized Map Grid Canvas */}
      <motion.div
        animate={{ scale: zoom }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {/* Subtle Map Roads & Contours Pattern */}
        <svg className="w-full h-full opacity-25" viewBox="0 0 800 800">
          <path d="M50 200 Q 200 150 400 300 T 750 450" fill="none" stroke="#CCC8BD" strokeWidth="8" />
          <path d="M100 650 Q 350 500 500 350 T 700 150" fill="none" stroke="#DDD9D0" strokeWidth="6" />
          <circle cx="380" cy="320" r="120" fill="none" stroke="#CCC8BD" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="520" cy="460" r="90" fill="none" stroke="#CCC8BD" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Dynamic Pins */}
        <div className="absolute inset-0 pointer-events-auto">
          {experiences.slice(0, 4).map((exp, idx) => {
            const positions = [
              { top: '28%', left: '32%' },
              { top: '48%', left: '60%' },
              { top: '65%', left: '38%' },
              { top: '35%', left: '70%' },
            ];
            const pos = positions[idx] || { top: '50%', left: '50%' };
            const isActive = activePin?.id === exp.id;

            return (
              <motion.div
                key={exp.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActivePin(exp)}
              >
                <div
                  className={`px-3 py-1.5 rounded-full font-bold text-xs shadow-md flex items-center gap-1.5 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#7C1D2F] text-white ring-4 ring-[#7C1D2F]/25 scale-110'
                      : 'bg-[#1A1917] text-white hover:bg-[#2E2C28]'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-white/80" />
                  <span>₹{exp.price}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Active Pin Preview Card (Pop-up at bottom) */}
      <AnimatePresence>
        {activePin && (
          <motion.div
            key={activePin.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="z-10 bg-white p-3.5 rounded-2xl border border-[#E5E2DA] shadow-lg flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={activePin.images[0]}
                alt={activePin.title}
                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#E5E2DA]"
              />
              <div className="text-left">
                <span className="text-[10px] font-bold text-[#7C1D2F] uppercase block">
                  {activePin.location.venueName}
                </span>
                <h4 className="font-bold text-xs text-[#1A1917] line-clamp-1 max-w-[180px] sm:max-w-[220px]">
                  {activePin.title}
                </h4>
                <span className="text-[11px] text-[#827E74]">
                  ₹{activePin.price} • {activePin.duration}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectExperience?.(activePin)}
              className="px-3.5 py-2 rounded-xl bg-[#1A1917] text-white font-bold text-xs hover:bg-[#2E2C28] transition-colors shrink-0 shadow-xs"
            >
              View Pass →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewOnMap;
