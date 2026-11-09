"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "motion/react";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  // Form & UI states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    await authClient.signIn.email(
      { email, password },
      {
        onRequest: () => setLoading(true),
        onSuccess: () => {
          router.push(redirectTo);
          setLoading(false);
          setSuccess(true);
          router.refresh();
          router.push(redirectTo);
        },
        onError: (ctx) => {
          setLoading(false);
          setError(ctx.error.message || "Invalid email or password.");
        },
      }
    );
  };

  return (
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
            Signed in successfully! Redirecting...
          </motion.div>
        )}
      </AnimatePresence>

      <form className="space-y-6" onSubmit={handleSignIn}>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Email address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="youremail@example.com"
            className="mt-1 block w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm placeholder-zinc-500 bg-zinc-900 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mt-1 block w-full px-3 py-2 border border-zinc-800 rounded-md shadow-sm placeholder-zinc-500 bg-zinc-900 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none disabled:opacity-50 transition-colors"
        >
          {loading ? "Signing in..." : "Sign In"}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-zinc-400">
          Do not have an account?{" "}
          <Link href={`/auth/signup?redirect=${redirectTo}` }className="font-medium text-emerald-500 hover:text-emerald-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-zinc-100">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
      >
        <Link href="/" className="inline-block text-3xl font-extrabold tracking-tight text-white">
          JiB<span className="text-[#059669]">i</span>KA
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">Sign in to your account</h2>
        <p className="mt-2 text-sm text-zinc-400">Welcome back! Access your career portal dashboard.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Suspense fallback={<div className="p-8 text-center text-zinc-500">Loading sign-in...</div>}>
          <SignInContent />
        </Suspense>
      </motion.div>
    </div>
  );
}