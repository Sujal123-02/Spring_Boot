import React, { useState } from 'react';
import {
  Users, Calendar, TrendingUp, DollarSign, CheckCircle2,
  Clock, PlusCircle, Search, Filter, ShieldCheck,
  MapPin, Phone, Mail, Copy, Check, Sparkles, ChevronRight, AlertCircle,
  LayoutDashboard, CalendarDays, QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { MOCK_ORGANIZER_DATA } from '../data/mockData';
import { DiscreteTabs } from '../components/watermelon/DiscreteTabs';
import { LabeledProgressIndicator } from '../components/watermelon/LabeledProgressIndicator';
import { staggerContainer, staggerItem } from '../lib/motion';

export const OrganizerDashboardPage = ({ onViewChange, onSelectExperience }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [attendees, setAttendees] = useState(MOCK_ORGANIZER_DATA.attendeesList);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'checked_in' | 'awaiting'
  const [copiedId, setCopiedId] = useState(null);

  const toggleCheckIn = (id) => {
    setAttendees((prev) =>
      prev.map((att) => {
        if (att.id === id) {
          const newStatus = !att.checkedIn;
          return {
            ...att,
            checkedIn: newStatus,
            checkInTime: newStatus ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
          };
        }
        return att;
      })
    );
  };

  const copyBookingId = (bookingId) => {
    navigator.clipboard?.writeText?.(bookingId);
    setCopiedId(bookingId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const checkedCount = attendees.filter((a) => a.checkedIn).length;
  const awaitingCount = attendees.length - checkedCount;
  const checkInPercentage = Math.round((checkedCount / attendees.length) * 100);

  const filteredAttendees = attendees.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone.includes(searchQuery);

    if (!matchesSearch) return false;
    if (statusFilter === 'checked_in') return a.checkedIn;
    if (statusFilter === 'awaiting') return !a.checkedIn;
    return true;
  });

  const kpiCards = [
    {
      label: "This Month's Revenue",
      value: '₹38,400',
      icon: TrendingUp,
      iconBg: 'bg-[#ECF6F0] text-[#2D7A4F] border-[#CBE3D5]',
      sub: '+24% vs last month',
      subColor: 'text-[#2D7A4F]',
      badge: 'Payout Nov 24',
      badgeColor: 'bg-[#FAF9F7] text-[#57544C] border-[#E5E2DA]'
    },
    {
      label: 'Confirmed Bookings',
      value: `${MOCK_ORGANIZER_DATA.metrics.totalBookings} Guests`,
      icon: Users,
      iconBg: 'bg-[#FAF9F7] text-[#1A1917] border-[#E5E2DA]',
      sub: 'Across 4 upcoming slots',
      subColor: 'text-[#666257]',
      badge: 'Avg 12 / session',
      badgeColor: 'bg-[#FAF9F7] text-[#57544C] border-[#E5E2DA]'
    },
    {
      label: 'Avg. Occupancy Rate',
      value: `${MOCK_ORGANIZER_DATA.metrics.occupancyRate}%`,
      icon: ShieldCheck,
      iconBg: 'bg-[#FAF9F7] text-[#1A1917] border-[#E5E2DA]',
      sub: 'Top 5% among Pune hosts',
      subColor: 'text-[#2A5C43]',
      hasProgress: true,
      progressValue: 92
    },
    {
      label: 'Next Session Countdown',
      value: 'In 2 Days',
      icon: Clock,
      iconBg: 'bg-[#FAF9F7] text-[#1A1917] border-[#E5E2DA]',
      sub: 'Saturday • 06:30 AM',
      subColor: 'text-[#1A1917] font-bold',
      badge: 'Cohort Full (10/12)',
      badgeColor: 'bg-white text-[#1A1917] border-[#E5E2DA]'
    }
  ];

  const dashboardTabs = [
    {
      id: 'overview',
      label: 'Overview & Metrics',
      icon: LayoutDashboard,
    },
    {
      id: 'sessions',
      label: 'Scheduled Sessions',
      icon: CalendarDays,
      badge: `${MOCK_ORGANIZER_DATA.activeSessions.length}`,
      badgeColor: 'bg-[#EAE5DA] text-[#44403C]'
    },
    {
      id: 'attendees',
      label: 'On-Site Check-In Gate',
      icon: QrCode,
      badge: `${checkedCount}/${attendees.length}`,
      badgeColor: 'bg-[#ECF6F0] text-[#24543C] border border-[#C6E2D2]'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header - Executive Host Cockpit */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E5E2DA] shadow-[0_4px_24px_rgba(26,25,23,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4 sm:gap-5">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#9E2A3F] via-[#7C1D2F] to-[#5C1321] text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-white">
              AK
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#2A5C43] border-2 border-white flex items-center justify-center text-white shadow-2xs">
              <Check className="w-3 h-3 stroke-[3]" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7C1D2F]">
                Host Command Center
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECF6F0] border border-[#CBE3D5] text-[10px] font-bold text-[#2D7A4F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4F] animate-pulse"></span>
                Superhost Verified
              </span>
              <span className="text-xs font-semibold text-[#827E74] hidden sm:inline">•</span>
              <span className="text-xs font-semibold text-[#57544C] hidden sm:inline">ARAI Outdoor Guild</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1A1917] tracking-tight">
              Welcome back, {MOCK_ORGANIZER_DATA.hostName}
            </h1>
            <p className="text-xs sm:text-sm text-[#706D65] leading-relaxed">
              Manage your upcoming weekend cohorts, real-time on-site guest check-ins, and earnings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="secondary"
            size="md"
            icon={PlusCircle}
            onClick={() => onViewChange && onViewChange('create-experience')}
            className="shadow-2xs text-xs font-bold"
          >
            Create Experience
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={Calendar}
            onClick={() => onViewChange && onViewChange('manage-sessions')}
            className="shadow-sm text-xs font-bold"
          >
            Manage Sessions
          </Button>
        </div>
      </div>

      {/* Navigation Tabs - Watermelon Discrete Tabs */}
      <div className="flex justify-start">
        <DiscreteTabs
          tabs={dashboardTabs}
          activeId={activeTab}
          onChange={setActiveTab}
          layoutId="organizer-dashboard-main-tabs"
        />
      </div>

      {/* TAB 1: OVERVIEW & PERFORMANCE */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-8"
        >
          {/* KPI METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {kpiCards.map((card, i) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="p-5 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-[#E5E2DA] shadow-[0_4px_16px_rgba(26,25,23,0.03)] hover:border-[#CCC8BD] hover:shadow-[0_8px_24px_rgba(26,25,23,0.06)] transition-all space-y-3.5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#827E74]">
                      {card.label}
                    </span>
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${card.iconBg}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-black text-[#1A1917] tracking-tight tabular-nums">
                      {card.value}
                    </div>
                    <div className="text-xs font-semibold flex items-center gap-1.5 text-[#57544C]">
                      {card.sub}
                    </div>
                  </div>

                  {card.hasProgress ? (
                    <div className="pt-2 border-t border-[#F3F1EC]">
                      <div className="w-full bg-[#F3F1EC] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#2A5C43] h-full rounded-full transition-all duration-500"
                          style={{ width: `${card.progressValue}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-[#F3F1EC] flex items-center justify-between text-[11px]">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${card.badgeColor}`}>
                        {card.badge}
                      </span>
                      <span className="text-[10px] font-semibold text-[#827E74]">Real-time</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Quick Cohort Snapshot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Active Session Card */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E5E2DA] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E2DA]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#706D65] block">
                    Next Active Cohort
                  </span>
                  <h3 className="text-lg font-black text-[#1A1917] mt-0.5">
                    Sunrise Bouldering & Chemex Lab
                  </h3>
                </div>
                <Badge variant="default" size="md">
                  Saturday • 06:30 AM
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D4] space-y-1.5 shadow-2xs">
                  <span className="text-[#827E74] flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-[#7C1D2F]" /> Venue
                  </span>
                  <span className="font-extrabold text-sm text-[#1C1917] block">ARAI Hills Trailhead Gate</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D4] space-y-1.5 shadow-2xs">
                  <span className="text-[#827E74] flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-[#2A5C43]" /> Cohort Roster
                  </span>
                  <span className="font-extrabold text-sm text-[#1C1917] block">10 of 12 Registered</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E6E0D4] space-y-1.5 shadow-2xs">
                  <span className="text-[#827E74] flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider">
                    <DollarSign className="w-3.5 h-3.5 text-[#D97706]" /> Gross Pass Revenue
                  </span>
                  <span className="font-extrabold text-sm text-[#2D7A4F] block">₹7,990.00</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2A5C43] animate-pulse"></span>
                  <span className="text-xs font-semibold text-[#57544C]">
                    Check-in terminal ready for Saturday morning
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveTab('attendees')}
                >
                  Open Live Check-In Gate →
                </Button>
              </div>
            </div>

            {/* Right: Host Trust & Tips */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-[#151311] border border-[#292420] text-[#D6D3D1] space-y-4 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#7C1D2F]/70 to-transparent" />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E8A5AF]">
                  <Sparkles className="w-4 h-4 text-[#E8A5AF]" />
                  <span>Host Insight & Yield</span>
                </div>
                <h4 className="font-bold text-base text-white leading-snug">
                  Winter morning bouldering demand is up 42% in Pune
                </h4>
                <p className="text-xs text-[#A8A29E] leading-relaxed">
                  Attendees love early sunrise slots. Consider opening a second Sunday 06:15 AM slot to capture overflow waitlists.
                </p>
              </div>

              <div className="pt-4 border-t border-[#292420] flex items-center justify-between text-xs text-[#A8A29E]">
                <span>Superhost Perks Active</span>
                <span className="text-[#86EFAC] font-bold bg-[#1F2D24] border border-[#2A4433] px-2.5 py-0.5 rounded-full text-[10px]">
                  0% Commission
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: SCHEDULED SESSIONS */}
      {activeTab === 'sessions' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-[#1A1917]">Scheduled Cohorts</h3>
              <p className="text-xs text-[#827E74]">Manage roster capacities, pricing, and timing for upcoming sessions</p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              icon={PlusCircle}
              onClick={() => onViewChange && onViewChange('manage-sessions')}
            >
              Add New Session
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOCK_ORGANIZER_DATA.activeSessions.map((sess) => {
              const isFull = sess.status === 'SOLD_OUT';
              const fillPct = Math.round((sess.registeredCount / sess.capacity) * 100);
              return (
                <motion.div
                  key={sess.id}
                  whileHover={{ y: -3 }}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E5E2DA] space-y-4 shadow-xs hover:border-[#CCC8BD] hover:shadow-[0_8px_24px_rgba(26,25,23,0.06)] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#827E74]">{sess.date}</span>
                    <Badge variant={isFull ? 'default' : 'terra'} size="sm">
                      {isFull ? 'SOLD OUT' : `${sess.capacity - sess.registeredCount} passes open`}
                    </Badge>
                  </div>

                  <h4 className="font-bold text-base text-[#1A1917] leading-snug">
                    {sess.title}
                  </h4>

                  <div className="text-xs text-[#666257] space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#7C1D2F] shrink-0" />
                      <span>{sess.time}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#827E74] shrink-0" />
                      <span className="truncate">{sess.venue}</span>
                    </div>
                  </div>

                  {/* Labeled Progress Indicator */}
                  <div className="pt-2 border-t border-[#F3F1EC]">
                    <LabeledProgressIndicator
                      percent={fillPct}
                      label="Cohort Capacity"
                      valueLabel={`${sess.registeredCount}/${sess.capacity} filled`}
                      color={isFull ? '#1A1917' : '#7C1D2F'}
                    />
                  </div>

                  <div className="pt-3 border-t border-[#F3F1EC] flex items-center justify-between">
                    <span className="font-black text-base text-[#1A1917] tabular-nums">
                      ₹{sess.price} <span className="font-normal text-xs text-[#827E74]">/ pass</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveTab('attendees')}
                      className="text-xs font-bold"
                    >
                      View Roster →
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* TAB 3: ON-SITE CHECK-IN ROSTER */}
      {activeTab === 'attendees' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-6"
        >
          {/* Live Check-In Banner */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E2DA] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECF6F0] border border-[#CBE3D5] text-[10px] font-bold text-[#2D7A4F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4F] animate-ping"></span>
                  Live Terminal Active
                </span>
                <span className="text-xs text-[#827E74]">Saturday 06:30 AM Cohort</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1A1917]">
                Saturday Morning Check-In (ARAI Hills Trailhead Gate)
              </h2>
              <p className="text-xs text-[#706D65]">
                Tap "Check In" as guests arrive. Status updates in real-time.
              </p>
            </div>

            {/* Live Progress Metric */}
            <div className="min-w-[200px] sm:min-w-[240px] space-y-1.5 p-4 rounded-2xl bg-[#FAF9F7] border border-[#E5E2DA]">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-[#1A1917]">Checked In</span>
                <span className="text-[#2D7A4F]">{checkedCount} of {attendees.length} ({checkInPercentage}%)</span>
              </div>
              <div className="w-full bg-[#E5E2DA] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#2A5C43] h-full rounded-full transition-all duration-300"
                  style={{ width: `${checkInPercentage}%` }}
                />
              </div>
              <span className="text-[10px] text-[#827E74] block">
                {awaitingCount} {awaitingCount === 1 ? 'guest' : 'guests'} yet to arrive
              </span>
            </div>
          </div>

          {/* Filter & Search Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-[#E5E2DA] shadow-2xs">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${statusFilter === 'all'
                  ? 'bg-[#1A1917] text-white shadow-xs'
                  : 'text-[#666257] hover:text-[#1A1917]'
                  }`}
              >
                All ({attendees.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('checked_in')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${statusFilter === 'checked_in'
                  ? 'bg-[#2A5C43] text-white shadow-xs'
                  : 'text-[#666257] hover:text-[#2A5C43]'
                  }`}
              >
                Checked In ({checkedCount})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('awaiting')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${statusFilter === 'awaiting'
                  ? 'bg-[#D97706] text-white shadow-xs'
                  : 'text-[#666257] hover:text-[#D97706]'
                  }`}
              >
                Awaiting ({awaitingCount})
              </button>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#827E74]" />
              <input
                type="text"
                placeholder="Search attendee, booking ref, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-2xl bg-white border border-[#E5E2DA] focus:border-[#7C1D2F] focus:ring-2 focus:ring-[#7C1D2F]/20 focus:outline-none text-xs text-[#1A1917] shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Elevated Attendee Roster Table */}
          <div className="bg-white rounded-3xl border border-[#E5E2DA] overflow-hidden shadow-[0_4px_20px_rgba(26,25,23,0.04)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF9F7] border-b border-[#E5E2DA] text-[#827E74] uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="py-3.5 px-5">Seat</th>
                    <th className="py-3.5 px-5">Attendee Details</th>
                    <th className="py-3.5 px-5">Booking Ref</th>
                    <th className="py-3.5 px-5">Contact</th>
                    <th className="py-3.5 px-5">Arrival Status</th>
                    <th className="py-3.5 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F1EC]">
                  {filteredAttendees.map((att) => {
                    const initials = att.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2);

                    return (
                      <tr
                        key={att.id}
                        className={`transition-colors duration-150 ${att.checkedIn ? 'bg-[#FCFDFB] hover:bg-[#F6FAF7]' : 'hover:bg-[#FAF9F7]'
                          }`}
                      >
                        {/* Seat Number */}
                        <td className="py-4 px-5">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-[#FAF9F7] border border-[#E5E2DA] font-black text-xs text-[#1A1917] tabular-nums">
                            #{att.seatNumber}
                          </span>
                        </td>

                        {/* Attendee Info */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#1A1917] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                              {initials}
                            </div>
                            <div>
                              <div className="font-extrabold text-sm text-[#1A1917]">{att.name}</div>
                              <div className="text-[11px] text-[#706D65] flex items-center gap-1">
                                <Mail className="w-3 h-3 text-[#827E74]" />
                                {att.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Booking Ref */}
                        <td className="py-4 px-5">
                          <button
                            type="button"
                            onClick={() => copyBookingId(att.bookingId)}
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#1A1917] bg-[#FAF9F7] px-2.5 py-1 rounded-lg border border-[#E5E2DA] hover:border-[#CCC8BD] transition-colors"
                            title="Click to copy booking reference"
                          >
                            <span>{att.bookingId}</span>
                            {copiedId === att.bookingId ? (
                              <Check className="w-3 h-3 text-[#2D7A4F]" />
                            ) : (
                              <Copy className="w-3 h-3 text-[#827E74]" />
                            )}
                          </button>
                        </td>

                        {/* Phone Contact */}
                        <td className="py-4 px-5">
                          <a
                            href={`tel:${att.phone}`}
                            className="inline-flex items-center gap-1.5 text-xs text-[#57544C] hover:text-[#7C1D2F] transition-colors"
                          >
                            <Phone className="w-3 h-3 text-[#827E74]" />
                            <span className="tabular-nums font-medium">{att.phone}</span>
                          </a>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-5">
                          {att.checkedIn ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECF6F0] text-[#24543C] font-semibold text-xs border border-[#C6E2D2] shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4F]"></span>
                              Checked In ({att.checkInTime})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[#57544C] font-semibold text-xs border border-[#E5E2DA] shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#A8A49A]"></span>
                              Awaiting Arrival
                            </span>
                          )}
                        </td>

                        {/* Action Toggle */}
                        <td className="py-4 px-5 text-right">
                          <Button
                            variant={att.checkedIn ? 'secondary' : 'primary'}
                            size="sm"
                            onClick={() => toggleCheckIn(att.id)}
                            className={`font-bold transition-transform active:scale-95 ${att.checkedIn
                              ? 'text-[#706D65] hover:text-[#1A1917]'
                              : 'bg-[#2A5C43] hover:bg-[#234D37] text-white border-transparent'
                              }`}
                          >
                            {att.checkedIn ? 'Undo' : 'Check In ✓'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Waitlist Queue Callout */}
          <div className="p-5 rounded-3xl bg-[#FAF9F7] border border-[#E5E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#E5E2DA] flex items-center justify-center text-[#1A1917] shrink-0 shadow-2xs">
                <Users className="w-5 h-5 text-[#57544C]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-[#1A1917]">Waitlist Queue (2 Guests in line)</span>
                  <Badge variant="default" size="sm">Auto-Promote Active</Badge>
                </div>
                <span className="text-xs text-[#706D65]">
                  Sneha Joshi (#1) and Vikram Patil (#2) receive automated SMS notification the moment a spot is freed.
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-bold text-[#1A1917]"
            >
              Manage Waitlist →
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

