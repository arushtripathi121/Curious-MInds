import React, { useEffect, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { api } from '../Utils/Constants';
const CommentCard = ({ data, onClose, user }) => {
    const post = data;
    const [comments, setComments] = useState([]);
    const [body, setBody] = useState('');

    const getComments = async (post) => {
        try {
            const response = await fetch(api+'getComments', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ post })
            });
            const message = await response.json();
            setComments(message.userComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const createComments = async (user, post, body) => {
        onClose();
        try {
            const response = await fetch(api+'commentPost', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user, post, body })
            });
            await response.json();
            getComments(post); // Refresh comments list
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    const deleteComment = async (id) => {
        onClose();
        try {
            const response = await fetch(api+`${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            await response.json();
            getComments(post); // Refresh comments list
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const onHandleChange = (e) => {
        setBody(e.target.value);
    };

    useEffect(() => {
        if (post) {
            getComments(post);
        }
    }, [post]);

    // Convert new lines to <br> tags
    const formatContent = (content) => {
        return content.replace(/\n/g, '<br/>');
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60'>
            <div className='relative w-full max-w-3xl bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden'>
                <button className='absolute top-4 right-4 text-gray-600 hover:text-gray-800' onClick={onClose}>
                    <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                    </svg>
                </button>
                <div className='h-[80vh] overflow-y-auto p-6'>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment._id} className='flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-sm'>
                                <div>
                                    <p className='font-semibold text-lg mb-1' dangerouslySetInnerHTML={{ __html: formatContent(comment.body) }} />
                                    <p className='text-gray-600'>@{comment.user.userName}</p>
                                </div>
                                {comment.user._id === user && (
                                    <button
                                        onClick={() => deleteComment(comment.id)}
                                        className='relative text-red-600 hover:text-red-800 focus:outline-none'
                                    >
                                        <MdDeleteOutline className='text-2xl' />
                                        <span className='absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 hover:opacity-100 transition-opacity'>
                                            Delete
                                        </span>
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>No Comments found</p>
                    )}
                </div>

                <form className='p-4 border-t border-gray-200 bg-gray-100 flex items-center' onSubmit={handleSubmit}>
                    <textarea
                        placeholder='Enter your comment'
                        className='flex-1 border border-gray-300 rounded-lg p-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        onChange={onHandleChange}
                        value={body}
                        rows="3"
                    />
                    <button
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300'
                        onClick={() => createComments(user, post, body)}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommentCard;
