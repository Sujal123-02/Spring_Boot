import React, { useState } from 'react';
import { Search, MapPin, Calendar, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const SearchBar = ({ onSearch, initialQuery = '' }) => {
  const [location, setLocation] = useState('Pune, Maharashtra');
  const [date, setDate] = useState('This Weekend');
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ location, date, query });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-2xl bg-white p-1.5 sm:p-2 rounded-full border border-[#E5E2DA] shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center justify-between"
    >
      <div className="flex-1 flex items-center divide-x divide-[#E5E2DA] text-xs sm:text-sm">
        {/* Location selector */}
        <div className="px-3 sm:px-4 py-1 flex items-center gap-2 text-[#1A1917] font-medium flex-1 cursor-pointer">
          <MapPin className="w-4 h-4 text-[#57544C] shrink-0" />
          <div className="text-left">
            <span className="block text-[10px] text-[#827E74] uppercase tracking-wider font-semibold">Where</span>
            <span className="font-semibold text-xs sm:text-sm truncate block">{location}</span>
          </div>
        </div>

        {/* Date Selector */}
        <div className="px-3 sm:px-4 py-1 flex items-center gap-2 text-[#1A1917] font-medium flex-1 cursor-pointer">
          <Calendar className="w-4 h-4 text-[#57544C] shrink-0" />
          <div className="text-left">
            <span className="block text-[10px] text-[#827E74] uppercase tracking-wider font-semibold">When</span>
            <span className="font-semibold text-xs sm:text-sm truncate block">{date}</span>
          </div>
        </div>

        {/* Keyword / Category */}
        <div className="px-3 sm:px-4 py-1 hidden md:flex items-center gap-2 text-[#45433E] flex-1">
          <Compass className="w-4 h-4 text-[#827E74] shrink-0" />
          <input
            type="text"
            placeholder="Search activities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-xs sm:text-sm text-[#1A1917] placeholder-[#827E74]"
          />
        </div>
      </div>

      {/* Search Trigger */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        className="relative overflow-hidden w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1A1917] hover:bg-[#2B2925] text-white flex items-center justify-center shadow-sm transition-colors duration-150 shrink-0 ml-1 group"
        aria-label="Search"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
      </motion.button>
    </form>
  );
};
