import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineSpaceDashboard, MdWavingHand } from "react-icons/md";

export default function DashboardNavbar() {
    return (
        <div className="w-full bg-white rounded-2xl shadow-md py-4 px-3">
            <div className="flex items-center justify-between">
                <div className="w-1/3 flex items-center gap-x-4">
                    <h1 className="text-sm font-semibold">Hello Admin</h1>
                    <MdWavingHand className="text-yellow-600 size-5" />
                </div>
                <MdOutlineSpaceDashboard className="size-6 md:hidden block cursor-pointer" />
                <div className="md:flex hidden items-center justify-center gap-x-4">
                    <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-full cursor-pointer">
                        <IoIosNotifications className="text-[#737373] size-6" />
                    </div>
                    <Avatar className="w-12 h-12">
                        <AvatarImage src="/user.png" />
                    </Avatar>
                </div>
            </div>
        </div>
    );
}