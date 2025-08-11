import { IoMdCheckmark } from "react-icons/io";

type HousePropertiesProps = {
    text: string;
}

export default function HouseProperties({ text }: HousePropertiesProps) {
    return (
        <div className="flex items-center gap-x-1">
            <IoMdCheckmark className="size-4" />
            <span className="text-sm">
                {text}
            </span>
        </div>
    );
}