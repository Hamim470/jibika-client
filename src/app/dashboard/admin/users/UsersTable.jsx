"use client";

import { updateUserRole } from "@/lib/actions/users";
import { useState } from "react";

export default function UsersTable({ initialUsers }) {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [loadingId, setLoadingId] = useState(null);

    // Filter logic
    const filteredUsers = initialUsers.filter((user) => {
        const matchesEmail = user.email?.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        return matchesEmail && matchesRole;
    });

    const handleRoleChange = async (userId, currentRole, userName) => {
        // Determine the next target role cycle or prompt admin
        const targetRole = currentRole === "admin" ? "seeker" : currentRole === "seeker" ? "recruiter" : "admin";
        
        const confirmed = window.confirm(`Are you sure you want to change ${userName}'s role from "${currentRole}" to "${targetRole}"?`);
        if (!confirmed) return;

        setLoadingId(userId);
        try {
            const res = await updateUserRole(userId, targetRole);
            if (res.success) {
                window.location.reload();
            } else {
                alert("Failed to update role: " + res.error);
                setLoadingId(null);
            }
        } catch (err) {
            console.error("Failed to update user role:", err);
            alert("An error occurred while updating the role.");
            setLoadingId(null);
        }
    };

    const handleSuspensionToggle = async (userId, isBanned, userName) => {
        const actionText = isBanned ? "activate" : "suspend";
        const confirmed = window.confirm(`Are you sure you want to ${actionText} ${userName}'s account?`);

        if (!confirmed) return;

        setLoadingId(userId);
        try {
            await toggleUserSuspension(userId, !isBanned);
            window.location.reload();
        } catch (err) {
            console.error("Failed to update user status:", err);
            alert("Failed to update account status.");
            setLoadingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 backdrop-blur-md">
                <div className="w-full sm:w-80">
                    <input
                        type="text"
                        placeholder="Search by email address..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                </div>

                <div className="w-full sm:w-auto flex items-center gap-3">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Role Filter:</span>
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                        <option value="all">All Roles</option>
                        <option value="seeker">Seeker</option>
                        <option value="recruiter">Recruiter</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            {/* Users Table Container */}
            <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 overflow-hidden shadow-2xl backdrop-blur-md">
                {filteredUsers.length === 0 ? (
                    <div className="p-16 text-center space-y-3">
                        <div className="w-12 h-12 bg-zinc-800/60 rounded-full flex items-center justify-center mx-auto text-zinc-400 text-xl">
                            👥
                        </div>
                        <p className="text-zinc-400 text-sm">No users found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    <th className="py-4 px-6">User Name</th>
                                    <th className="py-4 px-6">Email</th>
                                    <th className="py-4 px-6">Role</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6">Join Date</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/60 text-sm">
                                {filteredUsers.map((user) => {
                                    const role = user.role || "seeker";
                                    const isBanned = user.banned || false;
                                    const formattedDate = user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                                        : "Recent";
                                    const initials = user.name ? user.name.substring(0, 2).toUpperCase() : "U";
                                    const userId = user.id || user._id;
                                    const isBusy = loadingId === userId;

                                    return (
                                        <tr key={userId} className="hover:bg-zinc-800/30 transition-colors">
                                            <td className="py-4 px-6 font-medium text-white">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 flex items-center justify-center font-bold text-xs text-emerald-400 shrink-0 shadow-inner">
                                                        {initials}
                                                    </div>
                                                    <span className="font-semibold text-white tracking-tight truncate max-w-[180px]">
                                                        {user.name || "Unnamed User"}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6 text-zinc-300 text-xs">
                                                <span className="px-2.5 py-1 rounded-lg bg-zinc-950/60 border border-zinc-800/80 font-mono">
                                                    {user.email}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${
                                                    role === "admin"
                                                        ? "bg-purple-950/50 text-purple-400 border-purple-800/60"
                                                        : role === "recruiter"
                                                        ? "bg-blue-950/50 text-blue-400 border-blue-800/60"
                                                        : "bg-emerald-950/50 text-emerald-400 border-emerald-800/60"
                                                }`}>
                                                    {role}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${
                                                    !isBanned
                                                        ? "bg-emerald-950/50 text-emerald-400 border-emerald-800/60"
                                                        : "bg-red-950/50 text-red-400 border-red-800/60"
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${!isBanned ? "bg-emerald-400" : "bg-red-400"}`} />
                                                    {isBanned ? "Suspended" : "Active"}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6 text-zinc-400 text-xs">
                                                {formattedDate}
                                            </td>

                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* Role Switcher */}
                                                    <button
                                                        disabled={isBusy}
                                                        onClick={() => handleRoleChange(userId, role, user.name)}
                                                        className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-all border border-zinc-700/80 active:scale-95 disabled:opacity-50 cursor-pointer"
                                                    >
                                                        {role === "admin" ? "Demote to Seeker" : role === "seeker" ? "Make Admin / Recruiter" : "Make Admin"}
                                                    </button>

                                                    {/* Suspension Toggle */}
                                                    {role !== "admin" && (
                                                        <button
                                                            disabled={isBusy}
                                                            onClick={() => handleSuspensionToggle(userId, isBanned, user.name)}
                                                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border active:scale-95 disabled:opacity-50 cursor-pointer ${
                                                                isBanned
                                                                    ? "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500"
                                                                    : "bg-zinc-900 hover:bg-red-600 hover:text-white text-red-400 border-red-900/60"
                                                            }`}
                                                        >
                                                            {isBanned ? "Activate" : "Suspend"}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}