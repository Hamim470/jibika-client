"use client";

import { useState } from "react";
import { motion } from "motion/react";
import JobCard from "@/component/JobCard";
import JobFilters from "@/component/JobFilters";

const JobsPage = ({ allJobs }) => {
  const [jobs] = useState(allJobs || []);
  
  // Filter states
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesKeyword = 
      job.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchKeyword.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    const matchesJobType = selectedJobType === "All" || job.jobType === selectedJobType;
    const matchesLocation = selectedLocation === "All" || job.city === selectedLocation;

    return matchesKeyword && matchesCategory && matchesJobType && matchesLocation;
  });

  const categories = ["All", "Software Development", "Digital Marketing", "Finance & Accounting", "UI/UX & Design", "E-Commerce & Retail"];
  const jobTypes = ["All", "Full-time", "Part-time", "Remote", "Contract", "Internship"];
  const cities = ["All", ...new Set(jobs.map((j) => j.city).filter(Boolean))];

  const handleResetFilters = () => {
    setSearchKeyword("");
    setSelectedCategory("All");
    setSelectedJobType("All");
    setSelectedLocation("All");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 py-8 space-y-8 pb-16"
    >
      {/* Header */}
      <div className="border-b border-zinc-800 pb-6 space-y-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Career Opportunities
        </h1>
        <p className="text-sm text-zinc-400 text-center">
          Discover top job openings across Bangladesh. Filter by category, location, and job type to find your next role.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search by job title or company..."
            className="w-full px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Extracted Filter Sidebar Component */}
        <JobFilters
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          selectedJobType={selectedJobType}
          setSelectedJobType={setSelectedJobType}
          jobTypes={jobTypes}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          cities={cities}
          onReset={handleResetFilters}
        />

        {/* Job Listings Grid */}
        <div className="lg:col-span-3 space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="p-16 text-center rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <p className="text-lg font-bold text-white">No jobs found</p>
              <p className="text-sm text-zinc-400">Try adjusting your search keyword or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobsPage;