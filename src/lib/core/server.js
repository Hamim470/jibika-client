import { redirect } from "next/dist/server/api-utils";
import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// sy
export const authHeader = async () => {
    const token = await getUserToken();
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    // handle 401,404,403
    return res.json();
}

// sy
export const protectedFetch=async(path)=>{
    const res = await fetch(`${baseUrl}${path}`,
        {
            headers: await authHeader()
        }
    );

    // handle 401,404,403
    
    return handleStatusCode(res);
}

export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...await authHeader() //sy
        },
        body: JSON.stringify(data),
    });

    return handleStatusCode(res);
};

// handle 401,404,403
const handleStatusCode=res=>{
    if(res.status===401){
        redirect('/unauthorized')
    }
    else if(res.status===403){
        redirect('/forbidden')
    }
    return res.json();
}