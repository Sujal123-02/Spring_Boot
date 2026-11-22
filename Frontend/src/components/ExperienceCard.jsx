import React from 'react';
import { Star, Clock, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { SaveButton } from './watermelon/SaveButton';

export const ExperienceCard = ({ experience, onSelect }) => {
  const {
    id,
    title,
    images,
    categoryLabel,
    rating,
    reviewCount,
    price,
    duration,
    location,
    host,
    urgencyBadge,
    sessions
  } = experience;

  const nextSession = sessions && sessions.length > 0 ? sessions[0] : null;

  return (
    <div
      onClick={() => onSelect && onSelect(experience)}
      className="group relative bg-white rounded-2xl border border-[#E6E0D4] overflow-hidden hover:border-[#7C1D2F]/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-8px_rgba(28,25,23,0.1)] cursor-pointer flex flex-col h-full transform-gpu"
    >
      {/* Cover Image Container — Clean, Unobstructed & Cinematic */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F7F5F0]">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Top-Left: Refined Editorial Craft Tag (No aggressive blinking animations) */}
        {urgencyBadge && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E6E0D4] text-[10px] font-bold text-[#1C1917] shadow-2xs tracking-wide">
            {urgencyBadge}
          </div>
        )}

        {/* Top-Right: Watermelon UI Spring Animated Save Toggle */}
        <div className="absolute top-3 right-3 z-10">
          <SaveButton />
        </div>
      </div>

      {/* Card Body — Clean Editorial Typography */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div className="space-y-2">
          {/* Metadata Row: Category • Rating • City */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C1D2F]">
                {categoryLabel}
              </span>
              <span className="text-[#D5D1C6]">•</span>
              <span className="flex items-center gap-1 font-bold text-[#1C1917]">
                <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                {rating}
                <span className="text-[#827E74] font-normal">({reviewCount})</span>
              </span>
            </div>

            <span className="flex items-center gap-1 text-[11px] text-[#827E74] font-medium truncate max-w-[130px]">
              <MapPin className="w-3 h-3 text-[#A8A29E] shrink-0" />
              {location.city}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-[#1C1917] leading-snug line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] group-hover:text-[#7C1D2F] transition-colors duration-200">
            {title}
          </h3>

          {/* Next Available Session Info (Natural cohort availability) */}
          {nextSession && (
            <div className="flex items-center justify-between text-xs text-[#78716C] pt-0.5">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#7C1D2F] shrink-0" />
                <span className="font-medium text-[#44403C]">
                  {nextSession.date.split(',')[0]}
                </span>
                <span>•</span>
                <span>{nextSession.startTime}</span>
              </div>
              <span className="text-[11px] font-medium text-[#78716C]">
                {nextSession.availableSpots <= 2 ? (
                  <span className="text-[#7C1D2F] font-semibold">{nextSession.availableSpots} passes open</span>
                ) : (
                  <span>Max {nextSession.totalCapacity}</span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Footer: Host & Pricing */}
        <div className="pt-3 border-t border-[#E6E0D4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-6 h-6 rounded-full object-cover border border-[#E6E0D4]"
            />
            <span className="text-xs text-[#57544C] font-medium truncate max-w-[120px]">
              {host.name}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#827E74] uppercase tracking-wider block leading-none">From</span>
            <span className="text-sm sm:text-base font-extrabold text-[#1C1917]">
              ₹{price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
