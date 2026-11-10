"use server";
import { headers } from "next/headers"
import { redirect } from "next/navigation" 
import { auth } from "../auth"

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    return session?.user || null;
};

// sy
export const getUserToken=async()=>{
    const session=await auth.api.getSession({
        headers: await headers()
    })
    return session?.session?.token || null;
}

export const requireRole = async (role) => {
    const user = await getUserSession();
    if(!user){
        redirect('/auth/signin');
    }
    if (!user || user.role !== role) {
        redirect("/unauthorized"); 
    }
    return user;
}