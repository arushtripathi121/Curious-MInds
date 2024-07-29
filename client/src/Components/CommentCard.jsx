import React, { useEffect, useState } from 'react';

const CommentCard = ({ data }) => {
    const post = data;
    console.log(post);
    const [comments, setComments] = useState([]);

    const getComments = async (post) => {
        const response = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getComments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ post })
        });
        const message = await response.json();
        setComments(message.userComments);
    };

    useEffect(() => {
        if (post) {
            getComments(post);
        }
    }, [post]);

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='relative w-[90vw] md:w-[70vw] lg:w-[60vw] border bg-white border-black h-[90vh] overflow-y-auto rounded-lg shadow-xl'>
                {comments.length > 0 ? (
                    comments.map((user) => (
                        <div key={user.user._id} className='p-4 border-b border-gray-200'>
                            <p className='font-bold text-lg'>{user.body}</p>
                            <p className='text-gray-600'>@{user.user.userName}</p>
                        </div>
                    ))
                ) : (
                    <p className='p-4 text-center'>No Comments found</p>
                )}
                <div className='p-4 border-t border-gray-200'>
                    <input
                        type='text'
                        placeholder='Enter your comment'
                        className='w-full border-2 border-black p-2'
                    />
                    <button className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
