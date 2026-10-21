import Link from "next/link";

const FeaturedJobs = () => {
  // Hand-picked sample listings matching your project design layout
  const jobs = [
    {
      id: "1",
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Ltd.",
      description: "Build robust scalable web applications utilizing Next.js, Node.js, and MongoDB.",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      salary: "৳80k–৳120k/mo",
    },
    {
      id: "2",
      title: "UI/UX & Graphic Designer",
      company: "Creative Studio BD",
      description: "Design intuitive user interfaces and brand assets using Canva and modern design systems.",
      location: "Chittagong (Remote)",
      type: "Contract",
      salary: "৳45k–৳65k/mo",
    },
    {
      id: "3",
      title: "Medical Consultant & Clinician",
      company: "Care Specialized Hospital",
      description: "Provide patient consultation, digital prescriptions, and skincare advisory services.",
      location: "Gulshan, Dhaka",
      type: "Full-time",
      salary: "৳90k–৳140k/mo",
    },
    {
      id: "4",
      title: "E-Commerce Operations Lead",
      company: "BHIKS Retail Group",
      description: "Manage multi-channel storefront performance across Daraz, Etsy, and social channels.",
      location: "Sylhet, Bangladesh",
      type: "Full-time",
      salary: "৳50k–৳75k/mo",
    },
    {
      id: "5",
      title: "React.js & Next.js Developer",
      company: "NextGen Software",
      description: "Develop high-performance front-end components and integrate secure payment gateways.",
      location: "Remote",
      type: "Remote",
      salary: "৳60k–৳90k/mo",
    },
    {
      id: "6",
      title: "Digital Marketing Specialist",
      company: "Growthify Media",
      description: "Plan and execute targeted ad campaigns, SEO strategies, and lead generation workflows.",
      location: "Banani, Dhaka",
      type: "Full-time",
      salary: "৳40k–৳60k/mo",
    },
  ];

  return (
    <section className="w-full py-20 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              SMART JOB DISCOVERY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            The roles you&apos;d never find by searching
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            Hand-picked opportunities from top-tier verified companies and enterprises across Bangladesh.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-7 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 transition-all shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* Company Name Badge */}
                <span className="text-xs font-medium text-emerald-400 mb-2 block">
                  {job.company}
                </span>

                {/* Job Title */}
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                  {job.title}
                </h3>

                {/* Job Description */}
                <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                  {job.description}
                </p>
              </div>

              {/* Badges / Tags */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {/* Location Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </span>

                  {/* Job Type Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round2" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {job.type}
                  </span>

                  {/* Salary Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-900/50">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round2" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.salary}
                  </span>
                </div>

                {/* Apply Link / Button */}
                <div className="flex items-center justify-between pt-2">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    Apply Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/jobs"
            className="px-8 py-3.5 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl"
          >
            View all jobs open
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedJobs;