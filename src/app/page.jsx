import StatsSection from "@/component/StatsSection";
import FeaturedJobs from "@/component/FeaturedJobs";
import FeaturesSection from "@/component/FeaturesSection";
import PricingSection from "@/component/PricingSection";
import CtaBanner from "@/component/CtaBanner";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-950 font-sans">
      <StatsSection />
      <FeaturedJobs />
      <FeaturesSection/>
      <PricingSection/>
      <CtaBanner/>
    </div>
  );
}