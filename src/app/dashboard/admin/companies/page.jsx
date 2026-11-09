
import { revalidatePath } from "next/cache";
import { updateCompany } from '@/lib/actions/companies';
import { getCompanies } from "@/lib/api/companies";

// Server action wrapper for toggling company status
async function handleApprove(companyId, newStatus) {
    "use server";
    console.log("------");
    try {
        await updateCompany(companyId, newStatus);
        revalidatePath("/dashboard/admin/companies");
    } catch (err) {
        console.error("Failed to update company status:", err);
    }
}

const AdminCompaniesPage = async () => {
    const companies = await getCompanies();
    const companyList = Array.isArray(companies) ? companies : [];

    const pendingCount = companyList.filter(c => (c.status || "pending") === "pending").length;
    const approvedCount = companyList.filter(c => c.status === "approved").length;

    return (
        <div className="space-y-8 pb-16 mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                        Manage Companies
                        {pendingCount > 0 && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                {pendingCount} Pending Review
                            </span>
                        )}
                    </h1>
                    <p className="mt-1 text-sm text-zinc-400">
                        Review, approve, or reject company registrations across the platform.
                    </p>
                </div>

                <div className="px-4 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center gap-4 shadow-lg">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Total</span>
                        <span className="text-sm font-bold text-white">{companyList.length}</span>
                    </div>
                    <div className="w-px h-6 bg-zinc-800" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Approved</span>
                        <span className="text-sm font-bold text-emerald-400">{approvedCount}</span>
                    </div>
                </div>
            </div>

            {/* Companies Table Container */}
            <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800 overflow-hidden shadow-2xl backdrop-blur-md">
                {companyList.length === 0 ? (
                    <div className="p-16 text-center space-y-3">
                        <div className="w-12 h-12 bg-zinc-800/60 rounded-full flex items-center justify-center mx-auto text-zinc-400 text-xl">
                            🏢
                        </div>
                        <p className="text-zinc-400 text-sm">No company registrations found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-zinc-800 bg-zinc-950/60 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    <th className="py-4 px-6">Company Name</th>
                                    <th className="py-4 px-6">Recruiter Email</th>
                                    <th className="py-4 px-6">Industry</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6">Date Submitted</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/60 text-sm">
                                {companyList.map((company) => {
                                    const status = company.status || "pending";
                                    const formattedDate = company.createdAt
                                        ? new Date(company.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                                        : "Recent";
                                    const initials = company.name ? company.name.substring(0, 2).toUpperCase() : "JB";

                                    return (
                                        <tr key={company._id} className="hover:bg-zinc-800/30 transition-colors">
                                            {/* Company Name & Website */}
                                            <td className="py-4 px-6 font-medium text-white">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 flex items-center justify-center font-bold text-xs text-emerald-400 shrink-0 shadow-inner">
                                                        {initials}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-semibold text-white tracking-tight truncate max-w-[200px]">
                                                            {company.name}
                                                        </span>
                                                        {company.website ? (
                                                            <a
                                                                href={company.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs text-emerald-400 hover:underline truncate max-w-[180px]"
                                                            >
                                                                {company.website.replace(/^https?:\/\//, '')}
                                                            </a>
                                                        ) : (
                                                            <span className="text-xs text-zinc-500">No website</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Recruiter Email */}
                                            <td className="py-4 px-6 text-zinc-300 text-xs">
                                                <span className="px-2.5 py-1 rounded-lg bg-zinc-950/60 border border-zinc-800/80 font-mono">
                                                    {company.recruiterEmail || "N/A"}
                                                </span>
                                            </td>

                                            {/* Industry */}
                                            <td className="py-4 px-6 text-zinc-300 text-xs font-medium">
                                                {company.category || "General"}
                                            </td>

                                            {/* Status Badge */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${status === "approved"
                                                        ? "bg-emerald-950/50 text-emerald-400 border-emerald-800/60"
                                                        : status === "pending"
                                                            ? "bg-amber-950/50 text-amber-400 border-amber-800/60"
                                                            : "bg-red-950/50 text-red-400 border-red-800/60"
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${status === "approved" ? "bg-emerald-400" : status === "pending" ? "bg-amber-400" : "bg-red-400"
                                                        }`} />
                                                    {status}
                                                </span>
                                            </td>

                                            {/* Date Submitted */}
                                            <td className="py-4 px-6 text-zinc-400 text-xs">
                                                {formattedDate}
                                            </td>

                                            {/* Conditional Action Buttons */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {(status === "pending" || status === "rejected") && (
                                                        <form action={async () => {
                                                            "use server";
                                                            await handleApprove(company?._id, {status:'approved'});
                                                        }}>
                                                            <button
                                                                type="submit"
                                                                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md active:scale-95"
                                                            >
                                                                Approve
                                                            </button>
                                                        </form>
                                                    )}

                                                    {(status === "pending" || status === "approved") && (
                                                        <form action={async () => {
                                                            "use server";
                                                            await handleApprove(company?._id, {status:'rejected'});
                                                        }}>
                                                            <button
                                                                type="submit"
                                                                className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-red-600 hover:text-white text-zinc-300 text-xs font-semibold transition-all border border-zinc-700/80 active:scale-95"
                                                            >
                                                                Reject
                                                            </button>
                                                        </form>
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
};

export default AdminCompaniesPage;