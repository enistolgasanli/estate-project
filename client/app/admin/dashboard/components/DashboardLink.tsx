"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";

type DashboardLinkProps = {
    icon: IconType;
    text: string;
    href: string;
}

export default function DashboardLink({ icon: Icon, text, href }: DashboardLinkProps) {
    const pathname = usePathname();
    
    return (
        <Link href={href} className={cn(
            "flex items-center gap-x-2 w-full text-[#737373] hover:bg-slate-100 px-4 py-3 rounded-lg",
            pathname === href && "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
            text === "Logout" && "text-rose-600"
        )}>
            <Icon className="size-5" />
            <span className="lg:block hidden text-sm font-semibold">
                {text}
            </span>
        </Link>
    );
}