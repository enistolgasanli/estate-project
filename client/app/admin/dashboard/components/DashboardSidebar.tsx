"use client";
import { FiSettings } from "react-icons/fi";
import { MdOutlineRealEstateAgent, MdOutlineSpaceDashboard } from "react-icons/md";
import DashboardLink from "./DashboardLink";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { AiOutlineTransaction } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { FiLogOut } from "react-icons/fi";
import { PiHouseLine } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function DashboardSidebar() {
    const router = useRouter();


    const handleLogout = () => {
        axios.post("http://localhost:8000/api/auth/logout").then(res => {
            if (res.status === 200) {
                console.log("Logout success");
                router.push("/admin");
            }
        }).catch(error => {
            console.log("Something went wrong", error);
        });
    }

    return (
        <div className="md:flex hidden flex-col items-center lg:w-64 w-auto h-full bg-white rounded-2xl shadow-md p-4">
            <div className="lg:block hidden">
                <Image src="/logo.png" alt="Logo" width={65} height={65} />
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center gap-y-3 mt-5">
                <DashboardLink icon={PiHouseLine} text="İlanlar" href="/admin/dashboard" />
                <DashboardLink icon={TbBrandGoogleAnalytics} text="Analiz" href="/admin/dashboard/analytics" />
                <DashboardLink icon={MdOutlineRealEstateAgent} text="Danışmanlar" href="#" />
                <DashboardLink icon={BiSupport} text="Yardım & Destek" href="#" />
                <DashboardLink icon={FiSettings} text="Ayarlar" href="#" />
                <div className="w-full mt-auto">
                    <Button onClick={handleLogout} variant="ghost" size="lg" className="w-full justify-start text-rose-600 hover:text-rose-600 cursor-pointer">
                        <FiLogOut className="size-5" />
                        <span className="lg:block hidden">
                            Çıkış Yap
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}