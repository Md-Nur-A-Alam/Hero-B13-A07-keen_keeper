import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

const NoData = () => {
    return (

        <div className="min-h-[30vh] w-full rounded-2xl p-20 shadow-md bg-base-200 text-gray-400">
            <div>
                <TbFaceIdError className="text-9xl mx-auto"></TbFaceIdError>
            </div>
            <p className="text-center text-4xl mt-10">No entries found.</p>
        </div>

    );
};

export default NoData;