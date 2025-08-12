import { Button } from "@/components/ui/button";
import Image from "next/image";
import HouseProperties from "./HouseProperties";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type DetailsHeaderProps = {
    properties: any;
}

export default function DetailsHeader({ properties }: DetailsHeaderProps) {
    console.log(properties);

    return (
        <div className="w-full max-w-5/6 mx-auto mt-10">
            <div className="flex md:flex-row flex-col gap-x-8 gap-y-4">
                <div className="relative md:w-6/12 w-full h-[400px]">
                    <Image
                        src="/home.jpg"
                        alt="Home"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-[#191919] hover:bg-[#333] transition-all duration-500 cursor-pointer md:hidden block">
                            Tümünü gör
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] md:max-w-[700px] p-0 border-none bg-transparent">
                        <DialogTitle className="hidden" />
                        <Carousel className="w-full">
                            <CarouselContent>
                                {/* {
                                    properties.images.map((img: any, index: number) => (
                                        <CarouselItem key={index}>
                                            <div className="relative w-full h-[60vh] md:h-[70vh]">
                                                <Image
                                                    src={img.image}
                                                    alt="home"
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))
                                } */}
                                <CarouselItem>
                                    <div className="relative w-full h-[60vh] md:h-[70vh]">
                                        <Image
                                            src="/home.jpg"
                                            alt="home"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </DialogContent>
                </Dialog>
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
                    <div className="w-full h-full flex flex-col gap-y-3">
                        <div className="relative w-full h-full">
                            <Image
                                src="/home.jpg"
                                alt="Home"
                                fill
                                className="rounded-xl object-cover"
                            />
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-[#191919] hover:bg-[#333] transition-all duration-500 cursor-pointer">
                                    Tümünü gör
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[90vw] md:max-w-[700px] p-0 border-none">
                                <DialogTitle className="hidden" />
                                <Carousel className="w-full">
                                    <CarouselContent>
                                        {/* {images.map((img: any, index: number) => (
                                            <CarouselItem key={index}>
                                                <div className="relative w-full h-[60vh] md:h-[70vh]">
                                                    <Image
                                                        src={img.image}
                                                        alt={img.alt}
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))} */}
                                        <CarouselItem>
                                            <div className="relative w-full h-[60vh] md:h-[70vh]">
                                                <Image
                                                    src="/home.jpg"
                                                    alt="home"
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </CarouselItem>
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex md:flex-row flex-col justify-between gap-x-8">
                <div className="md:w-6/12 w-full flex flex-col">
                    <h1 className="text-4xl font-semibold flex items-center gap-x-1">
                        <FaTurkishLiraSign className="size-5" />
                        <div className="flex items-end gap-x-1">
                            {Number(properties.price).toLocaleString("tr-TR")}
                            {
                                properties.listing_type === "rent" && (
                                    <span className="text-lg text-[#595959]">/ ay</span>
                                )
                            }
                        </div>
                    </h1>
                    <div className="flex items-center justify-between mt-5">
                        <span className="flex-1 underline text-[#111] text-sm font-semibold">
                            Detaylar
                        </span>
                        <div className="text-[#111] flex-1 flex items-center justify-end gap-x-1">
                            <CiLocationOn className="size-5" />

                            <span className="text-sm font-semibold">
                                {properties.full_address}
                            </span>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                        <div>
                            <span className="text-4xl font-semibold">{properties.area_m2}</span> m²
                        </div>
                        <div>
                            <span className="text-4xl font-semibold">{properties.beds}</span> beds
                        </div>
                        <div>
                            <span className="text-4xl font-semibold">{properties.baths}</span> baths
                        </div>
                        <div>
                            <span className="text-4xl font-semibold">{properties.floor}</span> floor
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
                    <h1 className="font-semibold">{properties.property_type} Bilgileri</h1>
                    <p className="mt-5 text-sm text-[#737373]">
                        {properties.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 mt-5">
                        {
                            properties.features.map((feature: [], index: number) => (
                                <HouseProperties key={index} text="Equipped kitchen" />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}