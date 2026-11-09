import { getJobById } from "@/lib/api/jobs";
import Link from "next/link";
import { notFound } from "next/navigation";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8 pb-20">
      {/* Back Navigation */}
      <div>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl"
        >
          <span>←</span> Back to Job Openings
        </Link>
      </div>

      {/* Main Header Card */}
      <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                {job.jobType}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700">
                {job.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {job.title}
            </h1>
            <p className="text-lg font-medium text-emerald-400">{job.company}</p>
          </div>

          {/* Apply CTA Button - Fixed id reference */}
          <div className="shrink-0">
            <Link
              href={`/jobs/${id}/apply`}
              className="w-full md:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-xl transition-all inline-block text-center"
            >
              Apply For This Position
            </Link>
          </div>
        </div>

        {/* Quick Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm pt-2">
          <div>
            <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Location
            </span>
            <span className="font-semibold text-zinc-200">
              {job.city}, {job.country} {job.isRemote && "(Remote)"}
            </span>
          </div>

          <div>
            <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Salary Range
            </span>
            <span className="font-semibold text-zinc-200">
              {job.minSalary} - {job.maxSalary} {job.currency}
            </span>
          </div>

          <div>
            <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Application Deadline
            </span>
            <span className="font-semibold text-zinc-200">
              {job.deadline || "Open until filled"}
            </span>
          </div>

          <div>
            <span className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
              Posted Date
            </span>
            <span className="font-semibold text-zinc-200">
              {job.createdAt ? new Date(job.createdAt.replace(/ISODate\('(.*?)'\)/, '$1')).toLocaleDateString() : "Recently"}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Responsibilities & Requirements */}
        <div className="lg:col-span-2 space-y-8">
          {/* Responsibilities */}
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-md space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Key Responsibilities
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
              {job.responsibilities}
            </p>
          </div>

          {/* Requirements */}
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-md space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Requirements & Qualifications
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
              {job.requirements}
            </p>
          </div>

          {/* Benefits */}
          {job.benefits && (
            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-md space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Benefits & Perks
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                {job.benefits}
              </p>
            </div>
          )}
        </div>

        {/* Right 1 Column: Company Summary Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-md space-y-6">
            <h3 className="text-lg font-bold text-white border-b border-zinc-800 pb-3">
              About the Employer
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Company Name</span>
                <span className="text-white font-bold">{job.company}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Contact Email</span>
                <span className="text-zinc-300">{job.recruiterEmail}</span>
              </div>
              <div className="pt-2">
                <button className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-all">
                  View Company Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;