"use client";

import Link from "next/link";
import { motion } from "motion/react";

const JobCard = ({ job }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/jobs/${job._id}`}
        className="block p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 shadow-xl backdrop-blur-md transition-all space-y-4 group"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-zinc-400 mt-1">{job.company}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/60 shrink-0">
            {job.jobType}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-2 border-t border-zinc-800/80">
          <div className="flex items-center gap-1.5">
            <span>📍</span>
            <span>{job.city}, {job.country} {job.isRemote && "(Remote)"}</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-zinc-200">
            <span>💰</span>
            <span>{job.minSalary} - {job.maxSalary} {job.currency}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <span>🏷️</span>
            <span>{job.category}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default JobCard;