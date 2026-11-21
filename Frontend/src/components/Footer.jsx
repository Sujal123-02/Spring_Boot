import React from 'react';
import { BrandLogo } from './BrandLogo';

export const Footer = ({ onViewChange }) => {
  return (
    <footer className="bg-[#EFEAE0] border-t border-[#DDD6C8] mt-20 pt-16 pb-12 text-[#666257]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Manifesto */}
          <div className="col-span-2 space-y-3">
            <div onClick={() => onViewChange('landing')} className="cursor-pointer inline-block">
              <BrandLogo size="sm" />
            </div>
            <p className="text-xs text-[#827E74] leading-relaxed max-w-sm">
              Weekend is an antidote to the routine workweek. We curate intimate outdoor sports, craft workshops, food tastings, and community adventures led by verified local masters.
            </p>
            <div className="text-xs text-[#24543C] font-semibold flex items-center gap-1.5 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#24543C]"></span>
              Certified Safe & Closed-Loop Verified Gatherings
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1917] mb-3">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onViewChange('discover')} className="hover:text-[#1A1917] transition-colors duration-150">Hiking & Treks</button></li>
              <li><button onClick={() => onViewChange('discover')} className="hover:text-[#1A1917] transition-colors duration-150">Specialty Coffee</button></li>
              <li><button onClick={() => onViewChange('discover')} className="hover:text-[#1A1917] transition-colors duration-150">Pottery Workshops</button></li>
              <li><button onClick={() => onViewChange('discover')} className="hover:text-[#1A1917] transition-colors duration-150">Pickleball Socials</button></li>
              <li><button onClick={() => onViewChange('discover')} className="hover:text-[#1A1917] transition-colors duration-150">Heritage Misal Crawls</button></li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1917] mb-3">Host on Weekend</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onViewChange('dashboard')} className="hover:text-[#1A1917] transition-colors duration-150">Host Guidelines</button></li>
              <li><button onClick={() => onViewChange('dashboard')} className="hover:text-[#1A1917] transition-colors duration-150">Organizer Hub</button></li>
              <li><a href="#safety" className="hover:text-[#1A1917] transition-colors duration-150">Host Protection Insurance</a></li>
              <li><a href="#community" className="hover:text-[#1A1917] transition-colors duration-150">Community Standards</a></li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A1917] mb-3">Trust & Safety</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#terms" className="hover:text-[#1A1917] transition-colors duration-150">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-[#1A1917] transition-colors duration-150">Privacy Policy</a></li>
              <li><a href="#cancellation" className="hover:text-[#1A1917] transition-colors duration-150">Cancellation Rules</a></li>
              <li><a href="#emergency" className="hover:text-[#1A1917] transition-colors duration-150">24/7 Support Hotline</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar — cleaned up, no AI copy */}
        <div className="pt-8 border-t border-[#E5E2DA] flex flex-col sm:flex-row items-center justify-between text-xs text-[#827E74] gap-4">
          <p>© 2026 Weekend Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#1A1917] cursor-pointer transition-colors duration-150">Pune • Mumbai • Bengaluru</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
