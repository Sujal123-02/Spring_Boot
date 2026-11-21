import React, { useRef, useState, useEffect } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

/**
 * Watermelon UI - Spring Animated Photo Category Strip
 * Features real circular photo thumbnails, research conversion priority ordering,
 * and a smooth sliding spring pill.
 * Source: https://ui.watermelon.sh/animated-components/continuous-tabs
 */
export const CategoryBar = ({ selectedCategory, onSelectCategory }) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="w-full bg-[#F7F5F0]/92 border-b border-[#E6E0D4] sticky top-16 z-20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <LayoutGroup id="watermelon-category-strip">
          <div className="relative flex items-center">
            {/* Left Scroll Arrow (Desktop) */}
            {canScrollLeft && (
              <button
                type="button"
                onClick={() => scroll('left')}
                className="hidden md:flex absolute -left-3 z-30 w-8 h-8 rounded-full bg-white border border-[#E6E0D4] shadow-md items-center justify-center text-[#7C1D2F] hover:bg-[#FAF8F5] hover:scale-105 active:scale-95 transition-all duration-150"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* Scrollable Categories List */}
            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar scroll-smooth w-full"
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className={`group relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap outline-none transition-all duration-150 shrink-0 flex items-center gap-2 sm:gap-2.5 select-none ${isActive
                      ? ''
                      : 'bg-[#FAF8F5] hover:bg-white text-[#524E48] hover:text-[#7C1D2F] border border-[#E6E0D4] hover:border-[#7C1D2F]/40 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200'
                      }`}
                  >
                    {/* Watermelon Spring Active Pill — Velvet Maroon */}
                    {isActive && (
                      <motion.div
                        layoutId="watermelon-category-active-pill"
                        transition={{
                          type: 'spring',
                          stiffness: 420,
                          damping: 32,
                          mass: 0.8
                        }}
                        className="absolute inset-0 rounded-full bg-[#7C1D2F] shadow-sm pointer-events-none"
                      />
                    )}

                    {/* Category Photo Thumbnail or All Icon — Strictly Contained Circular Frame */}
                    <div className="relative z-10 shrink-0">
                      {cat.photo ? (
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border aspect-square shrink-0 transition-all duration-200 ${isActive
                            ? 'border-white/50 ring-1 ring-white/30'
                            : 'border-[#E6E0D4] group-hover:border-[#C4BCAD]'
                            }`}
                        >
                          <img
                            src={cat.photo}
                            alt={cat.name}
                            className="w-full h-full object-cover rounded-full block"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center aspect-square shrink-0 transition-all duration-200 ${isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#EAE4D8] text-[#7C1D2F]'
                            }`}
                        >
                          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Category Label */}
                    <span
                      className={`relative z-10 font-medium transition-colors duration-200 ${isActive
                        ? 'text-white font-bold'
                        : 'text-[#2B2925] group-hover:text-[#1C1917]'
                        }`}
                    >
                      {cat.name}
                    </span>

                    {/* Research Conversion Priority Micro Badge (#1 for Board Games) */}
                    {cat.conversionRank === 1 && (
                      <span
                        className={`relative z-10 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider transition-colors duration-200 ${isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#7C1D2F] text-white shadow-2xs'
                          }`}
                      >
                        #1 Top Pick
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Scroll Arrow (Desktop) */}
            {canScrollRight && (
              <button
                type="button"
                onClick={() => scroll('right')}
                className="hidden md:flex absolute -right-3 z-30 w-8 h-8 rounded-full bg-white border border-[#E6E0D4] shadow-md items-center justify-center text-[#7C1D2F] hover:bg-[#FAF8F5] hover:scale-105 active:scale-95 transition-all duration-150"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default CategoryBar;
