import { cn } from "@/lib/utils";
import { FaHome, FaBuilding } from "react-icons/fa";
import { MdVilla } from "react-icons/md";
import { BsBuildingsFill } from "react-icons/bs";


type PropertyTypeProps = {
    activePropertyType: string;
    onPropertyTypeClick: (type: string) => void;
}

export default function PropertyType({ activePropertyType, onPropertyTypeClick }: PropertyTypeProps) {
    console.log(activePropertyType);

    return (
        <div>
            <h1 className="text-sm font-semibold">
                Mülk
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-3 mt-3">
                <div
                    className={cn(
                        "flex flex-col items-center justify-center bg-gray-100 py-4 rounded-xl w-[90px] h-[68px] cursor-pointer transition-all duration-500",
                        activePropertyType === "apartment" && "bg-yellow-100 hover:bg-yellow-200 text-yellow-700 hover:text-yellow-700"
                    )}
                    onClick={() => onPropertyTypeClick("apartment")}
                >
                    <FaBuilding />
                    <span className="text-sm font-semibold">
                        Daire
                    </span>
                </div>
                <div
                    className={cn(
                        "flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer py-4 rounded-xl w-[90px] h-[68px] transition-all duration-500",
                        activePropertyType === "residence" && "bg-yellow-100 hover:bg-yellow-200 text-yellow-700 hover:text-yellow-700"
                    )}
                    onClick={() => onPropertyTypeClick("residence")}
                >
                    <BsBuildingsFill />
                    <span className="text-sm font-semibold">
                        Rezidans
                    </span>
                </div>
                <div
                    className={cn(
                        "flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer py-4 rounded-xl w-[90px] h-[68px] transition-all duration-500",
                        activePropertyType === "independent" && "bg-yellow-100 hover:bg-yellow-200 text-yellow-700 hover:text-yellow-700"
                    )}
                    onClick={() => onPropertyTypeClick("independent")}
                >
                    <FaHome />
                    <span className="text-sm font-semibold">
                        Müstakil Ev
                    </span>
                </div>
                <div
                    className={cn(
                        "flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer py-4 rounded-xl w-[90px] h-[68px] transition-all duration-500",
                        activePropertyType === "villa" && "bg-yellow-100 hover:bg-yellow-200 text-yellow-700 hover:text-yellow-700"
                    )}
                    onClick={() => onPropertyTypeClick("villa")}
                >
                    <MdVilla />
                    <span className="text-sm font-semibold">
                        Villa
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer py-4 rounded-xl w-[90px] h-[68px] transition-all duration-500">
                    <FaHome />
                    <span className="text-sm font-semibold">
                        Köşk
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer py-4 rounded-xl w-[90px] h-[68px] transition-all duration-500">
                    <FaHome />
                    <span className="text-sm font-semibold">
                        Yalı
                    </span>
                </div>
            </div>
        </div>
    );
}