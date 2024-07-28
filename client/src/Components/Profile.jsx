import React from 'react'
import PostLoginHeader from './PostLoginHeader'
import { useSelector } from 'react-redux'

const Profile = () => {

    const user = useSelector(store => store.user.user);
    const { User } = user;
    const { userName, name, followers, following, posts} = User;
    return (
        <div>
            <PostLoginHeader />
            <div className='flex flex-row bg-white p-4 rounded-lg shadow-lg'>
                <div className='w-2/12'>
                    <img className='border border-gray-300 rounded-full' src="https://tse4.mm.bing.net/th?id=OIP.5rcGEldj6E94nYEoEXfcmAAAAA&pid=Api&P=0&h=180" alt="Profile Image" />
                </div>
                <div className='flex flex-col justify-center ml-4'>
                    <div className='mb-2'>
                        <p className='text-gray-900 text-lg font-semibold'>{name}</p>
                        <p className='text-gray-500'>@{userName}</p>
                    </div>
                    <div className='flex flex-row space-x-4 mt-2'>
                        <div className='text-center'>
                            <p className='text-gray-900 font-semibold'>posts</p>
                            <p className='text-gray-500'>{posts.length}</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-gray-900 font-semibold'>Followers</p>
                            <p className='text-gray-500'>{followers.length}</p>
                        </div>
                        <div className='text-center'>
                            <p className='text-gray-900 font-semibold'>Following</p>
                            <p className='text-gray-500'>{following.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
