import React from 'react';
import { Star, Clock, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
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
      className="group relative bg-white rounded-2xl border border-[#E5E2DA] overflow-hidden hover:border-[#CCC8BD] transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-4px_rgba(26,25,23,0.1)] cursor-pointer flex flex-col h-full transform-gpu after:absolute after:inset-x-0 after:-bottom-2 after:h-2 after:content-['']"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F3F1EC]">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <Badge variant="darkGlass" size="sm">
            {categoryLabel}
          </Badge>
          {urgencyBadge && (
            <Badge variant="terraSolid" size="sm">
              {urgencyBadge}
            </Badge>
          )}
        </div>

        {/* Watermelon UI Spring Animated Save Toggle */}
        <div className="absolute top-3 right-3 z-10">
          <SaveButton />
        </div>

        {/* Next Available Date Floating Tag */}
        {nextSession && (
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white/95 font-medium px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-white/80" />
              {nextSession.date.split(',')[0]}
            </span>
            <span>{nextSession.startTime}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Rating & Location Meta */}
          <div className="flex items-center justify-between text-xs text-[#827E74]">
            <span className="flex items-center gap-1 text-[#1A1917] font-semibold">
              <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
              {rating} <span className="text-[#827E74] font-normal">({reviewCount})</span>
            </span>
            <span className="flex items-center gap-1 truncate max-w-[160px]">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              {location.city}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm sm:text-base text-[#1A1917] leading-snug line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] flex items-start group-hover:text-[#7C1D2F] transition-colors duration-150">
            {title}
          </h3>
        </div>

        {/* Host & Meta Info */}
        <div className="pt-2 border-t border-[#E5E2DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-6 h-6 rounded-full object-cover border border-[#E5E2DA]"
            />
            <span className="text-xs text-[#45433E] font-medium truncate max-w-[110px]">
              {host.name}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#827E74] block leading-none">From</span>
            <span className="text-sm sm:text-base font-bold text-[#1A1917]">
              ₹{price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
