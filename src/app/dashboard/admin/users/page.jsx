
import { getUsersList } from "@/lib/api/users";
import UsersTable from "./UsersTable";

const AdminUsersPage = async () => {
    const data = await getUsersList();
    const users = data?.users || [];

    const seekerCount = users.filter(u => u.role === "seeker").length;
    const recruiterCount = users.filter(u => u.role === "recruiter").length;

    return (
        <div className="space-y-8 pb-16 mx-auto max-w-7xl">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        Manage Users
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {users.length} Total Users
                        </span>
                    </h1>
                    <p className="mt-1 text-sm text-zinc-400">
                        View platform users, filter by email or role, update permissions, and suspend accounts.
                    </p>
                </div>

                <div className="px-4 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center gap-4 shadow-lg">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Seekers</span>
                        <span className="text-sm font-bold text-white">{seekerCount}</span>
                    </div>
                    <div className="w-px h-6 bg-zinc-800" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Recruiters</span>
                        <span className="text-sm font-bold text-blue-400">{recruiterCount}</span>
                    </div>
                </div>
            </div>

            {/* Interactive Users Table Component */}
            <UsersTable initialUsers={users} />
        </div>
    );
};

export default AdminUsersPage;