import fs from 'fs/promises';
import path from 'path';

const HeroBanner = async () => {
    const filePath = path.join(process.cwd(), 'public', 'friends.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const friends = JSON.parse(fileContent);

    const totalFriends = friends.length;
    const onTrack = friends.filter(f => f.status === 'on-track').length;
    const needAttention = friends.filter(f => f.status === 'overdue').length;
    const interactionsThisMonth = friends.filter(f => f.days_since_contact <= 30).length;
    console.log(totalFriends, onTrack, needAttention, interactionsThisMonth);

    return (
        <div className="py-20 px-4 md:px-0 shadow-sm">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl font-extrabold text-[#1F2937] mb-6">
                    Friends to keep close in your life
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                </p>
                <button className="btn bg-[#244D3F] btn-md mb-16 gap-2 text-white transition duration-300 hover:scale-110 text-thin">
                    + Add a Friend
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-10 lg:px-16">
                    <div className="stat bg-base-100 shadow-xl rounded-box p-8 flex flex-col items-center justify-center text-center transition duration-300 hover:scale-110">
                        <div className="text-4xl text-[#1F2937] font-bold">{totalFriends}</div>
                        <div className="text-xl text-gray-600 mt-3 font-medium">Total Friends</div>
                    </div>

                    <div className="stat bg-base-100 shadow-xl rounded-box p-8 flex flex-col items-center justify-center text-center transition duration-300 hover:scale-110">
                        <div className="text-4xl text-[#1F2937] font-bold">{onTrack}</div>
                        <div className="text-xl text-gray-600 mt-3 font-medium">On Track</div>
                    </div>

                    <div className="stat bg-base-100 shadow-xl rounded-box p-8 flex flex-col items-center justify-center text-center transition duration-300 hover:scale-110">
                        <div className="text-4xl text-[#1F2937] font-bold">{needAttention}</div>
                        <div className="text-xl text-gray-600 mt-3 font-medium">Need Attention</div>
                    </div>

                    <div className="stat bg-base-100 shadow-xl rounded-box p-8 flex flex-col items-center justify-center text-center transition duration-300 hover:scale-110">
                        <div className="text-4xl text-[#1F2937] font-bold">{interactionsThisMonth}</div>
                        <div className="text-xl text-gray-600 mt-3 font-medium">Interactions This Month</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;