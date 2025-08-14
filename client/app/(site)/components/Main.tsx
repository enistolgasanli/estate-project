"use client";

import { useEffect, useState } from "react";
import Card from "./Card";
import { FaHouse } from "react-icons/fa6";
import axios from "axios";

type Listing = {
    id: string;
    title: string;
    description: string;
    price: string;
    city: {
        name: string;
    };
    district: {
        name: string;
    };
    address: string;
    listing_type: "sale" | "rent";
    created_at: string;
    is_active: boolean;
}

export default function Main() {
    const [buyListings, setBuyListings] = useState<Listing[]>([]);
    const [rentListings, setRentListings] = useState<Listing[]>([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/listings").then(res => {
            if (res.status === 200) {
                const listings = res.data as Listing[];

                const buy = listings.filter(item => item.listing_type === "sale");
                const rent = listings.filter(item => item.listing_type === "rent");

                setBuyListings(buy);
                setRentListings(rent);
            }
        });
    }, []);

    return (
        <main className="w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-4/5 mx-auto mt-20">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl">Buy</h1>
                    <p className="flex items-center justify-center gap-x-2">
                        <FaHouse className="size-5 text-yellow-700" />
                        <span className="text-[#737373]">
                            Hayalinizdeki eve sahip olabilirsiniz.
                        </span>
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mt-10">
                    {
                        buyListings.map(listing => (
                            <Card title="Satılık" key={listing.id} listing={listing} />
                        ))
                    }
                </div>
            </div>
            <div className="w-full max-w-4/5 mt-20">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl">Rent</h1>
                    <p className="flex items-center justify-center gap-x-2">
                        <FaHouse className="size-5 text-yellow-700" />
                        <span className="text-[#737373]">
                            Güzel bir ev kiralayabilirsiniz.
                        </span>
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mt-10">
                    {
                        rentListings.map(listing => (
                            <Card title="Kiralık" key={listing.id} listing={listing} />
                        ))
                    }
                </div>
            </div>
        </main>
    );
}