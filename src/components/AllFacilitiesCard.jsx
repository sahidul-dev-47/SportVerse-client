"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MdLocationOn,
  MdPeople,
  MdEmail,
  MdVerified,
  MdStar,
  MdFavorite,
  MdFavoriteBorder,
  MdArrowForward,
  MdAccessTime,
} from "react-icons/md";
import { IoFlash } from "react-icons/io5";

export default function AllFacilitiesCard({ facility }) {
  const {
    _id,
    facilityName,
    facilityType,
    image,                    
    location,
    pricePerHour,
    capacity,
    availableTimeSlots = [],
    description,
    ownerEmail,
    rating    = 4.5,
    reviews   = 0,
    verified  = false,
  } = facility;

  const [liked, setLiked] = useState(false);
  const [showAllSlots, setShowAllSlots] = useState(false);
  const [imgError, setImgError] = useState(false);

  const visibleSlots = showAllSlots
    ? availableTimeSlots
    : availableTimeSlots.slice(0, 3);
  const extraSlots = availableTimeSlots.length - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/35 overflow-hidden transition-colors duration-300 shadow-xl shadow-black/30"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-transparent transition-all duration-500 pointer-events-none z-10 rounded-2xl" />
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />

      {/* ── IMAGE ── */}
      <div className="relative w-full h-52 overflow-hidden flex-shrink-0 bg-gray-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgError || !image ? "/placeholder-facility.jpg" : image}
          alt={facilityName}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />

        {/* Facility type — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-950/80 border border-white/15 backdrop-blur-md text-white text-[11px] font-bold">
            <IoFlash size={11} className="text-blue-400" />
            {facilityType}
          </span>
        </div>

        {/* Verified — top right (leaves room for heart) */}
        {verified && (
          <div className="absolute top-3 right-12 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-md text-emerald-300 text-[10px] font-bold">
              <MdVerified size={11} /> Verified
            </span>
          </div>
        )}

        {/* Heart / wishlist — top right */}
        {/* FIX: plain <button type="button"> — never submits a form */}
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-gray-950/70 border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Save to wishlist"
        >
          {liked
            ? <MdFavorite size={15} className="text-red-400" />
            : <MdFavoriteBorder size={15} className="text-gray-300" />
          }
        </button>

        {/* Price — bottom left */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="flex items-baseline gap-1 px-3 py-1.5 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <span className="text-white font-black text-base leading-none">
              ${Number(pricePerHour).toLocaleString()}
            </span>
            <span className="text-blue-200 text-[10px] font-medium">/hr</span>
          </div>
        </div>

        {/* Rating — bottom right */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gray-950/80 border border-white/10 backdrop-blur-md">
            <MdStar size={13} className="text-amber-400" />
            <span className="text-white text-xs font-black">{rating}</span>
            {reviews > 0 && (
              <span className="text-gray-400 text-[10px]">({reviews})</span>
            )}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-col gap-4 p-5 flex-1">

        {/* Name */}
        <h3 className="text-base font-black text-white leading-tight tracking-tight group-hover:text-blue-300 transition-colors duration-200 line-clamp-1">
          {facilityName}
        </h3>

        {/* Location + Capacity */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 min-w-0">
            <MdLocationOn size={14} className="text-blue-400 flex-shrink-0" />
            <span className="text-xs text-gray-400 truncate">{location}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <MdPeople size={14} className="text-blue-400" />
            <span className="text-xs text-gray-400">{capacity} players</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="h-px bg-white/5" />

        {/* Time slots */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <MdAccessTime size={13} className="text-blue-400" />
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Available Slots
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {visibleSlots.map((slot) => (
              <span
                key={slot}
                className="px-2.5 py-1 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-300 text-[10px] font-semibold"
              >
                {slot}
              </span>
            ))}
            {!showAllSlots && extraSlots > 0 && (
              <button
                type="button"
                onClick={() => setShowAllSlots(true)}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-[10px] font-semibold hover:text-white hover:bg-white/10 transition-colors"
              >
                +{extraSlots} more
              </button>
            )}
          </div>
        </div>

        <div className="h-px bg-white/5" />

        {/* Owner email */}
        <div className="flex items-center gap-1.5">
          <MdEmail size={13} className="text-blue-400 flex-shrink-0" />
          <a
            href={`mailto:${ownerEmail}`}
            className="text-[11px] text-gray-500 hover:text-blue-400 transition-colors truncate"
          >
            {ownerEmail}
          </a>
        </div>

        {/* Book Now */}
        <Link
          href={`/facilities/${_id}/book`}
          className="group/btn mt-auto flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-black uppercase tracking-wide transition-all duration-200 shadow-md shadow-blue-600/25 hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98]"
        >
          Book Now
          <MdArrowForward
            size={16}
            className="group-hover/btn:translate-x-1 transition-transform duration-200"
          />
        </Link>
      </div>
    </motion.div>
  );
}
