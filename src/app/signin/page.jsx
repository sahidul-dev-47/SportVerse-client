"use client";

import {
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Description,
} from "@heroui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { MdSportsSoccer, MdVerified, MdStar } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

// ── Animation variants ────────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ── Floating stat card ────────────────────────────────────────────────────────
function StatCard({ icon, value, label, className }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-950/80 border border-white/10 backdrop-blur-xl shadow-xl ${className}`}
    >
      <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
        {icon}
      </div>
      <div className="leading-none">
        <p className="text-base font-black text-white">{value}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
const SignInPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  
  const onSubmit = async (e) => {
    e.preventDefault();

   
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const { data, error } = await authClient.signIn.email({
        email: email,
        password: password,
      });

      if (data) {
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Successfully logged in!");
        
       
        window.location.href = "/";
      }
      
      if (error) {
        toast.error("Sign in failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 flex">

      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-10">
        {/* Background image */}
        <Image
          src="/sports/football 2.avif"
          alt="Sports facility"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gray-950/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-transparent to-gray-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-transparent" />
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.045] pointer-events-none">
          <defs>
            <pattern id="signin-grid" width="52" height="52" patternUnits="userSpaceOnUse">
              <path d="M 52 0 L 0 0 0 52" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#signin-grid)" />
        </svg>
        {/* Blue glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-700/20 blur-[100px] pointer-events-none" />

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10">
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

        {/* Middle: Hero text */}
        <div className="relative z-10 flex flex-col gap-5">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/25 text-blue-300 text-[10px] font-bold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Welcome Back
            </span>
            <h2
              className="font-black text-white leading-[0.95] tracking-tighter mt-3"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)" }}
            >
              YOUR NEXT
              <br />
              <span className="text-blue-400">GAME</span>
              <br />
              STARTS HERE.
            </h2>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-sm">
              Sign in to access your bookings, manage facilities, and discover the best sports arenas near you.
            </p>
          </div>

          {/* Floating stat cards */}
          <div className="flex flex-col gap-3 max-w-xs">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 4, ease: "easeInOut" }}
            >
              <StatCard
                icon={<MdVerified size={17} />}
                value="850+"
                label="Verified Facilities"
              />
            </motion.div>
            <motion.div
              animate={{ y: 0}}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 5, ease: "easeInOut" }}
            >
              <StatCard
                icon={<MdStar size={17} />}
                value="4.9 ★"
                label="Average Rating"
                className="ml-8"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 4.5, ease: "easeInOut" }}
            >
              <StatCard
                icon={<IoShieldCheckmark size={17} />}
                value="12K+"
                label="Happy Athletes"
                className="ml-4"
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom: trust note */}
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <IoShieldCheckmark size={14} className="text-emerald-400" />
            <span className="text-xs text-gray-400">SSL Secured · Your data is 100% safe</span>
          </div>
        </div>
      </div>

    
          {/* RIGHT PANEL — sign in form */}
  
      <div className="flex-1 flex items-center justify-center px-5 py-12 bg-gray-950">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-md"
        >

          {/* Mobile logo */}
          <motion.div variants={fadeUp} className="lg:hidden flex items-center gap-3 mb-8 justify-center">
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
          <motion.div variants={fadeUp} className="mb-8">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Sign In
            </h1>
            <p className="text-sm text-gray-400 mt-1.5">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
              >
                Create one free →
              </Link>
            </p>
          </motion.div>

          {/* Card */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />

            <div className="px-7 pt-8 pb-7 flex flex-col gap-5">

              {/* Google button */}
              <button
              onClick={handleGoogleSignIn}
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group cursor-pointer"
              >
                <FcGoogle size={19} />
                <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                  Continue with Google
                </span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* Form */}
              <Form onSubmit={onSubmit} className="flex flex-col gap-4">

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
                  <div className="flex items-center justify-between mb-2">
                    <Label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <Input
                      placeholder="Min 8 chars, 1 uppercase, 1 number"
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
                  <Description className="text-[11px] text-gray-500 mt-1.5">
                    At least 8 chars with 1 uppercase and 1 number
                  </Description>
                  <FieldError className="text-red-400 text-xs mt-1.5" />
                </TextField>

                {/* Remember me */}
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all duration-200 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white hidden peer-checked:block" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    Remember me for 30 days
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full mt-1 py-4 rounded-xl text-sm font-black text-white bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 group uppercase tracking-wide"
                >
                  Sign In to SportVerse
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Form>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                  <IoShieldCheckmark size={12} className="text-emerald-500" />
                  SSL Encrypted
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                  <MdVerified size={12} className="text-blue-500" />
                  Verified Platform
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
          <motion.p variants={fadeUp} className="text-center text-[11px] text-gray-600 mt-6 leading-relaxed">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-gray-400 hover:text-white underline underline-offset-2 transition-colors">
              Terms of Service
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

export default SignInPage;