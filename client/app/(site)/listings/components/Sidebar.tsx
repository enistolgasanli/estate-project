"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import PropertyType from "./PropertyType";
import { CiLocationOn } from "react-icons/ci";
import PriceRange from "./PriceRange";
import Rooms from "./Rooms";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm, useFormContext } from "react-hook-form";
import { citiesData } from "@/app/options/options";

type SidebarProps = {
    hidden: boolean;
    onSubmit: () => void;
}

export default function Sidebar({ hidden, onSubmit }: SidebarProps) {
    const { watch, setValue, control } = useFormContext();
    const searchParams = useSearchParams();
    const [selectedFilters, setSelectedFilters] = useState<any>({});

    const activeListingType = watch('listing_type');
    const activePropertyType = watch("property_type_key");
    const selectedCity = watch("city_slug");
    const activeRooms = watch("rooms");

    useEffect(() => {
        const filters = {
            listing_type: searchParams.get("listing_type"),
            property_type_key: searchParams.get('property_type_key'),
            city_slug: searchParams.get('city_slug'),
            district_slug: searchParams.get('district_slug'),
        }

        setSelectedFilters(filters);
    }, [searchParams]);

    const handleListingTypeClick = (type: string) => {
        if (activeListingType === type) {
            setValue("listing_type", "");
        } else {
            setValue("listing_type", type);
        }

        onSubmit();
    };

    const handlePropertyTypeClick = (type: string) => {
        if (activePropertyType === type) {
            setValue("property_type_key", "");
        } else {
            setValue("property_type_key", type);
        }

        onSubmit();
    }

    const handleRoomClick = (room: string) => {
        if (activeRooms === room) {
            setValue("rooms", "");
        } else {
            setValue("rooms", room);
        }
        onSubmit();
    }

    return (
        <aside className={cn(
            "lg:w-1/5 w-full sticky top-[65px] self-start px-8 bg-white h-[calc(100vh-165px)] overflow-y-auto",
            hidden && "xl:w-0 xl:px-0 opacity-0 -translate-x-full"
        )}>
            <div className="flex items-center justify-center border h-[50px] w-full px-2 mt-2 rounded-lg gap-x-2">
                <Button
                    variant="ghost"
                    className={cn(
                        "flex-1 cursor-pointer transition-all duration-500",
                        activeListingType === "sale" && "bg-black/85 hover:bg-black text-white hover:text-white"
                    )}
                    onClick={() => handleListingTypeClick("sale")}
                >
                    Satılık
                </Button>
                <Button
                    variant="ghost"
                    className={cn(
                        "flex-1 cursor-pointer transition-all duration-500",
                        activeListingType === "rent" && "bg-black/85 hover:bg-black text-white hover:text-white"
                    )}
                    onClick={() => handleListingTypeClick("rent")}
                >
                    Kiralık
                </Button>
            </div>
            <div className="w-full mt-5">
                <PropertyType activePropertyType={activePropertyType} onPropertyTypeClick={handlePropertyTypeClick} />
            </div>
            <div className="mt-5">
                <h1 className="text-sm font-semibold">Şehir</h1>
                <Controller
                    control={control}
                    name="city_slug"
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => {
                                const newValue = value === '__all__' ? '' : value;
                                field.onChange(newValue);
                                setValue("district_slug", "");
                                onSubmit();
                            }}
                            value={field.value || '__all__'}
                        >
                            <SelectTrigger className="w-full mt-2 flex items-center justify-start cursor-pointer">
                                <CiLocationOn className="size-4" />
                                {field.value ? citiesData.find(city => city.value === field.value)?.title : "Şehir"}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Şehir</SelectLabel>
                                    <SelectItem value="__all__" className="cursor-pointer">Tüm Şehirler</SelectItem>
                                    {
                                        citiesData.map(city => (
                                            <SelectItem key={city.value} value={city.value} className="cursor-pointer">
                                                {city.title}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>

            <div className="mt-5">
                <h1 className="text-sm font-semibold">İlçe</h1>
                <Controller
                    control={control}
                    name="district_slug"
                    render={({ field }) => (
                        <Select
                            onValueChange={(value) => {
                                field.onChange(value === '__all__' ? '' : value);
                                onSubmit();
                            }}
                            value={field.value || '__all__'}
                            disabled={!selectedCity}
                        >
                            <SelectTrigger className="w-full mt-2 flex items-center justify-start cursor-pointer">
                                <CiLocationOn className="size-4" />
                                {field.value ? citiesData.find(city => city.value === selectedCity)?.districts.find(district => district.value === field.value)?.title : "İlçe"}
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>İlçe</SelectLabel>
                                    <SelectItem value="__all__" className="cursor-pointer">Tüm İlçeler</SelectItem>
                                    {
                                        selectedCity && citiesData.find(city => city.value === selectedCity)?.districts.map(district => (
                                            <SelectItem key={district.value} value={district.value} className="cursor-pointer">
                                                {district.title}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
            </div>

            <div className="w-full flex flex-col mt-5">
                <Controller
                    control={control}
                    name="price_range"
                    defaultValue={[0, 10000000]}
                    render={({ field: { value, onChange } }) => (
                        <PriceRange
                            value={value || [0, 10000000]}
                            onValueChange={(newValues: number[]) => {
                                onChange(newValues);
                                setValue("min_price", newValues[0]);
                                setValue("max_price", newValues[1]);
                                onSubmit();
                            }}
                        />
                    )}
                />
            </div>

            <div className="w-full mt-">
                <Rooms activeRooms={activeRooms} onRoomClick={handleRoomClick} />
            </div>
        </aside>
    );
}