import React, { useEffect, useState } from 'react'
import { FaHeart, FaComment, FaCalendarAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux'

const PostCard = ({ Post }) => {

    const User = useSelector(store => store.user.user);

    const checkLike = async (post, user) => {
        const data = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/likePost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ post, user })
        })
        const message = await data.json();
        console.log(message.message);
    }

    const checkDislike = async (id) => {
        const data = await fetch(`http://localhost:5000/Curious_Minds/api/v1/user/dislikePost/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
        })
        const message = await data.json();
        console.log(message.message);
    }

    const onHandleLike =() => {
        const userHasLiked = Post.likes.find(like => like.user._id === User._id);
        console.log(userHasLiked);
        const post = Post._id;
        const user = User.User._id;
        console.log(post, user);
        if (!userHasLiked) {
            const data = checkLike(post, user);
        }
        else if (userHasLiked) {
            const id = userHasLiked._id;
            const data = checkDislike(id);
        }
    }
    return (
        <div className='post-card flex flex-col border border-gray-300 bg-white text-gray-800 rounded-lg mx-auto px-6 py-4 shadow-lg max-w-2xl'>
            <div className='post-body mb-4 border border-b-black pb-5'>
                <p className='text-xl font-semibold text-justify'>{Post.body}</p>
            </div>
            <div className='post-footer flex flex-row gap-6 justify-around text-gray-500 border-t border-gray-200 pt-4'>
                <button className='flex items-center gap-2 cursor-pointer' onClick={() => onHandleLike()}>
                    <FaHeart className='h-5 w-5 text-red-500' />
                    <span className='text-gray-800 font-bold'>{Post.likes.length}</span> Like
                </button>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <FaComment className='h-5 w-5 text-blue-500' />
                    <span className='text-gray-800 font-bold'>{Post.comments.length}</span> Comment
                </div>
                <div className='flex items-center gap-2'>
                    Dated:
                    <FaCalendarAlt className='h-5 w-5 text-green-500' />
                    {new Date(Post.date).toLocaleDateString()}
                </div>
            </div>
        </div>
    )
}

export default PostCard;
