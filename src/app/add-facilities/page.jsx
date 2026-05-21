"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient, useSession } from "@/lib/auth-client";


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
  { id: 1, label: "Basic Info", emoji: "🏟️" },
  { id: 2, label: "Details",    emoji: "📋" },
  { id: 3, label: "Slots",      emoji: "🕐" },
  { id: 4, label: "Review",     emoji: "✅" },
];

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white " +
  "placeholder-white/30 outline-none focus:border-emerald-400/60 focus:bg-white/10 " +
  "transition-all duration-200 text-sm";

const labelCls =
  "block text-[10px] font-bold uppercase tracking-widest text-emerald-400/80 mb-2";

function StepHeader({ title, sub }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-white/40 text-xs mt-0.5">{sub}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

export default function AddFacilitiesPage() {
  const { data: session, isPending } = useSession();
  const userEmail = session?.user?.email || "";
  const [step, setStep] = useState(1);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [form, setForm] = useState({
    facilityName: "",
    facilityType: "",
    location:     "",
    image:     "",
    pricePerHour: "",
    capacity:     "",
    description:  "",
    ownerEmail:   "",
  });
const onSubmit = async (e) => {
  e.preventDefault();

  try {
  
    if (isPending) {
      alert("Session loading...");
      return;
    }

    if (!session?.user?.email) {
      alert("Please login first");
      return;
    }

    const tokenResponse = await authClient.token();
    const token = tokenResponse?.data?.token;

    if (!token) {
      alert("Token not found. Please login again.");
      return;
    }

    const facilitiesData = {
      ...form,
      ownerEmail: session.user.email.trim().toLowerCase(),
      availableTimeSlots: selectedSlots,
      pricePerHour: Number(form.pricePerHour),
      capacity: Number(form.capacity),
      createdAt: new Date(),
    };

    console.log("SENDING:", facilitiesData);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(facilitiesData),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add facility");
    }

    setSubmitted(true);

  } catch (error) {
    console.error("SUBMIT ERROR:", error);
    alert(error.message || "Something went wrong");
  }
};

  const patch = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (field === "image") setImgError(false);
  };

  const toggleSlot = (slot) =>
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );

  const canNext = () => {
    if (step === 1) return form.facilityName && form.facilityType && form.location;
    if (step === 2) return form.pricePerHour && form.capacity && form.description && form.image;
    if (step === 3) return selectedSlots.length > 0;
    return true;
  };

  const slide = {
    hidden:  { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: "easeOut" } },
    exit:    { opacity: 0, x: -36, transition: { duration: 0.22 } },
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(1);
    setSelectedSlots([]);
    setImgError(false);
    setForm({
      facilityName: "", facilityType: "", location: "",
      image: "", pricePerHour: "", capacity: "",
      description: "", ownerEmail: "owner@yourplatform.com",
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center max-w-sm"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mx-auto mb-6 text-5xl">
            🎉
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Facility Listed!</h2>
          <p className="text-white/50 mb-2 leading-relaxed text-sm">
            <span className="text-emerald-400 font-semibold">{form.facilityName}</span>{" "}
            has been submitted successfully.
          </p>
          <p className="text-white/35 text-sm mb-8">
            Confirmation will be sent to{" "}
            <span className="text-white/60">{form.ownerEmail}</span>.
          </p>
          <button
            onClick={resetForm}
            className="px-8 py-3 bg-emerald-400 text-[#0a0f1a] font-bold rounded-xl hover:bg-emerald-300 transition-colors text-sm"
          >
            List Another Facility
          </button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white flex items-start justify-center p-4 py-10">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-[10px] font-bold tracking-widest uppercase">
              Facility Portal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            List Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Facility
            </span>
          </h1>
          <p className="text-white/35 text-sm">
            Get your sports venue live on the platform in minutes.
          </p>
        </motion.div>

        <div className="flex items-start justify-between mb-10 px-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    backgroundColor:
                      step > s.id ? "#10b981"
                      : step === s.id ? "rgba(16,185,129,0.15)"
                      : "rgba(255,255,255,0.04)",
                    borderColor: step >= s.id ? "#10b981" : "rgba(255,255,255,0.1)",
                  }}
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm cursor-pointer select-none"
                  onClick={() => step > s.id && setStep(s.id)}
                >
                  {step > s.id ? (
                    <span className="text-white text-xs font-black">✓</span>
                  ) : (
                    <span>{s.emoji}</span>
                  )}
                </motion.div>
                <span className={`text-[9px] font-bold tracking-wider uppercase hidden sm:block transition-colors ${step === s.id ? "text-emerald-400" : "text-white/25"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 mx-2 relative" style={{ top: "-10px" }}>
                  <div className="h-px bg-white/8 w-full" />
                  <motion.div
                    className="h-px bg-emerald-400 absolute top-0 left-0"
                    animate={{ width: step > s.id ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
          <form onSubmit={onSubmit}>
            <div className="p-6 md:p-8 min-h-[380px]">
              <AnimatePresence mode="wait">

                {step === 1 && (
                  <motion.div key="s1" variants={slide} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                    <StepHeader title="Basic Information" sub="Tell us about your facility" />
                    <Field label="Facility Name">
                      <input name="facilityName" className={inputCls} placeholder="e.g. Green Turf Arena" value={form.facilityName} onChange={patch("facilityName")} />
                    </Field>
                    
                    <Field label="Facility Type">
                      <input type="hidden" name="facilityType" value={form.facilityType} />
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {FACILITY_TYPES.map(({ label, emoji }) => (
                          <motion.button
                            key={label}
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setForm((f) => ({ ...f, facilityType: label }))}
                            className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all text-left ${
                              form.facilityType === label
                                ? "bg-emerald-400/15 border-emerald-400/60 text-emerald-400"
                                : "bg-white/3 border-white/8 text-white/45 hover:border-white/20 hover:text-white/70"
                            }`}
                          >
                            <span>{emoji}</span>
                            <span className="truncate">{label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </Field>
                    
                    <Field label="Location">
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm select-none pointer-events-none">📍</span>
                        <input name="location" className={`${inputCls} pl-10`} placeholder="e.g. Gulshan, Dhaka" value={form.location} onChange={patch("location")} />
                      </div>
                    </Field>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" variants={slide} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                    <StepHeader title="Facility Details" sub="Pricing, capacity, image and description" />
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Price Per Hour ($)"> 
                        <input name="pricePerHour" className={inputCls} type="number" min="0" placeholder="e.g. 1500" value={form.pricePerHour} onChange={patch("pricePerHour")} />
                      </Field>
                      <Field label="Capacity (persons)">
                        <input name="capacity" className={inputCls} type="number" min="1" placeholder="e.g. 22" value={form.capacity} onChange={patch("capacity")} />
                      </Field>
                    </div>

                    <Field label="Image URL">
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm select-none pointer-events-none">🔗</span>
                        <input
                          name="url"
                          className={`${inputCls} pl-10`}
                          placeholder="https://i.ibb.co/your-image.jpg"
                          value={form.image}
                          onChange={patch("image")}
                        />
                      </div>
                      <AnimatePresence>
                        {form.image && !imgError && (
                          <motion.div
                            key="preview"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-2.5 rounded-xl overflow-hidden border border-white/10 h-40"
                          >
                            <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={() => setImgError(true)} />
                          </motion.div>
                        )}
                        {form.image && imgError && (
                          <motion.p key="err" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-xs text-red-400/80">
                            ⚠ Could not load image — double-check the URL.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </Field>

                    <Field label="Description">
                      <textarea name="description" className={`${inputCls} resize-none`} rows={4} placeholder="Surface type, amenities, parking, changing rooms…" value={form.description} onChange={patch("description")} />
                    </Field>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" variants={slide} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                    <StepHeader title="Available Time Slots" sub="Select every slot your facility is open" />
                    
                    <input type="hidden" name="selectedSlots" value={JSON.stringify(selectedSlots)} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {TIME_SLOTS.map((slot) => {
                        const on = selectedSlots.includes(slot);
                        return (
                          <motion.button
                            key={slot}
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            onClick={() => toggleSlot(slot)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                              on
                                ? "bg-emerald-400/10 border-emerald-400/50 text-emerald-400"
                                : "bg-white/3 border-white/8 text-white/45 hover:border-white/20 hover:text-white/65"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${on ? "bg-emerald-400 border-emerald-400" : "border-white/20"}`}>
                              {on && (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <path d="M2 5l2.5 2.5L8 3" stroke="#0a0f1a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                            🕐 {slot}
                          </motion.button>
                        );
                      })}
                    </div>
                    {selectedSlots.length > 0 && (
                      <p className="text-emerald-400/60 text-xs text-center">
                        {selectedSlots.length} slot{selectedSlots.length > 1 ? "s" : ""} selected
                      </p>
                    )}
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="s4" variants={slide} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                    <StepHeader title="Review & Submit" sub="Confirm everything before going live" />
                    {form.image && !imgError && (
                      <div className="rounded-xl overflow-hidden h-44 border border-white/10">
                        <img src={form.image} alt={form.facilityName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="bg-white/[0.02] rounded-xl border border-white/8 divide-y divide-white/5 overflow-hidden">
                      {[
                        { k: "Facility Name", v: form.facilityName },
                        { k: "Type",          v: form.facilityType },
                        { k: "Location",      v: form.location },
                        { k: "Price / Hour",  v: `$ ${form.pricePerHour}` },
                        { k: "Capacity",      v: `${form.capacity} persons` },
                        { k: "Image URL",     v: form.image },
                      ].map(({ k, v }) => (
                        <div key={k} className="flex justify-between items-start gap-4 px-4 py-3 text-sm">
                          <span className="text-white/35 shrink-0">{k}</span>
                          <span className="text-white font-medium text-right break-all">{v}</span>
                        </div>
                      ))}
                      <div className="px-4 py-3">
                        <span className="text-white/35 text-sm block mb-2">Time Slots</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedSlots.map((s) => (
                            <span key={s} className="text-[10px] bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 rounded-full px-2.5 py-1">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="px-4 py-3">
                        <span className="text-white/35 text-sm block mb-1">Description</span>
                        <p className="text-white/65 text-sm leading-relaxed">{form.description}</p>
                      </div>
                    </div>
                    <Field label="Owner Email · auto-filled from your account">
                      <input name="ownerEmail" className={`${inputCls} opacity-50 cursor-not-allowed`} value={form.ownerEmail} readOnly />
                    </Field>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            <div className="border-t border-white/5 px-6 md:px-8 py-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className={`px-5 py-2.5 rounded-xl border border-white/10 text-sm text-white/45 hover:text-white hover:border-white/25 transition-all ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
              >
                ← Back
              </button>
              
              <div className="flex gap-1.5 items-center">
                {STEPS.map((s) => (
                  <div key={s.id} className={`rounded-full h-1.5 transition-all duration-300 ${step === s.id ? "w-5 bg-emerald-400" : step > s.id ? "w-1.5 bg-emerald-400/45" : "w-1.5 bg-white/15"}`} />
                ))}
              </div>
              
              <motion.button
                type={step < 4 ? "button" : "submit"}
                whileTap={{ scale: 0.97 }}
                disabled={step < 4 && !canNext()}
                onClick={() => { if (step < 4) setStep((s) => s + 1); }}
                className="px-6 py-2.5 bg-emerald-400 text-[#0a0f1a] text-sm font-black rounded-xl hover:bg-emerald-300 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              >
                {step < 4 ? "Continue →" : "🚀 Go Live"}
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}