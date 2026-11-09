import { Suspense } from "react";
import { getJobs } from "@/lib/api/jobs";
import JobsPage from "./JobsPage";

const Jobs = async () => {
    const jobs = await getJobs();
    return (
        <Suspense fallback={<div className="p-12 text-center text-zinc-400">Loading career opportunities...</div>}>
            <JobsPage allJobs={jobs} />
        </Suspense>
    );
};

export default Jobs;