import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { TbMenuDeep } from "react-icons/tb";

type NavbarProps = {
    normal: boolean;
    sidebar?: boolean;
}

export default function Navbar({ normal, sidebar }: NavbarProps) {
    return (
        <nav className={cn(
            "w-full mt-5",
            normal === false && "border-b mt-0 z-99 bg-white",
            sidebar === true && "fixed"
        )}>
            <div className={cn(
                normal === true ? "max-w-5/6 mx-auto flex items-center justify-between rounded-full bg-white px-3" : "max-w-full pl-12 pr-5 mx-auto flex items-center justify-between"
            )}>
                <Link href="/">
                    <Image src="/logo.png" alt="Logo" width={65} height={65} />
                </Link>
                <ul className="hidden md:flex items-center justify-center gap-x-4">
                    <li>
                        <Link href="/" className="px-4 py-3 hover:bg-gray-200 rounded-full transition-all duration-150">
                            Anasayfa
                        </Link>
                    </li>
                    <li>
                        <Link href="/listings?listing_type=sale" className="px-4 py-3 hover:bg-gray-200 rounded-full transition-all duration-150">
                            Satılık
                        </Link>
                    </li>
                    <li>
                        <Link href="/listings?listing_type=rent" className="px-4 py-3 hover:bg-gray-200 rounded-full transition-all duration-150">
                            Kiralık
                        </Link>
                    </li>
                    <li>
                        <Link href="/about-us" className="px-4 py-3 hover:bg-gray-200 rounded-full transition-all duration-150">
                            Hakkımızda
                        </Link>
                    </li>
                </ul>
                <Link href="/about-us" className="hidden md:block px-4 py-3 bg-yellow-700 hover:bg-yellow-900 text-white rounded-full transition-all duration-150">
                    Bize Ulaşın
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <TbMenuDeep className="size-7 text-yellow-700 block md:hidden cursor-pointer" />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-center">
                        <SheetTitle className="hidden" />
                        <Link href="/">
                            <Image src="/logo.png" alt="Logo" width={80} height={80} />
                        </Link>
                        <ul className="flex flex-col items-center justify-center gap-y-8">
                            <li>
                                <Link href="#" className="px-4 py-3 hover:bg-gray-200 rounded-full transition-all duration-150">
                                    Anasayfa
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="px-4 py-3 hover:bg-gray-200 rounded-full transition-all duration-150">
                                    Satılık
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="px-4 py-3 hover:bg-gray-200 rounded-full transition-all duration-150">
                                    Kiralık
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="px-4 py-3 hover:bg-gray-200 rounded-full transition-all duration-150">
                                    Hakkımızda
                                </Link>
                            </li>
                        </ul>
                        <Link href="#" className="px-4 py-3 bg-yellow-700 hover:bg-yellow-900 text-white rounded-full transition-all duration-150">
                            Bize Ulaşın
                        </Link>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}