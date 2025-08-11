import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaTurkishLiraSign } from "react-icons/fa6";

type CardProps = {
    title: string;
    listing: {
        title: string;
        description: string;
        price: string;
        city: string;
        district: string;
    }
}

export default function Card({ title, listing }: CardProps) {
    console.log(listing.city)
    console.log(listing.district)

    return (
        <div className="w-full h-[500px] mt-10 relative group transition-all duration-500">
            <Image src="/home.jpg" alt="Home" fill className="w-full h-[500px] object-cover rounded-2xl absolute top-0 left-0 transition-all duration-500" />
            <div className="absolute top-0 left-0 w-full h-full bg-black/65 bg-opacity-40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="w-[100px] absolute left-5 top-8 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000">
                <span className="bg-white px-3 py-2 rounded-full font-semibold text-sm">
                    {title}
                </span>
            </div>

            <div className="w-full absolute px-4 left-0 bottom-5 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 text-white">
                <h1 className="text-white text-2xl">{listing.title}</h1>
                <div className="mt-5">
                    <p className="text-[#dbdbdb]">
                        Location: {listing.city}, {listing.district}
                    </p>
                    <p className="text-[#dbdbdb] flex items-center gap-x-2">
                        <span>Price:</span>
                        <span className="flex items-center justify-center">
                            <FaTurkishLiraSign className="size-3" />
                            {Number(listing.price).toLocaleString("tr-TR")}
                        </span>
                    </p>
                </div>
                <div className="mt-5">
                    <Button variant="primary" className="w-full">
                        Detaylar
                    </Button>
                </div>
            </div>
        </div>
    );
}