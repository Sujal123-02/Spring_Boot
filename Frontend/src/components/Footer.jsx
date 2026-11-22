import React, { useState } from 'react';
import { ArrowUp, ArrowRight, ShieldCheck, Sparkles, Check, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

/**
 * Editorial Grounding Footer
 * Rich roasted espresso canvas (#151311) creating an architectural contrast against the dune linen page.
 * Elevated with delicate hairline borders, velvet maroon drop input, and city presence pills.
 */
export const Footer = ({ onViewChange }) => {
  const [dropEmail, setDropEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!dropEmail || !dropEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setDropEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#151311] text-[#A8A29E] mt-24 pt-16 pb-12 overflow-hidden border-t border-[#292420]">
      {/* Subtle Velvet Maroon Top Ambient Accent Hairline */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#7C1D2F]/70 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        {/* Main Grid: Brand + Navigation + Weekly Drop Invite */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-14">
          {/* Column 1: Brand & Manifesto (5 cols on lg) */}
          <div className="md:col-span-5 space-y-4">
            <div onClick={() => onViewChange('landing')} className="cursor-pointer inline-block">
              <BrandLogo variant="light" size="sm" />
            </div>

            <p className="text-xs sm:text-sm text-[#8F8A84] leading-relaxed max-w-sm">
              Weekend is an antidote to routine workweeks and passive screens. We curate intimate outdoor sports, craft ateliers, cupping labs, and tabletop socials led by passionate locals.
            </p>

            {/* Quality & Safety Trust Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F1A17] border border-[#302824] text-[11px] font-semibold text-[#FAF8F5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C1D2F] animate-pulse" />
              <span>Closed-Loop Cohorts • 100% Vetted Local Hosts</span>
            </div>
          </div>

          {/* Column 2: Explore (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8F8A84]">
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('discover')}
                  className="hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block text-left"
                >
                  Board Games & Socials
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('discover')}
                  className="hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block text-left"
                >
                  Sunrise Bouldering
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('discover')}
                  className="hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block text-left"
                >
                  Terracotta Pottery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('discover')}
                  className="hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block text-left"
                >
                  Pashan Lake Birding
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('discover')}
                  className="hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block text-left"
                >
                  Heritage Misal Crawls
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Hosting (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5]">
              Host
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8F8A84]">
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('dashboard')}
                  className="hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block text-left"
                >
                  Organizer Suite
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('create-experience')}
                  className="hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block text-left"
                >
                  Publish Experience
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onViewChange('dashboard')}
                  className="hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block text-left"
                >
                  Cohort Check-In
                </button>
              </li>
              <li>
                <span className="text-[#6B655F] cursor-default">
                  Host Protection Insurance
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Curated Thursday Drop Newsletter (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF8F5] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E8A5AF]" />
              The Thursday Drop
            </h4>
            <p className="text-xs text-[#8F8A84] leading-relaxed">
              Every Thursday at 7 PM, 30 secret weekend slots open in Pune. Never spam.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  value={dropEmail}
                  onChange={(e) => setDropEmail(e.target.value)}
                  placeholder="your.email@work.com"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#1E1A17] border border-[#332C26] text-xs text-[#FAF8F5] placeholder-[#665F58] focus:border-[#7C1D2F] focus:outline-none focus:ring-1 focus:ring-[#7C1D2F] transition-all duration-150"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[#7C1D2F] hover:bg-[#621422] text-white text-xs font-bold transition-all duration-150 flex items-center gap-1 shadow-xs"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-[#FAF8F5]" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] font-semibold text-[#FAF8F5] block animate-fadeIn">
                  You’re on this week’s drop list!
                </span>
              )}
            </form>
          </div>
        </div>

        {/* City Hubs Strip */}
        <div className="py-4 border-t border-[#24201D] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#6B655F] text-[11px] font-semibold uppercase tracking-wider">
              Active Hubs:
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E1A17] border border-[#2E2823] text-xs font-semibold text-[#FAF8F5]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C1D2F]" />
              Pune (Core)
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E1A17] border border-[#2E2823] text-xs font-medium text-[#8F8A84]">
              Mumbai (Pilot)
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E1A17]/60 border border-[#28221E] text-xs font-medium text-[#6B655F]">
              Bengaluru (Q1 2027)
            </span>
          </div>

          {/* Smooth Scroll To Top Pill */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E1A17] hover:bg-[#28221E] border border-[#2E2823] hover:border-[#3D352F] text-xs font-semibold text-[#8F8A84] hover:text-[#FAF8F5] transition-all duration-150 shadow-2xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 text-[#E8A5AF]" />
          </button>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-6 border-t border-[#201D1A] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B655F] gap-3">
          <p>© 2026 Weekend Technologies Inc. Designed with precision for craft urban hobbies.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-[#A8A29E] cursor-pointer transition-colors duration-150">Terms</span>
            <span>•</span>
            <span className="hover:text-[#A8A29E] cursor-pointer transition-colors duration-150">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#A8A29E] cursor-pointer transition-colors duration-150">Zero-Scalp Fair Pass Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
