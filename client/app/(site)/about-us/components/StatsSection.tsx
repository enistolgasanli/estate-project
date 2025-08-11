import Stat from "./Stat";

export default function StatsSection() {
    return (
        <div className="w-full flex items-center justify-center mt-20">
            <div className="w-full max-w-5/6 border rounded-3xl py-8 px-16">
                <div className="w-full h-full flex md:flex-row flex-col items-center justify-between gap-y-8">
                    <Stat title="10K+" text="Properties Listed" />
                    <Stat title="10K+" text="Properties Listed" />
                    <Stat title="10K+" text="Properties Listed" />
                    <Stat title="10K+" text="Properties Listed" />
                </div>
            </div>
        </div>
    );
}