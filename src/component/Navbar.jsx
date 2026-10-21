"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // 1. Get the current route path

  // Helper function to determine if a link is active
  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
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
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-emerald-500 font-semibold" : "text-zinc-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/jobs" 
              className={`text-sm font-medium transition-colors ${
                isActive("/jobs") ? "text-emerald-500 font-semibold" : "text-zinc-300 hover:text-white"
              }`}
            >
              Browse Jobs
            </Link>
            <Link 
              href="/companies" 
              className={`text-sm font-medium transition-colors ${
                isActive("/companies") ? "text-emerald-500 font-semibold" : "text-zinc-300 hover:text-white"
              }`}
            >
              Companies
            </Link>
            <Link 
              href="/pricing" 
              className={`text-sm font-medium transition-colors ${
                isActive("/pricing") ? "text-emerald-500 font-semibold" : "text-zinc-300 hover:text-white"
              }`}
            >
              Pricing
            </Link>
          </nav>

          {/* Action Buttons (Login / Post a Job) */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className={`text-sm font-medium px-3 py-2 transition-colors ${
                isActive("/login") ? "text-emerald-500 font-semibold" : "text-zinc-300 hover:text-white"
              }`}
            >
              Sign In
            </Link>
            <Link 
              href="/dashboard/recruiter/jobs/new" 
              className="text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-all shadow-sm"
            >
              Post a Job
            </Link>
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

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4 space-y-2">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/") ? "bg-emerald-950/50 text-emerald-400" : "text-zinc-300 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/jobs" 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/jobs") ? "bg-emerald-950/50 text-emerald-400" : "text-zinc-300 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Browse Jobs
          </Link>
          <Link 
            href="/companies" 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/companies") ? "bg-emerald-950/50 text-emerald-400" : "text-zinc-300 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Companies
          </Link>
          <Link 
            href="/pricing" 
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/pricing") ? "bg-emerald-950/50 text-emerald-400" : "text-zinc-300 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Pricing
          </Link>
          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className={`w-full text-center py-2 text-sm font-medium rounded-lg ${
                isActive("/login") ? "bg-emerald-600 text-white" : "text-zinc-300 hover:text-white bg-zinc-900"
              }`}
            >
              Sign In
            </Link>
            <Link 
              href="/dashboard/recruiter/jobs/new" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg"
            >
              Post a Job
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;