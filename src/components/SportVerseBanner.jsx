"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  MdSportsSoccer,
  MdArrowForward,
  MdPlayCircle,
  MdStar,
  MdVerified,
  MdBolt,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { TbMapPin } from "react-icons/tb";

// ── Animation variants ────────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7 } },
};

// ── Floating sport card ───────────────────────────────────────────────────────
function SportCard({ src, alt, width, height, label, delay, floatY, duration, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div
        animate={{ y: floatY }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration, ease: "easeInOut" }}
        className="group relative"
        style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.55))" }}
      >
        {/* Card frame */}
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gray-900/40 backdrop-blur-sm">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-cover block"
            style={{ width, height }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6">
            <span className="text-xs font-bold text-white/90 tracking-wide">{label}</span>
          </div>
          {/* Top-right shimmer dot */}
          <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_2px_rgba(59,130,246,0.6)]" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Live badge ────────────────────────────────────────────────────────────────
function LiveBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.3, duration: 0.5 }}
      className="absolute top-8 left-4 z-30 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-gray-950/80 border border-white/10 backdrop-blur-xl shadow-2xl"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
      </span>
      <span className="text-xs font-semibold text-white">24 open now</span>
    </motion.div>
  );
}

// ── Rating badge ──────────────────────────────────────────────────────────────
function RatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="absolute top-8 right-4 z-30 flex flex-col gap-1 px-4 py-3 rounded-2xl bg-gray-950/80 border border-white/10 backdrop-blur-xl shadow-2xl"
    >
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <MdStar key={i} size={12} className="text-amber-400" />
        ))}
      </div>
      <p className="text-sm font-black text-white leading-none">4.9 / 5.0</p>
      <p className="text-[10px] text-gray-400">12K+ Reviews</p>
    </motion.div>
  );
}

// ── Booking badge ─────────────────────────────────────────────────────────────
function BookingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.7, duration: 0.5 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-950/85 border border-white/10 backdrop-blur-xl shadow-2xl whitespace-nowrap"
    >
      <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/40">
        <MdVerified size={16} className="text-white" />
      </div>
      <div className="leading-none">
        <p className="text-[10px] text-gray-400 mb-1">Just booked</p>
        <p className="text-sm font-bold text-white">Football Turf · Comilla</p>
      </div>
      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1 flex-shrink-0" />
    </motion.div>
  );
}

// ── Main banner ───────────────────────────────────────────────────────────────
export default function SportVerseBanner() {
  const containerRef = useRef(null);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const rx = useTransform(sy, [-400, 400], [5, -5]);
  const ry = useTransform(sx, [-400, 400], [-5, 5]);

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set(e.clientX - rect.left - rect.width / 2);
      my.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gray-950"
    >
      {/* ══════════════════════════════════════════
          BACKGROUND — stadium image + layered overlays
      ══════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        {/* Stadium background image */}
        <Image
          src="/sports/football 2.avif"
          alt="Stadium background"
          fill
          priority
          className="object-cover object-center"
          quality={85}
        />
        {/* Dark tint so text stays readable */}
        <div className="absolute inset-0 bg-gray-950/80" />
        {/* Left-to-right dark gradient — darkens left side for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/70 to-gray-950/30" />
        {/* Bottom fade to match footer */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-950 to-transparent" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-950 to-transparent" />
        {/* Blue glow orb — top left */}
        <div className="absolute top-[-8%] left-[-4%] w-[520px] h-[520px] rounded-full bg-blue-700/25 blur-[110px]" />
        {/* Subtle right-side glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-[90px]" />
      </div>

      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-[0.04] pointer-events-none">
        <defs>
          <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* ══════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0 lg:min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 xl:gap-16 items-center w-full">

          {/* ── LEFT TEXT BLOCK ─────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col max-w-xl"
          >
            {/* Pill badge */}
            <motion.div variants={fadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-[11px] font-bold tracking-widest uppercase">
                <MdBolt size={13} />
                Book Premium Sports Facilities
              </span>
            </motion.div>

            {/* Headline — clean white, no strange gradients */}
            <motion.h1
              variants={fadeUp}
              className="font-black leading-[1] tracking-tighter text-white"
              style={{ fontSize: "clamp(3rem, 7vw, 5.2rem)" }}
            >
              PLAY LIKE
              <br />
              <span className="text-blue-400">A CHAMPION</span>
              <br />
              <span className="text-gray-300 font-bold" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.6rem)" }}>
                — Every Single Day.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-[15px] lg:text-base text-gray-300 leading-relaxed"
            >
              Discover football turfs, cricket grounds, badminton courts and premium sports arenas — all in one modern platform. Book in seconds, play like a pro.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/facilities"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-blue-600/35 hover:shadow-blue-500/45 hover:scale-[1.03] active:scale-[0.97]"
              >
                <MdSportsSoccer size={18} />
                Explore Facilities
                <MdArrowForward
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>

              <button className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/15 bg-white/8 hover:bg-white/12 text-white font-semibold text-sm backdrop-blur-sm transition-all duration-200 hover:border-white/25">
                <MdPlayCircle
                  size={20}
                  className="text-blue-400 group-hover:scale-110 transition-transform duration-200"
                />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-6">
              {[
                { icon: <MdSportsSoccer size={15} />, val: "850+", label: "Facilities" },
                { icon: <HiUsers size={15} />, val: "12K+", label: "Athletes" },
                { icon: <TbMapPin size={15} />, val: "30+", label: "Cities" },
              ].map(({ icon, val, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-blue-400">{icon}</span>
                  <span className="text-white font-black text-base">{val}</span>
                  <span className="text-gray-400 text-sm">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Avatar row */}
            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {[
                  { bg: "#2563eb", initials: "AK" },
                  { bg: "#4f46e5", initials: "RS" },
                  { bg: "#0284c7", initials: "MH" },
                  { bg: "#7c3aed", initials: "JD" },
                ].map(({ bg, initials }, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-gray-950 flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: bg }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-300">
                Trusted by{" "}
                <span className="text-white font-bold">12,000+</span> athletes
              </p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT IMAGE CLUSTER ──────────────── */}
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
            className="relative hidden lg:block h-[620px]"
          >
            {/* ── Football — large center-left ── */}
            <SportCard
              src="/sports/football 2.avif"
              alt="Football pitch"
              width={270}
              height={290}
              label="Football Turf"
              delay={0.4}
              floatY={[0, -14, 0]}
              duration={5}
              className="absolute left-[12%] top-[10%] z-20"
            />

            {/* ── Basketball — top right ── */}
            <SportCard
              src="/sports/basketball.avif"
              alt="Basketball court"
              width={210}
              height={220}
              label="Basketball Court"
              delay={0.55}
              floatY={[0, 16, 0]}
              duration={6}
              className="absolute right-[2%] top-[4%] z-10"
            />

            {/* ── Cricket — mid right, overlapping ── */}
            <SportCard
              src="/sports/cricket 2.avif"
              alt="Cricket ground"
              width={195}
              height={160}
              label="Cricket Ground"
              delay={0.7}
              floatY={[0, -12, 0]}
              duration={4.5}
              className="absolute right-[5%] top-[42%] z-20"
            />

            {/* ── Badminton — bottom left ── */}
            <SportCard
              src="/sports/badminton 2.avif"
              alt="Badminton court"
              width={215}
              height={170}
              label="Badminton Court"
              delay={0.85}
              floatY={[0, 14, 0]}
              duration={5.5}
              className="absolute left-[5%] bottom-[10%] z-10"
            />

            {/* ── Swimming — bottom center-right ── */}
            <SportCard
              src="/sports/swimming.avif"
              alt="Swimming pool"
              width={200}
              height={155}
              label="Swimming Pool"
              delay={1.0}
              floatY={[0, -10, 0]}
              duration={5}
              className="absolute right-[22%] bottom-[4%] z-20"
            />

            {/* ── Connecting decorative lines (SVG) ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              aria-hidden
            >
              {/* Subtle connector arcs between cards */}
              <line x1="28%" y1="30%" x2="65%" y2="18%" stroke="rgba(59,130,246,0.15)" strokeWidth="1" strokeDasharray="4 6" />
              <line x1="75%" y1="20%" x2="78%" y2="50%" stroke="rgba(59,130,246,0.12)" strokeWidth="1" strokeDasharray="4 6" />
              <line x1="18%" y1="72%" x2="52%" y2="82%" stroke="rgba(59,130,246,0.12)" strokeWidth="1" strokeDasharray="4 6" />
              {/* Dot accents */}
              {[[55, 150],[420, 80],[500, 380],[130, 420],[340, 540],[70, 280]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="1.8" fill="#3b82f6" opacity="0.4" />
              ))}
            </svg>

            {/* ── Floating UI badges ── */}
            <LiveBadge />
            <RatingBadge />
            <BookingBadge />

            {/* Glow behind cluster */}
            <div className="absolute inset-[15%] rounded-full bg-blue-600/8 blur-3xl pointer-events-none z-0" />
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] tracking-[0.25em] text-gray-500 uppercase font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
