import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Check, Clock, QrCode, Calendar, MapPin, Download, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ContinuousTabs } from '../components/watermelon/ContinuousTabs';
import { PopStepper } from '../components/watermelon/PopStepper';
import { Stepper } from '../components/watermelon/Stepper';
import { PricingWidget } from '../components/watermelon/PricingWidget';
import { MorphingButton } from '../components/watermelon/MorphingButton';
import { InlineToast } from '../components/watermelon/InlineToast';

export const BookingFlowPage = ({ experience, session, onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [attendeeName, setAttendeeName] = useState('Parth Deshmukh');
  const [attendeeEmail, setAttendeeEmail] = useState('deshmukhparth080@gmail.com');
  const [attendeePhone, setAttendeePhone] = useState('+91 98221 44021');
  const [isSelfAttending, setIsSelfAttending] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // 10:00 Countdown Timer
  const [secondsLeft, setSecondsLeft] = useState(600);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handlePay = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    await new Promise((res) => setTimeout(res, 850));
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const price = experience ? experience.price : 799;
  const platformFee = 49;
  const subtotal = price * guestCount;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + platformFee + gst;

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5E2DA] focus:border-[#1A1917] focus:ring-1 focus:ring-[#1A1917] focus:outline-none text-xs sm:text-sm text-[#1A1917] font-medium transition-all duration-150";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Navigation & Watermelon Pop Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {step === 1 ? (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#827E74] hover:text-[#1A1917] transition-colors duration-150"
          >
            <ArrowLeft className="w-4 h-4" /> Back to experience
          </button>
        ) : (
          <div />
        )}

        <PopStepper currentStep={step} steps={['Reservation & Passes', 'Digital Pass Confirmed']} />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E2DA]">
              <div>
                <h1 className="text-2xl font-extrabold text-[#1A1917] tracking-tight">
                  Review & Confirm Booking
                </h1>
                <p className="text-xs text-[#827E74]">
                  Complete your reservation in under 60 seconds
                </p>
              </div>

              {/* Live Timer Pill */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono font-bold self-start sm:self-auto transition-colors duration-300 ${secondsLeft < 120 ? 'bg-[#FDF2F2] border-[#FECACA] text-[#C53030]' : 'bg-white border-[#E5E2DA] text-[#1A1917] shadow-2xs'}`}>
                <Clock className="w-3.5 h-3.5 text-[#57544C]" />
                <span>Pass reserved for {formatTimer(secondsLeft)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Form */}
              <div className="md:col-span-7 space-y-6">
                {/* Selected Session Card with Guest Count Stepper */}
                <div className="p-4 rounded-2xl bg-white border border-[#E5E2DA] space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C1D2F]">
                      {experience.categoryLabel}
                    </span>
                    {/* Watermelon Rolling Digit Stepper */}
                    <Stepper
                      value={guestCount}
                      min={1}
                      max={6}
                      onChange={setGuestCount}
                      label={guestCount === 1 ? 'Pass' : 'Passes'}
                    />
                  </div>

                  <h3 className="font-bold text-sm text-[#1A1917]">{experience.title}</h3>

                  <div className="text-xs text-[#57544C] space-y-1.5 pt-1.5 border-t border-[#F3F1EC]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#827E74] shrink-0" />
                      <span>{session ? session.date : 'Saturday, 22 Nov 2026'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#827E74] shrink-0" />
                      <span>{session ? `${session.startTime} – ${session.endTime}` : '06:30 AM – 10:00 AM'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#827E74] shrink-0" />
                      <span>{experience.location.venueName}, {experience.location.city}</span>
                    </div>
                  </div>
                </div>

                {/* Attendee Info Form */}
                <form onSubmit={handlePay} className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A1917]">
                        Primary Attendee Information
                      </label>
                      <label className="flex items-center gap-2 text-xs text-[#45433E] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isSelfAttending}
                          onChange={(e) => setIsSelfAttending(e.target.checked)}
                          className="rounded border-[#CCC8BD] text-[#7C1D2F] focus:ring-[#7C1D2F]"
                        />
                        <span>I am attending</span>
                      </label>
                    </div>

                    <div>
                      <span className="block text-[11px] font-semibold text-[#827E74] mb-1.5">Full Name</span>
                      <input
                        type="text"
                        required
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[11px] font-semibold text-[#827E74] mb-1.5">Email Address</span>
                        <input
                          type="email"
                          required
                          value={attendeeEmail}
                          onChange={(e) => setAttendeeEmail(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <span className="block text-[11px] font-semibold text-[#827E74] mb-1.5">Mobile (WhatsApp ticket)</span>
                        <input
                          type="tel"
                          required
                          value={attendeePhone}
                          onChange={(e) => setAttendeePhone(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-3 pt-3 border-t border-[#E5E2DA]">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1A1917] block">
                      Select Payment Method
                    </label>
                    <ContinuousTabs
                      tabs={[
                        { id: 'upi', label: 'Instant UPI' },
                        { id: 'card', label: 'Credit / Debit Card' }
                      ]}
                      activeId={paymentMethod}
                      onChange={setPaymentMethod}
                      layoutId="checkout-payment-tabs"
                      className="w-full justify-between"
                    />
                  </div>

                  {/* Watermelon Morphing Button for Payment */}
                  <div className="pt-2">
                    <MorphingButton
                      onClick={handlePay}
                      variant="primary"
                      className="w-full"
                      successText="Pass Confirmed! Opening Ticket..."
                    >
                      Pay ₹{total} via {paymentMethod === 'upi' ? 'UPI' : 'Card'} & Get Pass →
                    </MorphingButton>
                  </div>
                </form>
              </div>

              {/* Right Column: Watermelon Animated Pricing Widget */}
              <div className="md:col-span-5">
                <PricingWidget
                  unitPrice={price}
                  guestCount={guestCount}
                  platformFee={platformFee}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          /* STEP 2: BOOKING CONFIRMED */
          <motion.div
            key="step2"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg mx-auto space-y-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
              className="w-14 h-14 rounded-full bg-[#ECF6F0] text-[#2D7A4F] flex items-center justify-center mx-auto shadow-xs border border-[#CBE3D5]"
            >
              <Check className="w-7 h-7 text-[#2D7A4F]" strokeWidth={2.5} />
            </motion.div>

            <div>
              <Badge variant="success" size="sm" className="mb-2">
                Payment Confirmed
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1917] tracking-tight">
                You're all set for the weekend!
              </h2>
              <p className="text-xs text-[#827E74] mt-1">
                A copy of your ticket and meeting instructions were sent to <span className="font-bold text-[#1A1917]">{attendeeEmail}</span>.
              </p>
            </div>

            {/* Watermelon Inline Toast with Instant Code Copy */}
            <InlineToast
              code={`WKD-${Math.floor(1000 + Math.random() * 9000)}-PNE`}
              label="Instant Pass Verification ID"
            />

            {/* THE DIGITAL ENTRY PASS */}
            <div className="bg-white rounded-3xl border border-[#E5E2DA] overflow-hidden shadow-md text-left">
              <div className="p-5 bg-gradient-to-r from-[#1A1917] to-[#3A281E] text-white space-y-1 relative">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#E5A8B2] uppercase">
                  Weekend Pass • {guestCount} {guestCount === 1 ? 'Spot' : 'Spots'} Confirmed
                </span>
                <h3 className="text-base font-bold leading-snug">{experience.title}</h3>
                <p className="text-xs text-white/70">Hosted by {experience.host.name}</p>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#827E74] block">Date</span>
                    <span className="font-bold text-[#1A1917]">{session ? session.date.split(',')[0] : 'Saturday'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#827E74] block">Time</span>
                    <span className="font-bold text-[#1A1917]">{session ? session.startTime : '06:30 AM'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#827E74] block">Primary Attendee</span>
                    <span className="font-bold text-[#1A1917]">{attendeeName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#827E74] block">Admission</span>
                    <span className="font-bold text-[#2D7A4F]">Passes x{guestCount} (Verified)</span>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="p-4 rounded-xl bg-[#FAF9F7] border border-[#E5E2DA] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#1A1917] block">Scan for Venue Check-In</span>
                    <span className="text-[11px] text-[#827E74]">Present at host meeting point</span>
                  </div>
                  <div className="w-14 h-14 bg-white p-1 rounded-lg border border-[#E5E2DA] flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-[#1A1917]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="secondary"
                size="md"
                icon={Calendar}
                onClick={() => alert('Calendar invite (.ics) downloaded!')}
              >
                Add to Calendar
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={onComplete}
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
