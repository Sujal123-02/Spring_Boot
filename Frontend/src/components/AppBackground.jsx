import React from 'react';

/**
 * Professional Studio Background Theme
 * High-end architectural canvas with a delicate, crisp micro-dot grid and pure studio ambient lighting.
 * Completely free of color smears, murky gradients, or artificial tints.
 */
export const AppBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20 select-none">
      {/* 1. Pure Crisp Studio Lighting (Clean, neutral white-to-transparent falloff) */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] blur-[100px] rounded-full opacity-70"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(246, 244, 238, 0) 100%)'
        }}
      />

      {/* 2. Architectural Micro-Dot Matrix (Delicate 24px grid with subtle top-to-bottom mask) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 85%)'
        }}
      >
        <defs>
          <pattern id="arch-dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.9" fill="#9C9689" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arch-dot-grid)" />
      </svg>
    </div>
  );
};

export default AppBackground;
