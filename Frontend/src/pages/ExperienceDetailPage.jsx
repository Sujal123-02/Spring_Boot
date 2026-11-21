import React, { useState } from 'react';
import {
  Star, Clock, Users, MapPin, ShieldCheck, Calendar, ArrowLeft,
  CheckCircle2, AlertCircle, Compass, PackageCheck, ClipboardList, Check, Lock, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ShimmerButton } from '../components/watermelon/ShimmerButton';
import { Stepper } from '../components/watermelon/Stepper';
import { WatermelonAccordion } from '../components/watermelon/WatermelonAccordion';
import { CarouselSlider } from '../components/watermelon/CarouselSlider';
import { CalendarWidget } from '../components/watermelon/CalendarWidget';
import { staggerContainer, staggerItem, EASE_OUT_EXPO } from '../lib/motion';

export const ExperienceDetailPage = ({ experience, onBack, onBookSession }) => {
  if (!experience) return null;

  const [selectedSession, setSelectedSession] = useState(
    experience.sessions && experience.sessions.length > 0 ? experience.sessions[0] : null
  );
  const [guestCount, setGuestCount] = useState(1);

  const maxSpots = selectedSession?.availableSpots || 6;
  const platformFeePerGuest = 49;
  const passSubtotal = experience.price * guestCount;
  const platformTotal = platformFeePerGuest * guestCount;
  const grandTotal = passSubtotal + platformTotal;

  const accordionSections = [
    {
      id: 'about',
      title: 'About this Experience & Schedule',
      subtitle: `${experience.duration} • Hosted by ${experience.host.name}`,
      icon: Compass,
      content: (
        <div className="space-y-4">
          <p className="whitespace-pre-line text-[#45433E] leading-relaxed text-sm sm:text-base">{experience.description}</p>
          <div className="p-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-[#1A1917]">
              <MapPin className="w-4 h-4 text-[#7C1D2F]" />
              <span>{experience.location.venueName}</span>
            </div>
            <p className="text-xs text-[#706D65] pl-6">{experience.location.address}, {experience.location.city}</p>
          </div>
        </div>
      )
    },
    {
      id: 'included',
      title: "What's Included in Your Pass",
      subtitle: `${experience.location.amenities.length} items covered`,
      icon: PackageCheck,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {experience.location.amenities.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#E5E2DA] shadow-2xs hover:border-[#CCC8BD] transition-colors duration-150"
            >
              <div className="w-6 h-6 rounded-lg bg-[#ECF6F0] border border-[#CBE3D5] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-[#2A5C43]" strokeWidth={2.5} />
              </div>
              <span className="text-xs font-semibold text-[#1A1917]">{item}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'checklist',
      title: 'What to Bring & Attendee Checklist',
      subtitle: 'Footwear, gear, and guest requirements',
      icon: ClipboardList,
      content: (
        <div className="space-y-3.5">
          <div className="space-y-2.5">
            {experience.requirements.map((req, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#33312B]">
                <div className="w-4 h-4 rounded-full bg-white border border-[#DDD9D0] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-[#1A1917]" strokeWidth={2.5} />
                </div>
                <span className="leading-relaxed font-medium">{req}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#827E74] pt-3 border-t border-[#F2F0EB]">
            Need gear advice? Connect directly with {experience.host.name} on the guest chat after reserving your spot.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Back Navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#827E74] hover:text-[#1A1917] transition-colors duration-150"
      >
        <ArrowLeft className="w-4 h-4" /> Back to experiences
      </button>

      {/* Header Info */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="terra" size="sm">
            {experience.categoryLabel}
          </Badge>
          <Badge variant="default" size="sm">
            {experience.difficulty}
          </Badge>
          <span className="flex items-center gap-1.5 text-xs font-bold text-[#1A1917] ml-2">
            <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
            {experience.rating} <span className="text-[#827E74] font-normal">({experience.reviewCount} verified reviews)</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1A1917] tracking-tight leading-tight">
          {experience.title}
        </h1>

        <p className="text-xs sm:text-sm text-[#827E74] flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#7C1D2F] shrink-0" />
          {experience.location.venueName}, {experience.location.city}
        </p>
      </div>

      {/* Watermelon UI Carousel Slider Hero Gallery */}
      <CarouselSlider images={experience.images} title={experience.title} />

      {/* TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Host Card - High Craft Series A UI */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:border-[#DDD8CD] transition-colors"
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative">
                <img
                  src={experience.host.avatar}
                  alt={experience.host.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm ring-1 ring-[#E5E2DA]"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#2A5C43] text-white flex items-center justify-center border-2 border-white shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base sm:text-lg text-[#1A1917]">
                    Hosted by {experience.host.name}
                  </h3>
                  <Badge variant="terra" size="sm">Superhost</Badge>
                </div>
                <p className="text-xs text-[#706D65]">{experience.host.title}</p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-semibold text-[#57544C]">
                  <span className="flex items-center gap-1 text-[#2A5C43]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Identity Verified
                  </span>
                  <span>•</span>
                  <span>{experience.host.experiencesHosted} Cohorts Hosted</span>
                  <span>•</span>
                  <span className="text-[#D97706] flex items-center gap-1 font-bold">
                    <Star className="w-3 h-3 fill-current" /> 4.96 Host Rating
                  </span>
                </div>
              </div>
            </div>
            <div className="sm:text-right shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F3F1EC]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#827E74] block">Host Trust Score</span>
              <span className="text-xl font-extrabold text-[#2D7A4F] tabular-nums">99% Positive</span>
              <span className="text-[10px] text-[#827E74] block">100% Response Rate</span>
            </div>
          </motion.div>

          {/* Quick Metrics Bar - 4 High-Craft Architectural Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs">
            <div className="flex items-center gap-3 p-2">
              <div className="w-9 h-9 rounded-xl bg-[#FAF9F7] border border-[#E5E2DA] flex items-center justify-center text-[#1A1917] shrink-0 shadow-2xs">
                <Clock className="w-4 h-4 text-[#57544C]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#827E74] uppercase tracking-wider block">Duration</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1917]">{experience.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <div className="w-9 h-9 rounded-xl bg-[#FAF9F7] border border-[#E5E2DA] flex items-center justify-center text-[#1A1917] shrink-0 shadow-2xs">
                <Users className="w-4 h-4 text-[#57544C]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#827E74] uppercase tracking-wider block">Group Cap</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1917]">{experience.groupSize}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <div className="w-9 h-9 rounded-xl bg-[#FAF9F7] border border-[#E5E2DA] flex items-center justify-center text-[#1A1917] shrink-0 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#24543C]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#827E74] uppercase tracking-wider block">Safety & Gear</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1917]">All Provided</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <div className="w-9 h-9 rounded-xl bg-[#FAF9F7] border border-[#E5E2DA] flex items-center justify-center text-[#1A1917] shrink-0 shadow-2xs">
                <Compass className="w-4 h-4 text-[#57544C]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#827E74] uppercase tracking-wider block">Skill Level</span>
                <span className="text-xs sm:text-sm font-bold text-[#1A1917]">{experience.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Watermelon UI Spring Split Accordion */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#1A1917]">
              Experience Details & Logistics
            </h3>
            <WatermelonAccordion items={accordionSections} allowMultiple={true} />
          </div>

          {/* Community Reviews - Transparent Startup-Grade Verified Evaluation Hub */}
          <div className="space-y-6 pt-6 border-t border-[#E5E2DA]">
            {/* Header with Title and Trust Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-[#1A1917] tracking-tight">
                  Verified Attendee Reviews
                </h3>
                <p className="text-xs text-[#827E74]">
                  Evaluations submitted by guests who physically checked in on-site
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ECF6F0] border border-[#CBE3D5] text-xs font-bold text-[#2A5C43]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Closed-Loop Verified Check-Ins Only</span>
              </div>
            </div>

            {/* Overall Score & Histogram Breakdown Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#E5E2DA] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Big Score Block */}
              <div className="md:col-span-5 text-center md:text-left md:border-r border-[#F3F1EC] md:pr-6 space-y-2">
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="text-5xl font-black text-[#1A1917] tracking-tight tabular-nums">
                    {experience.rating}
                  </span>
                  <span className="text-sm font-semibold text-[#827E74]">/ 5.0</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-1 text-[#D97706]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#706D65] font-medium">
                  Based on <strong className="text-[#1A1917]">{experience.reviewCount} verified</strong> cohort bookings in Pune
                </p>
              </div>

              {/* Star Distribution Histogram */}
              <div className="md:col-span-7 space-y-2 text-xs">
                {[
                  { star: 5, pct: 94, count: 39 },
                  { star: 4, pct: 6, count: 3 },
                  { star: 3, pct: 0, count: 0 },
                  { star: 2, pct: 0, count: 0 },
                  { star: 1, pct: 0, count: 0 },
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-3">
                    <span className="w-12 text-[#1A1917] font-semibold tabular-nums text-right">
                      {row.star} {row.star === 1 ? 'star' : 'stars'}
                    </span>
                    <div className="flex-1 bg-[#F3F1EC] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#1A1917] h-full rounded-full transition-all duration-500"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-[11px] text-[#827E74] tabular-nums text-right">
                      {row.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Dimension Sub-Ratings */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAF9F7] border border-[#E5E2DA]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#827E74] uppercase tracking-wider block">Host Guidance</span>
                <span className="text-sm font-black text-[#1A1917] flex items-center gap-1">
                  5.0 <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#827E74] uppercase tracking-wider block">Safety & Gear</span>
                <span className="text-sm font-black text-[#1A1917] flex items-center gap-1">
                  5.0 <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#827E74] uppercase tracking-wider block">Trailhead & Vibe</span>
                <span className="text-sm font-black text-[#1A1917] flex items-center gap-1">
                  4.9 <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#827E74] uppercase tracking-wider block">Value for Money</span>
                <span className="text-sm font-black text-[#1A1917] flex items-center gap-1">
                  4.8 <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                </span>
              </div>
            </div>

            {/* Verified Attendee Review Cards */}
            <div className="grid grid-cols-1 gap-4">
              {experience.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E5E2DA] shadow-xs space-y-3.5 hover:border-[#CCC8BD] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={rev.author}
                        className="w-10 h-10 rounded-full object-cover border border-[#E5E2DA]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#1A1917]">{rev.author}</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECF6F0] text-[#2A5C43] text-[10px] font-bold">
                            <Check className="w-3 h-3 stroke-[3]" /> Verified Attendee
                          </span>
                        </div>
                        <span className="text-[11px] text-[#827E74] font-medium">
                          {rev.cohort || 'Saturday Sunrise Cohort'} • {rev.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-[#D97706]">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#45433E] leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {/* Host Reply Thread (if present) */}
                  {rev.hostReply && (
                    <div className="p-3.5 rounded-2xl bg-[#FAF9F7] border border-[#E5E2DA] mt-3 space-y-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.hostReply.avatar}
                          alt={rev.hostReply.name}
                          className="w-6 h-6 rounded-full object-cover border border-[#E5E2DA]"
                        />
                        <span className="font-bold text-[#1A1917]">{rev.hostReply.name}</span>
                        <span className="text-[10px] font-bold uppercase text-[#1A1917] bg-white border border-[#E5E2DA] px-2 py-0.5 rounded-full shadow-2xs">
                          Host
                        </span>
                      </div>
                      <p className="text-[#666257] leading-relaxed pl-8">
                        {rev.hostReply.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Platform Integrity Note */}
            <div className="p-4 rounded-2xl bg-[#FAF9F7] border border-[#E5E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-[#1A1917] block">Closed-Loop Review Architecture</span>
                <span className="text-[#827E74]">
                  Reviews are gated by backend QR check-in records (`CheckIn.attendanceStatus = CHECKED_IN`).
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5E2DA] font-bold text-[#1A1917] shrink-0 text-[11px] shadow-2xs">
                Zero Unverified Reviews
              </span>
            </div>
          </div>
        </div>

        {/* Right Sticky Booking Widget - Premium Series A Conversion Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white/95 backdrop-blur-md rounded-3xl border border-[#E5E2DA] p-6 shadow-[0_8px_30px_rgba(26,25,23,0.06)] hover:border-[#CCC8BD] transition-all duration-200 space-y-5">
            {/* Header: Price & Trust */}
            <div className="flex items-baseline justify-between pb-4 border-b border-[#E5E2DA]">
              <div>
                <span className="text-[11px] text-[#827E74] block uppercase font-bold tracking-wider">Price per guest</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-black text-[#1A1917] tracking-tight">₹{experience.price}</span>
                  <span className="text-xs text-[#827E74] font-medium">all-inclusive</span>
                </div>
              </div>
              <Badge variant="default" size="sm">
                No hidden fees
              </Badge>
            </div>

            {/* Session Selector */}
            <CalendarWidget
              sessions={experience.sessions}
              selectedSessionId={selectedSession?.id}
              onSelectSession={setSelectedSession}
            />

            {/* Guest Count Stepper */}
            {selectedSession && (
              <div className="flex items-center justify-between py-2 border-y border-[#F3F1EC]">
                <div>
                  <span className="text-xs font-bold text-[#1A1917] block">Guest Count</span>
                  <span className="text-[11px] text-[#827E74] font-medium">
                    {maxSpots} {maxSpots === 1 ? 'spot' : 'spots'} remaining
                  </span>
                </div>
                <Stepper
                  value={guestCount}
                  min={1}
                  max={Math.min(maxSpots, 6)}
                  onChange={setGuestCount}
                  label="Guests"
                />
              </div>
            )}

            {/* Total Calculation with Animated Digits */}
            {selectedSession && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-2xl bg-[#FAF9F7] border border-[#E5E2DA] text-xs space-y-2 select-none"
              >
                <div className="flex justify-between text-[#666257]">
                  <span>{guestCount}x Weekend Pass (₹{experience.price} ea)</span>
                  <span className="font-mono text-[#1A1917] font-semibold">₹{passSubtotal}.00</span>
                </div>
                <div className="flex justify-between text-[#666257]">
                  <span>Platform & Host Protection</span>
                  <span className="font-mono text-[#1A1917] font-semibold">₹{platformTotal}.00</span>
                </div>
                <div className="flex justify-between items-baseline font-bold text-sm text-[#1A1917] pt-2 border-t border-[#E5E2DA]">
                  <div>
                    <span>Total Due</span>
                    <span className="block text-[10px] font-normal text-[#827E74]">Inclusive of GST</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={grandTotal}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      className="font-mono text-lg font-black text-[#7C1D2F]"
                    >
                      ₹{grandTotal}.00
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Shimmer CTA with Dynamic Label */}
            <ShimmerButton
              variant="primary"
              size="lg"
              className="w-full text-sm font-bold shadow-sm"
              onClick={() => onBookSession(experience, selectedSession, guestCount)}
            >
              Reserve {guestCount} {guestCount > 1 ? 'Spots' : 'Spot'} — ₹{grandTotal}
            </ShimmerButton>

            <div className="pt-1 text-center space-y-1">
              <p className="text-[11px] text-[#827E74] flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-[#2A5C43]" /> Instant confirmation • Free cancellation up to 24h prior
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
