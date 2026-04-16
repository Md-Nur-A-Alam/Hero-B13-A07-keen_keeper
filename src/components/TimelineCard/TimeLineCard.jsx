import call from "@/../public/call.png"
import text from "@/../public/text.png"
import video from "@/../public/video.png"
import Image from "next/image";

const timelineCard = ({ item }) => {
    const { name, action, action_date, action_time } = item;
    const getIcon = () => {
        if (action?.toLowerCase() === "call") return call;
        if (action?.toLowerCase() === "text") return text;
        if (action?.toLowerCase() === "video") return video;
        return call;
    };

    return (
        <div className="group p-4 flex items-center gap-6 w-full rounded-2xl bg-base-100 shadow-sm border border-transparent hover:border-primary/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="shrink-0 w-14 h-14 rounded-full bg-base-200 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
                <Image src={getIcon()} width={32} height={32} alt="action_type" className="object-contain"></Image>
            </div>

            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold capitalize leading-tight">
                    {action} <span className="text-neutral/60 font-medium text-base">with</span> {name}
                </h2>

                <div className="flex items-center gap-2 text-sm text-neutral/50 font-medium">
                    <span>{action_date}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral/30"></span>
                    <span>{action_time}</span>
                </div>
            </div>
        </div>
    );
};

export default timelineCard;