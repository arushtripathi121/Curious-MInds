import React, { useState } from 'react'
import FetchLikes from '../Hooks/FetchLikes';

const LikeCard = ({ post }) => {
    console.log(post._id);
    const data = FetchLikes(post._id);
    console.log(data);
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='relative w-[40svh] border bg-white border-black h-[90svh] overflow-y-auto rounded-lg shadow-xl'>
                <div className='p-4'>
                    {data.length > 0 ? (
                        data.map((user) => (
                            <div key={user.userName} className='p-4 border-b border-gray-200'>
                                <p className='font-bold text-lg'>{user.name}</p>
                                <p className='text-gray-600'>@{user.userName}</p>
                            </div>
                        ))
                    ) : (
                        <p className='p-4 text-center'>No users found</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LikeCard
