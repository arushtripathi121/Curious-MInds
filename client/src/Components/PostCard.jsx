import React, { useEffect, useState } from 'react';
import { FaHeart, FaComment, FaCalendarAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import LikeCard from './LikeCard';
import { checkDislike, checkLike } from '../Hooks/FetchLikes';
import CommentCard from './CommentCard';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ImageCard from './ImageCard';
import { api } from '../Utils/Constants';

const PostCard = ({ Post }) => {
    console.log(Post);

    const User = useSelector((store) => store.user.user);
    const [likeCard, showLikeCard] = useState(false);
    const [likes, setLikes] = useState([]);
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [commentCard, setCommentCard] = useState(false);
    const [inProcess, setInprocess] = useState(false);
    const [imageCard, setImageCard] = useState(false);

    const handleLikeCard = () => {
        showLikeCard(!likeCard);
    };

    const onHandleComment = () => {
        setCommentCard(true);
    };

    const onHandleCloseComment = () => {
        setCommentCard(false);
    };

    const onHandleImageCard = () => {
        setImageCard(true);
    }

    const onCloseImageCard = () => {
        setImageCard(false);
        console.log(imageCard);
    }

    const fetchLikes = async (postId) => {
        try {
            const response = await fetch(api + 'getLikes', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postId })
            });
            const data = await response.json();
            setLikes(data);
        } catch (error) {
            console.error('Error fetching likes:', error);
        }
    };

    const deletePost = async (postId) => {
        try {
            const response = await fetch(api + "deletePost/" + `${postId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postId })
            });
            await response.json();
            // Handle post deletion (e.g., redirect, update UI, etc.)
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    useEffect(() => {
        fetchLikes(Post._id);
    }, [Post._id]);

    const isContentValid = (content) => {
        // Regex to ensure at least some non-whitespace content, including spaces and line breaks
        const regex = /(?=\S)([\s\S]*)/;
        return regex.test(content);
    };

    const onHandleLike = async () => {
        if (!isContentValid(Post.body)) {
            setMessage('Post content is invalid. Ensure it is not empty and contains meaningful text.');
            setShowPopup(true);
            return;
        }

        setInprocess(true);
        const userHasLiked = likes.some((like) => like.userName === User.User.userName);
        const post = Post._id;
        const user = User.User._id;
        try {
            let message;
            if (!userHasLiked) {
                message = await checkLike(post, user);
            } else {
                const id = likes.find((like) => like.userName === User.User.userName)._id;
                message = await checkDislike(id);
            }
            setMessage(message);
            setShowPopup(true);
            fetchLikes(post); // Refresh likes list
        } catch (error) {
            console.error('Error handling like/dislike:', error);
        } finally {
            setInprocess(false);
        }
    };

    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => setShowPopup(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showPopup]);

    // Convert new lines to <br> tags
    const formatContent = (content) => {
        return content.replace(/\n/g, '<br/>');
    };

    return (
        <div className='post-card flex flex-col border border-gray-300 bg-white text-gray-800 rounded-lg mx-auto px-6 py-4 shadow-lg max-w-2xl w-full'>
            <div className='flex items-center mb-4'>
                <Link to={`/profile/${Post.user._id || Post.user}`} className='font-bold text-lg text-blue-600 hover:underline'>
                    {Post.userName}
                </Link>
            </div>

            <div className='post-body mb-4'>
                <p className='text-xl font-semibold' dangerouslySetInnerHTML={{ __html: formatContent(Post.body) }} />
            </div>
            <div className="grid grid-flow-col gap-1">
                {Post.imageUrl.slice(0, 2).map((image, index) => (
                    <div
                        key={index}
                        className="w-full h-48 border border-black rounded-lg cursor-pointer" // Adjust h-48 to your desired fixed height
                        onClick={onHandleImageCard}
                    >
                        <img
                            src={image}
                            alt={`Image ${index}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                ))}

                {imageCard &&
                    <div><ImageCard onClose={onCloseImageCard} images={Post.imageUrl} /></div>
                }
            </div>

            {showPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow-lg z-50 bg-black text-white text-lg">
                    {message}
                </div>
            )}

            <div className='cursor-pointer' onClick={handleLikeCard}>
                Liked by
                {likeCard && likes.length > 0 && (
                    <div className='mt-2'>
                        <LikeCard data={likes} />
                    </div>
                )}
            </div>

            <div className='post-footer flex flex-row gap-6 justify-between text-gray-500 border-t border-gray-200 pt-4'>
                <button
                    className='flex items-center gap-2 cursor-pointer hover:text-red-600'
                    onClick={onHandleLike}
                >
                    <FaHeart className='h-5 w-5 text-red-500' />
                    <span className='text-gray-800 font-bold'>{!inProcess ? likes.length : ' '}</span> Like
                </button>

                <div className='flex items-center gap-2 cursor-pointer hover:text-blue-600'>
                    <FaComment className='h-5 w-5 text-blue-500' />
                    <span className='text-gray-800 font-bold flex items-center gap-1'>
                        {Post.comments.length}
                        {commentCard && <CommentCard data={Post._id} onClose={onHandleCloseComment} user={User.User._id} />}
                        <button onClick={onHandleComment} className='ml-2 text-blue-600 hover:underline'>
                            Comments
                        </button>
                    </span>
                </div>

                <div className='flex items-center gap-2 text-gray-600'>
                    <FaCalendarAlt className='h-5 w-5 text-green-500' />
                    {new Date(Post.date).toLocaleDateString()}
                </div>

                {User.User._id === Post.user._id && (
                    <button
                        className='relative text-red-600 hover:text-red-800 focus:outline-none'
                        onClick={() => deletePost(Post._id)}
                    >
                        <MdDeleteOutline className='text-2xl' />
                        <span className='absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 hover:opacity-100 transition-opacity'>
                            Delete
                        </span>
                    </button>
                )}
            </div>
        </div>

    );
};

export default PostCard;
