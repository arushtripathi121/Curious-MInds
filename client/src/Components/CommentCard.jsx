import React, { useEffect } from 'react'
import GetCommentsHook from '../Hooks/GetCommentsHook';

const CommentCard = ({post}) => {
    
    const data = GetCommentsHook(post);
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='relative w-[100svh] border bg-white border-black h-[90svh] overflow-y-auto rounded-lg shadow-xl'>
                <div className='p-4'>
                    <div className='p-4 border-b border-gray-200'>
                        {/* <p className='font-bold text-lg'>{data.body}</p>
                        <p className='text-gray-600'>{data.user.userName}</p> */}
                    </div>
                </div>
                <input type='text' placeholder='enter your comment' className='w-full border-2 border-black'/>
            </div>
        </div>
    )
}
export default CommentCard;
