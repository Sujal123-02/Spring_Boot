import React, { useState } from 'react';
import { Filter, MapPin, Map, Search, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CategoryBar } from '../components/CategoryBar';
import { ExperienceCard } from '../components/ExperienceCard';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { FilterDisclosure } from '../components/watermelon/FilterDisclosure';
import { ViewOnMap } from '../components/watermelon/ViewOnMap';
import { EXPERIENCES } from '../data/mockData';
import { staggerContainer, staggerItem } from '../lib/motion';

export const DiscoverPage = ({ onSelectExperience, experiences = EXPERIENCES }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [showMap, setShowMap] = useState(false);

  // Filter logic
  const filtered = experiences.filter((exp) => {
    if (selectedCategory !== 'all' && exp.category !== selectedCategory) return false;
    if (selectedPriceFilter === 'under600' && exp.price > 600) return false;
    if (selectedPriceFilter === '600to1000' && (exp.price < 600 || exp.price > 1000)) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header & Meta Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E2DA]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1917] tracking-tight">
            Discover Weekend Activities
          </h1>
          <p className="text-xs sm:text-sm text-[#827E74] mt-0.5">
            Showing <span className="font-bold text-[#1A1917]">{filtered.length} experiences</span> in Pune this weekend
          </p>
        </div>

        {/* View Mode & Map Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={showMap ? 'primary' : 'secondary'}
            size="sm"
            icon={Map}
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? 'Hide Map' : 'Split Map View'}
          </Button>
        </div>
      </div>

      {/* Category Horizontal Filter */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Secondary Fast Filters Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-semibold text-[#45433E]">Quick Filters:</span>

          {/* Watermelon UI Filter Disclosure */}
          <FilterDisclosure
            activeFilter={selectedPriceFilter}
            onChange={setSelectedPriceFilter}
          />
        </div>

        <AnimatePresence>
          {(selectedCategory !== 'all' || selectedPriceFilter !== 'all') && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                setSelectedCategory('all');
                setSelectedPriceFilter('all');
              }}
              className="flex items-center gap-1 text-[#C53030] hover:text-[#9B1C1C] font-semibold text-xs"
            >
              <X className="w-3.5 h-3.5" /> Clear All Filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className={`grid gap-6 ${showMap ? 'lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Experience Cards Feed */}
        <div className={`${showMap ? 'lg:col-span-7' : 'w-full'}`}>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-[#E5E2DA] p-12 text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#FAF9F7] border border-[#E5E2DA] text-[#827E74] flex items-center justify-center mx-auto">
                <Search className="w-5 h-5 text-[#827E74]" />
              </div>
              <h3 className="text-base font-bold text-[#1A1917]">No activities match your filters</h3>
              <p className="text-xs text-[#827E74] max-w-sm mx-auto">
                Try widening your price limit or selecting another category to see what's happening.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPriceFilter('all');
                }}
              >
                Reset All Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate="show"
              key={`${selectedCategory}-${selectedPriceFilter}`}
              className={`grid gap-6 ${showMap ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} items-stretch`}
            >
              {filtered.map((exp) => (
                <motion.div key={exp.id} variants={staggerItem} className="h-full flex flex-col">
                  <ExperienceCard
                    experience={exp}
                    onSelect={onSelectExperience}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Watermelon UI View On Map Component */}
        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-5 sticky top-36"
            >
              <ViewOnMap
                experiences={filtered}
                onSelectExperience={onSelectExperience}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
