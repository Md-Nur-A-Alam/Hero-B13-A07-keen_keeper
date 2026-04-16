'use client'
import { useContext } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { FriendContext } from '@/provider/ContextProvider';
import NoData from '@/components/NoData/NoData';

const COLORS = {
    text: '#7C3AED',
    call: '#166534',
    video: '#4ade80',
};

export default function StatsPage() {
    const { actionList } = useContext(FriendContext);


    const call = actionList.filter(a => a.action === 'call').length;
    const text = actionList.filter(a => a.action === 'text').length;
    const video = actionList.filter(a => a.action === 'video').length;

    const data = [
        { name: 'Text', value: text || 1 },
        { name: 'Call', value: call || 1 },
        { name: 'Video', value: video || 1 },
    ];
    // actionList.length===0? (return (<NoData></NoData>)):

    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold text-[#1E293B] mb-8">Friendship Analytics</h1>


            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mx-auto">
                <p className="text-xl font-semibold text-gray-500 mb-6">By Interaction Type :</p>

                {(actionList.length === 0) ? <NoData></NoData>:
                    <>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    cornerRadius="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {data.map((entry) => (
                                        <Cell
                                            key={entry.name}
                                            fill={COLORS[entry.name.toLowerCase()]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [
                                        actionList.filter(a => a.action === name.toLowerCase()).length,
                                        name,
                                    ]}
                                />
                                <Legend
                                    iconType="circle"
                                    iconSize={8}
                                    formatter={(value) => (
                                        <span style={{ color: '#374151', fontSize: '0.85rem' }}>{value}</span>
                                    )}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </>};
            </div>
        </div>
    );
}