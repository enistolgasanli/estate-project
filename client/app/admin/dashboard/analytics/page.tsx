import Charts from "./components/Charts";

export default function Analytics() {
    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
                <div className="mt-10 border p-5 rounded-xl shadow-md">
                    <div className="mb-4">
                        <h1 className="font-semibold">Toplam Ziyaretçi Sayısı</h1>
                        <span className="text-sm text-[#737373]">
                            Chrome için toplam kullanıcı sayısı
                        </span>
                    </div>
                    <Charts />
                </div>
            </div>
        </div>
    );
}