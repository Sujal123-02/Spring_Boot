import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Users, Award, Star, Sparkles, MapPin, Coffee, Compass } from 'lucide-react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { SearchBar } from '../components/SearchBar';
import { CategoryBar } from '../components/CategoryBar';
import { ExperienceCard } from '../components/ExperienceCard';
import { Button } from '../components/Button';
import { ShimmerButton } from '../components/watermelon/ShimmerButton';
import { EXPERIENCES } from '../data/mockData';
import { staggerContainer, staggerItem, EASE_OUT_EXPO } from '../lib/motion';

/** Animated count-up number using Framer Motion */
function CountUp({ to, duration = 1.4, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, to, {
      duration,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()),
    });
    return controls.stop;
  }, [inView, to, duration, decimals, motionVal]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

export const LandingPage = ({ onSelectExperience, onViewChange, experiences = EXPERIENCES }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Scroll reveal trigger - runs once on mount
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    // Auto-reveal the hero top elements immediately
    setTimeout(() => {
      document.querySelectorAll('.hero-reveal').forEach((el) => el.classList.add('is-revealed'));
    }, 50);

    return () => observer.disconnect();
  }, []);

  const filteredExperiences = selectedCategory === 'all'
    ? experiences
    : experiences.filter((exp) => exp.category === selectedCategory);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* HERO SECTION — Dribbble-Grade Atmospheric Composition */}
      <section className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 overflow-hidden">
        {/* Left Floating Experience Capsule (Dribbble-Style Hero Framing with Interactive Hover Lift) */}
        {experiences[0] && (
          <div className="hidden xl:block absolute left-3 2xl:left-10 top-16 z-20 select-none hero-float-left">
            <div
              onClick={() => onSelectExperience(experiences[0])}
              className="w-60 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E6E0D4] shadow-[0_12px_32px_rgba(26,25,23,0.08)] hover:shadow-[0_24px_48px_rgba(28,25,23,0.18)] hover:border-[#7C1D2F]/50 transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:-translate-y-2 group"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-2 bg-[#F3F1EC]">
                <img
                  src={experiences[0].images[0]}
                  alt={experiences[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C1D2F] animate-pulse" />
                  2 spots left
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#706D65] block group-hover:text-[#7C1D2F] transition-colors">
                  {experiences[0].categoryLabel}
                </span>
                <h4 className="font-bold text-xs text-[#1A1917] line-clamp-1 leading-snug group-hover:text-[#7C1D2F] transition-colors">
                  {experiences[0].title}
                </h4>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#F3F1EC] text-[#827E74]">
                  <span>Pune Local</span>
                  <span className="font-bold text-[#1A1917]">₹{experiences[0].price}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Right Floating Experience Capsule (Dribbble-Style Hero Framing with Interactive Hover Lift) */}
        {experiences[2] && (
          <div className="hidden xl:block absolute right-3 2xl:right-10 top-24 z-20 select-none hero-float-right">
            <div
              onClick={() => onSelectExperience(experiences[2])}
              className="w-60 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E6E0D4] shadow-[0_12px_32px_rgba(26,25,23,0.08)] hover:shadow-[0_24px_48px_rgba(28,25,23,0.18)] hover:border-[#7C1D2F]/50 transition-all duration-300 ease-out cursor-pointer hover:scale-105 hover:-translate-y-2 group"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-2 bg-[#F3F1EC]">
                <img
                  src={experiences[2].images[0]}
                  alt={experiences[2].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-[#D97706] text-[#D97706]" />
                  ★ 4.98
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2A5C43] block group-hover:text-[#7C1D2F] transition-colors">
                  {experiences[2].categoryLabel}
                </span>
                <h4 className="font-bold text-xs text-[#1A1917] line-clamp-1 leading-snug group-hover:text-[#7C1D2F] transition-colors">
                  {experiences[2].title}
                </h4>
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#F3F1EC] text-[#827E74]">
                  <span>Artisan Cohort</span>
                  <span className="font-bold text-[#1A1917]">₹{experiences[2].price}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">

            {/* Live Status Pill with Mini Host Avatar Stack */}
            <div className="hero-reveal reveal-on-scroll flex justify-center">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E2DA] shadow-xs text-xs font-semibold text-[#1A1917] hover:border-[#CCC8BD] transition-colors duration-150">
                <div className="flex -space-x-1.5 items-center">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                    alt="Host"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                    alt="Host"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                    alt="Host"
                    className="w-4 h-4 rounded-full border border-white object-cover"
                  />
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2A5C43] animate-pulse"></span>
                <span>Active this weekend in Pune & Mumbai</span>
                <span className="text-[#827E74] font-normal">• 34 spots left</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="hero-reveal reveal-on-scroll reveal-delay-100 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1917] tracking-[-0.03em] leading-[1.12]">
              Break the routine.<br />
              <span className="text-[#7C1D2F]">Your weekend starts here.</span>
            </h1>

            {/* Description */}
            <p className="hero-reveal reveal-on-scroll reveal-delay-200 text-sm sm:text-lg text-[#666257] max-w-2xl mx-auto leading-relaxed">
              Step away from crowded malls and passive screens. Discover intimate sunrise treks, artisan coffee labs, wheel pottery, and sport socials led by passionate locals.
            </p>

            {/* Universal Search Bar */}
            <div className="hero-reveal reveal-on-scroll reveal-delay-300 pt-3 sm:pt-4 flex justify-center">
              <SearchBar onSearch={() => onViewChange('discover')} />
            </div>

            {/* Trust Metrics Ribbon with Watermelon CountUp */}
            <div className="hero-reveal reveal-on-scroll reveal-delay-400 pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#827E74] font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2A5C43]" />
                <span className="font-bold text-[#1A1917]"><CountUp to={100} suffix="%" /></span> Vetted Local Hosts
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#7C1D2F]" />
                Capped Groups (Max <span className="font-bold text-[#1A1917]"><CountUp to={12} /></span> Guests)
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#D97706]" />
                <span className="font-bold text-[#1A1917]"><CountUp to={4.95} decimals={2} /></span> Avg Guest Score
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY BAR — Clean Sticky Positioning */}
      <section className="relative z-20">
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={(id) => setSelectedCategory(id)}
        />
      </section>

      {/* TRENDING EXPERIENCES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal-on-scroll flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#706D65] block mb-1">
              Limited Availability
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1917] tracking-tight">
              Trending for this Saturday & Sunday
            </h2>
            <p className="text-xs sm:text-sm text-[#827E74] mt-0.5">
              {selectedCategory === 'all'
                ? 'Top-rated experiences with 1 to 3 spots remaining in Pune.'
                : `Showing top ${filteredExperiences.length} curated sessions in this category.`}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewChange('discover')}
            className="text-[#1A1917] hover:text-[#57544C] font-semibold"
          >
            Explore all 34 activities <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Experience Cards Grid with Fluid Hardware-Accelerated Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.slice(0, 3).map((exp) => (
              <div key={exp.id} className="h-full flex flex-col">
                <ExperienceCard
                  experience={exp}
                  onSelect={onSelectExperience}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-[#E5E2DA] space-y-3">
              <p className="text-sm font-semibold text-[#1A1917]">No sessions scheduled for this category yet</p>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-bold text-[#7C1D2F] hover:underline"
              >
                View all activities
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CURATED EDITORIAL COLLECTION - High-Craft Magazine Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className="rounded-3xl bg-[#FAF8F5]/95 backdrop-blur-md border border-[#E6E0D4] shadow-[0_8px_32px_rgba(28,25,23,0.06)] p-6 sm:p-10 lg:p-12 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Rich Editorial Storytelling */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C1D2F] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#F8E7EA]" />
                  Weekend Spotlight
                </span>
                <span className="text-xs font-bold text-[#827E74]">
                  Outdoor Adventure • ★ 4.96 (42 verified reviews)
                </span>
              </div>

              <div className="space-y-2.5">
                <h3 className="text-2xl sm:text-4xl font-black text-[#1A1917] tracking-tight leading-tight">
                  Sunrise Bouldering & Araku Chemex Pour-Over Lab
                </h3>
                <p className="text-xs sm:text-sm text-[#57544C] leading-relaxed">
                  Scale the Sahyadri volcanic rock formations at dawn with expert spotters, then hand-grind single-estate Araku beans under a 100-year-old banyan tree. No climbing experience needed.
                </p>
              </div>

              {/* Curated Inclusions - Professional Vector Badges (No raw emojis) */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E6E0D4] font-semibold text-[#1C1917] shadow-2xs">
                  <Compass className="w-3.5 h-3.5 text-[#7C1D2F]" />
                  Shoes & Crash Pads Included
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E6E0D4] font-semibold text-[#1C1917] shadow-2xs">
                  <Coffee className="w-3.5 h-3.5 text-[#B45309]" />
                  Chemex Brew Lab & Warm Poha
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E6E0D4] font-semibold text-[#1C1917] shadow-2xs">
                  <Users className="w-3.5 h-3.5 text-[#2A5C43]" />
                  Small Cohort (Max 10)
                </span>
              </div>

              {/* Host Attribution */}
              <div className="flex items-center gap-3 pt-1 border-t border-[#EDE7DB]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Anand Kulkarni"
                  className="w-10 h-10 rounded-full object-cover border border-[#E6E0D4] shadow-2xs"
                />
                <div>
                  <div className="text-xs font-bold text-[#1A1917]">Led by Anand Kulkarni</div>
                  <div className="text-[11px] text-[#827E74]">Certified Mountaineer & Q-Grader • 88 Cohorts Hosted</div>
                </div>
              </div>

              {/* CTA Action Bar - Clean High-Craft Velvet Maroon & Beach Style */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <ShimmerButton
                  variant="primary"
                  size="md"
                  onClick={() => onSelectExperience(EXPERIENCES.find(e => e.id === 'exp-1') || EXPERIENCES[0])}
                  className="shadow-sm font-bold text-xs sm:text-sm"
                >
                  View Experience & Book — ₹799
                </ShimmerButton>
                
                {/* Professional Status Chip */}
                <div className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-[#E6E0D4] text-xs font-bold text-[#1A1917] shadow-2xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C1D2F] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C1D2F]"></span>
                  </span>
                  <span>2 spots left</span>
                  <span className="text-[#D5D1C6] font-normal">•</span>
                  <span className="text-[#827E74] font-medium text-[11px]">Filling fast</span>
                </div>
              </div>
            </div>

            {/* Right Column: Framed Photo Showcase — Perfectly Contained & Proportional */}
            <div className="lg:col-span-5 w-full min-w-0">
              <div className="relative rounded-2xl overflow-hidden border border-[#E6E0D4] shadow-md group aspect-[16/11] w-full min-w-0 bg-[#1A1917]">
                <img
                  src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80"
                  alt="Climber on rock at sunrise"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

                {/* Floating Overlay Badge: Date & Time - Safely Inset */}
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/40 shadow-sm text-[11px] font-bold text-[#1A1917]">
                  Saturday • 06:30 AM
                </div>

                {/* Bottom Bar: Safely Inset Frosted Glass Strip */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 sm:p-3 rounded-xl bg-black/55 backdrop-blur-md border border-white/15 flex items-center justify-between text-white shadow-sm min-w-0">
                  <div className="flex items-center gap-1.5 text-xs font-bold truncate min-w-0 pr-2">
                    <MapPin className="w-3.5 h-3.5 text-[#E8A5AF] shrink-0" />
                    <span className="truncate">ARAI Hills Trailhead, Pune</span>
                  </div>
                  <span className="text-xs font-black text-white shrink-0 whitespace-nowrap">
                    ₹799 <span className="font-normal text-[10px] text-white/80">/ pass</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* COMMUNITY HOST SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="text-center max-w-2xl mx-auto mb-12 space-y-2"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#2A5C43]">
            Verified Community
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1917] tracking-tight">
            Led by passionate masters, not tour guides
          </h2>
          <p className="text-xs sm:text-sm text-[#827E74]">
            Every Weekend host is vetted for safety, deep craft passion, and hospitality.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {EXPERIENCES.slice(0, 3).map((exp) => (
            <motion.div
              key={exp.host.id}
              variants={staggerItem}
              className="bg-white p-6 rounded-2xl border border-[#E5E2DA] shadow-xs hover:border-[#CCC8BD] transition-colors duration-150 space-y-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={exp.host.avatar}
                  alt={exp.host.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#E5E2DA]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#1A1917]">{exp.host.name}</h4>
                  <p className="text-xs text-[#827E74]">{exp.host.title}</p>
                </div>
              </div>
              <p className="text-xs text-[#666257] leading-relaxed italic">
                "{exp.host.bio}"
              </p>
              <div className="pt-3 border-t border-[#E5E2DA] flex items-center justify-between text-xs text-[#827E74]">
                <span className="font-semibold text-[#1A1917]">{exp.host.experiencesHosted} Hosted</span>
                <span className="flex items-center gap-1 text-[#2D7A4F] font-semibold">
                  <Star className="w-3 h-3 fill-[#2D7A4F] text-[#2D7A4F]" />
                  {exp.rating}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

