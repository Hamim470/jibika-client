import Link from "next/link";

const CtaBanner = () => {
  return (
    <section className="relative w-full py-28 bg-zinc-950 text-white overflow-hidden border-t border-zinc-800 flex flex-col items-center justify-center">
      
      {/* Curved Horizon Grid Background Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1400px] h-[550px] pointer-events-none overflow-hidden z-0">
        {/* Radial Blue / Emerald Glow Dome */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 via-blue-900/30 to-transparent rounded-t-[100%] blur-3xl opacity-70" />
        
        {/* SVG Curved Radar / Globe Grid Lines */}
        <svg className="absolute inset-0 w-full h-full text-blue-500/20" viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Concentric Arcs */}
          <ellipse cx="600" cy="500" rx="550" ry="350" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <ellipse cx="600" cy="500" rx="450" ry="280" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="600" cy="500" rx="350" ry="210" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
          <ellipse cx="600" cy="500" rx="250" ry="140" stroke="currentColor" strokeWidth="1" />
          
          {/* Radial Rays */}
          <line x1="600" y1="500" x2="100" y2="150" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="600" y1="500" x2="300" y2="80" stroke="currentColor" strokeWidth="0.8" />
          <line x1="600" y1="500" x2="600" y2="50" stroke="currentColor" strokeWidth="1" />
          <line x1="600" y1="500" x2="900" y2="80" stroke="currentColor" strokeWidth="0.8" />
          <line x1="600" y1="500" x2="1100" y2="150" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
        </svg>

        {/* Bottom Fade Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
        
        {/* Main Headline */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-[1.15]">
          Your next role is already looking for you
        </h2>

        {/* Subheadline */}
        <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-lg mx-auto">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all shadow-xl"
          >
            Create a free account
          </Link>
          <Link
            href="/pricing"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-white font-semibold text-sm hover:bg-zinc-800 hover:border-zinc-700 transition-all backdrop-blur-md"
          >
            View pricing
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CtaBanner;