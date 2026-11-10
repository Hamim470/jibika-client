import { Suspense } from "react";
import { getJobs } from "@/lib/api/jobs";
import JobsPage from "./JobsPage";

const Jobs = async ({searchParams}) => {
    const filters=await searchParams;
    
    const querySearch=new URLSearchParams(filters);
    const queryString=querySearch.toString();
    
    const {jobs,total} = await getJobs(queryString);
    return (
        <Suspense fallback={<div className="p-12 text-center text-zinc-400">Loading career opportunities...</div>}>
            <JobsPage filters={filters} jobs={jobs || []} total={total} />
        </Suspense>
    );
};

export default Jobs;