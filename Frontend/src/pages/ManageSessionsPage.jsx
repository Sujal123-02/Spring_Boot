import React, { useState } from 'react';
import { ArrowLeft, PlusCircle, Calendar, Clock, Users, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { EXPERIENCES } from '../data/mockData';
import { ContinuousTabs } from '../components/watermelon/ContinuousTabs';
import { ShimmerButton } from '../components/watermelon/ShimmerButton';
import { StatusPicker } from '../components/watermelon/StatusPicker';
import { LabeledProgressIndicator } from '../components/watermelon/LabeledProgressIndicator';

export const ManageSessionsPage = ({ onBack, onViewChange, selectedExperience, onNavigateToExperience }) => {
  const [currentExp, setCurrentExp] = useState(selectedExperience || EXPERIENCES[0]);
  const [sessions, setSessions] = useState(currentExp.sessions || []);
  const [sessionFilter, setSessionFilter] = useState('all');

  const hostNavTabs = [
    { id: 'dashboard', label: 'Command Center' },
    { id: 'create-experience', label: 'Create Experience' },
    { id: 'manage-sessions', label: 'Manage Sessions' }
  ];

  const [date, setDate] = useState('Saturday, 06 Dec 2026');
  const [startTime, setStartTime] = useState('06:30 AM');
  const [endTime, setEndTime] = useState('10:00 AM');
  const [regDeadline, setRegDeadline] = useState('Friday, 05 Dec 2026, 08:00 PM');
  const [minAttendees, setMinAttendees] = useState(4);
  const [maxAttendees, setMaxAttendees] = useState(12);
  const [waitlistEnabled, setWaitlistEnabled] = useState(true);

  const handleAddSession = (e) => {
    e.preventDefault();
    const newSession = {
      id: `sess-${Date.now()}`,
      date,
      startTime,
      endTime,
      availableSpots: maxAttendees,
      totalCapacity: maxAttendees,
      registeredCount: 0,
      status: 'OPEN',
      waitlistEnabled
    };
    setSessions([newSession, ...sessions]);
  };

  const toggleSessionStatus = (id) => {
    setSessions(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'OPEN' ? 'CLOSED' : 'OPEN' };
      }
      return s;
    }));
  };

  const inputClass = "w-full px-3 py-2 rounded-xl bg-white border border-[#E5E2DA] focus:border-[#1A1917] focus:ring-1 focus:ring-[#1A1917] focus:outline-none text-xs text-[#1A1917] font-medium transition-all duration-150";
  const labelClass = "block text-[11px] font-bold uppercase tracking-wider text-[#45433E] mb-1";

  const filteredSessions = sessions.filter((s) => {
    if (sessionFilter === 'open') return s.status === 'OPEN';
    if (sessionFilter === 'closed') return s.status === 'CLOSED' || s.status === 'SOLD_OUT';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Host Sub-Navigation */}
      {onViewChange && (
        <div className="flex justify-start pb-2">
          <ContinuousTabs
            tabs={hostNavTabs}
            activeId="manage-sessions"
            onChange={(id) => onViewChange(id)}
            layoutId="host-workspace-tabs"
          />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E2DA]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#706D65]">
              Host Operations • Session Scheduling
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#E5E2DA] text-[10px] font-semibold text-[#1A1917] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#24543C]"></span>
              Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1917] tracking-tight mt-1">
            Manage Sessions
          </h1>
          <p className="text-xs sm:text-sm text-[#827E74]">
            Bookings require an active session slot. Create recurring weekend time slots for attendees.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[10px] uppercase font-bold text-[#827E74] block">Managing Experience</span>
          <span className="text-sm font-bold text-[#1A1917]">{currentExp.title}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-[#E5E2DA] p-5 space-y-4 shadow-xs sticky top-20">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E2DA]">
              <h2 className="text-sm font-bold text-[#1A1917]">Schedule New Session</h2>
              <span className="text-[11px] font-medium text-[#827E74]">Open Slots</span>
            </div>

            <form onSubmit={handleAddSession} className="space-y-3.5 text-xs">
              <div>
                <label className={labelClass}>Session Date *</label>
                <input
                  type="text"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className={labelClass}>Start Time *</label>
                  <input
                    type="text"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>End Time *</label>
                  <input
                    type="text"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Registration Cutoff *</label>
                <input
                  type="text"
                  required
                  value={regDeadline}
                  onChange={(e) => setRegDeadline(e.target.value)}
                  className={inputClass}
                />
                <span className="text-[10px] text-[#827E74] mt-0.5 block">
                  Must be before session start
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className={labelClass}>Min Attendees</label>
                  <input
                    type="number"
                    min="1"
                    value={minAttendees}
                    onChange={(e) => setMinAttendees(parseInt(e.target.value) || 1)}
                    className={`${inputClass} font-bold`}
                  />
                </div>
                <div>
                  <label className={labelClass}>Capacity (Max)</label>
                  <input
                    type="number"
                    min="1"
                    value={maxAttendees}
                    onChange={(e) => setMaxAttendees(parseInt(e.target.value) || 1)}
                    className={`${inputClass} font-bold`}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-1 text-xs text-[#45433E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={waitlistEnabled}
                  onChange={(e) => setWaitlistEnabled(e.target.checked)}
                  className="rounded border-[#CCC8BD] text-[#7C1D2F] focus:ring-[#7C1D2F]"
                />
                <span className="font-medium">Enable Waitlist when cohort fills up</span>
              </label>

              <ShimmerButton
                type="submit"
                variant="primary"
                size="md"
                className="w-full mt-2"
                icon={PlusCircle}
              >
                Add Session Slot
              </ShimmerButton>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: SESSIONS LIST */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-[#1A1917]">
                Current Scheduled Sessions ({sessions.length})
              </h2>
              <span className="text-xs text-[#827E74]">Real-time capacity tracking</span>
            </div>

            <ContinuousTabs
              tabs={[
                { id: 'all', label: 'All Slots' },
                { id: 'open', label: 'Open' },
                { id: 'closed', label: 'Closed' }
              ]}
              activeId={sessionFilter}
              onChange={setSessionFilter}
              layoutId="sessions-filter-pill"
            />
          </div>

          <AnimatePresence>
            {filteredSessions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl border border-[#E5E2DA] p-10 text-center space-y-2"
              >
                <Calendar className="w-8 h-8 text-[#CCC8BD] mx-auto" />
                <p className="text-sm font-semibold text-[#827E74]">No sessions match this filter</p>
                <p className="text-xs text-[#CCC8BD]">Use the form on the left to add a new session slot.</p>
              </motion.div>
            ) : (
              <div className="space-y-3.5">
                {filteredSessions.map((sess) => {
                  const isClosed = sess.status === 'CLOSED';
                  const isSoldOut = sess.status === 'SOLD_OUT';

                  return (
                    <motion.div
                      key={sess.id}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 rounded-2xl bg-white border border-[#E5E2DA] shadow-xs space-y-3 hover:border-[#CCC8BD] transition-colors duration-150"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#1A1917]">{sess.date}</span>
                          <span className="text-[#827E74]">({sess.startTime} – {sess.endTime})</span>
                        </div>

                        {/* Watermelon UI Animated Status Picker */}
                        <StatusPicker
                          status={sess.status === 'CLOSED' ? 'CANCELLED' : sess.status === 'SOLD_OUT' ? 'SOLD_OUT' : 'AVAILABLE'}
                          onChange={(newStatus) => {
                            const mappedStatus = newStatus === 'CANCELLED' ? 'CLOSED' : newStatus === 'SOLD_OUT' ? 'SOLD_OUT' : 'OPEN';
                            setSessions((prev) =>
                              prev.map((s) => (s.id === sess.id ? { ...s, status: mappedStatus } : s))
                            );
                          }}
                        />
                      </div>

                      {/* Watermelon UI Labeled Progress Indicator */}
                      <div className="pt-2">
                        <LabeledProgressIndicator
                          percent={Math.round((sess.registeredCount / sess.totalCapacity) * 100)}
                          label="Cohort Seat Capacity"
                          valueLabel={`${sess.registeredCount} of ${sess.totalCapacity} seats (${sess.availableSpots} available)`}
                          color={sess.registeredCount >= sess.totalCapacity ? '#C53030' : '#2D7A4F'}
                        />
                      </div>

                      <div className="pt-2 border-t border-[#E5E2DA] flex items-center justify-between text-xs">
                        <span className="text-[11px] text-[#827E74]">
                          Waitlist: {sess.waitlistEnabled ? 'Active (Auto-promote)' : 'Disabled'}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSessionStatus(sess.id)}
                        >
                          {sess.status === 'OPEN' ? 'Close Bookings' : 'Reopen Session'}
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
