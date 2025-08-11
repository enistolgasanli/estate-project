import Image from "next/image";
import { MdMeetingRoom } from "react-icons/md";
import { BsTextarea } from "react-icons/bs";
import { LuToilet } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { Button } from "@/components/ui/button";

type ListingCardsProps = {
    property: any;
}

export default function ListingCards({ property }: ListingCardsProps) {
    console.log(property);

    return (
        <div className="w-full rounded-xl p-5 flex items-center gap-x-3 bg-slate-50 border border-slate-300">
            <div className="relative w-[300px] h-[200px]">
                <Image
                    src="/home.jpg"
                    alt="Home"
                    fill
                    className="object-cover rounded-xl"
                />
            </div>
            <div className="w-full h-full space-y-1 flex flex-col">
                <div className="flex items-center gap-x-1 space-y-2">
                    <span className="text-lg font-semibold">
                        $ {Number(property.price).toLocaleString("tr-TR")}
                    </span>
                    {
                        property.listing_type === "rent" && (
                            <span className="text-sm text-[#737373]">
                                / Ay
                            </span>
                        )
                    }
                </div>
                <h1 className="font-semibold">
                    {property.title}
                </h1>
                <p className="text-sm text-[#737373] flex items-center">
                    <CiLocationOn className="size-5" />
                    {property.full_address}
                </p>
                <div className="w-full mt-5 flex items-center gap-x-4">
                    <div className="flex items-center bg-gray-200 px-2 py-1 rounded-full border border-gray-400 gap-x-1">
                        <MdMeetingRoom />
                        <span className="text-sm text-[#737373]">6 Room</span>
                    </div>
                    <div className="flex items-center bg-gray-200 px-2 py-1 rounded-full border border-gray-400 gap-x-1">
                        <BsTextarea />
                        <span className="text-sm text-[#737373]">100 m²</span>
                    </div>
                    <div className="flex items-center bg-gray-200 px-2 py-1 rounded-full border border-gray-400 gap-x-1">
                        <LuToilet />
                        <span className="text-sm text-[#737373]">2 Toilet</span>
                    </div>
                </div>
                <div className="mt-auto">
                    <Button variant="primary">
                        Details
                    </Button>
                </div>
            </div>
        </div>
    );
}