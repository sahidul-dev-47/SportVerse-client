"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MdSportsSoccer,
  MdHome,
  MdGridView,
  MdCalendarMonth,
  MdAddCircle,
  MdManageAccounts,
  MdLogin,
  MdLogout,
  MdKeyboardArrowDown,
  MdMenu,
  MdClose,
  MdBookmarks,
} from "react-icons/md";

// ── Nav Data ──────────────────────────────────────────────────────────────────
const publicLinks = [
  { label: "Home", href: "/", icon: <MdHome size={19} /> },
  {
    label: "All Facilities",
    href: "/facilities",
    icon: <MdGridView size={19} />,
  },
];

const privateLinks = [
  {
    label: "My Bookings",
    href: "/bookings",
    icon: <MdBookmarks size={19} />,
    private: true,
  },
  {
    label: "Add Facility",
    href: "/facilities/add",
    icon: <MdAddCircle size={19} />,
    private: true,
  },
  {
    label: "Manage My Facilities",
    href: "/facilities/manage",
    icon: <MdManageAccounts size={20} />,
    private: true,
  },
];

// ── Logo ──────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group select-none">
      <div className="relative flex items-center justify-center w-10 h-10">
        <div className="absolute inset-0 rounded-xl bg-blue-600 rotate-6 group-hover:rotate-12 transition-transform duration-300" />
        <div className="absolute inset-0 rounded-xl bg-blue-400 -rotate-3 group-hover:-rotate-6 transition-transform duration-300 opacity-60" />
        <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg">
          <MdSportsSoccer size={22} className="text-white" />
        </div>
      </div>
      <div className="flex flex-col leading-none space-y-2">
        <span className="text-[1.15rem] font-black tracking-tight text-gray-900 dark:text-white">
          Sport<span className="text-blue-600">Verse</span>
        </span>
        <span className="text-[10px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
          Book · Play · Win
        </span>
      </div>
    </Link>
  );
}

// ── Private Badge ─────────────────────────────────────────────────────────────
function PrivateBadge() {
  return (
    <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold tracking-wide bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full uppercase border border-emerald-200 dark:border-emerald-700/40">
      Private
    </span>
  );
}

// ── Profile Dropdown ──────────────────────────────────────────────────────────
function ProfileDropdown({ onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-200"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
          JD
        </div>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 hidden sm:block">
          James D.
        </span>
        <MdKeyboardArrowDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={`absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-hidden z-50 transition-all duration-200 origin-top-right
          ${
            open
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
          }`}
      >
        {/* User card */}
        <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-b border-gray-100 dark:border-white/5">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            JD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
              James Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              james@sportverse.com
            </p>
          </div>
        </div>

        {/* Private nav items */}
        <div className="py-2">
          <p className="px-4 py-1.5 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            My Account
          </p>
          {privateLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 group"
            >
              <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Logout */}
        <div className="border-t border-gray-100 dark:border-white/5 p-2">
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 transition-colors duration-150"
          >
            <MdLogout size={18} />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────
function MobileMenu({ isLoggedIn, activeHref, onNavigate, onLogin, onLogout }) {
  const allLinks = [...publicLinks, ...(isLoggedIn ? privateLinks : [])];

  return (
    <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-white/5">
      <nav className="px-3 pt-3 pb-2 flex flex-col gap-1">
        {allLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => onNavigate(item.href)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${
                activeHref === item.href
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            {item.private && (
              <span className="px-2 py-0.5 text-[9px] font-bold tracking-wide bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full uppercase">
                Private
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="px-3 pb-4 pt-2 border-t border-gray-100 dark:border-white/5 mt-1">
        {isLoggedIn ? (
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                JD
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  James Doe
                </p>
                <p className="text-xs text-gray-400">james@sportverse.com</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            >
              <MdLogout size={16} /> Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors duration-200 shadow-lg shadow-blue-500/25"
          >
            <MdLogin size={18} /> Login to your account
          </button>
        )}
      </div>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeHref, setActiveHref] = useState("/");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const visibleLinks = [...publicLinks, ...(isLoggedIn ? privateLinks : [])];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300
        ${
          scrolled
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/30"
            : "bg-white dark:bg-gray-950"
        }
        border-b border-gray-200 dark:border-white/[0.07]`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[68px] gap-6">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {visibleLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setActiveHref(item.href)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${
                    activeHref === item.href
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
              >
                {item.icon}
                {item.label}
                {item.private && <PrivateBadge />}
              </Link>
            ))}
          </nav>

          {/* Right: Auth */}
          <div className="flex items-center gap-3 ml-auto">
            {isLoggedIn ? (
              <ProfileDropdown onLogout={() => setIsLoggedIn(false)} />
            ) : (
              <>
                <Link href={'/signin'}>
                  <button
                    onClick={() => setIsLoggedIn(true)}
                    className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-sm font-bold transition-all duration-200 shadow-md shadow-blue-500/25"
                  >
                    <MdLogin size={18} />
                    LogIn
                  </button>
                </Link>

                <Link href={"/signup"}>
                  {" "}
                  <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl text-sm font-bold transition-all duration-200 shadow-md shadow-blue-500/25">
                    SignUp
                  </button>
                </Link>
              </>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <MobileMenu
          isLoggedIn={isLoggedIn}
          activeHref={activeHref}
          onNavigate={(href) => {
            setActiveHref(href);
            setMobileOpen(false);
          }}
          onLogin={() => {
            setIsLoggedIn(true);
            setMobileOpen(false);
          }}
          onLogout={() => {
            setIsLoggedIn(false);
            setMobileOpen(false);
          }}
        />
      </div>
    </header>
  );
}
