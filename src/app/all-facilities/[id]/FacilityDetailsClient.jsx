"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  MdLocationOn,
  MdPeople,
  MdEmail,
  MdVerified,
  MdStar,
  MdAccessTime,
  MdArrowBack,
  MdCalendarMonth,
  MdAttachMoney,
  MdCheckCircle,
  MdSportsSoccer,
  MdTimer,
  MdBookmark,
  MdArrowForward,
  MdClose,
} from "react-icons/md";
import { IoFlash, IoShieldCheckmark } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { form } from "framer-motion/client";

function Stars({ rating = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <MdStar
          key={i}
          size={15}
          className={
            i < Math.round(rating) ? "text-amber-400" : "text-gray-700"
          }
        />
      ))}
    </div>
  );
}

function InfoChip({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/8">
      <span className="text-blue-400 flex-shrink-0">{icon}</span>
      <div className="leading-none">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold mb-0.5">
          {label}
        </p>
        <p className="text-sm text-white font-semibold">{value}</p>
      </div>
    </div>
  );
}

function BookingPanel({ facility, onClose, onSuccess }) {
  const {
    _id,
    facilityName,
    availableTimeSlots = [],
    pricePerHour,
    ownerEmail,
  } = facility || {};

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [hours, setHours] = useState(1);
  const [loading, setLoading] = useState(false);

 const [today, setToday] = useState("");

 useEffect(() => {
    const formattedDate = new Date().toISOString().split("T")[0];
    setToday(formattedDate);
  },[]);

 const totalPrice = Number(pricePerHour)*hours;

  const ts = {
    background: "#111827",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  const handleBook = async () => {
    if (!name.trim()) {
      toast.error("Enter your name.", { style: ts });
      return;
    }
    if (!date) {
      toast.error("Select a booking date.", { style: ts });
      return;
    }
    if (!slot) {
      toast.error("Select a time slot.", { style: ts });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            facilityId: _id,
            facilityName,
            ownerEmail,
            customerName: name,
            bookingDate: date,
            timeSlot: slot,
            hours,
            totalPrice,
            status: "pending",
          }),
        },
      );

      if (!res.ok) throw new Error();

      toast.success("Booking confirmed! 🎉", {
        style: { ...ts, border: "1px solid rgba(34,197,94,0.3)" },
        iconTheme: { primary: "#22c55e", secondary: "#111827" },
        duration: 4000,
      });

      onSuccess({ facilityName, date, slot, hours, totalPrice });
    } catch {
      toast.error("Booking failed. Try again.", {
        style: { ...ts, border: "1px solid rgba(239,68,68,0.3)" },
      });
    } finally {
      setLoading(false);
    }
  };

  const inp =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm " +
    "placeholder-gray-600 outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200";

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-2xl bg-gray-900 border border-white/10 overflow-hidden shadow-2xl shadow-black/50"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />

      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">
            <IoFlash size={10} /> Book Now
          </span>
          <h3 className="text-lg font-black text-white tracking-tight">
            Reserve Your Slot
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
            {facilityName}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200"
        >
          <MdClose size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-5 p-6 overflow-y-auto">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Your Name
          </label>
          <div className="relative">
            <FiUser
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              size={15}
            />
            <input
              type="text"
              className={`${inp} pl-10`}
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Facility
          </label>
          <div className="relative">
            <MdSportsSoccer
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              size={15}
            />
            <input
              type="text"
              readOnly
              value={facilityName}
              className={`${inp} pl-10 cursor-not-allowed opacity-60`}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Booking Date
          </label>
          <div className="relative">
            <MdCalendarMonth
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              size={15}
            />
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${inp} pl-10 [color-scheme:dark]`}
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
            Time Slot
          </label>
          {availableTimeSlots.length === 0 ? (
            <p className="text-xs text-gray-500 px-4 py-3 rounded-xl bg-white/5 border border-white/8">
              No slots available for this facility.
            </p>
          ) : (
            <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-0.5">
              {availableTimeSlots.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(s)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all duration-200 ${
                    slot === s
                      ? "bg-blue-600/15 border-blue-500/50 text-blue-300"
                      : "bg-white/3 border-white/8 text-gray-400 hover:border-white/20 hover:text-gray-200"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${slot === s ? "bg-blue-600 border-blue-600" : "border-white/20"}`}
                  >
                    {slot === s && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <BsClockHistory
                    size={13}
                    className={slot === s ? "text-blue-400" : "text-gray-600"}
                  />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Duration
            </label>
            <span className="text-xs font-bold text-blue-400">
              {hours} hr{hours > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setHours((h) => Math.max(1, h - 1))}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center text-lg font-bold transition-all flex-shrink-0"
            >
              −
            </button>
            <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-200"
                style={{ width: `${(hours / 8) * 100}%` }}
              />
            </div>
            <button
              type="button"
              onClick={() => setHours((h) => Math.min(8, h + 1))}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center text-lg font-bold transition-all flex-shrink-0"
            >
              +
            </button>
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-gray-600">1 hr min</span>
            <span className="text-[10px] text-gray-600">8 hrs max</span>
          </div>
        </div>

        <div className="rounded-xl bg-blue-600/10 border border-blue-500/20 p-4">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-gray-400">Rate</span>
            <span className="text-xs text-gray-300">
              ${Number(pricePerHour).toLocaleString()} × {hours} hr
              {hours > 1 ? "s" : ""}
            </span>
          </div>
          <div className="h-px bg-white/8 mb-3" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-white">Total Price</span>
            <span className="text-xl font-black text-blue-300">
              ${totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleBook}
          className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-black uppercase tracking-wide transition-all duration-200 shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Confirming…
            </>
          ) : (
            <>
              <MdBookmark size={17} />
              Confirm Booking
              <MdArrowForward size={15} />
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-gray-600 flex items-center justify-center gap-1.5">
          <IoShieldCheckmark size={12} className="text-emerald-500" />
          Secure booking · Instant confirmation
        </p>
      </div>
    </motion.div>
  );
}

function SuccessCard({ booking, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl bg-gray-900 border border-emerald-500/20 overflow-hidden p-6"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-teal-500" />
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <MdCheckCircle size={36} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-xl font-black text-white">Booking Confirmed!</h3>
          <p className="text-sm text-gray-400 mt-1">
            Your slot has been reserved.
          </p>
        </div>
        <div className="w-full rounded-xl bg-white/5 border border-white/8 divide-y divide-white/5 overflow-hidden text-left">
          {[
            { label: "Facility", value: booking.facilityName },
            {
              label: "Date",
              value: new Date(booking.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            },
            { label: "Slot", value: booking.slot },
            {
              label: "Duration",
              value: `${booking.hours} hr${booking.hours > 1 ? "s" : ""}`,
            },
            {
              label: "Total",
              value: `$${booking.totalPrice.toLocaleString()}`,
            },
            { label: "Status", value: "⏳ Pending" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-2.5"
            >
              <span className="text-xs text-gray-500">{label}</span>
              <span className="text-xs text-white font-semibold">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 w-full">
          <Link
            href="/all-facilities"
            className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold text-center transition-all"
          >
            Browse More
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-all"
          >
            Book Again
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FacilityDetailsClient({ facility }) {
  const {
    facilityName = "",
    facilityType = "",
    image = "",
    location = "",
    pricePerHour = 0,
    capacity = 0,
    availableTimeSlots = [],
    description = "",
    ownerEmail = "",
    rating = 4.5,
    reviews = 0,
    verified = false,
  } = facility || {};

  const [showForm, setShowForm] = useState(false);
  const [booking, setBooking] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster position="top-right" />

      <div className="relative w-full h-[45vh] md:h-[55vh] lg:h-[60vh] overflow-hidden bg-gray-900">
        {!imgError && image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={facilityName}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {!imgLoaded && !imgError && image && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}

        {(imgError || !image) && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <MdSportsSoccer size={80} className="text-gray-800" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 to-transparent" />

        <div className="absolute top-4 left-4 z-10">
          <Link
            href="/all-facilities"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-950/70 border border-white/15 backdrop-blur-md text-white text-sm font-semibold hover:bg-gray-900/80 transition-all"
          >
            <MdArrowBack size={16} /> All Facilities
          </Link>
        </div>

        <div className="absolute top-4 right-4 z-10 flex items-center gap-2 flex-wrap justify-end">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-950/80 border border-white/15 backdrop-blur-md text-white text-[11px] font-bold">
            <IoFlash size={11} className="text-blue-400" />
            {facilityType}
          </span>
          {verified && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-md text-emerald-300 text-[11px] font-bold">
              <MdVerified size={12} /> Verified
            </span>
          )}
        </div>

        <div className="absolute bottom-6 left-4 md:left-8 z-10">
          <div className="flex items-baseline gap-1.5 px-4 py-2 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/40">
            <span className="text-white font-black text-xl leading-none">
              ${Number(pricePerHour).toLocaleString()}
            </span>
            <span className="text-blue-200 text-xs font-medium">/hour</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 xl:gap-12">
          <div className="flex flex-col gap-8">
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                    {facilityName}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <MdLocationOn size={16} className="text-blue-400" />
                    <span className="text-gray-400 text-sm">{location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
                  <Stars rating={rating} />
                  <span className="text-xs text-gray-500">
                    <span className="text-white font-bold">{rating}</span> / 5
                    {reviews > 0 && ` · ${reviews} reviews`}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                {
                  icon: <MdPeople size={18} />,
                  label: "Capacity",
                  value: `${capacity} players`,
                },
                {
                  icon: <MdAttachMoney size={18} />,
                  label: "Price",
                  value: `$${Number(pricePerHour).toLocaleString()}/hr`,
                },
                {
                  icon: <MdTimer size={18} />,
                  label: "Slots",
                  value: `${availableTimeSlots.length} available`,
                },
                {
                  icon: <MdEmail size={18} />,
                  label: "Contact",
                  value: "Email owner",
                },
              ].map(({ icon, label, value }) => (
                <motion.div key={label} variants={fadeUp}>
                  <InfoChip icon={icon} label={label} value={value} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-3"
            >
              <h2 className="text-lg font-black text-white tracking-tight">
                About this Facility
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-3"
            >
              <h2 className="text-lg font-black text-white tracking-tight">
                Available Time Slots
              </h2>
              <div className="flex flex-wrap gap-2">
                {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((s) => (
                    <span
                      key={s}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-300 text-xs font-semibold"
                    >
                      <MdAccessTime size={13} /> {s}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No slots listed for this facility.
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 w-full overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {ownerEmail?.charAt(0)?.toUpperCase() || "O"}
                </div>

                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Facility Owner
                  </p>

                  <p className="text-sm font-semibold text-blue-400 break-all leading-relaxed">
                    {ownerEmail || "No email provided"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!ownerEmail) {
                      alert("No owner email found");
                      return;
                    }

                    const mailUrl = `mailto:${ownerEmail}?subject=${encodeURIComponent(
                      `Inquiry about ${facilityName || "Facility"}`,
                    )}`;

                    window.open(mailUrl, "_self");
                  }}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold transition-all duration-300 flex-shrink-0"
                >
                  <MdEmail size={14} className="text-blue-400" />
                  <span>Contact</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="lg:hidden"
            >
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-wide transition-all shadow-lg shadow-blue-600/25"
              >
                <MdBookmark size={18} /> Book This Facility
              </button>
            </motion.div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-8">
              <AnimatePresence mode="wait">
                {booking ? (
                  <SuccessCard
                    key="success"
                    booking={booking}
                    onReset={() => setBooking(null)}
                  />
                ) : (
                  <BookingPanel
                    key="form"
                    facility={facility}
                    onClose={() => {}}
                    onSuccess={(b) => setBooking(b)}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showForm && !booking && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden max-h-[92vh] overflow-y-auto rounded-t-2xl"
            >
              <BookingPanel
                facility={facility}
                onClose={() => setShowForm(false)}
                onSuccess={(b) => {
                  setBooking(b);
                  setShowForm(false);
                }}
              />
            </motion.div>
          </>
        )}

        {booking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden flex items-center justify-center p-4"
          >
            <SuccessCard
              booking={booking}
              onReset={() => {
                setBooking(null);
                setShowForm(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
