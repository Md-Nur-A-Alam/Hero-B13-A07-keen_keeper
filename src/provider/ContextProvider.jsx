'use client'
import { createContext, useState } from "react";
import { FaVideo } from "react-icons/fa6";
import { IoIosText } from "react-icons/io";
import { MdAddCall } from "react-icons/md";
import { toast } from 'react-toastify';

export const FriendContext = createContext();


const ContextProvider = ({ children }) => {
    // const [callFriend, setCallFriend] = useState([]);
    // const [textFriend, setTextFriend] = useState([]);
    // const [videoFriend, setVideoFriend] = useState([]);
    const [actionList, setActionList] = useState([]);




    const createEntry = (friend, action_type) => {
        const now = new Date();
        return {
            ...friend,
            action_date: now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            action_time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
            action: action_type
        };
    };

    const handleClickEventForCallTextVideo = (friend, action_type) => {
        const icon = action_type === "call" ? <MdAddCall /> : action_type === "text" ? <IoIosText /> : <FaVideo />;
        const entry = createEntry(friend, action_type);
        setActionList([...actionList, entry]);
        console.log("Timeline Actions:", [...actionList, entry]);
        const name = <div className='flex items-center gap-2'>{icon} <span className="capitalize">{action_type}</span> with <span className='font-bold'>{friend.name}</span></div>;
        toast(name);
    }


    // const createEntryForCall = (friend) => {
    //     const now = new Date();
    //     return {
    //         ...friend,
    //         action_date: now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    //         action_time: now.toLocaleTimeString('en-US', { hour: '2-digit', miminute: '2-digit', second: '2-digit', hour12: true }),
    //         action: "call"
    //     };
    // };
    // const createEntryForText = (friend) => {
    //     const now = new Date();
    //     return {
    //         ...friend,
    //         action_date: now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    //         action_time: now.toLocaleTimeString('en-US', { hour: '2-digit', miminute: '2-digit', second: '2-digit', hour12: true }),
    //         action: "Text"
    //     };
    // };
    // const createEntryForVideo = (friend) => {
    //     const now = new Date();
    //     return {
    //         ...friend,
    //         action_date: now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    //         action_time: now.toLocaleTimeString('en-US', { hour: '2-digit', miminute: '2-digit', second: '2-digit', hour12: true }),
    //         action: "Video"
    //     };
    // };

    // const handleMarkAsCall = (friend) => {
    //     const entry = createEntryForCall(friend);
    //     setCallFriend([...callFriend, entry]);
    //     console.log("Calls:", [...callFriend]);
    //     const name = <div className='flex items-center gap-2'><MdAddCall /> Call with <span className='font-bold'>{friend.name}</span></div>
    //     toast(name);
    // }
    // const handleMarkAsText = (friend) => {
    //     const entry = createEntryForText(friend);
    //     setTextFriend([...textFriend, entry]);
    //     // console.log("Texts:", [...textFriend]);
    //     const name = <div className='flex items-center gap-2'><IoIosText /> Text with <span className='font-bold'>{friend.name}</span></div>
    //     toast(name);

    // }
    // const handleMarkAsVideo = (friend) => {
    //     const entry = createEntryForVideo(friend);
    //     setVideoFriend([...videoFriend, entry]);
    //     // console.log("Videos:", [...videoFriend]);
    //     const name = <div className='flex items-center gap-2'><FaVideo />Video with<span className='font-bold'>{friend.name}</span></div>
    //     toast(name);
    // }

    // const info = {
    //     callFriend, setCallFriend, textFriend, setTextFriend, videoFriend, setVideoFriend, handleMarkAsCall, handleMarkAsText, handleMarkAsVideo
    // }
    const info = {
        actionList, setActionList, handleClickEventForCallTextVideo
    }
    return (
        <FriendContext.Provider value={info}>
            {children}
        </FriendContext.Provider>
    );
};

export default ContextProvider;