"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { submitApplication } from "@/lib/actions/applications";
import { toast } from '@heroui/react';

export default function ApplyForm({ job, user }) {
  const router = useRouter();

  // Form states
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [phone, setPhone] = useState("");
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await submitApplication({
        jobId: job._id,
        jobTitle: job.title,
        companyId: job.companyId,
        company: job.company,
        applicantId: user.id || user._id,
        applicantName: user.name,
        applicantEmail: user.email,
        phone,
        resumeUrl,
        coverLetter,
      });

      if (res.insertedId) {
        setSuccess(true);
        toast.success("Application Submitted successfully.");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        throw new Error("Failed to submit application.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-md space-y-6">
      <h2 className="text-lg font-bold text-white border-b border-zinc-800 pb-4">
        Candidate Application Details
      </h2>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-950/50 border border-red-800 text-red-200 px-4 py-3 rounded-xl text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Alert */}
      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-emerald-950/50 border border-emerald-800 text-emerald-200 px-4 py-3 rounded-xl text-sm"
          >
            Application submitted successfully! Redirecting to dashboard...
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm text-zinc-300">
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Applicant Name</span>
          <p className="font-medium text-white px-3 py-2 bg-zinc-950 border border-zinc-800/80 rounded-xl">{user.name}</p>
        </div>

        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">Email Address</span>
          <p className="font-medium text-white px-3 py-2 bg-zinc-950 border border-zinc-800/80 rounded-xl">{user.email}</p>
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Phone Number</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+880 1XXXXXXXXX"
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        {/* Resume URL */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Resume / CV Link (Google Drive, LinkedIn, Portfolio)</label>
          <input
            type="url"
            required
            value={resumeUrl}
            onChange={(e) => setResumeUrl(e.target.value)}
            placeholder="https://drive.google.com/..."
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        {/* Cover Letter */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">Cover Letter / Note to Recruiter</label>
          <textarea
            rows={4}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Briefly explain why you are a great fit for this position..."
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
          />
        </div>

        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400">
          ℹ️ Your application will be securely filed and delivered directly to <span className="text-white font-semibold">{job.company}</span>.
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? "Submitting Application..." : "Confirm & Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}