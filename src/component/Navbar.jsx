"use client";

import { useSession, authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending, refetch } = useSession();
  const user = session?.user;

  useEffect(() => {
    refetch?.();
  }, [pathname,refetch]);



  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          await refetch?.();
          router.push("/auth/signin");
          router.refresh();
        },
      },
    });
  };

  // Helper function to determine if a link is active
  const isActive = (path) => pathname === path;

  // Dynamic dashboard links based on role
  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin:"/dashboard/admin"
  };

  const dashboardHref = dashboardLinks[user?.role || 'seeker'];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center h-16">
            <Link href="/" className="flex items-center gap-2 h-16">
              <Image
                src="/jibikaPrimary.png"
                width={240}
                height={80}
                alt="Jibika Logo"
                priority
                className="h-full w-auto object-contain rounded-lg"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {["/", "/jobs", "/companies", "/plans"].map((path) => {
              const label = path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
              return (
                <Link
                  key={path}
                  href={path}
                  className={`relative text-sm font-medium transition-colors ${isActive(path) ? "text-emerald-500 font-semibold" : "text-zinc-300 hover:text-white"
                    }`}
                >
                  {label}
                  {isActive(path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-emerald-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons (Auth state dependent / Post a Job) */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="text-sm text-zinc-500 animate-pulse">Loading...</div>
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={dashboardHref}
                  className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg transition-colors"
                >
                  Dashboard ({user.name})
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium text-zinc-400 hover:text-red-400 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className={`text-sm font-medium px-3 py-2 transition-colors ${isActive("/auth/signin") ? "text-emerald-500 font-semibold" : "text-zinc-300 hover:text-white"
                  }`}
              >
                Sign In
              </Link>
            )}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/dashboard/recruiter/jobs/new"
                className="text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-all shadow-sm block"
              >
                Post a Job
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Motion Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4 space-y-2 overflow-hidden"
          >
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/") ? "bg-emerald-950/50 text-emerald-400" : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                }`}
            >
              Home
            </Link>
            <Link
              href="/jobs"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/jobs") ? "bg-emerald-950/50 text-emerald-400" : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                }`}
            >
              Browse Jobs
            </Link>
            <Link
              href="/companies"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/companies") ? "bg-emerald-950/50 text-emerald-400" : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                }`}
            >
              Companies
            </Link>
            <Link
              href="/plans"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/plans") ? "bg-emerald-950/50 text-emerald-400" : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                }`}
            >
              Pricing
            </Link>
            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
              {isPending ? (
                <div className="px-3 py-2 text-sm text-zinc-500">Loading session...</div>
              ) : user ? (
                <>
                  <Link
                    href={dashboardHref}
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-2 text-sm font-medium bg-zinc-900 text-zinc-200 hover:text-white rounded-lg border border-zinc-800"
                  >
                    Dashboard ({user.name})
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-center py-2 text-sm font-medium bg-zinc-900 text-red-400 hover:bg-zinc-800 rounded-lg border border-zinc-800"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className={`w-full text-center py-2 text-sm font-medium rounded-lg ${isActive("/auth/signin") ? "bg-emerald-600 text-white" : "text-zinc-300 hover:text-white bg-zinc-900"
                    }`}
                >
                  Sign In
                </Link>
              )}
              <Link
                href="/dashboard/recruiter/jobs/new"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
              >
                Post a Job
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;