"use client";

import { MdOutlineRealEstateAgent, MdOutlineSpaceDashboard } from "react-icons/md";
import DashboardLink from "./DashboardLink";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { AiOutlineTransaction } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { FiLogOut } from "react-icons/fi";


export default function DashboardSidebar() {
    return (
        <div className="md:flex hidden flex-col items-center lg:w-64 w-auto h-full bg-white rounded-2xl shadow-md p-4">
            <div className="lg:block hidden">
                Logo
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center gap-y-3 mt-5">
                <DashboardLink icon={MdOutlineSpaceDashboard} text="Dashboard" href="/admin/dashboard" />
                <DashboardLink icon={IoMdHome} text="Property" href="/admin/properties" />
                <DashboardLink icon={TbBrandGoogleAnalytics} text="Analytics" href="/admin/dashboard/properties" />
                <DashboardLink icon={MdOutlineRealEstateAgent} text="Agents" href="#" />
                <DashboardLink icon={AiOutlineTransaction} text="Transaction" href="#" />
                <DashboardLink icon={BiSupport} text="Help & Support" href="#" />
                <DashboardLink icon={IoMdSettings} text="Settings" href="#" />
                <div className="w-full mt-auto">
                    <Button variant="ghost" size="lg" className="w-full justify-start text-rose-600 hover:text-rose-600 cursor-pointer">
                        <FiLogOut className="size-5" />
                        <span className="lg:block hidden">
                            Logout
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}