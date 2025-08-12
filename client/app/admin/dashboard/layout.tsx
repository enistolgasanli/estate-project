import React from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardNavbar from "./components/DashboardNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" w-full h-full flex gap-x-8 bg-[#f9fbfc] p-4">
            <DashboardSidebar />
            <div className=" w-full flex-1 flex flex-col min-w-0">
                <DashboardNavbar />
                {children}
            </div>
        </div>
    );
}