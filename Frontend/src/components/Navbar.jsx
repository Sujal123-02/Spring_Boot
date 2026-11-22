import React from 'react';
import { Compass, Calendar, PlusCircle, Bell, User } from 'lucide-react';
import { Button } from './Button';
import { BrandLogo } from './BrandLogo';
import { ContinuousTabs } from './watermelon/ContinuousTabs';

export const Navbar = ({ currentView, onViewChange, currentUser }) => {
  const navTabs = [
    { id: 'landing', label: 'Home' },
    { id: 'discover', label: 'Discover' },
    { id: 'dashboard', label: 'Organizer Hub' }
  ];

  const normalizedActive = ['dashboard', 'create-experience', 'manage-sessions'].includes(currentView)
    ? 'dashboard'
    : ['landing', 'discover'].includes(currentView)
      ? currentView
      : '';

  return (
    <header className="sticky top-0 z-30 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#E6E0D4] transition-[border-color] duration-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div onClick={() => onViewChange('landing')} className="cursor-pointer">
          <BrandLogo size="md" />
        </div>

        {/* Center: Watermelon UI Continuous Smooth Spring Tabs */}
        <div className="hidden md:block">
          <ContinuousTabs
            tabs={navTabs}
            activeId={normalizedActive}
            onChange={(id) => onViewChange(id)}
            layoutId="navbar-nav-pill"
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewChange('create-experience')}
            className="hidden sm:inline-flex"
            icon={PlusCircle}
          >
            Host an Experience
          </Button>

          {/* User Profile / Auth Toggle */}
          <div
            onClick={() => onViewChange('auth')}
            className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl bg-white border border-[#E5E2DA] hover:border-[#CCC8BD] cursor-pointer transition-colors duration-150 shadow-xs"
            title="Account & Role Switcher"
          >
            <div className="w-7 h-7 rounded-lg bg-[#1A1917] text-white font-bold text-[11px] flex items-center justify-center tracking-tight">
              {currentUser?.avatarInitials || 'PD'}
            </div>
            <div className="flex flex-col text-left hidden sm:flex">
              <span className="text-xs font-bold text-[#1A1917] leading-none">
                {currentUser?.name || 'Parth D.'}
              </span>
              <span className="text-[10px] text-[#827E74] leading-none mt-0.5">
                {currentUser?.role === 'HOST' ? 'Superhost' : 'Member'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
