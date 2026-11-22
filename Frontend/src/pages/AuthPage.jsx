import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, ShieldCheck, Mail, Phone, CheckCircle2, Compass,
  Sparkles, User, UserCheck, AlertCircle, RefreshCw, Check,
  Users, Star, Quote, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from '../components/BrandLogo';
import { FluidTabs } from '../components/watermelon/FluidTabs';
import { SwitchMode } from '../components/watermelon/SwitchMode';

export const AuthPage = ({ onBack, onLoginSuccess }) => {
  const [role, setRole] = useState('USER'); // 'USER' | 'HOST'
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('9822144021');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Validation States
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // OTP Countdown Timer
  useEffect(() => {
    let interval = null;
    if (otpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, resendTimer]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const validatePhone = (value) => {
    const cleaned = value.replace(/\D/g, '').replace(/^91/, '');
    if (!cleaned) return 'Mobile number is required';
    if (cleaned.length !== 10) return 'Must be a 10-digit Indian mobile number';
    if (!/^[6-9]/.test(cleaned)) return 'Mobile number must start with 6, 7, 8, or 9';
    return null;
  };

  const validateEmail = (value) => {
    if (!value.trim()) return 'Email address is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
    return null;
  };

  const validateName = (value) => {
    if (!value.trim()) return 'Full name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    return null;
  };

  const validateOtp = (value) => {
    if (!value) return 'Please enter the 6-digit OTP';
    if (value.length < 6) return `Enter all 6 digits (${value.length}/6 entered)`;
    return null;
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    const newErrors = {};

    const phoneError = validatePhone(phone);
    if (phoneError) newErrors.phone = phoneError;

    if (authMode === 'signup') {
      const nameError = validateName(name);
      if (nameError) newErrors.name = nameError;

      const emailError = validateEmail(email);
      if (emailError) newErrors.email = emailError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerShake();
      return;
    }

    setErrors({});
    setOtpSent(true);
    setResendTimer(30);
    setCanResend(false);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const newErrors = {};

    const otpError = validateOtp(otp);
    if (otpError) newErrors.otp = otpError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerShake();
      return;
    }

    // Success - log in
    setErrors({});
    const cleanPhone = '+91 ' + phone.replace(/\D/g, '').replace(/^91/, '');
    onLoginSuccess({
      id: role === 'HOST' ? 'host-1' : 'user-101',
      name: authMode === 'signup' && name ? name : role === 'HOST' ? 'Anand Kulkarni' : 'Parth Deshmukh',
      role,
      phone: cleanPhone,
      email: authMode === 'signup' && email ? email : role === 'HOST' ? 'anand.k@weekend.club' : 'deshmukhparth080@gmail.com'
    });
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setOtp('');
    setResendTimer(30);
    setCanResend(false);
    setErrors({});
  };

  // Demo Quick-Fill Profiles
  const quickFillSeeker = () => {
    setRole('USER');
    setAuthMode('signin');
    setName('Parth Deshmukh');
    setEmail('deshmukhparth080@gmail.com');
    setPhone('9822144021');
    setOtp('123456');
    setOtpSent(true);
    setErrors({});
  };

  const quickFillHost = () => {
    setRole('HOST');
    setAuthMode('signin');
    setName('Anand Kulkarni');
    setEmail('anand.k@weekend.club');
    setPhone('9988765432');
    setOtp('123456');
    setOtpSent(true);
    setErrors({});
  };

  const handleGoogleLogin = () => {
    onLoginSuccess({
      id: role === 'HOST' ? 'host-1' : 'user-101',
      name: role === 'HOST' ? 'Anand Kulkarni' : 'Parth Deshmukh',
      role,
      phone: '+91 98221 44021',
      email: role === 'HOST' ? 'anand.k@weekend.club' : 'deshmukhparth080@gmail.com'
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white selection:bg-[#7C1D2F] selection:text-white">

      {/* ========================================================= */}
      {/* LEFT COLUMN: Full-Bleed Editorial Brand Experience        */}
      {/* ========================================================= */}
      <div className="lg:w-[48%] xl:w-[45%] relative bg-[#151311] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 min-h-[440px] lg:min-h-screen overflow-hidden">
        {/* Cinematic Atmospheric Photography Background */}
        <img
          src={
            role === 'HOST'
              ? 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80'
              : 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=80'
          }
          alt="Weekend Gatherings"
          className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-90 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151311] via-[#151311]/80 to-[#151311]/40" />

        {/* Top Header on Left Panel */}
        <div className="relative z-10 flex items-center justify-between">
          <div onClick={onBack} className="cursor-pointer">
            <BrandLogo variant="light" size="md" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-[#FAF8F5]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C1D2F]"></span>
            Pune & Mumbai
          </span>
        </div>

        {/* Middle Editorial Showcase */}
        <div className="relative z-10 my-auto py-10 space-y-6 max-w-lg">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5A8B2] block">
            {role === 'HOST' ? 'Superhost Guild Command' : 'Intimate Weekend Gathering Club'}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            {role === 'HOST'
              ? 'Monetize your craft. Curate real gatherings.'
              : 'The antidote to passive screen time.'}
          </h2>

          <p className="text-sm sm:text-base text-[#D4CFC7] leading-relaxed">
            {role === 'HOST'
              ? 'Run 10–12 guest weekend sessions with 0% commission. Automated waitlists, pass ticketing, and on-site QR gate included.'
              : 'Join small cohorts of 8 to 12 people for outdoor bouldering, artisan pour-over labs, and tabletop socials led by vetted locals.'}
          </p>

          {/* 3 Inline Bullet Values */}
          <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-[#EAE5DA]">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[#E5A8B2] shrink-0 font-bold text-xs">✓</span>
              <span><strong>Closed-Loop Cohorts</strong> — Strictly capped at 8–12 guests</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[#E5A8B2] shrink-0 font-bold text-xs">✓</span>
              <span><strong>100% Vetted Local Hosts</strong> — Safety protocols & verified guides</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[#E5A8B2] shrink-0 font-bold text-xs">✓</span>
              <span><strong>Zero-Awkwardness Rituals</strong> — Facilitated group icebreakers</span>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Testimonial & Trust Metric */}
        <div className="relative z-10 pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-start gap-3">
            <Quote className="w-4 h-4 text-[#E5A8B2] shrink-0 mt-0.5" />
            <p className="text-xs text-[#B8B2A9] italic leading-relaxed">
              "Joined the ARAI sunrise bouldering as a solo attendee. Two hours later, we were sharing pour-over coffee by the ridge. It completely reset my workweek."
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-white/80 pt-1">
            <span className="font-bold text-white">Tanvi M. • Product Designer @ Pune</span>
            <span className="text-[11px] text-[#D4CFC7] font-semibold">4.98 ★ (650+ Pune Weekenders)</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* RIGHT COLUMN: Pristine Full-Page Authentication Screen    */}
      {/* ========================================================= */}
      <div className="lg:w-[52%] xl:w-[55%] flex flex-col justify-between p-6 sm:p-10 lg:p-16 bg-[#FAF9F7] min-h-screen">

        {/* Top Bar on Right Panel */}
        <div className="flex items-center justify-between w-full">
          {/* Mobile Logo Only */}
          <div className="lg:hidden" onClick={onBack}>
            <BrandLogo size="sm" />
          </div>

          <div className="hidden lg:block"></div>

          {/* Clean Back Link */}
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#78716C] hover:text-[#1C1917] transition-colors px-3 py-1.5 rounded-full hover:bg-black/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to exploring
          </button>
        </div>

        {/* Center Main Form Canvas */}
        <div className="w-full max-w-md mx-auto my-auto py-8 space-y-6">

          {/* Form Header */}
          <div className="space-y-1 text-left">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight">
              {authMode === 'signin'
                ? (role === 'HOST' ? 'Welcome Back, Host' : 'Welcome to Weekend')
                : (role === 'HOST' ? 'Become a Weekend Host' : 'Create Your Account')}
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C]">
              {role === 'HOST'
                ? 'Manage your cohorts, attendee rosters, and payouts'
                : 'Join curated Saturday & Sunday gatherings in Pune'}
            </p>
          </div>

          {/* Watermelon UI Smooth Fluid Spring Tabs */}
          <FluidTabs
            tabs={[
              { id: 'signin', label: 'Sign In', icon: UserCheck },
              { id: 'signup', label: 'Create Account', icon: User }
            ]}
            activeId={authMode}
            onChange={(m) => {
              setAuthMode(m);
              setOtpSent(false);
              setErrors({});
            }}
            layoutId="auth-mode-fluid-tabs"
            className="bg-[#EFECE6] border-[#DDD6C8] shadow-2xs"
          />

          {/* Watermelon UI Animated Mode Toggle (Seeker vs Host) */}
          <div className="py-1">
            <SwitchMode
              role={role}
              onChange={(newRole) => {
                setRole(newRole);
                setOtpSent(false);
                setOtp('');
                setErrors({});
              }}
            />
          </div>

          {/* Google One-Tap Action */}
          {!otpSent && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2.5 px-4 rounded-2xl border border-[#E6E0D4] bg-white hover:bg-[#FAF8F5] text-xs sm:text-sm font-bold text-[#1C1917] flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E6E0D4]"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-[#827E74]">
                  <span className="bg-[#FAF9F7] px-3">or continue with mobile number</span>
                </div>
              </div>
            </div>
          )}

          {/* Form Controls */}
          <form
            onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
            className="space-y-4 text-left"
            noValidate
          >
            {!otpSent ? (
              <div className="space-y-3.5">
                {authMode === 'signup' && (
                  <>
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Parth Deshmukh"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: null });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-2xl bg-white border text-xs sm:text-sm font-medium transition-all outline-none ${errors.name
                          ? 'border-[#C53030] bg-[#FFF5F5]'
                          : 'border-[#E6E0D4] focus:border-[#7C1D2F] focus:ring-2 focus:ring-[#7C1D2F]/20'
                          }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-[#C53030] mt-1 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. parth@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors({ ...errors, email: null });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-2xl bg-white border text-xs sm:text-sm font-medium transition-all outline-none ${errors.email
                          ? 'border-[#C53030] bg-[#FFF5F5]'
                          : 'border-[#E6E0D4] focus:border-[#7C1D2F] focus:ring-2 focus:ring-[#7C1D2F]/20'
                          }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-[#C53030] mt-1 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Mobile Number */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C1917] mb-1">
                    Mobile Number
                  </label>
                  <div className="relative flex rounded-2xl border border-[#E6E0D4] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#7C1D2F]/20 focus-within:border-[#7C1D2F] transition-all">
                    <span className="px-3.5 py-2.5 bg-[#FAF8F5] border-r border-[#E6E0D4] text-xs sm:text-sm font-bold text-[#1C1917] flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="98221 44021"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setPhone(val);
                        if (errors.phone) setErrors({ ...errors, phone: null });
                      }}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#1C1917] outline-none bg-white"
                    />
                  </div>
                  {errors.phone ? (
                    <p className="text-[11px] text-[#C53030] mt-1 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                    </p>
                  ) : (
                    <p className="text-[11px] text-[#827E74] mt-1">
                      We'll send a 6-digit confirmation code via SMS.
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#7C1D2F] hover:bg-[#621422] text-white font-bold text-xs sm:text-sm transition-all duration-150 shadow-xs flex items-center justify-center gap-2"
                >
                  <span>Send 6-Digit Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* OTP Input Step */
              <div className="space-y-4 text-center">
                <div className="p-3 rounded-2xl bg-white border border-[#E6E0D4] text-[11px] text-[#1C1917] font-semibold flex items-center justify-between shadow-2xs">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#7C1D2F]" />
                    OTP sent to +91 {phone}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp('');
                      setErrors({});
                    }}
                    className="underline hover:text-[#7C1D2F] font-bold"
                  >
                    Change
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C1917] block">
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="• • • • • •"
                    value={otp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setOtp(val);
                      if (errors.otp) setErrors({ ...errors, otp: null });
                    }}
                    className="w-full text-center tracking-[0.5em] text-xl font-bold py-2.5 rounded-2xl bg-white border border-[#E6E0D4] focus:border-[#7C1D2F] focus:ring-2 focus:ring-[#7C1D2F]/20 outline-none"
                  />
                  {errors.otp && (
                    <p className="text-[11px] text-[#C53030] mt-1.5 font-semibold">
                      {errors.otp}
                    </p>
                  )}
                </div>

                <div className="text-xs text-[#827E74]">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-[#7C1D2F] font-bold hover:underline flex items-center gap-1 mx-auto"
                    >
                      <RefreshCw className="w-3 h-3" /> Resend Code
                    </button>
                  ) : (
                    <span>Resend code in {resendTimer}s</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-[#7C1D2F] hover:bg-[#621422] text-white font-bold text-xs sm:text-sm transition-all duration-150 shadow-xs"
                >
                  Verify & Continue as {role === 'HOST' ? 'Superhost' : 'Member'} →
                </button>
              </div>
            )}
          </form>

          {/* 1-Click Demo Profiles for Presentation & Review */}
          <div className="pt-3 border-t border-[#E6E0D4] space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#827E74] block tracking-wider text-left">
              1-Click Demo Profiles (For Review)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={quickFillSeeker}
                className="p-2.5 rounded-xl border border-[#E6E0D4] bg-white hover:bg-[#FAF8F5] text-xs font-bold text-[#1C1917] transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <User className="w-3.5 h-3.5 text-[#7C1D2F]" />
                <span>Seeker (Parth)</span>
              </button>
              <button
                type="button"
                onClick={quickFillHost}
                className="p-2.5 rounded-xl border border-[#E6E0D4] bg-white hover:bg-[#FAF8F5] text-xs font-bold text-[#1C1917] transition-all flex items-center justify-center gap-2 shadow-2xs"
              >
                <Compass className="w-3.5 h-3.5 text-[#7C1D2F]" />
                <span>Host (Anand)</span>
              </button>
            </div>
          </div>

          {/* Legal / Manifesto Note */}
          <p className="text-[11px] text-[#827E74] leading-relaxed text-center">
            By continuing, you agree to Weekend's <a href="#terms" className="underline hover:text-[#1C1917]">Community Safety Rules</a> and <a href="#privacy" className="underline hover:text-[#1C1917]">Privacy Policy</a>.
          </p>
        </div>

        {/* Bottom Placeholder to balance layout */}
        <div className="text-center text-[11px] text-[#A8A29E]">
          Weekend Experiences Booking Platform • Pune Guild Network
        </div>
      </div>

    </div>
  );
};

export default AuthPage;
