"use client";

import { useState, useEffect } from "react";
import { MdSearch, MdFilterList, MdClear } from "react-icons/md";
import AllFacilitiesCard from "@/components/AllFacilitiesCard";

const FACILITY_TYPES = [
  "All", "Football Ground", "Cricket Ground", "Basketball Court",
  "Swimming Pool", "Tennis Court", "Badminton Court", "Gymnasium",
  "Yoga Studio", "Boxing Ring", "Indoor Stadium", "Rooftop Turf", "Other"
];

const AllFacilitiesPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchFacilities = async () => {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/facilities`;

      const params = new URLSearchParams();
      if (search.trim()) params.append("search", search.trim());
      if (category !== "All") params.append("category", category);

      if (params.toString()) url += `?${params.toString()}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setFacilities(data);
      } catch (error) {
        console.error(error);
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, [search, category]);

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white pb-12">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59,130,246,0.15) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-[2px] px-4 py-1.5 rounded-full mb-4">
            🌐 DISCOVER VENUES
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-br from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">
            Find Your Perfect Facility
          </h1>
          <p className="text-gray-400 mt-3 text-lg max-w-md mx-auto">
            Search across hundreds of sports venues in your city
          </p>
        </div>

        {/* Modern Combined Search Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-2 shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2">
              {/* Search Icon */}
              <div className="pl-4 text-gray-400">
                <MdSearch size={24} />
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search by facility name or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent border-0 focus:outline-none text-lg placeholder-gray-500 py-4"
              />

              {/* Clear Button */}
              {search && (
                <button
                  onClick={clearSearch}
                  className="p-3 text-gray-400 hover:text-white transition-colors"
                >
                  <MdClear size={22} />
                </button>
              )}

              {/* Divider */}
              <div className="h-8 w-px bg-white/10 hidden sm:block" />

              {/* Category Dropdown */}
              <div className="relative pr-2 hidden sm:block">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-transparent border border-white/10 rounded-2xl px-5 py-3 text-sm font-medium focus:outline-none focus:border-blue-500 cursor-pointer appearance-none pr-10 transition-all"
                >
                  {FACILITY_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-[#0a0f1a]">
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-blue-400">
                  <MdFilterList size={20} />
                </div>
              </div>
            </div>

            {/* Mobile Category Dropdown */}
            <div className="sm:hidden px-4 pb-3 pt-1">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:border-blue-500"
              >
                {FACILITY_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-[#0a0f1a]">
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6 px-1">
          <p className="text-gray-400">
            {loading ? "Searching..." : `${facilities.length} facilities found`}
          </p>
          
          {(search || category !== "All") && (
            <button
              onClick={() => { setSearch(""); setCategory("All"); }}
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Facilities Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-white/5 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.length > 0 ? (
              facilities.map((facility) => (
                <AllFacilitiesCard key={facility._id} facility={facility} />
              ))
            ) : (
              <div className="col-span-full text-center py-24">
                <div className="text-6xl mb-4">🏟️</div>
                <h3 className="text-2xl font-semibold mb-2">No facilities found</h3>
                <p className="text-gray-500">Try changing your search or filter</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFacilitiesPage;