"use client";

import { useState } from "react";
import Link from "next/link";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  // Pricing tiers matching your project specifications & screenshot layout
  const plans = [
    {
      name: "Starter",
      badgeIcon: "👑",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Start building your insights hub:",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      isPopular: false,
      ctaText: "Choose This Plan",
      ctaLink: "/register",
    },
    {
      name: "Growth",
      badgeIcon: "📈",
      monthlyPrice: 19,
      yearlyPrice: 14, // reflects ~25% discount
      description: "Start building your insights hub:",
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      isPopular: true,
      ctaText: "Choose This Plan",
      ctaLink: "/register?plan=growth",
    },
    {
      name: "Premium",
      badgeIcon: "⚡",
      monthlyPrice: 39,
      yearlyPrice: 29, // reflects ~25% discount
      description: "Start building your insights hub:",
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)",
      ],
      isPopular: false,
      ctaText: "Choose This Plan",
      ctaLink: "/register?plan=premium",
    },
  ];

  return (
    <section className="w-full py-20 bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              PRICING
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Pay for the leverage,<br />not the listings
          </h2>
        </div>

        {/* Billing Toggle Switch */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center p-1.5 rounded-full bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full text-xs font-semibold transition-all ${
                !isYearly 
                  ? "bg-white text-zinc-950 shadow-md" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                isYearly 
                  ? "bg-white text-zinc-950 shadow-md" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-600 text-white animate-pulse">
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={index}
                className={`relative p-8 rounded-3xl bg-zinc-900/60 border flex flex-col justify-between transition-all backdrop-blur-md shadow-xl ${
                  plan.isPopular 
                    ? "border-emerald-500/60 ring-2 ring-emerald-500/20 bg-gradient-to-b from-zinc-900/90 to-zinc-950" 
                    : "border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div>
                  {/* Card Top: Plan Name & Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-base">
                        {plan.badgeIcon}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-wide">
                        {plan.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        ${price}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium ml-1">
                        /month
                      </span>
                    </div>
                  </div>

                  {/* Subtitle / Description */}
                  <p className="text-xs text-zinc-400 font-medium mb-6">
                    {plan.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                        <span className="w-5 h-5 rounded-md bg-zinc-800 border border-zinc-700 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          +
                        </span>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div>
                  <Link
                    href={plan.ctaLink}
                    className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-between transition-all shadow-md group ${
                      plan.isPopular
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PricingSection;