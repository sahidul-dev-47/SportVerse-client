"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  MdCalendarMonth, MdAccessTime, MdAttachMoney,
  MdLocationOn, MdSportsSoccer, MdCancel,
  MdCheckCircle, MdHourglassEmpty, MdClose,
  MdWarning, MdArrowForward, MdBookmark, MdTimer,
} from "react-icons/md";
import { IoFlash, IoShieldCheckmark } from "react-icons/io5";
import { authClient } from "@/lib/auth-client";

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS = {
  pending: {
    label:  "Pending",
    icon:   <MdHourglassEmpty size={13} />,
    cls:    "bg-amber-500/15 border-amber-500/30 text-amber-300",
    dotCls: "bg-amber-400",
  },
  confirmed: {
    label:  "Confirmed",
    icon:   <MdCheckCircle size={13} />,
    cls:    "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    dotCls: "bg-emerald-400",
  },
  cancelled: {
    label:  "Cancelled",
    icon:   <MdCancel size={13} />,
    cls:    "bg-red-500/15 border-red-500/30 text-red-400",
    dotCls: "bg-red-400",
  },
};

const toastStyle = {
  background: "#111827",
  color:      "#fff",
  border:     "1px solid rgba(255,255,255,0.08)",
};

function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      weekday: "short", day: "numeric", month: "long", year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ── Cancel Modal ──────────────────────────────────────────────────────────────

function CancelModal({ booking, onClose, onCancelled }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${booking._id}`,
        {
          method:  "DELETE",
          headers: {
            "Content-Type":  "application/json",
            "authorization": `Bearer ${tokenData?.token || ""}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Cancel failed");
      }

      toast.success("Booking cancelled.", {
        style:     { ...toastStyle, border: "1px solid rgba(239,68,68,0.3)" },
        iconTheme: { primary: "#ef4444", secondary: "#111827" },
      });

      onCancelled(booking._id);
    } catch (err) {
      toast.error(err.message || "Failed to cancel. Try again.", {
        style: toastStyle,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={{ opacity: 1, scale: 1,   y: 0  }}
        exit={{   opacity: 0, scale: 0.92, y: 12 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-sm rounded-2xl bg-gray-900 border border-red-500/20 overflow-hidden shadow-2xl shadow-black/60">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 to-red-400" />

          <div className="p-6 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center flex-shrink-0">
                  <MdWarning size={22} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Cancel Booking?</h3>
                  <p className="text-xs text-gray-400 mt-0.5">This cannot be undone.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all flex-shrink-0"
              >
                <MdClose size={15} />
              </button>
            </div>

            {/* Booking summary */}
            <div className="rounded-xl bg-white/5 border border-white/8 divide-y divide-white/5 overflow-hidden">
              {[
                { icon: <MdSportsSoccer size={13} />, label: "Facility", value: booking.facilityName },
                { icon: <MdCalendarMonth size={13} />, label: "Date",    value: formatDate(booking.bookingDate) },
                { icon: <MdAccessTime size={13} />,   label: "Slot",    value: booking.timeSlot },
                { icon: <MdAttachMoney size={13} />,  label: "Total",   value: `$${Number(booking.totalPrice).toLocaleString()}` },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center justify-between px-4 py-2.5">
                  <div className="flex items-center gap-1.5 text-gray-500 flex-shrink-0">
                    <span className="text-blue-400">{icon}</span>
                    <span className="text-xs">{label}</span>
                  </div>
                  <span className="text-xs text-white font-semibold truncate ml-3 max-w-[55%] text-right">{value}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all"
              >
                Keep it
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white text-sm font-black transition-all shadow-lg shadow-red-600/20"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Cancelling…</>
                ) : (
                  <><MdCancel size={16} /> Yes, Cancel</>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ── Booking Card ──────────────────────────────────────────────────────────────

function BookingCard({ booking, onCancel }) {
  const [imgError, setImgError] = useState(false);
  const status    = STATUS[booking.status] || STATUS.pending;
  const canCancel = booking.status !== "cancelled";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0  }}
      exit={{   opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col rounded-2xl overflow-hidden border shadow-xl shadow-black/30 transition-colors duration-300 ${
        booking.status === "cancelled"
          ? "bg-white/[0.02] border-white/5 opacity-60"
          : "bg-white/[0.04] border-white/10 hover:border-blue-500/30"
      }`}
    >
      {booking.status !== "cancelled" && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />
      )}

      {/* Image */}
      <div className="relative w-full h-36 overflow-hidden bg-gray-900 flex-shrink-0">
        {!imgError && booking.facilityImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={booking.facilityImage}
            alt={booking.facilityName}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MdSportsSoccer size={36} className="text-gray-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />

        {booking.facilityType && (
          <div className="absolute top-2.5 left-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-950/80 border border-white/15 backdrop-blur-md text-white text-[10px] font-bold">
              <IoFlash size={9} className="text-blue-400" />
              {booking.facilityType}
            </span>
          </div>
        )}

        <div className="absolute top-2.5 right-2.5">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold backdrop-blur-md ${status.cls}`}>
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${status.dotCls} ${booking.status === "pending" ? "animate-pulse" : ""}`} />
            {status.label}
          </span>
        </div>

        <div className="absolute bottom-2.5 left-2.5">
          <div className="flex items-baseline gap-1 px-2.5 py-1 rounded-lg bg-blue-600 shadow-md">
            <span className="text-white font-black text-sm">${Number(booking.totalPrice).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3.5 p-4 flex-1">
        <h3 className="text-sm font-black text-white leading-tight tracking-tight line-clamp-1">
          {booking.facilityName}
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: <MdCalendarMonth size={13} />, value: formatDate(booking.bookingDate) },
            { icon: <MdAccessTime size={13} />,    value: booking.timeSlot },
            { icon: <MdTimer size={13} />,         value: `${booking.hours} hr${booking.hours > 1 ? "s" : ""}` },
            { icon: <MdLocationOn size={13} />,    value: booking.location || "—" },
          ].map(({ icon, value }, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-blue-400 flex-shrink-0">{icon}</span>
              <span className="text-[11px] text-gray-400 truncate">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/3 border border-white/5">
          <MdBookmark size={12} className="text-gray-600 flex-shrink-0" />
          <span className="text-[10px] text-gray-600 font-mono truncate">
            #{String(booking._id).slice(-8).toUpperCase()}
          </span>
        </div>

        <div className="h-px bg-white/5" />

        {canCancel ? (
          <button
            type="button"
            onClick={() => onCancel(booking)}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 text-red-400 hover:text-red-300 text-xs font-bold transition-all duration-200"
          >
            <MdCancel size={14} /> Cancel Booking
          </button>
        ) : (
          <div className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-white/3 border border-white/5 text-gray-600 text-xs font-semibold">
            <MdCancel size={14} /> Booking Cancelled
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────

function StatsBar({ bookings }) {
  const total      = bookings.length;
  const pending    = bookings.filter((b) => b.status === "pending").length;
  const confirmed  = bookings.filter((b) => b.status === "confirmed").length;
  const totalSpent = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((s, b) => s + Number(b.totalPrice || 0), 0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {[
        { label: "Total",     value: total,                              icon: <MdBookmark size={18} />,       bg: "bg-blue-600/15 border-blue-500/20",       color: "text-blue-400"    },
        { label: "Pending",   value: pending,                            icon: <MdHourglassEmpty size={18} />, bg: "bg-amber-500/15 border-amber-500/20",     color: "text-amber-400"   },
        { label: "Confirmed", value: confirmed,                          icon: <MdCheckCircle size={18} />,    bg: "bg-emerald-500/15 border-emerald-500/20", color: "text-emerald-400" },
        { label: "Spent",     value: `$${totalSpent.toLocaleString()}`, icon: <MdAttachMoney size={18} />,    bg: "bg-blue-600/15 border-blue-500/20",       color: "text-blue-400"    },
      ].map(({ label, value, icon, bg, color }) => (
        <div key={label} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border ${bg}`}>
          <span className={`${color} flex-shrink-0`}>{icon}</span>
          <div className="leading-none min-w-0">
            <p className="text-lg font-black text-white truncate">{value}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4 gap-5">
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
        <MdBookmark size={36} className="text-gray-600" />
      </div>
      <div>
        <h3 className="text-xl font-black text-white">No bookings yet</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">
          You have not booked any facilities yet. Find one and reserve your slot!
        </p>
      </div>
      <Link
        href="/all-facilities"
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/25"
      >
        Browse Facilities <MdArrowForward size={16} />
      </Link>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────

export default function MyBookingCard({ bookings: initial = [], userEmail }) {
  const [bookings, setBookings] = useState(initial);
  const [cancelling, setCancelling] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setBookings(initial);
  }, [initial]);

  const handleCancelled = (id) => {
    setBookings((prev) =>
      prev.map((b) => b._id === id ? { ...b, status: "cancelled" } : b)
    );
    setCancelling(null);
  };

  const filtered = filter === "all"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const counts = {
    all:       bookings.length,
    pending:   bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster position="top-right" />

      {/* Background */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden>
        <defs>
          <pattern id="mb-grid" width="52" height="52" patternUnits="userSpaceOnUse">
            <path d="M 52 0 L 0 0 0 52" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mb-grid)" />
      </svg>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-700/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-3">
              <IoFlash size={11} /> SportVerse
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">My Bookings</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-black">
                {userEmail?.[0]?.toUpperCase() ?? "U"}
              </div>
              <span className="text-xs text-gray-500">{userEmail}</span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-600/15 border border-blue-500/20 text-blue-400 text-[9px] font-bold">
                <IoShieldCheckmark size={10} /> Only you can see this
              </span>
            </div>
          </div>

          <Link
            href="/all-facilities"
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/25 flex-shrink-0"
          >
            Browse Facilities <MdArrowForward size={16} />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <StatsBar bookings={bookings} />

            {/* Filter tabs */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {["all", "pending", "confirmed", "cancelled"].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold capitalize transition-all duration-200 ${
                    filter === key
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {key}
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${filter === key ? "bg-white/20 text-white" : "bg-white/8 text-gray-500"}`}>
                    {counts[key]}
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-16 text-gray-500 text-sm"
                >
                  No {filter} bookings found.
                </motion.p>
              ) : (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filtered.map((booking) => (
                    <BookingCard
                      key={booking._id}
                      booking={booking}
                      onCancel={setCancelling}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Cancel modal */}
      <AnimatePresence>
        {cancelling && (
          <CancelModal
            key="cancel"
            booking={cancelling}
            onClose={() => setCancelling(null)}
            onCancelled={handleCancelled}
          />
        )}
      </AnimatePresence>
    </div>
  );
}