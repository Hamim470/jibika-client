import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';
import Link from 'next/link';


const SeekerApplicationsPage = async () => {
    const user = await getUserSession();
    const applications = await getApplicationsByApplicant(user?.id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">My Job Applications</h1>
                <p className="text-sm text-zinc-400 mt-1">
                    Track the status of the positions you have applied for.
                </p>
            </div>

            {(!applications || applications.length === 0) ? (
                <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4">
                    <p className="text-zinc-400 text-sm">You haven't submitted any job applications yet.</p>
                    <Link
                        href="/jobs"
                        className="inline-block px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                    >
                        Browse Available Jobs
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {applications.map((app) => (
                        <div
                            key={app._id}
                            className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all hover:border-zinc-700"
                        >
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold text-white tracking-tight">
                                    {app.jobTitle || "Position Title Unavailable"}
                                </h3>
                                <p className="text-sm text-emerald-400 font-medium">
                                    {app.company || "Company Name"}
                                </p>
                                <p className="text-xs text-zinc-500">
                                    Applied on: {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "Recent"}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                                    Submitted
                                </span>
                                {app.jobId && (
                                    <Link
                                        href={`/jobs/${app.jobId}`}
                                        className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs transition-colors"
                                    >
                                        View Job
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SeekerApplicationsPage;