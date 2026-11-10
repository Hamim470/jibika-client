
import Link from "next/link";

const ForbiddenPage = () => {
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl text-center space-y-6">
                {/* Warning Icon Badge */}
                <div className="w-16 h-16 rounded-2xl bg-red-950/40 border border-red-800/60 flex items-center justify-center mx-auto text-red-400 text-2xl shadow-inner">
                    🚫
                </div>

                {/* Heading & Description */}
                <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-red-400/90 bg-red-950/50 px-3 py-1 rounded-full border border-red-900/50">
                        Error 403 · Access Forbidden
                    </span>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight pt-2">
                        Restricted Area
                    </h1>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        You do not have the required administrative privileges or permissions to view this page. If you believe this is an error, please contact support.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center">
                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForbiddenPage;