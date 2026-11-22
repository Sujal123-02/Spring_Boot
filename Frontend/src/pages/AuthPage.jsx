import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, ShieldCheck, Mail, Phone, CheckCircle2, Compass,
  Sparkles, User, UserCheck, AlertCircle, RefreshCw, Check,
  Users, Star, Quote, MapPin, Calendar, Clock, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { BrandLogo } from '../components/BrandLogo';
import { ShimmerButton } from '../components/watermelon/ShimmerButton';
import { FluidTabs } from '../components/watermelon/FluidTabs';
import { InputOTP } from '../components/watermelon/InputOTP';
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
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-6 sm:py-10">
      {/* Top Back Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#827E74] hover:text-[#1A1917] transition-colors duration-150 px-3 py-1.5 rounded-full bg-white/70 border border-[#E5E2DA] hover:border-[#CCC8BD] shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to exploring
        </button>

        <span className="text-[11px] font-semibold text-[#827E74] hidden sm:inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C1D2F]"></span>
          Encrypted Authentication Gate
        </span>
      </div>

      {/* Main Responsive Grid: Editorial Hero (Left) + Focused Cockpit (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* LEFT COLUMN: Editorial Showcase & Brand Manifesto (Visible on Desktop) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Dynamic Editorial Showcase Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-[#E5E2DA] shadow-sm bg-[#1A1917] text-white">
            <img
              src={
                role === 'HOST'
                  ? 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
                  : 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80'
              }
              alt="Weekend Gatherings"
              className="w-full h-64 sm:h-80 object-cover opacity-50 transition-all duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151311] via-[#151311]/70 to-transparent" />

            {/* Floating Top Badge */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-extrabold uppercase tracking-widest text-[#FAF8F5]">
                <Sparkles className="w-3 h-3 text-[#D97706]" />
                {role === 'HOST' ? 'Host Command Center' : 'Curated Offline Club'}
              </span>
              <span className="text-[11px] font-medium text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                Pune & Mumbai
              </span>
            </div>

            {/* Bottom Content within Image Banner */}
            <div className="absolute bottom-5 left-5 right-5 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706]">
                {role === 'HOST' ? 'Superhost Guild Network' : 'Featured Saturday Morning Cohort'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {role === 'HOST'
                  ? 'Monetize your craft. Curate unforgettable weekends.'
                  : 'Sunrise Bouldering & Chemex Pour-Over Lab'}
              </h2>
              <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                {role === 'HOST'
                  ? 'Run small 10–12 person cohorts on your terms with zero platform fees during launch.'
                  : 'ARAI Hills Trailhead • 12 maximum seats • Fresh single-origin cupping session included.'}
              </p>
            </div>
          </div>

          {/* 3 Core Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-2xs space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#FAF9F7] border border-[#E6E0D4] flex items-center justify-center text-[#7C1D2F]">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1A1917]">Closed-Loop Cohorts</h4>
              <p className="text-[11px] text-[#706D65] leading-relaxed">
                Strictly capped at 8–12 guests so real friendships happen naturally.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-2xs space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#FAF9F7] border border-[#E6E0D4] flex items-center justify-center text-[#7C1D2F]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1A1917]">100% Vetted Hosts</h4>
              <p className="text-[11px] text-[#706D65] leading-relaxed">
                ID verified, background checked, and community reviewed local experts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5E2DA] shadow-2xs space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#FAF9F7] border border-[#E6E0D4] flex items-center justify-center text-[#7C1D2F]">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-[#1A1917]">Zero-Awkward Rituals</h4>
              <p className="text-[11px] text-[#706D65] leading-relaxed">
                Facilitated meetups and icebreaker activities crafted by community leads.
              </p>
            </div>
          </div>

          {/* Social Proof Quote & Host Faces */}
          <div className="p-5 rounded-3xl bg-[#FAF9F7] border border-[#E5E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white border border-[#E5E2DA] flex items-center justify-center text-[#7C1D2F] shrink-0 shadow-2xs">
                <Quote className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-[#57544C] italic leading-relaxed">
                  "Joined the bouldering group as a solo attendee. Two hours later, we were sharing pour-over coffee by the ridge. Completely resets the workweek."
                </p>
                <span className="text-[11px] font-bold text-[#1A1917] block">
                  Tanvi M. • Product Designer @ Pune
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 pl-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-[#E5E2DA] pt-2 sm:pt-0">
              <div className="text-right">
                <div className="text-sm font-black text-[#1A1917] tabular-nums">4.98 ★</div>
                <div className="text-[10px] text-[#827E74]">650+ Pune Guests</div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: The Auth Cockpit Card */}
        <div className="lg:col-span-5">
          <motion.div
            animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-auto lg:max-w-none bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E2DA] shadow-[0_8px_30px_rgba(26,25,23,0.06)] space-y-6 text-center"
          >
            {/* Logo */}
            <div className="flex justify-center">
              <BrandLogo size="lg" />
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-black text-[#1A1917] tracking-tight">
                {authMode === 'signin'
                  ? (role === 'HOST' ? 'Welcome Back, Host' : 'Welcome Back to Weekend')
                  : (role === 'HOST' ? 'Apply as an Experience Host' : 'Create Your Account')}
              </h1>
              <p className="text-xs text-[#827E74]">
                {role === 'HOST'
                  ? 'Access your host command center, sessions & payouts'
                  : 'Join intimate Saturday & Sunday cohorts in Pune'}
              </p>
            </div>

            {/* Watermelon UI Fluid Tabs (Sign In / Register) */}
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
            />

            {/* Watermelon UI Switch Mode Role Selector */}
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

            {/* Google One-Tap */}
            {!otpSent && (
              <div className="space-y-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleLogin}
                  className="w-full py-2.5 px-4 rounded-2xl border border-[#E5E2DA] bg-white hover:bg-[#FAF9F7] text-xs sm:text-sm font-bold text-[#1A1917] flex items-center justify-center gap-2.5 transition-colors shadow-2xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </motion.button>

                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E5E2DA]"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold text-[#827E74]">
                    <span className="bg-white px-2">or with mobile OTP</span>
                  </div>
                </div>
              </div>
            )}

            {/* MAIN FORM */}
            <form
              onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
              className="space-y-4 text-left"
              noValidate
            >
              {/* Step 1: Input details */}
              {!otpSent ? (
                <div className="space-y-3.5">
                  {authMode === 'signup' && (
                    <>
                      {/* Full Name */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1917] mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. Parth Deshmukh"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name) setErrors({ ...errors, name: null });
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-2xl bg-white border text-xs sm:text-sm font-medium transition-all outline-none ${
                              errors.name
                                ? 'border-[#C53030] focus:ring-2 focus:ring-[#C53030]/20 bg-[#FFF5F5]'
                                : 'border-[#E5E2DA] focus:border-[#7C1D2F] focus:ring-2 focus:ring-[#7C1D2F]/20'
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <p className="text-[11px] text-[#C53030] mt-1 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1917] mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="e.g. parth@example.com"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) setErrors({ ...errors, email: null });
                            }}
                            className={`w-full px-3.5 py-2.5 rounded-2xl bg-white border text-xs sm:text-sm font-medium transition-all outline-none ${
                              errors.email
                                ? 'border-[#C53030] focus:ring-2 focus:ring-[#C53030]/20 bg-[#FFF5F5]'
                                : 'border-[#E5E2DA] focus:border-[#7C1D2F] focus:ring-2 focus:ring-[#7C1D2F]/20'
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-[11px] text-[#C53030] mt-1 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1917] mb-1">
                      Mobile Number
                    </label>
                    <div className="relative flex rounded-2xl border bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#7C1D2F]/20 focus-within:border-[#7C1D2F] transition-all">
                      <span className="px-3.5 py-2.5 bg-[#FAF9F7] border-r border-[#E5E2DA] text-xs sm:text-sm font-bold text-[#1A1917] flex items-center">
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
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#1A1917] outline-none ${
                          errors.phone ? 'bg-[#FFF5F5]' : 'bg-white'
                        }`}
                      />
                    </div>
                    {errors.phone ? (
                      <p className="text-[11px] text-[#C53030] mt-1 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.phone}
                      </p>
                    ) : (
                      <p className="text-[10px] text-[#827E74] mt-1">
                        We'll send a 6-digit confirmation code via SMS.
                      </p>
                    )}
                  </div>

                  <ShimmerButton
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full font-bold text-xs sm:text-sm shadow-sm"
                  >
                    Send 6-Digit OTP →
                  </ShimmerButton>
                </div>
              ) : (
                /* Step 2: OTP Verification */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 text-center"
                >
                  <div className="p-3 rounded-2xl bg-[#FAF9F7] border border-[#E6E0D4] text-[11px] text-[#1C1917] font-semibold flex items-center justify-between">
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
                      className="underline hover:text-[#1A1917] font-bold"
                    >
                      Change
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#1A1917] block">
                      Enter 6-Digit Verification Code
                    </label>
                    <InputOTP
                      value={otp}
                      onChange={(val) => {
                        setOtp(val);
                        if (errors.otp) setErrors({ ...errors, otp: null });
                      }}
                      length={6}
                    />
                    {errors.otp && (
                      <p className="text-[11px] text-[#C53030] mt-1.5 font-semibold flex items-center justify-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.otp}
                      </p>
                    )}
                  </div>

                  {/* Resend Timer */}
                  <div className="text-xs text-[#827E74]">
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-[#7C1D2F] font-bold hover:underline flex items-center gap-1 mx-auto"
                      >
                        <RefreshCw className="w-3 h-3" /> Resend OTP
                      </button>
                    ) : (
                      <span>Resend code in {resendTimer}s</span>
                    )}
                  </div>

                  <ShimmerButton
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full font-bold text-xs sm:text-sm shadow-sm"
                  >
                    Verify & Enter as {role === 'HOST' ? 'Superhost' : 'Seeker'} →
                  </ShimmerButton>
                </motion.div>
              )}
            </form>

            {/* Demo Quick-Fill Bar */}
            <div className="pt-2 border-t border-[#F3F1EC] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#827E74] block tracking-wider">
                1-Click Demo Profiles
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={quickFillSeeker}
                  className="p-2 rounded-xl border border-[#E5E2DA] bg-[#FAF9F7] hover:bg-[#F3F1EC] text-[11px] font-bold text-[#1A1917] transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <User className="w-3.5 h-3.5 text-[#57544C]" />
                  <span>Seeker (Parth)</span>
                </button>
                <button
                  type="button"
                  onClick={quickFillHost}
                  className="p-2 rounded-xl border border-[#E5E2DA] bg-[#FAF9F7] hover:bg-[#F3F1EC] text-[11px] font-bold text-[#1A1917] transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Compass className="w-3.5 h-3.5 text-[#57544C]" />
                  <span>Host (Anand)</span>
                </button>
              </div>
            </div>

            <div className="pt-1 text-[11px] text-[#827E74] leading-relaxed">
              By continuing, you agree to Weekend's <a href="#terms" className="underline hover:text-[#1A1917]">Community Safety Rules</a> and <a href="#privacy" className="underline hover:text-[#1A1917]">Privacy Policy</a>.
            </div>
          </motion.div>

          {/* Guest Skip Link */}
          <div className="text-center mt-4">
            <button
              onClick={onBack}
              className="text-xs font-semibold text-[#827E74] hover:text-[#1A1917] transition-colors duration-150"
            >
              Skip for now & explore as guest →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
