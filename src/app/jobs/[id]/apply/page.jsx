import { getUserSession } from "@/lib/core/session";
import { getJobById } from "@/lib/api/jobs";
import { redirect } from "next/navigation";
import Link from "next/link";
import ApplyForm from "./ApplyForm";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    
    // 1. Check user session
    const user = await getUserSession();
    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    // Restrict access to job seekers only
    if (user?.role !== "seeker") {
        return (
            <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6 text-zinc-100">
                <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-md space-y-4">
                    <span className="text-3xl">⚠️</span>
                    <h1 className="text-2xl font-bold text-white">Access Restricted</h1>
                    <p className="text-sm text-zinc-400">
                        Job applications can only be submitted by candidate accounts. You are currently signed in as a recruiter.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-all">
                            Go to Dashboard
                        </Link>
                        <Link href={`/jobs/${id}`} className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all">
                            Back to Job Details
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Fetch job details on the server
    const job = await getJobById(id);
    if (!job) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4 text-zinc-100">
                <h1 className="text-2xl font-bold">Job Not Found</h1>
                <p className="text-sm text-zinc-400">The job listing you are trying to apply for does not exist or has been removed.</p>
                <Link href="/jobs" className="inline-block px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs">
                    Browse All Jobs
                </Link>
            </div>
        );
    }

    const applications = (await getApplicationsByApplicant(user.id)) || [];

    const plan=await getPlanById(user?.plan || "seeker_free");
    console.log("-------->",plan);

    // Check if the user has reached their monthly limit
    const isLimitReached = applications.length >= plan.maxApplicationsPerMonth;

    return (
        <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 pb-20 text-zinc-100">
            {/* Back Navigation */}
            <div>
                <Link
                    href={`/jobs/${id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl"
                >
                    <span>←</span> Back to Job Details
                </Link>
            </div>

            {/* Header Summary */}
            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 shadow-xl backdrop-blur-md space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/60 inline-block">
                    {job.jobType}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Apply for: {job.title}
                </h1>
                <p className="text-sm font-medium text-emerald-400">
                    {job.company} • {job.city}, {job.country}
                </p>
            </div>

            {/* Conditional Rendering using JSX Ternary */}
            {isLimitReached ? (
                <div className="p-8 rounded-3xl bg-amber-950/40 border border-amber-800/60 shadow-xl backdrop-blur-md text-center space-y-4">
                    <span className="text-3xl">🚫</span>
                    <h2 className="text-xl font-bold text-amber-200">
                        Monthly Application Limit Reached
                    </h2>
                    <p className="text-sm text-zinc-300">
                        You have applied to <span className="font-semibold text-white">{applications.length}</span> out of <span className="font-semibold text-white">{plan.maxApplicationsPerMonth}</span> jobs allowed on your <span className="text-amber-400 font-semibold">{plan.name}</span> plan this month.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/plans"
                            className="inline-block px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-lg transition-all"
                        >
                            Upgrade Your Plan
                        </Link>
                    </div>
                </div>
            ) : (
                /* Interactive Application Form Component */
                <ApplyForm job={job} user={user} />
            )}
        </div>
    );
};

export default ApplyPage;