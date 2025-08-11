import React from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardNavbar from "./components/DashboardNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex gap-x-8 w-full h-full bg-[#f9fbfc] p-4">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col w-full">
                <DashboardNavbar />
                {children}
            </div>
        </div>
    );
}