"use server";

import { serverMutation } from "../core/server";

export const createCompany=async(newCompanyData)=>{
    return serverMutation('/api/companies',newCompanyData);
}

export const updateCompany=async(id,data)=>{
    return serverMutation(`/api/companies/${id}`,data,'PATCH');
}