"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ListingCard from "./components/ListingCard";
import ListingCards from "./components/ListingCards";
import Sidebar from "./components/Sidebar";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiSort } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

export default function Listings() {
    const router = useRouter();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const [hidden, setHidden] = useState<boolean>(false);
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
    const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

    const form = useForm<FieldValues>({
        defaultValues: {
            listing_type: searchParams.get('listing_type') || '',
            property_type: searchParams.get('property_type') || '',
            city_slug: searchParams.get('city_slug') || '',
            district_slug: searchParams.get('district_slug') || '',
            min_price: searchParams.get('min_price') || '0',
            max_price: searchParams.get('max_price') || '10000000',
            rooms: searchParams.get("rooms") || "",
        }
    });

    const { getValues } = form;

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);

            try {
                const queryString = searchParams.toString();
                const response = await axios.get(`http://localhost:8000/api/listings?${queryString}`);
                setProperties(response.data);
            } catch (error) {
                console.error("Veri alınırken bir hata oluştu: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [searchParams]);

    console.log(properties);

    useEffect(() => {
        const checkScreen = () => {
            const large = window.innerWidth >= 1024;
            setIsLargeScreen(large);
            setHidden(!large);
        }

        checkScreen();

        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const handleToggle = () => {
        if (isLargeScreen) {
            setHidden(!hidden);
        } else {
            setMobileSheetOpen(true);
        }
    }

    const onSubmit = () => {
        const data = getValues();
        const queryParams = new URLSearchParams();

        Object.keys(data).forEach(key => {
            if (data[key]) {
                queryParams.append(key, data[key]);
            }
        });

        router.push(`/listings?${queryParams.toString()}`);
    };

    return (
        <FormProvider {...form}>
            <div className="w-full h-full flex flex-col">
                <Navbar normal={false} sidebar={true} />
                <div className="flex w-full px-4 mt-[80px] gap-6">
                    {
                        isLargeScreen && (
                            <Sidebar hidden={hidden} onSubmit={onSubmit} />
                        )
                    }
                    <div className="lg:w-3/4 w-full flex-grow">
                        <div className="w-full h-[50px] flex items-center justify-between my-2">
                            <Button variant="ghost" className="cursor-pointer" onClick={handleToggle}>
                                <MdOutlineSpaceDashboard className="size-6" />
                            </Button>
                            <Select>
                                <SelectTrigger className="cursor-pointer">
                                    <BiSort />
                                    Sort by
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sort by</SelectLabel>
                                        <SelectItem value="asc">
                                            test
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <main className="w-full flex-grow overflow-y-auto h-[calc(100vh-165px)] hide-scrollbar">
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-3">
                                {
                                    properties.map((property: any) => (
                                        <ListingCards key={property.id} property={property} />
                                    ))
                                }
                            </div>
                        </main>
                    </div>
                </div>
                <Footer />

                {!isLargeScreen && (
                    <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                        <SheetContent side="left" className="p-0 w-[80%] sm:w-[300px]">
                            <SheetHeader>
                                <SheetTitle>Filtreler</SheetTitle>
                            </SheetHeader>
                            <Sidebar hidden={false} onSubmit={onSubmit} />
                        </SheetContent>
                    </Sheet>
                )}
            </div>
        </FormProvider>
    );
}