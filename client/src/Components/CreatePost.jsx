import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { GrAttachment } from 'react-icons/gr';
import axios from 'axios';
import { api } from '../Utils/Constants';
const CreatePost = ({ onClose, user, userName }) => {
    const [body, setBody] = useState('');
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const fileArray = Array.from(event.target.files);
        setFiles(prevFiles => [...prevFiles, ...fileArray]);
    };

    const handleRemoveFile = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleChange = (e) => {
        setBody(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user', user);
        formData.append('body', body);
        formData.append('userName', userName);

        // Append files to FormData
        files.forEach(file => {
            formData.append('files', file); // Ensure 'files' matches the field name expected by multer
        });

        try {
            // Log FormData for debugging
            for (let pair of formData.entries()) {
                console.log(pair[0] + ':', pair[1]); // Improved logging for debugging
            }

            const response = await axios.post(api+'createPost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                // Handle success (e.g., close modal, show message)
                onClose();
            } else {
                // Handle error
                console.error('Error creating post:', response.data.message);
            }
        } catch (error) {
            // Handle errors (e.g., network issues)
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
            <div className='relative w-[90svh] h-[90svh] bg-white border border-black rounded-lg shadow-xl overflow-y-auto p-6'>
                <button
                    className='absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out focus:outline-none'
                    onClick={onClose}
                >
                    <IoClose />
                </button>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-4 mt-5'>
                    <div className='relative'>
                        <textarea
                            id='thoughts'
                            placeholder='Write your thoughts...'
                            onChange={handleChange}
                            value={body}
                            className='w-full p-4 pt-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-[70svh] resize-none'
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className='hidden'
                                id="fileInput"
                            />
                            <label htmlFor="fileInput" className='cursor-pointer text-blue-500 font-semibold flex items-center'>
                                <GrAttachment className='w-6 h-6' />
                                <span className='ml-2'>Attach files</span>
                            </label>
                            {files.length > 0 && (
                                <ul className='ml-4 space-y-2'>
                                    {files.map((file, index) => (
                                        <li key={index} className='flex items-center text-black'>
                                            <span className='mr-2'>{file.name}</span>
                                            <button
                                                type='button'
                                                onClick={() => handleRemoveFile(index)}
                                                className='text-red-500 hover:text-red-700 transition duration-300'
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button
                            type='submit'
                            disabled={!body.trim()}
                            className={`px-6 py-3 rounded-lg shadow transition duration-300 ease-in-out focus:outline-none ${body.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
