import { serverFetch } from "../core/server"

export const getJobs=async(queryString)=>{
    return serverFetch(`/api/jobs?${queryString}`)
}

export const getJobById=async(jobId)=>{
    return serverFetch(`/api/jobs/${jobId}`)
}

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;
export const getCompanyJobs = async (companyId) => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}`, {
        cache: 'no-store',
    });
    return res.json();
};