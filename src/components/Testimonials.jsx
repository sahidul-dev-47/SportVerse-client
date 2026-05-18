"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MdStar, MdSportsSoccer, MdFormatQuote } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { TbTrophy } from "react-icons/tb";
import { HiUsers } from "react-icons/hi2";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaSwimmer } from "react-icons/fa";
import { GiTennisBall, GiBasketballBall, GiShuttlecock } from "react-icons/gi";

// ── Testimonial data ──────────────────────────────────────────────────────────
const testimonials = [
  {
    id: 1,
    name: "Rahim Khan",
    role: "Football Captain",
    club: "Dhaka FC",
    avatar: "RK",
    avatarGrad: "from-blue-500 to-blue-700",
    sport: "Football",
    sportIcon: <MdSportsSoccer size={13} />,
    rating: 5,
    quote:
      "SportVerse completely changed how I book football grounds. What used to take 30 minutes of phone calls now takes me 45 seconds. The verified venues mean I never show up to a disappointment.",
    facility: "Green Field Turf, Dhaka",
    date: "2 weeks ago",
    tag: "Regular User",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Competitive Swimmer",
    club: "Chittagong Aquatics",
    avatar: "NJ",
    avatarGrad: "from-indigo-500 to-indigo-700",
    sport: "Swimming",
    sportIcon: <FaSwimmer size={13} />,
    rating: 5,
    quote:
      "Finding a quality pool in Chittagong was a nightmare before SportVerse. Now I book my lane every morning in seconds. The 24/7 support team once helped me reschedule at 11 PM — genuinely impressed.",
    facility: "Olympic Aquatic Centre, CDA",
    date: "1 month ago",
    tag: "Verified Athlete",
  },
  {
    id: 3,
    name: "Arif Hossain",
    role: "Tennis Coach",
    club: "BNTF Certified",
    avatar: "AH",
    avatarGrad: "from-sky-500 to-blue-600",
    sport: "Tennis",
    sportIcon: <GiTennisBall size={13} />,
    rating: 5,
    quote:
      "I manage bookings for 12 students every week. SportVerse's group booking feature saves me hours. The best price guarantee is real — I tested it and they matched a lower rate without hesitation.",
    facility: "National Tennis Complex, Dhaka",
    date: "3 weeks ago",
    tag: "Power User",
  },
  {
    id: 4,
    name: "Sumaiya Begum",
    role: "Basketball Player",
    club: "Rajshahi Tigers",
    avatar: "SB",
    avatarGrad: "from-blue-600 to-indigo-700",
    sport: "Basketball",
    sportIcon: <GiBasketballBall size={13} />,
    rating: 5,
    quote:
      "Our team travels across the country for tournaments. Having SportVerse means we can book courts in any city the night before. 30+ cities covered — it's a game changer for travelling teams.",
    facility: "Rajshahi Sports Arena",
    date: "5 days ago",
    tag: "Team Captain",
  },
  {
    id: 5,
    name: "Tariq Molla",
    role: "Badminton Enthusiast",
    club: "Weekend Warriors",
    avatar: "TM",
    avatarGrad: "from-blue-400 to-blue-600",
    sport: "Badminton",
    sportIcon: <GiShuttlecock size={13} />,
    rating: 5,
    quote:
      "I play every Saturday with 5 friends. The instant confirmation and no hidden fees make SportVerse our go-to. The community reviews helped us find a court we'd never have discovered otherwise.",
    facility: "City Badminton Hall, Sylhet",
    date: "1 week ago",
    tag: "Regular User",
  },
  {
    id: 6,
    name: "Farhan Ahmed",
    role: "Cricket Club Manager",
    club: "Premier XI",
    avatar: "FA",
    avatarGrad: "from-indigo-500 to-blue-700",
    sport: "Cricket",
    sportIcon: <TbTrophy size={13} />,
    rating: 5,
    quote:
      "Managing a cricket club means booking grounds months in advance. SportVerse's calendar view and instant booking make planning a full season effortless. The mobile app works perfectly on match days.",
    facility: "BKSP Cricket Ground, Savar",
    date: "2 months ago",
    tag: "Club Manager",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <MdStar key={i} size={14} className="text-amber-400" />
      ))}
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Large featured card ───────────────────────────────────────────────────────
function FeaturedCard({ t, direction }) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={t.id}
        custom={direction}
        initial={{ opacity: 0, x: direction === 1 ? 60 : -60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction === 1 ? -60 : 60 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 md:p-10"
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />
        {/* Glow */}
        <div className="absolute top-[-40%] right-[-10%] w-[300px] h-[300px] rounded-full bg-blue-700/10 blur-[80px] pointer-events-none" />

        {/* Quote mark */}
        <MdFormatQuote size={56} className="text-blue-600/25 mb-2 -ml-2" />

        {/* Quote text */}
        <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
          &ldquo;{t.quote}&rdquo;
        </p>

        {/* Footer */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.avatarGrad} flex items-center justify-center text-white font-black text-base shadow-lg`}>
              {t.avatar}
            </div>
            <div>
              <p className="text-base font-black text-white">{t.name}</p>
              <p className="text-sm text-gray-400">{t.role} · {t.club}</p>
              <div className="flex items-center gap-2 mt-1">
                <Stars count={t.rating} />
                <span className="text-[10px] text-gray-500">{t.date}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 sm:text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-300 text-[11px] font-bold self-start sm:self-end">
              {t.sportIcon} {t.sport}
            </span>
            <p className="text-[11px] text-gray-500">{t.facility}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Small card (grid) ─────────────────────────────────────────────────────────
function SmallCard({ t, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-blue-500/25 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden"
    >
      {/* Hover bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <Stars count={t.rating} />
        <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wide">{t.date}</span>
      </div>

      {/* Quote */}
      <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* User */}
      <div className="flex items-center gap-3 mt-auto pt-1 border-t border-white/5">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${t.avatarGrad} flex items-center justify-center text-white font-black text-xs shadow-md flex-shrink-0`}>
          {t.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white truncate">{t.name}</p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-500">{t.role}</span>
            <span className="text-gray-700">·</span>
            <span className="flex items-center gap-0.5 text-[10px] text-blue-400 font-medium">
              {t.sportIcon} {t.sport}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setActive((v) => (v + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const goTo = (idx) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };
  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  return (
    <section className="relative bg-gray-950 overflow-hidden py-24 lg:py-32">

      {/* ── Background ── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none">
        <defs>
          <pattern id="t-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#t-grid)" />
      </svg>
      <div className="absolute top-[-8%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-700/12 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[-8%] right-[-5%] w-[420px] h-[420px] rounded-full bg-indigo-700/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <FadeUp delay={0}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-[11px] font-bold tracking-widest uppercase mb-5">
                <HiUsers size={13} />
                What Athletes Say
              </span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2
                className="font-black text-white leading-[0.92] tracking-tighter mt-3"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)" }}
              >
                REAL PEOPLE.
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  REAL RESULTS.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mt-4 text-base text-gray-400 leading-relaxed max-w-lg">
                Over 12,000 athletes trust SportVerse every week. Here what they actually say — unfiltered, unedited.
              </p>
            </FadeUp>
          </div>

          {/* Rating summary */}
          <FadeUp delay={0.3} className="flex-shrink-0">
            <div className="flex items-center gap-5 px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/8">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-white leading-none">4.9</span>
                <Stars count={5} />
                <span className="text-[10px] text-gray-500 mt-1">out of 5</span>
              </div>
              <div className="w-px h-14 bg-white/8" />
              <div className="flex flex-col gap-1.5">
                {[5, 4, 3].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 w-4">{stars}★</span>
                    <div className="w-24 h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                        style={{ width: stars === 5 ? "92%" : stars === 4 ? "6%" : "2%" }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500">
                      {stars === 5 ? "92%" : stars === 4 ? "6%" : "2%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ── Featured carousel ── */}
        <FadeUp delay={0.15} className="mb-6">
          <div className="relative">
            <FeaturedCard t={testimonials[active]} direction={direction} />

            {/* Nav controls */}
            <div className="flex items-center justify-between mt-5">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === active
                        ? "w-7 h-2 bg-blue-500"
                        : "w-2 h-2 bg-white/15 hover:bg-white/30"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrow buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200"
                  aria-label="Previous"
                >
                  <BsArrowLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all duration-200 shadow-lg shadow-blue-600/25"
                  aria-label="Next"
                >
                  <BsArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── All cards grid ── */}
        <div className="mt-12">
          <FadeUp delay={0}>
            <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase mb-5">
              All Reviews
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <SmallCard key={t.id} t={t} index={i} />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <FadeUp delay={0.1} className="mt-14">
          <div className="relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-6 rounded-2xl border border-white/8 bg-white/[0.03]">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent pointer-events-none" />

            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/25 flex items-center justify-center text-blue-400 flex-shrink-0">
                <IoShieldCheckmark size={22} />
              </div>
              <div>
                <p className="text-base font-black text-white">Join 12,000+ happy athletes</p>
                <p className="text-sm text-gray-400">Start booking in under 60 seconds — totally free.</p>
              </div>
            </div>

            <div className="relative flex items-center gap-3 flex-shrink-0">
              <a
                href="/signup"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-blue-600/25 hover:scale-[1.03] active:scale-[0.97]"
              >
                Get Started Free
                <BsArrowRight size={14} className="group-hover:translate-x-0.5" />
              </a>
              <a
                href="/facilities"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all duration-200"
              >
                Browse Venues
              </a>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}