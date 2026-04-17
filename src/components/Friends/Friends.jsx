import FriendCard from './FriendCard/FriendCard';
import friendsData from '@/../public/friends.json';


const Friends = async () => {
    // const res = await fetch('/friends.json');
    // const friendsData = await res.json();

    return (
        <div>
            <h2 className="text-3xl py-10 font-bold">Your Friends</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {friendsData.map(friend => <FriendCard key={friend.id} friend={friend} />)}
            </div>
        </div>
    );
};

export default Friends;