'use client'
import React, { use } from 'react';
import FriendCard from './FriendCard/FriendCard';

const friendsDataPromise = fetch("./friends.json").then(res => res.json());

const Friends = () => {
    const friendsData = use(friendsDataPromise);
    return (
        <div>
            <h2 className="text-3xl py-10 font-bold">Your Friends</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {friendsData.map(friend => <FriendCard key={friend.id} friend={friend}></FriendCard>)}
            </div>
        </div>
    );
};

export default Friends;