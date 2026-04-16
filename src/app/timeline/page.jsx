'use client'
import NoData from "@/components/NoData/NoData";
import TimeLineCard from "@/components/TimelineCard/TimeLineCard";
import { FriendContext } from "@/provider/ContextProvider";
import { useContext, useMemo, useState } from "react";
import { BiMessageDots } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa6";
import { IoCall, IoTime, IoVideocam } from "react-icons/io5";
import { TbFaceIdError } from "react-icons/tb";


const TimelinePage = () => {
    const { actionList } = useContext(FriendContext);
    const [filter, setFilter] = useState("date"); // "date" | "call" | "text" | "video"


    const timeLineList = useMemo(() => {
        const sorted = [...actionList].sort((a, b) => {
            const dateTimeA = new Date(`${a.action_date} ${a.action_time}`).getTime();
            const dateTimeB = new Date(`${b.action_date} ${b.action_time}`).getTime();
            return dateTimeB - dateTimeA;
        });

        if (filter === "date") return sorted;

        return sorted.filter(entry => entry.action.toLowerCase() === filter.toLowerCase());
    }, [actionList, filter]);

    const { name, action_time } = timeLineList;

    return (
        <div>
            <div className="flex justify-between flex-col md:flex-row items-center my-10">
                <h2 className="text-4xl font-bold">Timeline:</h2>


                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                        Filter timeline <FaCaretDown />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li>
                            <button onClick={() => setFilter("date")} className={filter === "date" ? "active" : ""}>
                                <IoTime /> Date Sorted
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setFilter("call")} className={filter === "call" ? "active" : ""}>
                                <IoCall /> Call
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setFilter("text")} className={filter === "text" ? "active" : ""}>
                                <BiMessageDots /> Text
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setFilter("video")} className={filter === "video" ? "active" : ""}>
                                <IoVideocam /> Video
                            </button>
                        </li>
                    </ul>
                </div>
            </div>


            <div className="my-5 space-y-2">
                {timeLineList.length === 0 ? (
                    <NoData></NoData>
                ) : (
                <div className="flex flex-col gap-5">
                    {timeLineList.map((item, index) => (
                    <TimeLineCard key={index} item={item}></TimeLineCard>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};

export default TimelinePage;