"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MdSportsSoccer, MdVerified, MdStar, MdAccessTime, MdLocationOn, MdHeadsetMic, MdShield, MdTrendingUp } from "react-icons/md";
import { IoFlash, IoShieldCheckmark } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { TbMapPin, TbCalendarCheck, TbTrophy } from "react-icons/tb";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: <IoFlash size={24} />,
    number: "01",
    title: "Instant Booking",
    desc: "Book any facility in under 60 seconds. No phone calls, no waiting — just pick a slot and play. Available 24/7, any device.",
    stat: "60s",
    statLabel: "avg. booking time",
    color: "blue",
  },
  {
    icon: <MdVerified size={24} />,
    number: "02",
    title: "Verified Venues Only",
    desc: "Every facility on SportVerse is manually verified by our team. Accurate photos, real reviews, zero surprises on the day.",
    stat: "850+",
    statLabel: "verified venues",
    color: "indigo",
  },
  {
    icon: <TbTrophy size={24} />,
    number: "03",
    title: "Best Price Guarantee",
    desc: "We work directly with facility owners to give you the lowest rates. Found it cheaper? We'll match it — no questions asked.",
    stat: "0%",
    statLabel: "hidden fees",
    color: "blue",
  },
  {
    icon: <MdHeadsetMic size={24} />,
    number: "04",
    title: "24/7 Live Support",
    desc: "Real humans, always on call. Whether it's a last-minute rescheduling or a venue issue — our team has your back around the clock.",
    stat: "24/7",
    statLabel: "support available",
    color: "indigo",
  },
  {
    icon: <TbMapPin size={24} />,
    number: "05",
    title: "Nationwide Coverage",
    desc: "From Dhaka to Chittagong, Sylhet to Rajshahi — SportVerse is expanding fast. Find premium courts wherever you are.",
    stat: "30+",
    statLabel: "cities covered",
    color: "blue",
  },
  {
    icon: <MdStar size={24} />,
    number: "06",
    title: "Community Reviews",
    desc: "12,000+ athletes leave real reviews after every session. Filter by sport, price, and rating to find your perfect match.",
    stat: "4.9★",
    statLabel: "average rating",
    color: "indigo",
  },
];

const bigStats = [
  { value: "850+", label: "Facilities", icon: <MdLocationOn size={20} /> },
  { value: "12K+", label: "Athletes", icon: <HiUsers size={20} /> },
  { value: "4.9★", label: "Avg Rating", icon: <MdStar size={20} /> },
  { value: "30+",  label: "Cities", icon: <TbMapPin size={20} /> },
];

// ── Fade-up on scroll ─────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col gap-5 p-6 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-blue-500/30 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />

      {/* Number + icon row */}
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110
          ${feature.color === "blue"
            ? "bg-blue-600/20 border border-blue-500/25 text-blue-400"
            : "bg-indigo-600/20 border border-indigo-500/25 text-indigo-400"
          }`}
        >
          {feature.icon}
        </div>
        <span className="text-[11px] font-black text-gray-700 tracking-[0.15em]">
          {feature.number}
        </span>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-black text-white tracking-tight leading-tight group-hover:text-blue-300 transition-colors duration-200">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {feature.desc}
        </p>
      </div>

      {/* Stat chip */}
      <div className="flex items-center gap-2 mt-auto pt-1">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
          <span className="text-sm font-black text-white">{feature.stat}</span>
          <span className="text-[10px] text-gray-500">{feature.statLabel}</span>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-gray-950 overflow-hidden py-24 lg:py-32">

      {/* ── Background decoration ── */}
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none">
        <defs>
          <pattern id="why-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#why-grid)" />
      </svg>

      {/* Glow orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-700/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-700/12 blur-[90px] pointer-events-none" />

      {/* Diagonal accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <FadeUp delay={0}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-[11px] font-bold tracking-widest uppercase mb-5">
                <IoShieldCheckmark size={13} />
                Why SportVerse
              </span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                className="font-black text-white leading-[0.92] tracking-tighter mt-3"
                style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
              >
                THE SMARTER
                <br />
                WAY TO{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  BOOK
                </span>
                <br />
                <span className="text-gray-400 font-bold" style={{ fontSize: "60%" }}>
                  — AND PLAY SPORTS.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-5 text-base text-gray-400 leading-relaxed max-w-xl">
                We built SportVerse because booking a sports facility should not feel like sending a fax. 
                Everything you need — discovery, booking, payment, and support — in one clean, fast platform.
              </p>
            </FadeUp>
          </div>

          {/* CTA on right */}
          <FadeUp delay={0.3} className="flex-shrink-0">
            <Link
              href="/all-facilities"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35 hover:scale-[1.03] active:scale-[0.97]"
            >
              <MdSportsSoccer size={18} />
              Explore Facilities
              <BsArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={15} />
            </Link>
          </FadeUp>
        </div>

        {/* ── Big stats bar ── */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {bigStats.map(({ value, label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/8 hover:border-blue-500/25 hover:bg-white/[0.07] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:bg-blue-600/25 transition-colors duration-300">
                {icon}
              </div>
              <div className="leading-none">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Feature grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.number} feature={feature} index={i} />
          ))}
        </div>

        {/* ── Bottom testimonial strip ── */}
        <FadeUp delay={0.1} className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-7 md:p-8">
            {/* Accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />

            <div className="flex flex-col md:flex-row md:items-center gap-8">
              {/* Quote */}
              <div className="flex-1">
                <div className="text-3xl text-blue-500 font-black leading-none mb-3"></div>
                <p className="text-base md:text-lg text-gray-200 leading-relaxed font-medium italic">
                  SportVerse completely changed how I book football grounds. What used to take 30 minutes of calls now takes me 45 seconds. It&apos;s genuinely that good.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black">
                    RK
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Rahim Khan</p>
                    <p className="text-xs text-gray-500">Football Captain · Dhaka FC</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <MdStar key={i} size={14} className="text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-32 bg-white/8" />

              {/* Right: trust points */}
              <div className="flex flex-col gap-3.5 md:min-w-[220px]">
                {[
                  { icon: <IoShieldCheckmark size={16} className="text-emerald-400" />, text: "No booking fees, ever" },
                  { icon: <TbCalendarCheck size={16} className="text-blue-400" />, text: "Instant confirmation" },
                  { icon: <MdShield size={16} className="text-indigo-400" />, text: "Secure payments" },
                  { icon: <MdTrendingUp size={16} className="text-blue-400" />, text: "New facilities weekly" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                      {icon}
                    </div>
                    <span className="text-sm text-gray-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
