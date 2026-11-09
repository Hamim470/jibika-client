"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "@heroui/react";
import { getCompanyJobs } from "@/lib/api/jobs";

const RecruiterJobs = ({ company }) => {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalJob, setDeleteModalJob] = useState(null);



  useEffect(() => {
    async function fetchJobs() {
      if (!company?._id) {
        setLoading(false);
        return;
      }
      try {
        const data = await getCompanyJobs(company._id);
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        toast("Failed to load job listings.");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [company?._id]);

  const activeJobsCount = jobs.filter((j) => j.status === "active").length;
  const isLimitReached = activeJobsCount >= company.planLimit;

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "closed" : "active";
    setJobs((prev) =>
      prev.map((job) => (job._id === id ? { ...job, status: newStatus } : job))
    );
    toast.success(`Job status updated to ${newStatus}`);
  };

  const handleDeleteJob = (id) => {
    setJobs((prev) => prev.filter((job) => job._id !== id));
    setDeleteModalJob(null);
    toast.success("Job deleted successfully");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-8 pb-16"
    >
      {/* Page Header & Quota Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Manage Job Listings
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Oversee your active openings, review applicant pipelines, and manage quotas.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Plan Usage Indicator */}
          <div className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              Active Quota Usage
            </span>
            <span className={`text-xs font-bold ${isLimitReached ? "text-pink-500 animate-pulse" : "text-emerald-400"}`}>
              {activeJobsCount} / {company.planLimit} Active Posts
            </span>
          </div>

          {/* Post New Job Button */}
          {isLimitReached ? (
            <button
              disabled
              className="px-5 py-3 rounded-xl bg-zinc-800 text-zinc-500 font-semibold text-sm cursor-not-allowed"
              title="Plan limit reached. Upgrade to post more jobs."
            >
              Limit Reached
            </button>
          ) : (
            <Link
              href="/dashboard/recruiter/jobs/new"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shrink-0 flex items-center gap-2"
            >
              <span>+</span> Post New Job
            </Link>
          )}
        </div>
      </div>

      {/* Jobs Table Container */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden shadow-xl backdrop-blur-md">
        {loading ? (
          <div className="p-12 text-center text-zinc-400">Loading your job postings...</div>
        ) : jobs.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <p className="text-zinc-400 text-sm">No job posts created yet.</p>
            <Link
              href="/dashboard/recruiter/jobs/new"
              className="inline-block px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
            >
              Create your first job
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950/40 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  <th className="py-4 px-6">Job Title</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Applicants</th>
                  <th className="py-4 px-6">Date Posted</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-sm">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-white">{job.title}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${
                          job.status === "active"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800/50"
                            : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-300 font-semibold">
                      {job.applicantsCount || 0} candidates
                    </td>
                    <td className="py-4 px-6 text-zinc-400 text-xs">
                      {new Date(job.createdAt || new Date()).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <Link
                        href={`/dashboard/recruiter/jobs/edit/${job._id}`}
                        className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/dashboard/recruiter/jobs/${job._id}/applicants`}
                        className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Applicants
                      </Link>
                      <button
                        onClick={() => handleToggleStatus(job._id, job.status)}
                        className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        {job.status === "active" ? "Close" : "Reopen"}
                      </button>
                      <button
                        onClick={() => setDeleteModalJob(job)}
                        className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-white">Delete Job Posting</h3>
              <p className="text-sm text-zinc-400">
                Are you sure you want to delete <span className="text-white font-semibold">&quot;{deleteModalJob.title}&quot;</span>? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteModalJob(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteJob(deleteModalJob._id)}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-500"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RecruiterJobs;