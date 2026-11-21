import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

/**
 * Watermelon UI - Calendar Widget
 * Animated horizontal date selector with progressive depth blur and spring selection.
 * Source: https://ui.watermelon.sh/animated-components/calendar-widget
 */
export const CalendarWidget = ({
  sessions = [],
  selectedSessionId,
  onSelectSession,
}) => {
  const scrollRef = useRef(null);

  if (!sessions || sessions.length === 0) return null;

  return (
    <div className="space-y-2 select-none">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider text-[#1A1917] flex items-center gap-1.5">
          <CalendarIcon className="w-3.5 h-3.5 text-[#7C1D2F]" />
          Choose Date & Session:
        </span>
        <span className="text-[11px] text-[#827E74]">Pune Local Time</span>
      </div>

      <div
        ref={scrollRef}
        className="flex items-stretch gap-2.5 overflow-x-auto pb-1 pt-1 no-scrollbar scroll-smooth"
      >
        {sessions.map((sess) => {
          const isSelected = selectedSessionId === sess.id;
          const isSoldOut = sess.status === 'SOLD_OUT';

          return (
            <motion.div
              key={sess.id}
              whileTap={!isSoldOut ? { scale: 0.97 } : {}}
              onClick={() => !isSoldOut && onSelectSession?.(sess)}
              className={`
                relative flex-1 min-w-[130px] sm:min-w-[140px] p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-150 flex flex-col justify-between
                ${
                  isSoldOut
                    ? 'opacity-40 bg-[#F3F1EC] border-[#E5E2DA] cursor-not-allowed'
                    : isSelected
                    ? 'bg-gradient-to-br from-[#292521] to-[#1A1816] text-white border-[#7C1D2F]/70 shadow-[0_4px_16px_rgba(26,25,23,0.18)] ring-1.5 ring-[#7C1D2F]/30'
                    : 'bg-white text-[#1A1917] border-[#E5E2DA] hover:border-[#CCC8BD] hover:bg-[#FAF9F7] shadow-xs'
                }
              `}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className={isSelected ? 'text-[#D5D1C6]' : 'text-[#827E74]'}>
                    {sess.date.split(',')[0]}
                  </span>
                  {isSoldOut ? (
                    <span className="text-[#C53030] font-bold">SOLD OUT</span>
                  ) : (
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white text-[#1A1917] shadow-xs'
                          : 'bg-[#FAF9F7] text-[#57544C] border border-[#E5E2DA]'
                      }`}
                    >
                      {sess.availableSpots} left
                    </span>
                  )}
                </div>

                <div className="font-extrabold text-xs sm:text-sm mt-1.5">
                  {sess.date.split(',')[1] || sess.date}
                </div>
              </div>

              <div
                className={`flex items-center gap-1.5 text-[11px] mt-2.5 pt-2 border-t ${
                  isSelected ? 'border-white/15 text-white/85' : 'border-[#F3F1EC] text-[#827E74]'
                }`}
              >
                <Clock className="w-3 h-3 shrink-0" />
                <span className="font-medium">{sess.startTime}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget;
