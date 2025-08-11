"use client";

import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Search from "./Search";
import { Form } from "@/components/ui/form";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    const form = useForm<FieldValues>({
        defaultValues: {
            listing_type: '',
            property_type_key: '',
            city_slug: '',
            district_slug: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
        const queryParams = new URLSearchParams();

        if (data.listing_type) queryParams.append('listing_type', data.listing_type);
        if (data.property_type_key) queryParams.append('property_type_key', data.property_type_key);
        if (data.city_slug) queryParams.append('city_slug', data.city_slug);
        if (data.district_slug) queryParams.append('district_slug', data.district_slug);

        router.push(`/listings?${queryParams.toString()}`);
    }

    return (
        <section className="w-full h-screen flex flex-col justify-center bg-[linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0.5)),url('/header-image.jpg')] bg-cover bg-center bg-no-repeat">
            <Navbar normal={true} />
            <div className="flex flex-col items-center justify-center gap-y-4 md:mt-50 mt-20">
                <h1 className="text-6xl text-center text-white">Mükemmel Evi Bulun</h1>
                <p className="text-[#dbdbdb] text-center">
                    Satın alıyor, satıyor ya da hiçbir şey yapmıyor olsanız da mutlu olacaksınız.
                </p>
                <Button variant="primary">
                    Keşfet
                </Button>
            </div>
            <div className="w-full flex items-center justify-center bg-white mt-auto rounded-tl-xl rounded-tr-xl py-10">
                <div className="w-full max-w-5/6">
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex md:flex-row flex-col items-center justify-between gap-y-4 gap-x-2">
                            <Search
                                control={form.control}
                                name="listing_type"
                                placeholder="Durum"
                                label="Durum"
                                selectItem={[
                                    { "value": "sale", "title": "Satılık" },
                                    { "value": "rent", "title": "Kiralık" },
                                ]}
                            />
                            <Search
                                control={form.control}
                                name="property_type_key"
                                placeholder="Kategori"
                                label="Kategori"
                                selectItem={[
                                    { "value": "apartment", "title": "Apartman" },
                                    { "value": "villa", "title": "Villa" },
                                    { "value": "independent", "title": "Müstakil Ev" },
                                    { "value": "residence", "title": "Rezidans" },
                                ]}
                            />
                            <Search
                                control={form.control}
                                name="city_slug"
                                placeholder="Şehir"
                                label="Şehir"
                                selectItem={[
                                    { "value": "ist", "title": "İstanbul" },
                                    { "value": "izm", "title": "İzmir" },
                                ]}
                            />
                            <Search
                                control={form.control}
                                name="district_slug"
                                placeholder="İlçe"
                                label="İlçe"
                                selectItem={[
                                    { "value": "kadikoy", "title": "Kadıköy" },
                                    { "value": "bornova", "title": "Bornova" },
                                ]}
                            />

                            <Button variant="primary" type="submit" className="md:w-[100px] w-full">
                                <CiSearch className="size-5" />
                                Ara
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </section>
    )
}