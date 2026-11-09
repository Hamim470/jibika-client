"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "motion/react";

const DashboardSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const role = session?.user?.role || "seeker";

  const seekerLinks = [
    { name: "Overview", href: "/dashboard/seeker", icon: "📊" },
    { name: "Browse Jobs", href: "/jobs", icon: "🔍" },
    { name: "Saved Jobs", href: "/dashboard/seeker/saved", icon: "⭐" },
    { name: "Applications", href: "/dashboard/seeker/applications", icon: "📄" },
  ];

  const recruiterLinks = [
    { name: "Overview", href: "/dashboard/recruiter", icon: "📊" },
    { name: "Post a Job", href: "/dashboard/recruiter/jobs/new", icon: "➕" },
    { name: "Manage Jobs", href: "/dashboard/recruiter/jobs", icon: "📋" },
    { name: "Company Profile", href: "/dashboard/recruiter/company", icon: "🏢" },
  ];

  const adminLinks = [
    { name: "Admin Home", href: "/dashboard/admin", icon: "📊" },
    { name: "Manage Users", href: "/dashboard/admin/users", icon: "👥" },
    { name: "Manage Companies", href: "/dashboard/admin/companies", icon: "🏢" },
    { name: "Manage Jobs", href: "/dashboard/admin/jobs", icon: "📋" },
    { name: "Payments", href: "/dashboard/admin/payments", icon: "💳" },
    { name: "Settings", href: "/dashboard/admin/settings", icon: "⚙️" },
  ];

  const links = role === "admin" 
    ? adminLinks 
    : role === "recruiter" 
    ? recruiterLinks 
    : seekerLinks;

  const isActive = (path) => pathname === path;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden flex items-center justify-between bg-zinc-950 border-b border-zinc-800 px-4 py-3 sticky top-0 z-40 text-white">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          JiB<span className="text-[#059669]">i</span>KA
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -250 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -250 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col justify-between p-6 lg:hidden shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="text-2xl font-extrabold text-white">
                  JiB<span className="text-[#059669]">i</span>KA
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6 px-3 py-2 bg-zinc-900 rounded-lg border border-zinc-800">
                <p className="text-xs text-zinc-400">Signed in as</p>
                <p className="text-sm font-bold text-white truncate">{session?.user?.name || "User"}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-950 text-emerald-400 rounded border border-emerald-800">
                  {role}
                </span>
              </div>

              <nav className="space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-emerald-600 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    <span>{link.icon}</span>
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-zinc-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-zinc-950 border-r border-zinc-800 min-h-screen p-6 sticky top-0">
        <div className="mb-8">
          <Link href="/" className="text-2xl font-extrabold text-white">
            JiB<span className="text-[#059669]">i</span>KA
          </Link>
        </div>

        <div className="mb-6 px-3 py-2.5 bg-zinc-900 rounded-lg border border-zinc-800">
          <p className="text-xs text-zinc-400">Signed in as</p>
          <p className="text-sm font-bold text-white truncate">{session?.user?.name || "User"}</p>
          <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-950 text-emerald-400 rounded border border-emerald-800">
            {role}
          </span>
        </div>

        <nav className="space-y-1 flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <span>{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="pt-4 border-t border-zinc-800">
          <button
            onClick={handleSignOut}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-zinc-900 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;