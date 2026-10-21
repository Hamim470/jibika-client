"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/jibikaPrimary.png" 
                width={180} 
                height={60} 
                alt="Jibika Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Jibika (জীবিকা) is Bangladesh&apos;s premier modern job portal, connecting talented job seekers with top employers to build meaningful careers and drive professional growth.
            </p>
            <div className="text-xs text-zinc-500 pt-2">
              © {currentYear} Jibika. All rights reserved.
            </div>
          </div>

          {/* Job Seekers Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Job Seekers
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/jobs" className="hover:text-emerald-400 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/dashboard/seeker/saved" className="hover:text-emerald-400 transition-colors">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link href="/dashboard/seeker/applications" className="hover:text-emerald-400 transition-colors">
                  Application Tracker
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
                  Seeker Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Employers Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Employers
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/dashboard/recruiter/jobs/new" className="hover:text-emerald-400 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/dashboard/recruiter/company" className="hover:text-emerald-400 transition-colors">
                  Register Company
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-emerald-400 transition-colors">
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
                  Recruiter Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>Designed for professionals and organizations across Bangladesh.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 cursor-pointer transition-colors">Bangladesh (BD)</span>
            <span className="hover:text-zinc-300 cursor-pointer transition-colors">English / বাংলা</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;