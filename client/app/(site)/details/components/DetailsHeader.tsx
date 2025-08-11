import { Button } from "@/components/ui/button";
import Image from "next/image";
import HouseProperties from "./HouseProperties";

export default function DetailsHeader() {
    return (
        <div className="w-full max-w-5/6 mx-auto mt-10">
            <div className="flex gap-x-8">
                <div className="relative md:w-6/12 w-full h-[400px]">
                    <Image
                        src="/home.jpg"
                        alt="Home"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>
                <div className="flex-1 md:flex hidden gap-x-8">
                    <div className="w-6/12 flex flex-col justify-between h-full">
                        <div className="relative w-full h-[190px]">
                            <Image
                                src="/home.jpg"
                                alt="Home"
                                fill
                                className="rounded-xl object-cover"
                            />
                        </div>
                        <div className="relative w-full h-[190px]">
                            <Image
                                src="/home.jpg"
                                alt="Home"
                                fill
                                className="rounded-xl object-cover"
                            />
                        </div>
                    </div>
                    <div className="relative w-full h-full">
                        <Image
                            src="/home.jpg"
                            alt="Home"
                            fill
                            className="rounded-xl object-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="mt-10 flex md:flex-row flex-col justify-between gap-x-8">
                <div className="md:w-6/12 w-full flex flex-col">
                    <h1 className="text-4xl font-semibold">$ 515</h1>
                    <div className="flex items-center justify-between mt-5">
                        <span className="underline text-[#111] text-sm font-semibold">
                            Pricing details and terms
                        </span>
                        <span className="text-[#111] text-sm font-semibold">
                            Location
                        </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                        <div>
                            <span className="text-4xl font-semibold">74</span> m²
                        </div>
                        <div>
                            <span className="text-4xl font-semibold">3</span> beds
                        </div>
                        <div>
                            <span className="text-4xl font-semibold">2</span> baths
                        </div>
                        <div>
                            <span className="text-4xl font-semibold">16</span> floor
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                        <Button variant="outline" className="w-5/12 rounded-lg cursor-pointer">
                            Contact Agent
                        </Button>
                        <Button variant="primary" className="w-5/12 rounded-lg cursor-pointer">
                            Contact us
                        </Button>
                    </div>
                </div>
                <div className="flex-1 md:mt-0 mt-10">
                    <h1 className="font-semibold">About Apartment</h1>
                    <p className="mt-5 text-sm text-[#737373]">
                        Discover your ideal urban retreat in this stunning 2-bedroom 3-bathroom apartment, perfectly situated in the vibrant heart of downtown.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 mt-5">
                        <HouseProperties text="Equipped kitchen" />
                        <HouseProperties text="Wi-Fi" />
                        <HouseProperties text="Lake view" />
                        <HouseProperties text="Free parking" />
                        <HouseProperties text="Swimming pool" />
                        <HouseProperties text="Light" />
                        <HouseProperties text="Air" />
                        <HouseProperties text="GYM" />
                    </div>
                </div>
            </div>
        </div>
    );
}