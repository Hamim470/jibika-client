"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const seekerPlans = [
  {
    name: "Free",
    id: "seeker_free",
    price: "$0",
    period: "/forever",
    description: "Essential tools for starting your career search.",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile creation",
      "Standard email job alerts",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    id: "seeker_pro",
    price: "$19",
    period: "/month",
    description: "Accelerate your search with expanded limits and insights.",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved job listings",
      "Real-time application tracking",
      "Salary insights & bench-marking",
      "Priority candidate matching",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Premium",
    id: "seeker_premium",
    price: "$39",
    period: "/month",
    description: "Maximum visibility and direct line to top recruiters.",
    features: [
      "Everything in Pro",
      "Unlimited job applications",
      "Profile boost to top recruiters",
      "Early access to newly posted jobs",
      "24/7 Priority customer support",
    ],
    cta: "Go Premium",
    popular: false,
  },
];

const recruiterPlans = [
  {
    name: "Free",
    id:'recruiter_free',
    price: "$0",
    period: "/forever",
    description: "Great for a company's first year of startup hiring.",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
      "Basic company profile",
    ],
    cta: "Post a Job Free",
    popular: false,
  },
  {
    name: "Growth",
    id:'recruiter_growth',
    price: "$49",
    period: "/month",
    description: "Designed for growing teams scaling their workforce.",
    features: [
      "Up to 10 active job posts",
      "Full applicant tracking system (ATS)",
      "Basic recruitment analytics",
      "Standard email support",
      "Candidate screening tools",
    ],
    cta: "Scale Your Team",
    popular: true,
  },
  {
    name: "Enterprise",
    id:'recruiter_enterprise',
    price: "$149",
    period: "/month",
    description: "Complete hiring suite with custom branding & analytics.",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings boost",
      "Multi-user team collaboration",
      "Custom employer branding",
      "Dedicated priority support",
    ],
    cta: "Get Enterprise",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes! You can cancel your subscription whenever you wish directly from your Account Dashboard. Your plan features will remain active until the end of your current billing period.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 7-day money-back guarantee for first-time paid subscriptions if you are not completely satisfied with your plan experience.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major international credit/debit cards (Visa, MasterCard, American Express) as well as popular local payment hooks via bKash, Nagad, and Rocket.",
  },
  {
    question: "How does plan switching work?",
    answer:
      "You can upgrade or downgrade your plan at any time. When upgrading, the prorated amount for your remaining billing cycle will be automatically calculated at checkout.",
  },
];

export default function PricingPage() {
  const [userRole, setUserRole] = useState("seeker"); // "seeker" | "recruiter"
  const [openFaq, setOpenFaq] = useState(null);

  const plans = userRole === "seeker" ? seekerPlans : recruiterPlans;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Flexible Plans for <span className="text-emerald-500">Every Journey</span>
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
          Whether you are looking for your next career milestone or seeking exceptional talent to build your team, JiB<span className="text-emerald-500">i</span>KA has the right plan for you.
        </p>

        {/* Tab Toggle Switch */}
        <div className="pt-6 flex justify-center">
          <div className="bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl inline-flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setUserRole("seeker")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${userRole === "seeker"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setUserRole("recruiter")}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${userRole === "recruiter"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              For Recruiters
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${plan.popular
              ? "bg-zinc-900/90 border-2 border-emerald-500 shadow-2xl shadow-emerald-950/40"
              : "bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
              }`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500 text-zinc-950 shadow-md">
                Most Popular
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-xs text-zinc-400 font-medium">{plan.period}</span>
              </div>

              <div className="border-t border-zinc-800 pt-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Key Features</p>
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span className="text-emerald-500 text-sm">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">

              <form action="/api/checkout_sessions" method="POST">
                <section>
                  <input type="hidden" name="plan_id" value={plan.id} />
                  <button className={`w-full py-3 rounded-xl font-semibold text-xs inline-block text-center transition-all ${plan.popular
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                    }`} type="submit" role="link">
                    {plan.cta}
                  </button>
                </section>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Have questions about payments, cancellations, or plan switches? We’ve got answers.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-zinc-900/60 border border-zinc-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 text-sm font-semibold text-zinc-200 hover:text-white"
              >
                <span>{faq.question}</span>
                <span className="text-emerald-500 text-lg transition-transform duration-200">
                  {openFaq === index ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-3"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}