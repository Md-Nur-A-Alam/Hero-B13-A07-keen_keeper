'use client'
import React, { use, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Phone, MessageSquare, Video, Bell, Archive, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { MdAddCall } from 'react-icons/md';
import { IoIosText } from 'react-icons/io';
import { FaVideo } from 'react-icons/fa6';
import { FriendContext } from '@/provider/ContextProvider';


const FriendDetailsPage = ({ params }) => {
    const [friendsData, setFriendsData] = useState([]);
    const { friendId } = use(params);
    const { handleClickEventForCallTextVideo } = useContext(FriendContext);
    useEffect(() => {
        fetch("/friends.json")
            .then(res => res.json())
            .then(data => setFriendsData(data));
    }, []);

    const friend = friendsData.find(f => f.id.toString() === friendId);
    if (!friend) return <div className="p-10 text-center font-bold">Finding the friend</div>;


    const formattedDate = new Date(friend.next_due_date).toLocaleDateString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric'
    });

    return (
        <div className="mx-auto p-4 md:p-8 bg-[#F8FAFC]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">


                <div className="lg:col-span-4 flex flex-col gap-4">

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-gray-50">
                            <Image
                                src={friend.picture}
                                alt={friend.name}
                                width={100}
                                height={100}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-[#1E293B] mb-2">{friend.name}</h1>
                        <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase mb-2 ${friend.status === 'overdue' ? 'bg-error text-white' : friend.status === 'almost due' ? 'bg-warning text-white' : 'bg-success text-white'
                            }`}>
                            {friend.status}
                        </span>
                        <span className="px-3 py-1 bg-[#DCFCE7] text-[#166534] rounded-full text-[10px] font-bold uppercase mb-4 tracking-wider">
                            {friend.tags[0] || 'GENERAL'}
                        </span>
                        <p className="text-gray-500 italic text-sm mb-1">{friend.bio}</p>
                        <p className="text-gray-400 text-xs">Preferred: {friend.email.split('@')[0]}</p>
                    </div>


                    <div className="flex flex-col gap-2">
                        <button className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                            <Bell size={18} /> Snooze 2 Weeks
                        </button>
                        <button className="w-full py-3 px-4 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                            <Archive size={18} /> Archive
                        </button>
                        <button className="w-full py-3 px-4 bg-white border border-gray-100 rounded-lg flex items-center justify-center gap-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-all active:scale-95 shadow-sm">
                            <Trash2 size={18} /> Delete
                        </button>
                    </div>
                </div>


                <div className="lg:col-span-8 flex flex-col gap-6">


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                            <p className="text-3xl font-bold text-[#334155]">{friend.days_since_contact}</p>
                            <p className="text-gray-400 text-sm mt-1">Days Since Contact</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                            <p className="text-3xl font-bold text-[#334155]">{friend.goal}</p>
                            <p className="text-gray-400 text-sm mt-1">Goal (Days)</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                            <p className="text-2xl pb2 font-bold text-[#14532D]">{formattedDate}</p>
                            <p className="text-gray-400 text-sm mt-1 font-semibold">Next Due</p>
                        </div>
                    </div>


                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 relative">
                        <button className="absolute top-6 right-6 px-4 py-1 border border-gray-200 rounded text-xs font-medium hover:bg-gray-50">Edit</button>
                        <h3 className="text-[#14532D] font-bold text-lg mb-4">Relationship Goal</h3>
                        <p className="text-gray-600">Connect every <span className="font-bold text-black">{friend.goal} days</span></p>
                    </div>


                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-[#14532D] font-bold text-lg mb-6">Quick Check-In</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button className="cursor-pointer flex flex-col items-center justify-center p-6 bg-[#F8FAFC] border border-gray-100 rounded-xl hover:bg-white hover:shadow-lg hover:border-transparent transition-all group" onClick={() => handleClickEventForCallTextVideo(friend, "call")}>
                                <Phone className="text-gray-700 mb-2 group-hover:text-green-600 transition-colors" size={28} />
                                <span className="text-sm font-medium">Call</span>
                            </button>
                            <button className="cursor-pointer flex flex-col items-center justify-center p-6 bg-[#F8FAFC] border border-gray-100 rounded-xl hover:bg-white hover:shadow-lg hover:border-transparent transition-all group" onClick={() => handleClickEventForCallTextVideo(friend, "text")}>
                                <MessageSquare className="text-gray-700 mb-2 group-hover:text-blue-600 transition-colors" size={28} />
                                <span className="text-sm font-medium">Text</span>
                            </button>
                            <button className="cursor-pointer flex flex-col items-center justify-center p-6 bg-[#F8FAFC] border border-gray-100 rounded-xl hover:bg-white hover:shadow-lg hover:border-transparent transition-all group" onClick={() => handleClickEventForCallTextVideo(friend, "video")}>
                                <Video className="text-gray-700 mb-2 group-hover:text-purple-600 transition-colors" size={28} />
                                <span className="text-sm font-medium">Video</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FriendDetailsPage;