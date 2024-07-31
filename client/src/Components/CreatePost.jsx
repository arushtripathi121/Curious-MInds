import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";

const CreatePost = ({ onClose, user }) => {

    const [body, setBody] = useState('');

    const onHandleChange = (e) => {
        setBody(e.target.value);
    }

    const createPost = async (user, body) => {
        const data = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/createPost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user, body })
        })
        const message = await data.json();
        onClose();
    }

    

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='relative w-[90svh] h-[90svh] bg-white border border-black rounded-lg shadow-xl overflow-y-auto p-6'>
                <button className='absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out focus:outline-none' onClick={onClose}>
                    <IoClose />
                </button>
                <form onSubmit={(e) => e.preventDefault()} className='flex flex-col space-y-4 mt-5'>
                    <div className='relative'>
                        <textarea
                            id='thoughts'
                            placeholder ='Write you thoughts....'
                            onChange={(e) => onHandleChange(e)}
                            className='w-full p-4 pt-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-[70svh] resize-none'
                        />
                    </div>
                    <button
                        type='submit'
                        onClick={()=> createPost(user, body)}
                        className='self-end px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none'
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>



    )
}

export default CreatePost
