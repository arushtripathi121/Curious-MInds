import React from 'react'
import PostLoginHeader from './PostLoginHeader'
import { useSelector } from 'react-redux'
import GetPosts from './GetPosts';
import { FaUser, FaThumbsUp, FaUsers, FaUserFriends } from 'react-icons/fa';

const Profile = () => {

    const user = useSelector(store => store.user.user);
    const { User } = user;
    const { userName, name, followers, following, posts} = User;
    return (
        <div className="container mx-auto p-4">
            <PostLoginHeader />
            <div className='flex flex-row bg-white p-6 rounded-lg shadow-lg'>
                <div className='w-1/5'>
                    <img className='border border-gray-200 rounded-full w-24 h-24 object-cover' src="https://tse4.mm.bing.net/th?id=OIP.5rcGEldj6E94nYEoEXfcmAAAAA&pid=Api&P=0&h=180" alt="Profile Image" />
                </div>
                <div className='flex flex-col justify-center ml-6 w-4/5'>
                    <div className='mb-2'>
                        <p className='text-blue-600 text-2xl font-semibold'>{name}</p>
                        <p className='text-blue-400'>@{userName}</p>
                    </div>
                    <div className='flex flex-row gap-4 mt-2'>
                        <div className='text-center'>
                            <p className='text-blue-600 font-semibold'>Posts</p>
                            <p className='text-gray-700'>{posts.length}</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-blue-600 font-semibold'>Followers</p>
                            <p className='text-gray-700'>{followers.length}</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-blue-600 font-semibold'>Following</p>
                            <p className='text-gray-700'>{following.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col mt-8'>
                <p className='text-center text-blue-600 font-semibold text-2xl'>Posts</p>
                <div className='mt-5'><GetPosts user={user.User._id} /></div>
            </div>
        </div>
    )
}

export default Profile
