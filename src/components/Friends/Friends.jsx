import fs from 'fs/promises';
import path from 'path';
import FriendCard from './FriendCard/FriendCard';

const Friends = async () => {
    const filePath = path.join(process.cwd(), 'public', 'friends.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const friendsData = JSON.parse(fileContent);

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