import React, { useEffect, useState } from 'react'

const CommentCard = ({ data }) => {
    
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='relative w-[90vw] md:w-[70vw] lg:w-[60vw] border bg-white border-black h-[90vh] overflow-y-auto rounded-lg shadow-xl'>
                {data.length > 0 ? (
                    data.map((user) => (
                        <div key={user.user._id} className='p-4 border-b border-gray-200'>
                            <p className='font-bold text-lg'>{user.body}</p>
                            <p className='text-gray-600'>@{user.user.userName}</p>
                        </div>
                    ))
                ) : (
                    <p className='p-4 text-center'>No Comments found</p>
                )}
                <input
                    type='text'
                    placeholder='Enter your comment'
                    className='w-full border-2 border-black p-2 mt-4'
                />
            </div>
        </div>

    )
}
export default CommentCard;
