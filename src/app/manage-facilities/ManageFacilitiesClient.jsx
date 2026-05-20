"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  MdEdit,
  MdDelete,
  MdClose,
  MdSportsSoccer,
  MdLocationOn,
  MdAttachMoney,
  MdPeople,
  MdAccessTime,
  MdVerified,
  MdArrowForward,
  MdAdd,
  MdWarning,
  MdCheckCircle,
  MdImage,
  MdDescription,
} from "react-icons/md";
import { IoFlash } from "react-icons/io5";

// Constants 
const FACILITY_TYPES = [
  "Football Ground","Cricket Ground","Basketball Court","Swimming Pool",
  "Tennis Court","Badminton Court","Gymnasium","Yoga Studio",
  "Boxing Ring","Indoor Stadium","Rooftop Turf","Other",
];

const TIME_SLOTS = [
  "06:00 AM – 08:00 AM","08:00 AM – 10:00 AM","10:00 AM – 12:00 PM",
  "12:00 PM – 02:00 PM","02:00 PM – 04:00 PM","04:00 PM – 06:00 PM",
  "06:00 PM – 08:00 PM","08:00 PM – 10:00 PM",
];

//  Shared styles 
const inp =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm " +
  "placeholder-gray-600 outline-none focus:border-blue-500 focus:bg-blue-500/5 transition-all duration-200";

const labelCls = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2";

const ts = {
  background: "#111827",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.08)",
};

// Small helpers 
function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className={labelCls}>
        {Icon && <Icon size={11} className="inline mr-1.5 text-blue-400" />}
        {label}
      </label>
      {children}
    </div>
  );
}

// ── Image preview
function ImgPreview({ url }) {
  const [ok, setOk]   = useState(true);
  const [prev, setPrev] = useState(url);
  if (url !== prev) { setPrev(url); setOk(true); }
  if (!url || !ok) return null;
  return (
    <div className="mt-2 h-36 rounded-xl overflow-hidden border border-white/10 bg-gray-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="preview" className="w-full h-full object-cover" onError={() => setOk(false)} />
    </div>
  );
}

// Edit modal 
function EditModal({ facility, ownerEmail, onClose, onSaved }) {
  const [form, setForm] = useState({
    facilityName:      facility.facilityName || "",
    facilityType:      facility.facilityType || "",
    image:             facility.image        || "",
    location:          facility.location     || "",
    pricePerHour:      facility.pricePerHour || "",
    capacity:          facility.capacity     || "",
    description:       facility.description  || "",
  });
  const [slots, setSlots]     = useState(facility.availableTimeSlots || []);
  const [loading, setLoading] = useState(false);

  const patch = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const toggleSlot = (s) =>
    setSlots((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleSave = async () => {
    if (!form.facilityName.trim() || !form.facilityType || !form.location.trim()) {
      toast.error("Fill in name, type and location.", { style: ts }); return;
    }
    setLoading(true);
    const updatePayload = {...form};
    delete updatePayload._id;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${facility._id}`,
        {
          method:  "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...updatePayload,
            availableTimeSlots: slots,
            ownerEmail: ownerEmail, 
          }),
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Update failed");
      }
      const updated = await res.json();
      toast.success("Facility updated!", {
        style: { ...ts, border: "1px solid rgba(34,197,94,0.3)" },
        iconTheme: { primary: "#22c55e", secondary: "#111827" },
      });
      onSaved(updated);
    } catch (err) {
      toast.error(err.message || "Update failed. Try again.", { style: ts });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-gray-900 border border-white/10 overflow-hidden shadow-2xl shadow-black/60">

          {/* Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500" />

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8 flex-shrink-0">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                <MdEdit size={10} /> Edit Facility
              </span>
              <h3 className="text-lg font-black text-white tracking-tight line-clamp-1">{facility.facilityName}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-all flex-shrink-0"
            >
              <MdClose size={17} />
            </button>
          </div>

          {/* Scrollable form */}
          <div className="flex flex-col gap-5 p-6 overflow-y-auto flex-1">

            {/* Name + Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Facility Name" icon={MdSportsSoccer}>
                <div className="relative">
                  <MdSportsSoccer className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={15} />
                  <input type="text" className={`${inp} pl-10`} value={form.facilityName}
                    onChange={patch("facilityName")}
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} />
                </div>
              </Field>
              <Field label="Facility Type" icon={IoFlash}>
                <select
                  value={form.facilityType}
                  onChange={patch("facilityType")}
                  className={`${inp} appearance-none`}
                >
                  <option value="" className="bg-gray-900">Select type…</option>
                  {FACILITY_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-gray-900">{t}</option>
                  ))}
                </select>
              </Field>
            </div>

            {/* Location */}
            <Field label="Location" icon={MdLocationOn}>
              <div className="relative">
                <MdLocationOn className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={15} />
                <input type="text" className={`${inp} pl-10`} value={form.location}
                  onChange={patch("location")}
                  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} />
              </div>
            </Field>

            {/* Price + Capacity */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price Per Hour ($)" icon={MdAttachMoney}>
                <div className="relative">
                  <MdAttachMoney className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={15} />
                  <input type="number" min="0" className={`${inp} pl-9`} value={form.pricePerHour}
                    onChange={patch("pricePerHour")}
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} />
                </div>
              </Field>
              <Field label="Capacity (persons)" icon={MdPeople}>
                <div className="relative">
                  <MdPeople className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={15} />
                  <input type="number" min="1" className={`${inp} pl-9`} value={form.capacity}
                    onChange={patch("capacity")}
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} />
                </div>
              </Field>
            </div>

            {/* Image URL + preview */}
            <Field label="Image URL" icon={MdImage}>
              <div className="relative">
                <MdImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={15} />
                <input type="url" className={`${inp} pl-10`} placeholder="https://..." value={form.image}
                  onChange={patch("image")}
                  onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} />
              </div>
              <ImgPreview url={form.image} />
            </Field>

            {/* Description */}
            <Field label="Description" icon={MdDescription}>
              <div className="relative">
                <MdDescription className="absolute left-3.5 top-3.5 text-gray-500 pointer-events-none" size={15} />
                <textarea rows={3} className={`${inp} pl-10 resize-none`}
                  value={form.description} onChange={patch("description")} />
              </div>
            </Field>

            {/* Time slots */}
            <Field label="Available Time Slots" icon={MdAccessTime}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TIME_SLOTS.map((s) => {
                  const on = slots.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSlot(s)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs font-medium text-left transition-all duration-200 ${
                        on
                          ? "bg-blue-600/15 border-blue-500/40 text-blue-300"
                          : "bg-white/3 border-white/8 text-gray-500 hover:border-white/20 hover:text-gray-300"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${on ? "bg-blue-600 border-blue-600" : "border-white/20"}`}>
                        {on && (
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      {s}
                    </button>
                  );
                })}
              </div>
            </Field>

            {/* Owner email*/}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/8 border border-blue-500/15">
              <MdVerified size={14} className="text-blue-400 flex-shrink-0" />
              <p className="text-xs text-gray-400">
                Owner: <span className="text-blue-300 font-semibold">{ownerEmail}</span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 px-6 py-4 border-t border-white/8 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-black transition-all shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
              ) : (
                <><MdCheckCircle size={16} /> Save Changes</>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

//  Delete confirm modal
function DeleteModal({ facility, ownerEmail, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities/${facility._id}`,
        {
          method:  "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ownerEmail : ownerEmail?.trim()}), 
        }
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Delete failed");
      }
      toast.success("Facility deleted.", {
        style: { ...ts, border: "1px solid rgba(239,68,68,0.3)" },
        iconTheme: { primary: "#ef4444", secondary: "#111827" },
      });
      onDeleted(facility._id);
    } catch (err) {
      toast.error(err.message || "Delete failed. Try again.", { style: ts });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-sm rounded-2xl bg-gray-900 border border-red-500/20 overflow-hidden shadow-2xl shadow-black/60">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 to-red-400" />

          <div className="p-7 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
              <MdWarning size={28} className="text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Delete Facility?</h3>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                <span className="text-white font-semibold">{facility.facilityName}</span> will be permanently removed. This cannot be undone.
              </p>
            </div>

            {/* Show what's being deleted */}
            <div className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-left">
              <div className="flex items-center gap-2">
                <MdLocationOn size={13} className="text-gray-500 flex-shrink-0" />
                <span className="text-xs text-gray-400 truncate">{facility.location}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <MdAttachMoney size={13} className="text-gray-500 flex-shrink-0" />
                <span className="text-xs text-gray-400">${Number(facility.pricePerHour).toLocaleString()}/hr</span>
              </div>
            </div>

            <div className="flex gap-3 w-full">
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
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white text-sm font-black transition-all shadow-lg shadow-red-600/20"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Deleting…</>
                ) : (
                  <><MdDelete size={16} /> Yes, Delete</>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// Facility card 
function ManageCard({ facility, ownerEmail, onEdit, onDelete }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/30 overflow-hidden transition-colors duration-300 shadow-xl shadow-black/30"
    >
      {/* Top accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10" />

      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden bg-gray-900 flex-shrink-0">
        {!imgError && facility.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={facility.image}
            alt={facility.facilityName}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MdSportsSoccer size={40} className="text-gray-700" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-950/80 border border-white/15 backdrop-blur-md text-white text-[10px] font-bold">
            <IoFlash size={9} className="text-blue-400" />
            {facility.facilityType}
          </span>
        </div>

        {/* Price */}
        <div className="absolute bottom-2.5 left-2.5">
          <div className="flex items-baseline gap-1 px-2.5 py-1 rounded-lg bg-blue-600 shadow-md">
            <span className="text-white font-black text-sm">${Number(facility.pricePerHour).toLocaleString()}</span>
            <span className="text-blue-200 text-[9px]">/hr</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <h3 className="text-sm font-black text-white leading-tight tracking-tight line-clamp-1 group-hover:text-blue-300 transition-colors duration-200">
          {facility.facilityName}
        </h3>

        <div className="flex items-center justify-between gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-1 min-w-0">
            <MdLocationOn size={13} className="text-blue-400 flex-shrink-0" />
            <span className="truncate">{facility.location}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <MdPeople size={13} className="text-blue-400" />
            <span>{facility.capacity} players</span>
          </div>
        </div>

        {/* Slots preview */}
        {facility.availableTimeSlots?.length > 0 && (
          <div className="flex items-center gap-1.5">
            <MdAccessTime size={12} className="text-blue-400 flex-shrink-0" />
            <span className="text-[10px] text-gray-500">
              {facility.availableTimeSlots.length} slot{facility.availableTimeSlots.length > 1 ? "s" : ""} available
            </span>
          </div>
        )}

        <div className="h-px bg-white/5 mt-auto" />

        {/* Action buttons */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => onEdit(facility)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600/12 border border-blue-500/25 hover:bg-blue-600/25 hover:border-blue-500/50 text-blue-300 text-xs font-bold transition-all duration-200"
          >
            <MdEdit size={14} /> Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(facility)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 text-red-400 text-xs font-bold transition-all duration-200"
          >
            <MdDelete size={14} /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Empty state 
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4 gap-5">
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center">
        <MdSportsSoccer size={36} className="text-gray-600" />
      </div>
      <div>
        <h3 className="text-xl font-black text-white">No facilities yet</h3>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">
          You have not listed any facilities. Add your first one to get started.
        </p>
      </div>
      <Link
        href="/add-facility"
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/25"
      >
        <MdAdd size={18} /> Add Your First Facility
      </Link>
    </div>
  );
}

// ── Main component 
export default function ManageFacilitiesClient({ facilities: initial, ownerEmail }) {
  const [facilities, setFacilities] = useState(initial || []);
  const [editing, setEditing]       = useState(null); // facility being edited
  const [deleting, setDeleting]     = useState(null); // facility being deleted

  // Called when edit modal saves successfully
  const handleSaved = (updated) => {
    setFacilities((prev) =>
      prev.map((f) => (f._id === updated._id ? { ...f, ...updated } : f))
    );
    setEditing(null);
  };

  // Called when delete modal confirms
  const handleDeleted = (id) => {
    setFacilities((prev) => prev.filter((f) => f._id !== id));
    setDeleting(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Toaster position="top-right" />

      {/* Background decoration */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden>
        <defs>
          <pattern id="mf-grid" width="52" height="52" patternUnits="userSpaceOnUse">
            <path d="M 52 0 L 0 0 0 52" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mf-grid)" />
      </svg>
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-700/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/25 text-blue-400 text-[10px] font-bold tracking-widest uppercase mb-3">
              <IoFlash size={11} /> My Facilities
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Manage Facilities
            </h1>
            <p className="text-sm text-gray-400 mt-1.5">
              {facilities.length > 0
                ? `You have ${facilities.length} listed facilit${facilities.length > 1 ? "ies" : "y"}.`
                : "No facilities listed yet."}
            </p>

            {/* Owner badge */}
            <div className="flex items-center gap-2 mt-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black">
                {ownerEmail?.[0]?.toUpperCase() ?? "O"}
              </div>
              <span className="text-xs text-gray-500 font-medium">{ownerEmail}</span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                <MdVerified size={10} /> Owner
              </span>
            </div>
          </div>

          <Link
            href="/add-facilities"
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/25 flex-shrink-0"
          >
            <MdAdd size={18} /> Add New Facility
          </Link>
        </div>

        {/* ── Grid or empty ── */}
        {facilities.length === 0 ? (
          <EmptyState />
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {facilities.map((facility, i) => (
                <motion.div
                  key={facility._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ManageCard
                    facility={facility}
                    ownerEmail={ownerEmail}
                    onEdit={setEditing}
                    onDelete={setDeleting}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* ── Edit modal ── */}
      <AnimatePresence>
        {editing && (
          <EditModal
            key="edit"
            facility={editing}
            ownerEmail={ownerEmail}
            onClose={() => setEditing(null)}
            onSaved={handleSaved}
          />
        )}
      </AnimatePresence>

      {/* ── Delete modal ── */}
      <AnimatePresence>
        {deleting && (
          <DeleteModal
            key="delete"
            facility={deleting}
            ownerEmail={ownerEmail}
            onClose={() => setDeleting(null)}
            onDeleted={handleDeleted}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
