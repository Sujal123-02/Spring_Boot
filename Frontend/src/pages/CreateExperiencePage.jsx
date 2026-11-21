import React, { useState } from 'react';
import { ArrowLeft, Upload, MapPin, DollarSign, Clock, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ContinuousTabs } from '../components/watermelon/ContinuousTabs';
import { FloatingInput } from '../components/watermelon/FloatingInput';
import { LabeledProgressIndicator } from '../components/watermelon/LabeledProgressIndicator';
import { MorphingButton } from '../components/watermelon/MorphingButton';
import { CATEGORIES } from '../data/mockData';

export const CreateExperiencePage = ({ onBack, onViewChange, onExperienceCreated }) => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('outdoors');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Pune');
  const [latitude, setLatitude] = useState('18.5284');
  const [longitude, setLongitude] = useState('73.8188');
  const [amenities, setAmenities] = useState('Safety Gear Provided, Drinking Water, Restrooms, Free Parking');
  const [price, setPrice] = useState('799');
  const [duration, setDuration] = useState('3.5 Hours');
  const [difficulty, setDifficulty] = useState('Moderate');
  const [visibility, setVisibility] = useState('PUBLIC');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80');

  const hostNavTabs = [
    { id: 'dashboard', label: 'Command Center' },
    { id: 'create-experience', label: 'Create Experience' },
    { id: 'manage-sessions', label: 'Manage Sessions' }
  ];

  const handleSubmit = (e, status = 'PUBLISHED') => {
    e.preventDefault();
    if (!title) {
      alert('Please enter an experience title');
      return;
    }

    const newExp = {
      id: `exp-${Date.now()}`,
      title,
      tagline: tagline || title,
      category: categoryId,
      categoryLabel: CATEGORIES.find(c => c.id === categoryId)?.name || 'Activity',
      rating: 5.0,
      reviewCount: 0,
      price: parseInt(price) || 799,
      duration,
      groupSize: 'Max 12 people',
      difficulty,
      visibility,
      status,
      approvalStatus: 'APPROVED',
      location: {
        venueName: venueName || 'Trailhead Reserve',
        address: address || 'Off Main Road',
        city,
        coordinates: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        amenities: amenities.split(',').map(s => s.trim())
      },
      host: {
        id: 'host-1',
        name: 'Anand Kulkarni',
        title: 'Verified Superhost',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        bio: 'Local outdoor educator and mountaineer.',
        isVerified: true,
        experiencesHosted: 85,
        totalAttendees: 932,
        badge: 'Superhost'
      },
      images: [coverImage],
      sessions: [],
      description,
      requirements: ['Sturdy shoes', 'Water bottle'],
      reviews: []
    };

    onExperienceCreated(newExp);
  };

  const selectClass = "w-full px-4 py-2.5 rounded-xl bg-white border border-[#E5E2DA] focus:border-[#1A1917] focus:ring-1 focus:ring-[#1A1917] focus:outline-none text-sm text-[#1A1917] font-medium transition-all duration-150 appearance-none";
  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-white border border-[#E5E2DA] focus:border-[#1A1917] focus:ring-1 focus:ring-[#1A1917] focus:outline-none text-sm text-[#1A1917] font-medium transition-all duration-150";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-[#45433E] mb-1.5";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Host Sub-Navigation */}
      {onViewChange && (
        <div className="flex justify-start pb-2">
          <ContinuousTabs
            tabs={hostNavTabs}
            activeId="create-experience"
            onChange={(id) => onViewChange(id)}
            layoutId="host-workspace-tabs"
          />
        </div>
      )}

      {/* Header */}
      <div className="border-b border-[#E5E2DA] pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#706D65]">
            Host Operations
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#E5E2DA] text-[10px] font-semibold text-[#1A1917] shadow-xs">
            Draft Auto-saved
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1917] tracking-tight">
          Create a New Weekend Experience
        </h1>
        <p className="text-xs sm:text-sm text-[#827E74]">
          Define the experience concept, venue location, pricing, and guest expectations. Once published, you can schedule session dates.
        </p>

        {/* Watermelon UI Labeled Progress Indicator */}
        <div className="pt-2">
          <LabeledProgressIndicator
            percent={Math.round(([title, description, venueName, price, duration].filter(Boolean).length / 5) * 100)}
            label="Experience Setup Readiness"
            valueLabel={`${Math.round(([title, description, venueName, price, duration].filter(Boolean).length / 5) * 100)}% Complete`}
            color="#1A1917"
          />
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, 'PUBLISHED')} className="space-y-6">
        {/* SECTION 1: EXPERIENCE OVERVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-[#E5E2DA] space-y-5 shadow-xs"
        >
          <h2 className="text-sm font-bold text-[#1A1917] pb-2 border-b border-[#E5E2DA] uppercase tracking-wide">
            1. Experience Overview
          </h2>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Experience Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Sunrise Bouldering & Artisan Chemex Pour-Over Lab"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
              />
              <span className="text-[11px] text-[#827E74] mt-1 block">
                Make it descriptive and active. Include what makes it special.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={selectClass}
                >
                  {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className={selectClass}
                >
                  <option value="Beginner Friendly">Beginner Friendly</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                  <option value="All Levels">All Levels Welcome</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Story & Description *</label>
              <textarea
                required
                rows={4}
                placeholder="Describe what guests will do, the setting, what you teach, and the community vibe..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${inputClass} resize-none leading-relaxed`}
              ></textarea>
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: VENUE & LOCATION */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-white p-6 rounded-2xl border border-[#E5E2DA] space-y-5 shadow-xs"
        >
          <h2 className="text-sm font-bold text-[#1A1917] pb-2 border-b border-[#E5E2DA] uppercase tracking-wide">
            2. Venue & Meeting Point
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Venue Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ARAI Hills Nature Reserve Main Trailhead"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>City *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Exact Meeting Point Address *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vetal Tekdi Main Trailhead Gate, Off Senapati Bapat Road"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Latitude</label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className={`${inputClass} font-mono text-xs`}
                />
              </div>
              <div>
                <label className={labelClass}>Longitude</label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className={`${inputClass} font-mono text-xs`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Venue Amenities (comma-separated)</label>
              <input
                type="text"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                className={inputClass}
              />
              <span className="text-[11px] text-[#827E74] mt-1 block">
                e.g. Free Trailside Parking, Restrooms, Drinking Water, Gear Rental
              </span>
            </div>
          </div>
        </motion.div>

        {/* SECTION 3: PRICING & LOGISTICS */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-[#E5E2DA] space-y-5 shadow-xs"
        >
          <h2 className="text-sm font-bold text-[#1A1917] pb-2 border-b border-[#E5E2DA] uppercase tracking-wide">
            3. Pricing & Logistics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Price per Attendee (₹) *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#827E74]">₹</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`${inputClass} pl-8 font-bold`}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Session Duration *</label>
              <input
                type="text"
                required
                placeholder="e.g. 3.5 Hours"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className={selectClass}
              >
                <option value="PUBLIC">PUBLIC (Searchable)</option>
                <option value="MEMBERS">MEMBERS (Verified Only)</option>
                <option value="PRIVATE">PRIVATE (Direct Link)</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Cover Image URL</label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className={`${inputClass} font-mono text-xs text-[#45433E]`}
            />
            {coverImage && (
              <div className="mt-3 h-32 rounded-xl overflow-hidden border border-[#E5E2DA]">
                <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </motion.div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#E5E2DA]">
          <div className="flex items-center gap-2 text-xs text-[#827E74]">
            <ShieldCheck className="w-4 h-4 text-[#2A5C43]" />
            <span>Auto-approved for verified Superhosts</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => handleSubmit(e, 'DRAFT')}
            >
              Save as Draft
            </Button>
            <MorphingButton
              onClick={(e) => handleSubmit(e, 'PUBLISHED')}
              variant="primary"
              successText="Published! Opening Sessions..."
            >
              Publish & Add Sessions →
            </MorphingButton>
          </div>
        </div>
      </form>
    </div>
  );
};
