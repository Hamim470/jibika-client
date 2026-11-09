"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "motion/react";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams=useSearchParams();
  const redirectTo=searchParams.get("redirect")||'/';

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker"); // Bound to the additionalField in betterAuth

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const plan=role==="seeker"?"seeker_free":"recruiter_free";

    await authClient.signUp.email(
      {
        email,
        password,
        name,
        role, 
        plan
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          setSuccess(true);
          router.refresh();
          router.push(redirectTo);
        },
        onError: (ctx) => {
          setLoading(false);
          setError(ctx.error.message || "Something went wrong during sign up.");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-zinc-100">
      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
      >
        <Link href="/" className="inline-block text-3xl font-extrabold tracking-tight text-white">
          JiB<span className="text-[#059669]">i</span>KA
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Join Jibika and connect with career opportunities
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-zinc-950 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-zinc-800">

          {/* Error Alert */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 bg-red-950/50 border border-red-800 text-red-200 px-4 py-3 rounded-md text-sm"
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
                className="mb-4 bg-emerald-950/50 border border-emerald-800 text-emerald-200 px-4 py-3 rounded-md text-sm"
              >
                Account created successfully! Redirecting...
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSignUp}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Md Johirul Islam"
                  className="appearance-none block w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm placeholder-zinc-500 bg-zinc-900 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-zinc-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="youremail@example.com"
                  className="appearance-none block w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm placeholder-zinc-500 bg-zinc-900 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="appearance-none block w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm placeholder-zinc-500 bg-zinc-900 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            {/* User Role Selector */}
            <div>
              <label className="block text-sm font-medium text-zinc-300">
                I want to:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm bg-zinc-900 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              >
                <option value="seeker">Find a Job (Job Seeker)</option>
                <option value="recruiter">Post Jobs (Recruiter)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-colors"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </motion.button>
            </div>
          </form>

          {/* Footer link to Sign In */}
          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-400">
              Already have an account?{" "}
              <Link href={`/auth/signin?redirect=${redirectTo}`} className="font-medium text-emerald-500 hover:text-emerald-400">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}