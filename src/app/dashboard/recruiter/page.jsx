"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { motion } from "motion/react";

const RecruiterDashboardHomePage = () => {
    const {data:session,isPending}=useSession();
    const user=session?.user;
    const role = session?.user?.role || "seeker";

    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
        >
            {/* Welcome Banner */}
            <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Welcome back, {session?.user?.name || "Professional"}! 👋
                    </h1>
                    <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                        {role === "recruiter"
                            ? "Manage your active job listings, review applicants, and connect with top talent across Bangladesh."
                            : "Explore tailored job recommendations, track your applications, and update your career profile."}
                    </p>
                </div>
                {role === "recruiter" && (
                    <Link
                        href="/dashboard/recruiter/jobs/new"
                        className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md shrink-0"
                    >
                        + Post a New Job
                    </Link>
                )}
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-md">
                    <p className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Account Type</p>
                    <p className="mt-2 text-xl font-bold text-emerald-400 capitalize">{role}</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-md">
                    <p className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Status</p>
                    <p className="mt-2 text-xl font-bold text-white">Active Session</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-md">
                    <p className="text-xs uppercase tracking-wider text-zinc-400 font-medium">Platform Region</p>
                    <p className="mt-2 text-xl font-bold text-white">Bangladesh (BD)</p>
                </div>
            </div>
        </motion.div>
    );
};

export default RecruiterDashboardHomePage;