"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useSession } from "@/lib/auth-client";

export default function UnauthorizedPage() {
  const { data: session } = useSession();
  const userRole = session?.user?.role || "seeker";

  const dashboardHref = userRole === "recruiter" ? "/dashboard/recruiter" : "/dashboard/seeker";

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12 text-zinc-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="max-w-md w-full p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-2xl backdrop-blur-md text-center space-y-6"
      >
        {/* Shield / Lock Icon */}
        <div className="w-16 h-16 bg-red-950/60 border border-red-800/60 rounded-full flex items-center justify-center mx-auto text-red-400 text-3xl shadow-inner">
          🚫
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-red-950 text-red-400 border border-red-800/60 inline-block">
            403 • Access Denied
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Unauthorized Access
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            You don’t have permission to view this page. This area is restricted to a different account role.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={dashboardHref}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg transition-all text-center"
          >
            Go to Your Dashboard
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs transition-all text-center border border-zinc-700"
          >
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}