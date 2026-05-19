"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdSportsSoccer,
  MdLocationOn,
  MdAttachMoney,
  MdPeople,
  MdImage,
  MdEmail,
  MdDescription,
  MdCheckCircle,
  MdArrowBack,
  MdArrowForward,
  MdRocketLaunch,
} from "react-icons/md";
import { IoFlash } from "react-icons/io5";
import Image from "next/image";

// ── Constants ─────────────────────────────────────────────────────────────────
const FACILITY_TYPES = [
  { label: "Football Ground",  emoji: "⚽" },
  { label: "Cricket Ground",   emoji: "🏏" },
  { label: "Basketball Court", emoji: "🏀" },
  { label: "Swimming Pool",    emoji: "🏊" },
  { label: "Tennis Court",     emoji: "🎾" },
  { label: "Badminton Court",  emoji: "🏸" },
  { label: "Gymnasium",        emoji: "💪" },
  { label: "Yoga Studio",      emoji: "🧘" },
  { label: "Boxing Ring",      emoji: "🥊" },
  { label: "Indoor Stadium",   emoji: "🏟️" },
  { label: "Rooftop Turf",     emoji: "🌿" },
  { label: "Other",            emoji: "🔖" },
];

const TIME_SLOTS = [
  "06:00 AM – 08:00 AM",
  "08:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 02:00 PM",
  "02:00 PM – 04:00 PM",
  "04:00 PM – 06:00 PM",
  "06:00 PM – 08:00 PM",
  "08:00 PM – 10:00 PM",
];

const STEPS = [
  { id: 1, label: "Basic Info", icon: "🏟️" },
  { id: 2, label: "Details",    icon: "📋" },
  { id: 3, label: "Slots",      icon: "🕐" },
  { id: 4, label: "Review",     icon: "✅" },
];

// ── Styles ────────────────────────────────────────────────────────────────────
const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white " +
  "placeholder-gray-600 outline-none focus:border-blue-500 focus:bg-blue-500/5 " +
  "transition-all duration-200 text-sm";

const labelCls =
  "block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2";

// ── Small helpers ─────────────────────────────────────────────────────────────
function StepHeader({ title, sub }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-black text-white tracking-tight">{title}</h2>
      <p className="text-gray-500 text-sm mt-1">{sub}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function ImagePreview({ url }) {
  const [loaded, setLoaded]   = useState(false);
  const [errored, setErrored] = useState(false);

  const [prevUrl, setPrevUrl] = useState(url);
  if (url !== prevUrl) {
    setPrevUrl(url);
    setLoaded(false);
    setErrored(false);
  }

  if (!url) return null;

  return (
    <div className="mt-3">
      {errored ? (
        <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          ⚠️ Could not load image — make sure the URL is public and correct.
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-white/10 h-44 bg-white/5">
          {/* Spinner shown until image loads */}
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt="Preview"
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
          />
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AddFacilitiesForm() {
  const [step, setStep]               = useState(1);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [submitted, setSubmitted]     = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    facilityName: "",
    facilityType: "",
    location:     "",
    image:     "",
    pricePerHour: "",
    capacity:     "",
    description:  "",
    ownerEmail:   "owner@yourplatform.com", // auto-filled from session in real app
  });

  // Generic field updater
  const patch = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  // Slot toggle
  const toggleSlot = (slot) =>
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );

  // Step validation
  const canNext = () => {
    if (step === 1) return form.facilityName.trim() && form.facilityType && form.location.trim();
    if (step === 2) return form.pricePerHour && form.capacity && form.description.trim() && form.image.trim();
    if (step === 3) return selectedSlots.length > 0;
    return true;
  };

  // Move forward — NEVER submits
  const handleNext = () => {
    if (step < 4 && canNext()) setStep((s) => s + 1);
  };

  // Move backward — NEVER submits
  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  // The ONLY function that submits — called exclusively by the Go Live button
  const handleGoLive = async () => {
    setIsSubmitting(true);
    try {
      // ── Replace with your real API call ──
      // const res = await fetch("/api/facilities", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     ...form,
      //     availableTimeSlots: selectedSlots,
      //   }),
      // });
      // if (!res.ok) throw new Error("Failed");

      await new Promise((r) => setTimeout(r, 1400)); // simulate network delay
      setSubmitted(true);
    } catch {
      alert("Submission failed — please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setSelectedSlots([]);
    setIsSubmitting(false);
    setForm({
      facilityName: "",
      facilityType: "",
      location:     "",
      image:     "",
      pricePerHour: "",
      capacity:     "",
      description:  "",
      ownerEmail:   "owner@yourplatform.com",
    });
  };

  // Slide animation
  const slide = {
    hidden:  { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0,   transition: { duration: 0.3,  ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, x: -28, transition: { duration: 0.2 } },
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center max-w-sm w-full"
        >
          <div className="w-24 h-24 rounded-full bg-blue-600/15 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
            <MdRocketLaunch size={40} className="text-blue-400" />
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Successfully Listed
          </span>
          <h2 className="text-3xl font-black text-white mt-3 mb-3 tracking-tight">
            Facility is Live! 🎉
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-2">
            <span className="text-white font-bold">{form.facilityName}</span>{" "}
            has been submitted and is under review.
          </p>
          <p className="text-gray-600 text-xs mb-8">
            Confirmation sent to{" "}
            <span className="text-gray-300">{form.ownerEmail}</span>
          </p>
          {/* type="button" always — even on success screen */}
          <button
            type="button"
            onClick={resetForm}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors text-sm shadow-lg shadow-blue-600/25"
          >
            List Another Facility
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Main UI ────────────────────────────────────────────────────────────────
  // CRITICAL: The outermost element is a <div>, NOT a <form>.
  // This means no browser submit event can ever fire accidentally.
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-start justify-center px-4 py-12">

      {/* Background grid */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.035] pointer-events-none" aria-hidden>
        <defs>
          <pattern id="af-grid" width="52" height="52" patternUnits="userSpaceOnUse">
            <path d="M 52 0 L 0 0 0 52" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#af-grid)" />
      </svg>
      <div className="fixed top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-700/15 blur-[110px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-700/10 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-2xl">

        {/* ── Page header ── */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-5">
            <IoFlash size={11} />
            Facility Portal
          </span>
          <h1
            className="font-black text-white tracking-tighter leading-[0.95]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
          >
            List Your{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Facility
            </span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Get your sports venue live on SportVerse in minutes.
          </p>
        </motion.div>

        {/* ── Step indicator ── */}
        <div className="flex items-start justify-between mb-10 px-1">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-2">
                {/* type="button" so clicking a completed step never submits */}
                <motion.button
                  type="button"
                  animate={{
                    backgroundColor:
                      step > s.id  ? "#2563eb"
                      : step === s.id ? "rgba(37,99,235,0.15)"
                      : "rgba(255,255,255,0.04)",
                    borderColor:
                      step >= s.id ? "#3b82f6" : "rgba(255,255,255,0.1)",
                  }}
                  onClick={() => { if (step > s.id) setStep(s.id); }}
                  className="w-11 h-11 rounded-full border-2 flex items-center justify-center text-base transition-all duration-300"
                  style={{ cursor: step > s.id ? "pointer" : "default" }}
                >
                  {step > s.id
                    ? <MdCheckCircle size={20} className="text-white" />
                    : <span>{s.icon}</span>
                  }
                </motion.button>
                <span className={`text-[9px] font-bold tracking-wider uppercase hidden sm:block transition-colors duration-200
                  ${step === s.id ? "text-blue-400" : step > s.id ? "text-blue-500/60" : "text-gray-600"}`}>
                  {s.label}
                </span>
              </div>

              {i < STEPS.length - 1 && (
                <div className="flex-1 mx-3 relative" style={{ marginTop: "-18px" }}>
                  <div className="h-px bg-white/8 w-full" />
                  <motion.div
                    className="h-px bg-blue-500 absolute top-0 left-0"
                    animate={{ width: step > s.id ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Card ── */}
        <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />

          <div className="p-6 md:p-8 min-h-[420px]">
            <AnimatePresence mode="wait">

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <motion.div key="s1" variants={slide} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-5">
                  <StepHeader title="Basic Information" sub="Tell us about your facility" />

                  <Field label="Facility Name">
                    <div className="relative">
                      <MdSportsSoccer className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                      <input
                        type="text"
                        className={`${inputCls} pl-10`}
                        placeholder="e.g. Green Turf Arena"
                        value={form.facilityName}
                        onChange={patch("facilityName")}
                        onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                      />
                    </div>
                  </Field>

                  <Field label="Facility Type">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {FACILITY_TYPES.map(({ label, emoji }) => (
                        <motion.button
                          key={label}
                          type="button"   // ← explicit type="button"
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setForm((f) => ({ ...f, facilityType: label }))}
                          className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all text-left ${
                            form.facilityType === label
                              ? "bg-blue-600/15 border-blue-500/50 text-blue-300"
                              : "bg-white/3 border-white/8 text-gray-500 hover:border-white/20 hover:text-gray-300"
                          }`}
                        >
                          <span className="text-base">{emoji}</span>
                          <span className="truncate">{label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Location">
                    <div className="relative">
                      <MdLocationOn className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                      <input
                        type="text"
                        className={`${inputCls} pl-10`}
                        placeholder="e.g. Gulshan, Dhaka"
                        value={form.location}
                        onChange={patch("location")}
                        onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                      />
                    </div>
                  </Field>
                </motion.div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <motion.div key="s2" variants={slide} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-5">
                  <StepHeader title="Facility Details" sub="Pricing, capacity, image and description" />

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Price Per Hour (৳)">
                      <div className="relative">
                        <MdAttachMoney className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                        <input
                          type="number"
                          min="0"
                          className={`${inputCls} pl-9`}
                          placeholder="e.g. 1500"
                          value={form.pricePerHour}
                          onChange={patch("pricePerHour")}
                          onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                        />
                      </div>
                    </Field>
                    <Field label="Capacity (persons)">
                      <div className="relative">
                        <MdPeople className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                        <input
                          type="number"
                          min="1"
                          className={`${inputCls} pl-9`}
                          placeholder="e.g. 22"
                          value={form.capacity}
                          onChange={patch("capacity")}
                          onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                        />
                      </div>
                    </Field>
                  </div>

                  <Field label="Image URL">
                    <div className="relative">
                      <MdImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                      <input
                        type="url"
                        className={`${inputCls} pl-10`}
                        placeholder="https://i.ibb.co/your-image.jpg"
                        value={form.image}
                        onChange={patch("image")}
                        onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault(); }}
                      />
                    </div>
                    {/* Live preview — plain <img> bypasses Next.js domain restrictions */}
                    <ImagePreview url={form.image} />
                  </Field>

                  <Field label="Description">
                    <div className="relative">
                      <MdDescription className="absolute left-3.5 top-3.5 text-gray-500 pointer-events-none" size={16} />
                      <textarea
                        rows={4}
                        className={`${inputCls} pl-10 resize-none`}
                        placeholder="Surface type, amenities, parking, changing rooms…"
                        value={form.description}
                        onChange={patch("description")}
                      />
                    </div>
                  </Field>
                </motion.div>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <motion.div key="s3" variants={slide} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-5">
                  <StepHeader title="Available Time Slots" sub="Select every slot your facility is open" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TIME_SLOTS.map((slot) => {
                      const on = selectedSlots.includes(slot);
                      return (
                        <motion.button
                          key={slot}
                          type="button"   // ← explicit type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleSlot(slot)}
                          className={`flex items-center gap-3 p-4 rounded-xl border text-xs font-semibold transition-all text-left ${
                            on
                              ? "bg-blue-600/12 border-blue-500/45 text-blue-300"
                              : "bg-white/3 border-white/8 text-gray-500 hover:border-white/20 hover:text-gray-300"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${on ? "bg-blue-600 border-blue-600" : "border-white/20"}`}>
                            {on && (
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span>🕐 {slot}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {selectedSlots.length > 0 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-blue-400/70 text-xs text-center"
                    >
                      {selectedSlots.length} slot{selectedSlots.length > 1 ? "s" : ""} selected
                    </motion.p>
                  )}
                </motion.div>
              )}

              {/* ── STEP 4 ── */}
              {step === 4 && (
                <motion.div key="s4" variants={slide} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-5">
                  <StepHeader title="Review & Submit" sub="Confirm all details before going live" />

                  {form.image && (
                    <div className="rounded-xl overflow-hidden h-48 border border-white/10 bg-gray-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={form.image}
                        alt={form.facilityName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="rounded-xl border border-white/8 bg-white/[0.02] divide-y divide-white/5 overflow-hidden">
                    {[
                      { label: "Facility Name", value: form.facilityName,                            icon: <MdSportsSoccer size={14} /> },
                      { label: "Type",          value: form.facilityType,                            icon: <IoFlash size={14} /> },
                      { label: "Location",      value: form.location,                                icon: <MdLocationOn size={14} /> },
                      { label: "Price / Hour",  value: `৳ ${Number(form.pricePerHour).toLocaleString()}`, icon: <MdAttachMoney size={14} /> },
                      { label: "Capacity",      value: `${form.capacity} persons`,                  icon: <MdPeople size={14} /> },
                    ].map(({ label, value, icon }) => (
                      <div key={label} className="flex items-center justify-between gap-4 px-4 py-3">
                        <div className="flex items-center gap-2 text-gray-500 flex-shrink-0">
                          <span className="text-blue-400">{icon}</span>
                          <span className="text-xs">{label}</span>
                        </div>
                        <span className="text-sm text-white font-semibold text-right truncate max-w-[55%]">{value}</span>
                      </div>
                    ))}

                    <div className="px-4 py-3">
                      <p className="text-xs text-gray-500 mb-2.5 flex items-center gap-2">
                        <span>🕐</span> Time Slots
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedSlots.map((s) => (
                          <span key={s} className="text-[10px] bg-blue-600/12 border border-blue-500/25 text-blue-300 rounded-full px-3 py-1">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="px-4 py-3">
                      <p className="text-xs text-gray-500 mb-1.5 flex items-center gap-2">
                        <MdDescription size={14} className="text-blue-400" /> Description
                      </p>
                      <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">{form.description}</p>
                    </div>

                    <div className="px-4 py-3">
                      <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                        <MdEmail size={14} className="text-blue-400" /> Owner Email
                        <span className="px-1.5 py-0.5 rounded bg-blue-600/15 border border-blue-500/20 text-blue-400 text-[9px] font-bold">AUTO-FILLED</span>
                      </p>
                      <input
                        type="email"
                        readOnly
                        value={form.ownerEmail}
                        className="w-full bg-white/3 border border-white/5 rounded-xl px-4 py-2.5 text-gray-400 text-sm cursor-not-allowed outline-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Footer nav ── */}
          <div className="border-t border-white/5 px-6 md:px-8 py-4 flex items-center justify-between gap-4">

            {/* Back button */}
            <button
              type="button"   // ← explicit type="button"
              onClick={handleBack}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/25 transition-all duration-200 ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
            >
              <MdArrowBack size={16} /> Back
            </button>

            {/* Progress dots */}
            <div className="flex gap-1.5 items-center">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={`rounded-full h-1.5 transition-all duration-300 ${
                    step === s.id  ? "w-6 bg-blue-500"
                    : step > s.id ? "w-1.5 bg-blue-500/50"
                    : "w-1.5 bg-white/15"
                  }`}
                />
              ))}
            </div>

            {/* Continue / Go Live */}
            {step < 4 ? (
              <motion.button
                type="button"   // ← explicit type="button"
                whileTap={{ scale: 0.97 }}
                disabled={!canNext()}
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-black rounded-xl transition-colors disabled:opacity-25 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
              >
                Continue <MdArrowForward size={16} />
              </motion.button>
            ) : (
              <motion.button
                type="button"   // ← explicit type="button" — this is the key fix
                whileTap={{ scale: 0.97 }}
                disabled={isSubmitting}
                onClick={handleGoLive}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-black rounded-xl transition-colors shadow-lg shadow-blue-600/20"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <MdRocketLaunch size={16} /> Go Live
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          Your data is encrypted and never shared with third parties.
        </p>
      </div>
    </div>
  );
}
