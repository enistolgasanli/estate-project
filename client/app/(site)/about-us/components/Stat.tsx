type StatProps = {
    title: string;
    text: string;
}

export default function Stat({ title, text }: StatProps) {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <span className="text-6xl font-semibold">
                {title}
            </span>
            <p className="text-[#333]">
                {text}
            </p>
        </div>
    );
}