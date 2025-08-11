import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ListingCard() {
    return (
        <div className="w-full h-[400px] relative group transition-all duration-500">
            <Image
                src="/home.jpg"
                alt="Home"
                fill
                className="w-full h-[500px] object-cover object-center rounded-2xl absolute top-0 left-0 transition-all duration-500"
            />

            <div className="absolute left-0 bottom-5 w-full">
                <div className="bg-white w-11/12 mx-auto rounded-lg px-3 py-2">
                    <div className="flex items-center justify-between border-b pb-2">
                        <div>
                            <h1 className="text-sm font-semibold">Dream House Reality</h1>
                            <span className="text-sm text-[#737373]">Location</span>
                        </div>
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                        <span className="text-lg font-semibold">
                            $ 515
                        </span>
                        <Button variant="primary" size="sm">
                            Detaylar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}