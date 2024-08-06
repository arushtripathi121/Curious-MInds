import React, { useEffect, useState } from 'react';
import PostLoginHeader from './PostLoginHeader';
import { useSelector } from 'react-redux';
import GetPosts from './GetPosts';
import { MdOutlineAddComment } from 'react-icons/md';
import CreatePost from './CreatePost';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { id } = useParams();
    const UserData = useSelector((store) => store.user.user);
    const [user, setUser] = useState(null);
    const [createPost, setCreatePost] = useState(false);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getUserById', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            const userData = await response.json();
            setUser(userData.user);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    useEffect(() => {
        const userId = id || UserData.User._id;
        if (userId) {
            fetchUserData(userId);
        }
    }, [id, UserData]);

    const onHandlePost = () => {
        setCreatePost(true);
    };

    const onCloseHandlePost = () => {
        setCreatePost(false);
    };
    

    return (
        <div className="container mx-auto p-4">
            {user && (
                <div>
                    <PostLoginHeader />
                    <div className="flex flex-row bg-white p-6 rounded-lg shadow-lg">
                        <div className="w-1/5">
                            <img
                                className="border border-gray-200 rounded-full w-24 h-24 object-cover"
                                src="https://tse4.mm.bing.net/th?id=OIP.5rcGEldj6E94nYEoEXfcmAAAAA&pid=Api&P=0&h=180"
                                alt="Profile Image"
                            />
                        </div>
                        <div className="flex flex-col justify-center ml-6 w-4/5">
                            <div className="mb-2">
                                <p className="text-blue-600 text-2xl font-semibold">{user.name}</p>
                                <p className="text-blue-400">@{user.userName}</p>
                            </div>
                            <div className="flex flex-row gap-4 mt-2">
                                <div className="text-center">
                                    <p className="text-blue-600 font-semibold">Posts</p>
                                    <p className="text-gray-700">{user.posts.length}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-blue-600 font-semibold">Followers</p>
                                    <p className="text-gray-700">{user.followers.length}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-blue-600 font-semibold">Following</p>
                                    <p className="text-gray-700">{user.following.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-8">
                        <div>
                            <p className="text-center text-blue-600 font-semibold text-2xl">Posts</p>
                            <div className="mt-5">
                                <GetPosts user={user._id}/>
                            </div>
                        </div>

                        <div className="fixed bottom-10 right-10 flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg">
                            {createPost && <CreatePost onClose={onCloseHandlePost} user={user._id} userName={user.userName} />}
                            <MdOutlineAddComment
                                className="text-5xl text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out cursor-pointer"
                                title="Write post"
                                onClick={onHandlePost}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
