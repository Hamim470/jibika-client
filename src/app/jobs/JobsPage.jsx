"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import JobCard from "@/component/JobCard";
import JobFilters from "@/component/JobFilters";
import { useRouter } from "next/navigation";
import { Pagination } from "@heroui/react";

const JobsPage = ({ jobs, filters,total }) => {
  const router = useRouter();
  const [page, setPage] = useState(filters.page || 1);
  const itemsPerPage = 10;
  const totalItems = total;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
console.log("-------",total)
  // Filter states
  const [searchQuery, setSearchQuery] = useState(filters?.search || "");
  const [selectedCategory, setSelectedCategory] = useState(filters?.jobCategory || "All");
  const [selectedType, setSelectedType] = useState(filters?.jobType || "All");
  

  useEffect(() => {
    const sp = new URLSearchParams();
    if (searchQuery) {
      sp.set('search', searchQuery);
    }
    if (selectedType !== "All") {
      sp.set('jobType', selectedType);
    }
    if (selectedCategory !== "All") {
      sp.set('jobCategory', selectedCategory);
    }
    if (page) {
      sp.set('page', page)
    }

    const path = `?${sp.toString()}`;
    router.push(path);
  }, [router, searchQuery, selectedType, selectedCategory,page]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedType("All");
  };

  // pegination
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) {
      pages.push("ellipsis");
    }
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }
    pages.push(totalPages);
    return pages;
  };

  const startItem = (page-1)*itemsPerPage+1;
  const endItem = Math.min(page*itemsPerPage,totalItems);


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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title or company..."
            className="w-full px-5 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Connected Filter Sidebar Component */}
        <JobFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          onReset={handleResetFilters}
        />

        {/* Job Listings Grid */}
        <div className="lg:col-span-3 space-y-4">
          {jobs.length === 0 ? (
            <div className="p-16 text-center rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <p className="text-lg font-bold text-white">No jobs found</p>
              <p className="text-sm text-zinc-400">Try adjusting your search Query or filter criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
              <Pagination className="w-full">
                <Pagination.Summary>
                  Showing {startItem}-{endItem} of {totalItems} results
                </Pagination.Summary>
                <Pagination.Content>
                  <Pagination.Item>
                    <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                      <Pagination.PreviousIcon />
                      <span>Previous</span>
                    </Pagination.Previous>
                  </Pagination.Item>
                  {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                      <Pagination.Item key={`ellipsis-${i}`}>
                        <Pagination.Ellipsis />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={p}>
                        <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    ),
                  )}
                  <Pagination.Item>
                    <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                      <span>Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JobsPage;