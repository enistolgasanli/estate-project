import Image from "next/image";
import Link from "next/link";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

export default function Footer() {
    return (
        <footer className="bg-[#101010] w-full h-[300px] mt-20 rounded-tl-xl rounded-tr-xl flex items-center justify-center z-99">
            <div className="w-full max-w-5/6 h-full flex flex-col items-center justify-center text-white">
                <div className="w-full flex items-center justify-between border-b py-6">
                    <div>
                        <Link href="#">
                            <Image src="/logo.png" alt="Logo" width={65} height={65} />
                        </Link>
                        <div className="flex flex-col gap-y-4">
                            <div className="flex items-center gap-x-2">
                                <CiPhone className="size-5" />
                                <span className="text-sm text-[#dbdbdb]">
                                    (406) - 89 90
                                </span>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <CiMail className="size-5" />
                                <span className="text-sm text-[#dbdbdb]">
                                    example@test.com
                                </span>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <CiLocationOn className="size-5" />
                                <span className="text-sm text-[#dbdbdb]">
                                    example@test.com
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="mb-3">SELL A HOME</h1>
                        <ul className="flex flex-col items-center justify-center gap-y-4">
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="mb-3">SELL A HOME</h1>
                        <ul className="flex flex-col items-center justify-center gap-y-4">
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="mb-3">SELL A HOME</h1>
                        <ul className="flex flex-col items-center justify-center gap-y-4">
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                            <li className="text-sm text-[#dbdbdb]">
                                <Link href="#" className="hover:underline">
                                    Request an offer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between mt-3">
                    <div className="text-[#dbdbdb] text-sm font-semibold">
                        © 2025 Estate
                    </div>
                    <div className="flex items-center justify-center gap-x-4">
                        <Link href="#" className="p-2 hover:bg-[#333] rounded-full">
                            <FaFacebookF className="size-5" />
                        </Link>
                        <Link href="#" className="p-2 hover:bg-[#333] rounded-full">
                            <FaInstagram className="size-5" />
                        </Link>
                        <Link href="#" className="p-2 hover:bg-[#333] rounded-full">
                            <RiTwitterXLine className="size-5" />
                        </Link>
                        <Link href="#" className="p-2 hover:bg-[#333] rounded-full">
                            <FaLinkedin className="size-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}