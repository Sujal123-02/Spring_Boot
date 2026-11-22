import React, { useState } from 'react';
import {
  Star, Clock, Users, MapPin, ShieldCheck, Calendar, ArrowLeft,
  CheckCircle2, Compass, PackageCheck, Sparkles, Check, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ShimmerButton } from '../components/watermelon/ShimmerButton';
import { Stepper } from '../components/watermelon/Stepper';
import { CarouselSlider } from '../components/watermelon/CarouselSlider';
import { CalendarWidget } from '../components/watermelon/CalendarWidget';
import { SaveButton } from '../components/watermelon/SaveButton';

/**
 * Editorial Experience Detail Page
 * Clean, typography-led luxury consumer layout inspired by Airbnb Experiences & Kinfolk.
 * Completely free of generic AI metrics, chunky plastic pills, and artificial accordions.
 */
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#78716C] hover:text-[#1C1917] transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4" /> Back to experiences
        </button>

        <div className="flex items-center gap-2">
          <SaveButton />
        </div>
      </div>

      {/* Header & Title Section — Refined Typography (No Chunky Pills) */}
      <div className="space-y-3 pb-2 border-b border-[#E6E0D4]">
        {/* Subtle Metadata Line */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#78716C]">
          <span className="font-bold uppercase tracking-wider text-[#7C1D2F]">
            {experience.categoryLabel}
          </span>
          <span>•</span>
          <span className="font-medium text-[#44403C]">
            {experience.difficulty}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-bold text-[#1C1917]">
            <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
            {experience.rating}
            <span className="text-[#78716C] font-normal">({experience.reviewCount} verified reviews)</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight leading-tight">
          {experience.title}
        </h1>

        {/* Location & Tagline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-[#78716C]">
          <p className="flex items-center gap-1.5 font-medium text-[#44403C]">
            <MapPin className="w-4 h-4 text-[#7C1D2F] shrink-0" />
            {experience.location.venueName}, {experience.location.city}
          </p>
          <span className="text-xs text-[#78716C]">
            {experience.tagline}
          </span>
        </div>
      </div>

      {/* Gallery Showcase */}
      <CarouselSlider images={experience.images} title={experience.title} />

      {/* TWO-COLUMN EDITORIAL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Narrative & Logistics */}
        <div className="lg:col-span-7 space-y-10">

          {/* 1. Host Profile — Human, Authentic, Breathable */}
          <div className="p-6 rounded-3xl bg-white border border-[#E6E0D4] shadow-xs space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={experience.host.avatar}
                  alt={experience.host.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-[#E6E0D4] shadow-2xs"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#2A5C43] text-white flex items-center justify-center border-2 border-white shadow-2xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base sm:text-lg text-[#1C1917]">
                    Hosted by {experience.host.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#FAF0F2] text-[#7C1D2F] border border-[#F0D5DA] text-[10px] font-bold">
                    Superhost
                  </span>
                </div>
                <p className="text-xs text-[#78716C]">{experience.host.title}</p>
                <p className="text-[11px] text-[#57534E] pt-0.5">
                  {experience.host.experiencesHosted} cohorts hosted • Identity verified • Pune community
                </p>
              </div>
            </div>

            {/* Host Bio / Personal Philosophy */}
            <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed italic border-t border-[#F5F2EB] pt-3">
              "{experience.host.bio}"
            </p>
          </div>

          {/* 2. Key Highlights — Clean Vertical Rows with Natural Descriptions */}
          <div className="p-6 rounded-3xl bg-white border border-[#E6E0D4] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C1917]">
              Session Highlights
            </h3>

            <div className="divide-y divide-[#F5F2EB]">
              <div className="py-3 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E6E0D4] flex items-center justify-center text-[#7C1D2F] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1C1917]">
                    {experience.duration} total duration
                  </h4>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    Paced intentionally with welcome refreshments, guided activities, and social breaks.
                  </p>
                </div>
              </div>

              <div className="py-3 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E6E0D4] flex items-center justify-center text-[#7C1D2F] shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1C1917]">
                    Small group ({experience.groupSize})
                  </h4>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    Capped for genuine table interaction and personalized guidance from hosts.
                  </p>
                </div>
              </div>

              <div className="py-3 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E6E0D4] flex items-center justify-center text-[#2A5C43] shrink-0 mt-0.5">
                  <PackageCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1C1917]">
                    Everything provided
                  </h4>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    Gear, materials, tastings, and table accessories are fully covered in your pass.
                  </p>
                </div>
              </div>

              <div className="py-3 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E6E0D4] flex items-center justify-center text-[#7C1D2F] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1C1917]">
                    {experience.difficulty}
                  </h4>
                  <p className="text-xs text-[#78716C] leading-relaxed">
                    No prior background required. Hosts coach every step so beginners feel right at home.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. What You'll Do (Narrative Story) — Open & Readable */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-[#1C1917] tracking-tight">
              What you'll experience
            </h3>
            <div className="text-xs sm:text-sm text-[#44403C] leading-relaxed space-y-3 whitespace-pre-line bg-white p-6 rounded-3xl border border-[#E6E0D4] shadow-xs">
              {experience.description}
            </div>
          </div>

          {/* 4. Curated Itinerary (Timeline) */}
          {experience.itinerary && experience.itinerary.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-[#1C1917] tracking-tight">
                Activity Itinerary
              </h3>
              <div className="bg-white p-6 rounded-3xl border border-[#E6E0D4] shadow-xs space-y-4">
                {experience.itinerary.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 text-xs sm:text-sm">
                    <span className="font-mono font-bold text-[#7C1D2F] text-xs pt-0.5 w-16 shrink-0">
                      {step.time}
                    </span>
                    <div className="space-y-0.5 border-l-2 border-[#F5F2EB] pl-3.5 pb-2">
                      <h4 className="font-bold text-[#1C1917]">{step.title}</h4>
                      <p className="text-xs text-[#78716C]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. What's Included & Requirements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* What's Included */}
            <div className="p-5 rounded-3xl bg-white border border-[#E6E0D4] shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2A5C43]" />
                Included in your pass
              </h4>
              <ul className="space-y-2 text-xs text-[#44403C]">
                {experience.location.amenities.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2A5C43]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Know */}
            <div className="p-5 rounded-3xl bg-white border border-[#E6E0D4] shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#7C1D2F]" />
                Good to know
              </h4>
              <ul className="space-y-2 text-xs text-[#44403C]">
                {experience.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C1D2F]" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Venue & Meeting Point */}
          <div className="p-6 rounded-3xl bg-white border border-[#E6E0D4] shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-[#1C1917]">
              <MapPin className="w-4 h-4 text-[#7C1D2F]" />
              <span>Meeting Point & Venue</span>
            </div>
            <div className="pl-6 space-y-1 text-xs">
              <p className="font-bold text-[#1C1917]">{experience.location.venueName}</p>
              <p className="text-[#78716C]">{experience.location.address}, {experience.location.city}</p>
            </div>
          </div>

          {/* 7. Genuine Attendee Reviews */}
          <div className="space-y-6 pt-6 border-t border-[#E6E0D4]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-extrabold text-[#1C1917] tracking-tight">
                  Guest Reviews
                </h3>
                <p className="text-xs text-[#78716C]">
                  Written by confirmed guests who checked in at the venue
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
                <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                <span className="text-lg">{experience.rating}</span>
                <span className="text-[#78716C] font-normal">({experience.reviewCount} total reviews)</span>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {experience.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E6E0D4] shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={rev.author}
                        className="w-10 h-10 rounded-full object-cover border border-[#E6E0D4]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#1C1917]">{rev.author}</span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ECF6F0] text-[#2A5C43] text-[10px] font-semibold">
                            <Check className="w-2.5 h-2.5 stroke-[3]" /> Verified guest
                          </span>
                        </div>
                        <span className="text-[11px] text-[#78716C]">
                          {rev.cohort || 'Weekend Cohort'} • {rev.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-[#D97706]">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {/* Host Reply Thread */}
                  {rev.hostReply && (
                    <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D4] mt-3 space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.hostReply.avatar}
                          alt={rev.hostReply.name}
                          className="w-5 h-5 rounded-full object-cover border border-[#E6E0D4]"
                        />
                        <span className="font-bold text-[#1C1917]">{rev.hostReply.name}</span>
                        <span className="text-[10px] text-[#78716C] font-semibold">Host response</span>
                      </div>
                      <p className="text-[#57534E] leading-relaxed pl-7">
                        {rev.hostReply.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Human Verification Reassurance */}
            <p className="text-center text-xs text-[#78716C] pt-2">
              Only guests who attended this experience in person can leave a review.
            </p>
          </div>
        </div>

        {/* Right Column: Clean Reservation Card (No Black Void) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white rounded-3xl border border-[#E6E0D4] p-6 sm:p-7 shadow-[0_8px_32px_rgba(28,25,23,0.06)] space-y-6">
            {/* Header: Price & Trust */}
            <div className="flex items-baseline justify-between pb-4 border-b border-[#F5F2EB]">
              <div>
                <span className="text-[11px] text-[#78716C] block uppercase font-bold tracking-wider">
                  Price per guest
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-black text-[#1C1917] tracking-tight">
                    ₹{experience.price}
                  </span>
                  <span className="text-xs text-[#78716C] font-medium">all-inclusive</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#57534E] border border-[#E6E0D4] text-[11px] font-semibold">
                No hidden fees
              </span>
            </div>

            {/* Session Selector */}
            <CalendarWidget
              sessions={experience.sessions}
              selectedSessionId={selectedSession?.id}
              onSelectSession={setSelectedSession}
            />

            {/* Guest Count Stepper */}
            {selectedSession && (
              <div className="flex items-center justify-between py-3 border-y border-[#F5F2EB]">
                <div>
                  <span className="text-xs font-bold text-[#1C1917] block">Guest Count</span>
                  <span className="text-[11px] text-[#78716C] font-medium">
                    {selectedSession ? `${selectedSession.registeredCount} of ${selectedSession.totalCapacity} passes reserved` : 'Intimate cohort'}
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

            {/* Price Breakdown */}
            {selectedSession && (
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D4] text-xs space-y-2 select-none">
                <div className="flex justify-between text-[#57534E]">
                  <span>{guestCount}× Weekend Pass (₹{experience.price} ea)</span>
                  <span className="font-mono text-[#1C1917] font-semibold">₹{passSubtotal}.00</span>
                </div>
                <div className="flex justify-between text-[#57534E]">
                  <span>Platform & safety cover</span>
                  <span className="font-mono text-[#1C1917] font-semibold">₹{platformTotal}.00</span>
                </div>
                <div className="pt-2 border-t border-[#E6E0D4] flex justify-between items-baseline font-bold text-sm text-[#1C1917]">
                  <span>Total Due</span>
                  <span className="font-mono text-base font-black text-[#7C1D2F]">₹{grandTotal}.00</span>
                </div>
              </div>
            )}

            {/* Primary Action CTA */}
            <ShimmerButton
              variant="primary"
              size="lg"
              onClick={() => onBookSession?.(experience, selectedSession)}
              className="w-full font-bold text-sm shadow-md"
            >
              Reserve Spot — ₹{grandTotal}
            </ShimmerButton>

            {/* Reassurance Micro-Copy */}
            <div className="space-y-1.5 text-center text-[11px] text-[#78716C] pt-1">
              <p className="flex items-center justify-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2A5C43]" />
                Instant confirmation • Free cancellation up to 24h prior
              </p>
              <p className="text-[10px]">Safe payments powered by closed-loop verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailPage;
