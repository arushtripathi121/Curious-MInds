import React, { useEffect, useState } from 'react'
import { FaHeart, FaComment, FaCalendarAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import LikeCard from './LikeCard';
import { checkDislike, checkLike } from '../Hooks/FetchLikes';

const PostCard = ({ Post }) => {
    const User = useSelector(store => store.user.user);
    const [likeCard, showLikeCard] = useState(false);
    const [likes, setLikes] = useState([]);
    const handleLikeCard = () => {
        showLikeCard(!likeCard);
    };

    const fetchLikes = async (postId) => {
        const response = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getLikes', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ postId })
        });
        const data = await response.json();
        setLikes(data);
        return data;
    };

    useEffect(() => {
        fetchLikes(Post._id);
    }, [Post._id]);


    const onHandleLike = async () => {
        const userHasLiked = likes.find((like) => like.userName === User.User.userName);
        console.log(userHasLiked);
        const post = Post._id;
        const user = User.User._id;
        if (!userHasLiked) {
            await checkLike(post, user);
        } else {
            const id = userHasLiked._id;
            console.log(id);
            await checkDislike(id);
        }
        setLikes(fetchLikes(post));
    };

    return (
        <div className='post-card flex flex-col border border-gray-300 bg-white text-gray-800 rounded-lg mx-auto px-6 py-4 shadow-lg max-w-2xl'>
            <div className='post-body mb-4 border border-b-black pb-5'>
                <p className='text-xl font-semibold text-justify'>{Post.body}</p>
            </div>
            <div className='cursor-pointer' onClick={() => handleLikeCard()}>Liked by{likeCard && likes && <div><LikeCard data={likes} /></div>}</div>
            <div className='post-footer flex flex-row gap-6 justify-around text-gray-500 border-t border-gray-200 pt-4'>
                <button className='flex items-center gap-2 cursor-pointer' onClick={() => onHandleLike()}>
                    <FaHeart className='h-5 w-5 text-red-500' />
                    <span className='text-gray-800 font-bold'>{likes.length}</span> Like
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
