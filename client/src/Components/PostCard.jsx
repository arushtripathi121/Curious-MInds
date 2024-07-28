import React from 'react'
import { FaHeart, FaComment, FaCalendarAlt } from 'react-icons/fa';

const PostCard = ({ post }) => {
    console.log(post);
    return (
        <div className='post-card flex flex-col border border-gray-300 bg-white text-gray-800 rounded-lg mx-auto px-6 py-4 shadow-lg max-w-2xl'>
            <div className='post-body mb-4 border border-b-black pb-5'>
                <p className='text-xl font-semibold'>{post.body}</p>
            </div>
            <div className='post-footer flex flex-row gap-6 justify-around text-gray-500 border-t border-gray-200 pt-4'>
                <div className='flex items-center gap-2'>
                    <FaHeart className='h-5 w-5 text-red-500' />
                    <span className='text-gray-800 font-bold'>{post.likes.length}</span> Like
                </div>
                <div className='flex items-center gap-2'>
                    <FaComment className='h-5 w-5 text-blue-500' />
                    <span className='text-gray-800 font-bold'>{post.comments.length}</span> Comment
                </div>
                <div className='flex items-center gap-2'>
                    Dated:
                    <FaCalendarAlt className='h-5 w-5 text-green-500' />
                    {new Date(post.date).toLocaleDateString()}
                </div>
            </div>
        </div>
    )
}

export default PostCard;
