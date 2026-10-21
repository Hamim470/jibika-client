import Image from "next/image";

const StatsSection = () => {
  const stats = [
    { 
      label: "Active Jobs", 
      value: "12,450+", 
      description: "Open career opportunities across Bangladesh" 
    },
    { 
      label: "Partner Companies", 
      value: "1,800+", 
      description: "Verified employers, startups, and enterprises" 
    },
    { 
      label: "Job Seekers", 
      value: "45,000+", 
      description: "Skilled professionals building their future" 
    },
    { 
      label: "Satisfaction Rate", 
      value: "98.5%", 
      description: "Trusted by candidates and recruiters alike" 
    },
  ];

  return (
    <section className="relative w-full py-20 bg-zinc-950 border-y border-zinc-800 overflow-hidden">
      
      {/* Background Map Image Layer using Next.js Image component */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <Image 
          src="/bangladeshMap.png" 
          alt="Bangladesh Map Background" 
          fill
          priority
          className="object-cover object-center mix-blend-luminosity"
        />
        {/* Gradient Overlay to fade the edges into the dark theme */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/50">
            Platform Impact
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connecting Talent Across Bangladesh
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Empowering organizations and job seekers with a fast, transparent, and data-driven hiring marketplace.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-lg group"
            >
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  {stat.value}
                </p>
                <h3 className="mt-2 text-base font-semibold text-emerald-400">
                  {stat.label}
                </h3>
              </div>
              <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;