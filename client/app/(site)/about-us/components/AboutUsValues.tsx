import { cn } from "@/lib/utils";
import Image from "next/image";

type AboutUsValuesProps = {
    title: string;
    text: string;
    listTitle: string;
    listItem: {
        text: string;
    }[];
    reverse: boolean;
}

export default function AboutUsValues({ title, text, listTitle, listItem, reverse }: AboutUsValuesProps) {
    return (
        <div className={cn(
            "w-full flex gap-x-8",
            reverse && "flex-row-reverse"
        )}>
            <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-slate-50 rounded-full border border-slate-300">
                    <span className="text-sm">
                        {title}
                    </span>
                </div>
                <p className="text-sm text-[#333] my-5">
                    {text}
                </p>
                <h1 className="font-semibold">
                    {listTitle}
                </h1>
                <ul className="ml-5 mt-3 list-disc">
                    {
                        listItem.map((item, i) => (
                            <li key={i}>
                                {item.text}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="relative flex-1 h-[300px] md:block hidden">
                <Image 
                    src="/home.jpg"
                    alt="Home"
                    fill
                    className="object-cover rounded-xl"
                />
            </div>
        </div>
    );
}