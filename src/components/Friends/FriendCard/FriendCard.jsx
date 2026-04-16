import Image from 'next/image';
import React from 'react';

const FriendCard = ({ friend }) => {
    const { name, picture, days_since_contact, status, tags } = friend;
    return (
        <div className="card bg-base-100 w-full text-center shadow-md border-b-8 border-transparent transition-all duration-300 ease-in-out hover:border-[#244D3F] hover:scale-105">
            <figure className="mt-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-100 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                    <Image
                        src={picture}
                        width={500}
                        height={500}
                        alt={name}
                        className="object-cover w-full h-full"
                    />
                </div>
            </figure>
            <div className="card-body">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p>{days_since_contact}d ago</p>
                <div className="card-actions flex gap-2 justify-center">
                    {tags.map((tag, index) => <div key={index} className='btn btn-success btn-soft rounded-full'>{tag}</div>)}
                </div>
                <div className="card-actions justify-center">
                    <button className={`btn ${status === 'overdue' ? 'btn-error' : status === 'almost due' ? 'btn-warning' : 'btn-primary'} rounded-full`}>{status}</button>
                </div>
            </div>
        </div>
    );
};

export default FriendCard;