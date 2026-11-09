import { protectedFetch, serverFetch } from "../core/server";

export const getCompanies=async()=>{
    return protectedFetch(`/api/companies`);
}

export const getRecruiterCompany=async(recruiterId)=>{
    return await serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
}