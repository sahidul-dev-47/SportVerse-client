"use client";

import {
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiUser, FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { MdSportsSoccer, MdVerified, MdStar, MdAddPhotoAlternate } from "react-icons/md";
import { IoShieldCheckmark, IoFlash } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";

// ── Animation variants ────────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ── Password strength indicator ───────────────────────────────────────────────
function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /[0-9]/.test(password) },
  ];
  const strength = checks.filter((c) => c.pass).length;
  const colors = ["bg-red-500", "bg-amber-400", "bg-blue-500", "bg-emerald-500"];
  const labels = ["", "Weak", "Fair", "Strong"];

  if (!password) return null;

  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < strength ? colors[strength] : "bg-white/10"
            }`}
          />
        ))}
        {strength > 0 && (
          <span className={`text-[10px] font-bold ml-1 ${
            strength === 1 ? "text-red-400" : strength === 2 ? "text-amber-400" : "text-emerald-400"
          }`}>
            {labels[strength]}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        {checks.map(({ label, pass }) => (
          <span key={label} className={`flex items-center gap-1 text-[10px] font-medium transition-colors ${pass ? "text-emerald-400" : "text-gray-600"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${pass ? "bg-emerald-400" : "bg-gray-700"}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────
function StepDot({ active, done, label, number }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 border
        ${done ? "bg-emerald-500 border-emerald-500 text-white" :
          active ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30" :
          "bg-white/5 border-white/10 text-gray-500"}`}
      >
        {done ? "✓" : number}
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-wide ${active ? "text-blue-400" : done ? "text-emerald-400" : "text-gray-600"}`}>
        {label}
      </span>
    </div>
  );
}

// ── Left panel feature card ───────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div
      animate={{ y: [0, delay % 2 === 0 ? -8 : 8, 0] }}
      transition={{ repeat: Infinity, repeatType: "mirror", duration: 4 + delay, ease: "easeInOut" }}
      className="flex items-start gap-3 px-4 py-3.5 rounded-2xl bg-gray-950/80 border border-white/10 backdrop-blur-xl shadow-xl"
    >
      <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
        {icon}
      </div>
      <div className="leading-none">
        <p className="text-sm font-black text-white">{title}</p>
        <p className="text-[11px] text-gray-400 mt-1 leading-snug">{desc}</p>
      </div>
    </motion.div>
  );
}

// ── Dark input field ──────────────────────────────────────────────────────────
function DarkInput({ icon: Icon, placeholder, className = "" }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      <Input
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200 ${className}`}
      />
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [agreed, setAgreed] = useState(false);

  // const onSubmit = async (e) => { ... };
  // const handleGoogleSignIn = async () => { ... };

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* ══════════════════════════════════════════
          LEFT PANEL
      ══════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[48%] relative overflow-hidden flex-col justify-between p-10">
        {/* Background image */}
        <Image
          src="/sports/basketball.avif"
          alt="Sports facility"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gray-950/75" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-transparent to-gray-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-transparent to-transparent" />
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
          <defs>
            <pattern id="signup-grid" width="52" height="52" patternUnits="userSpaceOnUse">
              <path d="M 52 0 L 0 0 0 52" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#signup-grid)" />
        </svg>
        <div className="absolute top-[-8%] left-[-8%] w-[480px] h-[480px] rounded-full bg-blue-700/20 blur-[100px] pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-xl bg-blue-600 rotate-6 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-xl bg-blue-400 -rotate-3 group-hover:-rotate-6 transition-transform duration-300 opacity-50" />
              <div className="relative z-10 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <MdSportsSoccer size={20} className="text-white" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tight text-white">
                Sport<span className="text-blue-400">Verse</span>
              </span>
              <span className="text-[9px] font-semibold tracking-[0.2em] text-gray-400 uppercase mt-0.5">
                Book · Play · Win
              </span>
            </div>
          </Link>
        </div>

        {/* Middle content */}
        <div className="relative z-10 flex flex-col gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/25 text-blue-300 text-[10px] font-bold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Join SportVerse
            </span>
            <h2
              className="font-black text-white leading-[0.95] tracking-tighter mt-3"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)" }}
            >
              UNLOCK YOUR
              <br />
              <span className="text-blue-400">SPORTS</span>
              <br />
              POTENTIAL.
            </h2>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-sm">
              Join 12,000+ athletes booking premium facilities across 30+ cities. Create your free account today.
            </p>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-3 max-w-xs">
            <FeatureCard
              icon={<IoFlash size={17} />}
              title="Instant Booking"
              desc="Book any facility in under 60 seconds"
              delay={0}
            />
            <FeatureCard
              icon={<MdVerified size={17} />}
              title="Verified Facilities"
              desc="850+ trusted and reviewed venues"
              delay={1}
            />
            <FeatureCard
              icon={<HiUsers size={17} />}
              title="Active Community"
              desc="Connect with 12K+ fellow athletes"
              delay={2}
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-center gap-2">
          <IoShieldCheckmark size={14} className="text-emerald-400" />
          <span className="text-xs text-gray-400">Free forever · No credit card required</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — sign up form
      ══════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center px-5 py-10 bg-gray-950 overflow-y-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-md"
        >

          {/* Mobile logo */}
          <motion.div variants={fadeUp} className="lg:hidden flex items-center gap-3 mb-7 justify-center">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-xl bg-blue-600 rotate-6" />
              <div className="relative z-10 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <MdSportsSoccer size={18} className="text-white" />
              </div>
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Sport<span className="text-blue-400">Verse</span>
            </span>
          </motion.div>

          {/* Header */}
          <motion.div variants={fadeUp} className="mb-7">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-gray-400 mt-1.5">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                Sign in →
              </Link>
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />

            <div className="px-7 pt-8 pb-7 flex flex-col gap-5">

              {/* Google */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group cursor-pointer"
              >
                <FcGoogle size={19} />
                <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                  Sign up with Google
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* Form */}
              <Form className="flex flex-col gap-4">

                {/* Full Name */}
                <TextField isRequired name="name" type="text">
                  <Label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Full Name
                  </Label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <Input
                      placeholder="Please Enter Your Name"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200"
                    />
                  </div>
                  <FieldError className="text-red-400 text-xs mt-1.5" />
                </TextField>

                {/* Email */}
                <TextField
                  isRequired
                  name="email"
                  type="email"
                  validate={(value) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                      return "Please enter a valid email address";
                    return null;
                  }}
                >
                  <Label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Email Address
                  </Label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <Input
                      placeholder="Please Enter Your Email"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200"
                    />
                  </div>
                  <FieldError className="text-red-400 text-xs mt-1.5" />
                </TextField>

                {/* Avatar URL + live preview */}
                <TextField isRequired name="image" type="url">
                  <Label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Profile Photo URL
                  </Label>
                  <div className="flex gap-2.5 items-start">
                    <div className="relative flex-1">
                      <MdAddPhotoAlternate className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      <Input
                        placeholder="https://example.com/photo.jpg"
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200"
                      />
                    </div>
                    {/* Live avatar preview */}
                    <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex-shrink-0 overflow-hidden flex items-center justify-center">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                      ) : (
                        <FiUser size={18} className="text-gray-600" />
                      )}
                    </div>
                  </div>
                  <FieldError className="text-red-400 text-xs mt-1.5" />
                </TextField>

                {/* Password */}
                <TextField
                  isRequired
                  minLength={8}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  validate={(value) => {
                    if (value.length < 8) return "Password must be at least 8 characters";
                    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                    return null;
                  }}
                >
                  <Label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Password
                  </Label>
                  <div className="relative">
                    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <Input
                      placeholder="Min 8 chars, 1 uppercase, 1 number"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-11 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                  <PasswordStrength password={password} />
                  <Description className="text-[11px] text-gray-500 mt-2">
                    At least 8 chars with 1 uppercase and 1 number
                  </Description>
                  <FieldError className="text-red-400 text-xs mt-1.5" />
                </TextField>

                {/* Terms checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group mt-1">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <div
                      onClick={() => setAgreed((v) => !v)}
                      className={`w-4 h-4 rounded border transition-all duration-200 flex items-center justify-center cursor-pointer ${
                        agreed
                          ? "bg-blue-600 border-blue-600"
                          : "bg-white/5 border-white/20 hover:border-white/40"
                      }`}
                    >
                      {agreed && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    I agree to SportVerse&apos;s{" "}
                    <Link href="/terms" className="text-blue-400 hover:text-blue-300 font-semibold">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300 font-semibold">
                      Privacy Policy
                    </Link>
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full mt-1 py-4 rounded-xl text-sm font-black text-white bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 group uppercase tracking-wide"
                >
                  Create My Account
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Form>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                  <IoShieldCheckmark size={12} className="text-emerald-500" />
                  SSL Encrypted
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                  <MdVerified size={12} className="text-blue-500" />
                  Free Forever
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                  <MdStar size={12} className="text-amber-500" />
                  4.9 Rated
                </span>
              </div>

            </div>
          </motion.div>

          {/* Footer */}
          <motion.p variants={fadeUp} className="text-center text-[11px] text-gray-600 mt-5 leading-relaxed">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors">
              Privacy Policy
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
