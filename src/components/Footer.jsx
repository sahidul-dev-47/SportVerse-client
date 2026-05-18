"use client";

import Link from "next/link";
import { useState } from "react";

// react-icons
import { MdSportsSoccer, MdLocationOn, MdPhone, MdEmail, MdSend, MdArrowOutward, MdCheckCircle, MdPerson, MdSubject, MdMessage } from "react-icons/md";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { IoShieldCheckmark, IoFlash } from "react-icons/io5";
import { HiStar } from "react-icons/hi2";
import { RiCustomerService2Line } from "react-icons/ri";
import { BsApple, BsGooglePlay } from "react-icons/bs";

// ── Footer nav links ──────────────────────────────────────────────────────────
const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "All Facilities", href: "/facilities" },
      { label: "Football Pitches", href: "/facilities/football" },
      { label: "Basketball Courts", href: "/facilities/basketball" },
      { label: "Swimming Pools", href: "/facilities/swimming" },
      { label: "Tennis Courts", href: "/facilities/tennis" },
      { label: "Gym & Fitness", href: "/facilities/gym" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Bookings", href: "/bookings" },
      { label: "Add Facility", href: "/facilities/add" },
      { label: "Manage Facilities", href: "/facilities/manage" },
      { label: "Profile Settings", href: "/profile" },
      { label: "Notifications", href: "/notifications" },
      { label: "Payment History", href: "/payments" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Become a Partner", href: "/partner" },
      { label: "Blog & News", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press Kit", href: "/press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refunds" },
    ],
  },
];

const socialLinks = [
  {
    icon: <FaFacebookF size={18} />,
    href: "https://www.facebook.com/share/1Crv2dnkoD/",
    label: "Facebook",
    hoverClass: "hover:bg-blue-600 hover:border-blue-500",
    hoverText: "hover:text-white",
  },
  {
    icon: <FaLinkedinIn size={18} />,
    href: "https://www.linkedin.com/in/sahidul-islam-",
    label: "LinkedIn",
    hoverClass: "hover:bg-blue-700 hover:border-blue-600",
    hoverText: "hover:text-white",
  },
  {
    icon: <FaGithub size={18} />,
    href: "https://github.com/sahidul-dev-47",
    label: "GitHub",
    hoverClass: "hover:bg-gray-700 hover:border-gray-600",
    hoverText: "hover:text-white",
  },
];

const stats = [
  { value: "12K+", label: "Active Users", icon: <HiStar size={20} /> },
  { value: "850+", label: "Facilities Listed", icon: <IoFlash size={20} /> },
  { value: "98%", label: "Satisfaction Rate", icon: <IoShieldCheckmark size={20} /> },
  { value: "24/7", label: "Support Available", icon: <RiCustomerService2Line size={20} /> },
];

// ── Input field component ─────────────────────────────────────────────────────
function FormField({ icon, label, id, type = "text", placeholder, value, onChange, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
        <span className="text-blue-400">{icon}</span>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200"
      />
    </div>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Replace this with your actual email sending logic (e.g. EmailJS, Resend, Nodemailer API route)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />

      <div className="p-7 md:p-8">
        {/* Header */}
        <div className="mb-7">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full uppercase mb-3">
            <MdEmail size={11} /> Send a Message
          </span>
          <h3 className="text-2xl font-black text-white">Get in touch</h3>
          <p className="text-sm text-gray-400 mt-1">
            Have a question or want to partner with us? We reply within 24 hours.
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <MdCheckCircle size={34} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-lg font-black text-white">Message Sent!</p>
              <p className="text-sm text-gray-400 mt-1">Thanks {form.name.split(" ")[0] || "there"}, we&apos;ll get back to you soon.</p>
            </div>
            <button
              onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
              className="mt-2 text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                icon={<MdPerson size={13} />}
                label="Your Name"
                id="contact-name"
                placeholder="Enter Your Name"
                value={form.name}
                onChange={handleChange("name")}
                required
              />
              <FormField
                icon={<MdEmail size={13} />}
                label="Email Address"
                id="contact-email"
                type="email"
                placeholder="Enter Your Email"
                value={form.email}
                onChange={handleChange("email")}
                required
              />
            </div>

            {/* Subject */}
            <FormField
              icon={<MdSubject size={13} />}
              label="Subject"
              id="contact-subject"
              placeholder="How can we help you?"
              value={form.subject}
              onChange={handleChange("subject")}
              required
            />

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-blue-400"><MdMessage size={13} /></span>
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Tell us more about your enquiry..."
                value={form.message}
                onChange={handleChange("message")}
                required
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2.5 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-600/25 mt-1"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <MdSend size={17} />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Newsletter ────────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-7">
      {/* Decorative blobs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative z-10">
        <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-blue-200 bg-white/10 rounded-full uppercase mb-4">
          Newsletter
        </span>
        <h3 className="text-xl font-black text-white mb-2">Stay in the game.</h3>
        <p className="text-sm text-blue-200 mb-6 leading-relaxed">
          Get the latest facility drops, exclusive deals, and sports news delivered straight to your inbox. No spam, ever.
        </p>

        {subscribed ? (
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-3.5 rounded-xl">
            <MdCheckCircle size={20} className="text-emerald-300 flex-shrink-0" />
            You&apos;re in! Welcome to SportVerse.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-5 py-4 rounded-xl bg-white/10 text-white placeholder-blue-300 text-sm border border-white/20 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all duration-200"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-4 bg-white text-blue-700 text-sm font-black rounded-xl hover:bg-blue-50 active:scale-[0.98] transition-all duration-200 shadow-lg"
            >
              <MdSend size={16} />
              Subscribe Now
            </button>
          </form>
        )}

        <p className="text-[11px] text-blue-300/70 mt-3 text-center">
          Join 12,000+ sports lovers. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}


// ── Main Footer ───────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">

      {/* ── Stats bar ── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:bg-blue-600/25 transition-colors duration-200">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl font-black text-white leading-none">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact form + Newsletter section ── */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact form — takes more space */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            {/* Newsletter + App stacked */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <Newsletter />
            </div>
          </div>
        </div>
      </div>

      {/* ── Links + Brand section ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Brand + contact info + social */}
          <div className="lg:col-span-3 flex flex-col gap-7">
            {/* Logo */}
            <div>
              <Link href="/" className="flex items-center gap-3 group w-fit">
                <div className="relative flex items-center justify-center w-11 h-11">
                  <div className="absolute inset-0 rounded-xl bg-blue-600 rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-xl bg-blue-400 -rotate-3 group-hover:-rotate-6 transition-transform duration-300 opacity-50" />
                  <div className="relative z-10 w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <MdSportsSoccer size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-black tracking-tight">
                    Sport<span className="text-blue-500">Verse</span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-gray-500 uppercase mt-0.5">
                    Book · Play · Win
                  </span>
                </div>
              </Link>
              <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                Your all-in-one sports facility booking platform. Find, book, and enjoy top-rated courts, pitches, gyms, and more — all in one place.
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Contact</p>
              <a href="maito:sahidulx47@gmail.com" className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors group">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-colors flex-shrink-0">
                  <MdEmail size={15} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                </span>
               sahidulx47@gmail.com
              </a>
              <a href="tel:+8801700000000" className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors group">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-colors flex-shrink-0">
                  <MdPhone size={15} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                </span>
             +8801624698738
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MdLocationOn size={15} className="text-gray-400" />
                </span>
                <span className="leading-relaxed">Chandpur, Chittagong<br />Bangladesh</span>
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${s.hoverClass} ${s.hoverText} transition-all duration-200`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav link columns */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4">
                  {group.title}
                </p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-150 inline-block hover:translate-x-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            <p className="text-xs text-gray-500 text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="text-gray-300 font-semibold">SportVerse</span>. All rights reserved. Made with ❤️ in Bangladesh.
            </p>

            <div className="flex items-center gap-1 flex-wrap justify-center">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i, arr) => (
                <span key={item} className="flex items-center">
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1"
                  >
                    {item}
                  </Link>
                  {i < arr.length - 1 && <span className="text-gray-700 select-none">·</span>}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-400">
                <IoShieldCheckmark size={13} className="text-emerald-400" /> SSL Secured
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-400">
                <IoFlash size={13} className="text-yellow-400" /> Fast Booking
              </span>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}