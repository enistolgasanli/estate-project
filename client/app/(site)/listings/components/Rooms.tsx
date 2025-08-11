import { roomOptions } from "@/app/options/options";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RoomsProps = {
    activeRooms: string;
    onRoomClick: (room: string) => void;
}

export default function Rooms({ activeRooms, onRoomClick }: RoomsProps) {
    return (
        <div className="mt-5">
            <h1 className="text-sm font-semibold">Oda Sayısı</h1>
            <div className="flex flex-wrap items-center mt-3 gap-x-4 gap-y-2">
                {
                    roomOptions.map((room, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className={cn(
                                "bg-gray-100 hover:bg-gray-200 flex items-center justify-center py-3 rounded-xl text-sm font-semibold w-[60px] h-[45px] cursor-pointer",
                                activeRooms === room && "bg-yellow-100 hover:bg-yellow-200 text-yellow-700 hover:text-yellow-700"
                            )}
                            onClick={() => onRoomClick(room)}
                        >
                            {room}
                        </Button>
                    ))
                }
            </div>
        </div>
    );
}