"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { createJob } from "@/lib/actions/jobs";
import { toast } from "@heroui/react";
import Link from "next/link";

const PostJobForm = ({ recruiter, recruiterCompany }) => {
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        category: "Software Development",
        jobType: "Full-time",
        minSalary: "",
        maxSalary: "",
        currency: "BDT (৳)",
        city: "Dhaka",
        country: "Bangladesh",
        isRemote: false,
        deadline: "",
        responsibilities: "",
        requirements: "",
        benefits: "",
    });

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Dynamic company data from props (with safe defaults if company hasn't been registered yet)
    const companyData = {
        id: recruiterCompany?._id || "",
        name: recruiterCompany?.name || "Unregistered Company",
        isApproved: recruiterCompany?.status === "approved",
        status: recruiterCompany?.status || "none",
        currentJobCount: recruiterCompany?.currentJobCount || 0,
        jobLimit: 10,
        planName: "Growth Plan",
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Check if company profile exists
        if (!companyData.id) {
            setError("You must register a company profile before you can post jobs.");
            setLoading(false);
            return;
        }

        // Check company approval status
        if (!companyData.isApproved) {
            setError(`Your company profile status is '${companyData.status}'. It must be approved by an administrator before you can publish jobs.`);
            setLoading(false);
            return;
        }

        if (companyData.currentJobCount >= companyData.jobLimit) {
            setError(`You have reached your active job limit (${companyData.jobLimit} jobs) for the ${companyData.planName}. Please upgrade your plan.`);
            setLoading(false);
            return;
        }

        try {
            const res = await createJob({
                ...formData,
                companyId: companyData.id,
                company: companyData.name,
                recruiterEmail: recruiter?.email || recruiter?.user?.email,
                recruiterId: recruiter?.id || recruiter?._id,
                status: "active",
            });

            if (res?.insertedId) {
                toast.success("Job posted Successfully!!!");
                setFormData({
                    title: "",
                    category: "Software Development",
                    jobType: "Full-time",
                    minSalary: "",
                    maxSalary: "",
                    currency: "BDT (৳)",
                    city: "Dhaka",
                    country: "Bangladesh",
                    isRemote: false,
                    deadline: "",
                    responsibilities: "",
                    requirements: "",
                    benefits: "",
                });
                setSuccess(true);
                setTimeout(() => {
                    router.push("/dashboard/recruiter/jobs");
                }, 1500);
            } else {
                throw new Error("Failed to save job to database");
            }
        } catch (err) {
            setError(err.message || "Failed to post job. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto space-y-8 pb-16"
        >
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Post a New Job</h1>
                    <p className="mt-1 text-sm text-zinc-400">
                        Create an active listing to connect with qualified professionals across Bangladesh.
                    </p>
                </div>

                {/* Company & Limit Status Badge */}
                <div className="px-5 py-3 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex flex-col gap-1.5 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Company Quota</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${companyData.status === "approved"
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/60"
                            : companyData.status === "pending"
                                ? "bg-amber-950/60 text-amber-400 border-amber-800/60"
                                : "bg-zinc-800 text-zinc-400 border-zinc-700"
                            }`}>
                            {companyData.status}
                        </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-bold text-white tracking-tight truncate max-w-[200px]">
                            {companyData.name}
                        </span>
                        <span className="text-xs font-medium text-emerald-400 shrink-0">
                            {companyData.currentJobCount} / {companyData.jobLimit} Active
                        </span>
                    </div>
                </div>
            </div>

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
                        Job posted successfully! Publishing and redirecting...
                    </motion.div>
                )}
            </AnimatePresence>


            {recruiterCompany?.status !== "approved" ?
                <div className="p-12 text-center rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-2xl backdrop-blur-md space-y-6">
                    <div className="w-16 h-16 bg-amber-950/60 border border-amber-800/60 rounded-full flex items-center justify-center mx-auto text-amber-400 text-2xl shadow-inner">
                        ⏳
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-950 text-amber-400 border border-amber-800/60 inline-block">
                            Verification Pending
                        </span>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                            Waiting for Admin Approval
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Your company profile is currently under review by our administrators. Once approved, you will be able to post active job openings here.
                        </p>
                    </div>
                    <div className="pt-2">
                        <Link
                            href="/dashboard/recruiter/company"
                            className="inline-block px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-all border border-zinc-700"
                        >
                            View Company Profile
                        </Link>
                    </div>
                </div> :
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Section 1: Job Info */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6 shadow-xl backdrop-blur-md">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Job Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Job Title */}
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Job Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Senior Full Stack Developer"
                                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                />
                            </div>

                            {/* Job Category */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                >
                                    <option value="Software Development">Software Development</option>
                                    <option value="UI/UX & Design">UI/UX & Design</option>
                                    <option value="Healthcare & Medical">Healthcare & Medical</option>
                                    <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                                    <option value="Digital Marketing">Digital Marketing</option>
                                    <option value="Finance & Accounting">Finance & Accounting</option>
                                </select>
                            </div>

                            {/* Job Type */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Job Type *</label>
                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>

                            {/* Salary Range */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Salary Range (Min & Max) *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="number"
                                        name="minSalary"
                                        required
                                        value={formData.minSalary}
                                        onChange={handleChange}
                                        placeholder="Min (e.g. 50000)"
                                        className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                    />
                                    <input
                                        type="number"
                                        name="maxSalary"
                                        required
                                        value={formData.maxSalary}
                                        onChange={handleChange}
                                        placeholder="Max (e.g. 90000)"
                                        className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Currency */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Currency *</label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                >
                                    <option value="BDT (৳)">BDT (৳)</option>
                                    <option value="USD ($)">USD ($)</option>
                                </select>
                            </div>

                            {/* Location & Remote Toggle */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">City & Country *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City (e.g. Dhaka)"
                                        className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                    />
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Country"
                                        className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Application Deadline */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Application Deadline *</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    required
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                />
                            </div>

                            {/* Remote Toggle */}
                            <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    name="isRemote"
                                    id="isRemote"
                                    checked={formData.isRemote}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-emerald-600 focus:ring-emerald-500"
                                />
                                <label htmlFor="isRemote" className="text-sm font-medium text-zinc-300 cursor-pointer">
                                    This is a fully remote position (Candidates can apply from anywhere in Bangladesh)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Job Description */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-6 shadow-xl backdrop-blur-md">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Job Description & Details
                        </h2>

                        <div className="space-y-6">
                            {/* Responsibilities */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Key Responsibilities *</label>
                                <textarea
                                    name="responsibilities"
                                    required
                                    rows={4}
                                    value={formData.responsibilities}
                                    onChange={handleChange}
                                    placeholder="List the core duties and expectations for this role..."
                                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-y"
                                />
                            </div>

                            {/* Requirements */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Requirements & Qualifications *</label>
                                <textarea
                                    name="requirements"
                                    required
                                    rows={4}
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    placeholder="List required technical stack, years of experience, and skills..."
                                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-y"
                                />
                            </div>

                            {/* Benefits */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Benefits & Perks (Optional)</label>
                                <textarea
                                    name="benefits"
                                    rows={3}
                                    value={formData.benefits}
                                    onChange={handleChange}
                                    placeholder="e.g. Festival bonus, health insurance, remote equipment allowance..."
                                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-y"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="flex items-center justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold text-sm hover:bg-zinc-800 hover:text-white transition-all"
                        >
                            Cancel
                        </button>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Publishing Job...
                                    </>
                                ) : (
                                    "Publish Active Job"
                                )}
                            </button>
                        </motion.div>
                    </div>
                </form>
            }
        </motion.div>
    );
};

export default PostJobForm;