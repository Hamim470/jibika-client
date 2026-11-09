import DashboardSidebar from '@/component/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col lg:flex-row">
            {/* Sidebar navigation for desktop & mobile header */}
            <DashboardSidebar />

            {/* Main content viewport */}
            <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;