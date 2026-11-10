"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const updateUserRole = async (userId, newRole) => {
    try {
        const data = await auth.api.setRole({
            body: {
                userId: userId, // Pass the dynamic user ID
                role: newRole,  // Pass the selected target role ("admin", "recruiter", or "seeker")
            },
            headers: await headers(),
        });
        revalidatePath('/dashboard/admin/users');
        return { success: true, data };
    } catch (err) {
        console.error("Failed to update user role:", err);
        return { success: false, error: err.message };
    }
};