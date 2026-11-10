"use client";

const JobFilters = ({ selectedCategory, setSelectedCategory, selectedType, setSelectedType, onReset }) => {
  return (
    <div className="lg:col-span-1 space-y-6 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 h-fit backdrop-blur-md">
      <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">Filters</h2>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
        >
          <option value="All">All</option>
          <option value="Software Development">Software Development</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Finance & Accounting">Finance & Accounting</option>
          <option value="UI/UX & Design">UI/UX & Design</option>
          <option value="E-Commerce & Retail">E-Commerce & Retail</option>
        </select>
      </div>

      {/* Job Type Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Job Type</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
        >
          <option value="All">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      {/* Reset Filters */}
      <button
        onClick={onReset}
        className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs transition-all cursor-pointer"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default JobFilters;