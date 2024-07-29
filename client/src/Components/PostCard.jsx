import React, { useEffect, useState } from 'react'
import { FaHeart, FaComment, FaCalendarAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import LikeCard from './LikeCard';
import { checkDislike, checkLike } from '../Hooks/FetchLikes';
import CommentCard from './CommentCard';


const PostCard = ({ Post }) => {
    const User = useSelector(store => store.user.user);
    const [likeCard, showLikeCard] = useState(false);
    const [likes, setLikes] = useState([]);
    const [message, setMessage ] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [commentCard, showCommentCard] = useState(false);
    const [comments, setComments] = useState([]);
    const handleLikeCard = () => {
        showLikeCard(!likeCard);
    };

    const handleCommentCard = async (post) => {
        showCommentCard(!commentCard);
        console.log(post);
        if(commentCard != true) {
            const data = await getComments(post);
            setComments(data);
            console.log(data);
        }
    };
    
    
    const getComments = async (post) => {
        const data = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getComments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({post})
        })
        const message = await data.json();
        return message.userComments;
    }

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
        const post = Post._id;
        const user = User.User._id;
        if (!userHasLiked) {
            const message = await checkLike(post, user);
            setMessage(message);
            setShowPopup(true);
        } else {
            const id = userHasLiked._id;
            const message = await checkDislike(id);
            setMessage(message);
            setShowPopup(true);
        }
        setLikes(fetchLikes(post));
        console.log(message);
    };

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    return (
        <div className='post-card flex flex-col border border-gray-300 bg-white text-gray-800 rounded-lg mx-auto px-6 py-4 shadow-lg max-w-2xl'>
            <div className='post-body mb-4 border border-b-black pb-5'>
                <p className='text-xl font-semibold text-justify'>{Post.body}</p>
            </div>
            <div>{showPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg z-50 bg-black text-white text-lg">
                    {message}
                </div>
            )}</div>
            <div className='cursor-pointer' onClick={() => handleLikeCard()}>Liked by{likeCard && likes && <div><LikeCard data={likes} /></div>}</div>
            <div className='post-footer flex flex-row gap-6 justify-around text-gray-500 border-t border-gray-200 pt-4'>
                <button className='flex items-center gap-2 cursor-pointer' onClick={() => onHandleLike()}>
                    <FaHeart className='h-5 w-5 text-red-500' />
                    <span className='text-gray-800 font-bold'>{likes.length}</span> Like
                </button>
                <div className='flex items-center gap-2 cursor-pointer' onClick={(() => {handleCommentCard(Post._id)})}>
                    <FaComment className='h-5 w-5 text-blue-500' />
                    <span className='text-gray-800 font-bold' >{Post.comments.length}{commentCard &&  <CommentCard data={comments}/>}</span> Comments
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
