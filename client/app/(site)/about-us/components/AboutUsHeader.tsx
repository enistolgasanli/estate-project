import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import Image from "next/image";
import { CiMail, CiPhone } from "react-icons/ci";
import AboutUsHeaderTitle from "./AboutUsHeaderTitle";

export default function AboutUsHeader() {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-5/6">
                <AboutUsHeaderTitle />
                <div className="relative w-full h-[500px] mt-10">
                    <Image
                        src="/architect.jpg"
                        alt="Architect"
                        fill
                        className="object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-3xl" />
                    <div className="flex flex-col absolute bg-white top-1/2 -translate-y-1/2 md:right-5 right-4 md:w-1/2 w-11/12 h-[460px] rounded-3xl">
                        <h1 className="text-center mt-10 font-semibold text-lg">İletişime Geçin</h1>
                        <form action="" className="w-full mt-10 px-5 space-y-5">
                            <div className="w-full flex items-center justify-between gap-x-4">
                                <Input placeholder="Ad Soyad" className="inline-block" />
                                <Input placeholder="Email" className="inline-block" />
                            </div>
                            <div className="w-full flex items-center justify-between gap-x-4">
                                <Input placeholder="Telefon Numarası" className="inline-block" />
                                <Select>
                                    <SelectTrigger className="w-full">
                                        Durum
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Durum</SelectLabel>
                                            <SelectItem value="buy">Satılık</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full flex items-center justify-between gap-x-4">
                                <Select>
                                    <SelectTrigger className="w-full">
                                        Şehir
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Şehir</SelectLabel>
                                            <SelectItem value="ist">İstanbul</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        İlçe
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>İlçe</SelectLabel>
                                            <SelectItem value="kdy">Kadıköy</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button variant="primary">
                                Gönder
                            </Button>
                        </form>
                        <div className="flex items-center justify-between px-5 py-4 mt-auto">
                            <div className="flex items-center justify-center gap-x-2">
                                <CiMail className="size-5" />
                                <span className="text-sm font-semibold text-[#333]">example@test.com</span>
                            </div>
                            <div className="flex items-center justify-center gap-x-2">
                                <CiPhone className="size-5" />
                                <span className="text-sm font-semibold text-[#333]">(406) - 89 90</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}