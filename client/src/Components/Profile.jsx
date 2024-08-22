import React, { useEffect, useState } from 'react';
import PostLoginHeader from './PostLoginHeader';
import { useSelector } from 'react-redux';
import GetPosts from './GetPosts';
import { MdOutlineAddComment } from 'react-icons/md';
import CreatePost from './CreatePost';
import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Profile = () => {
    const { id } = useParams();
    const UserData = useSelector((store) => store.user.user);
    const [user, setUser] = useState(null);
    const [createPost, setCreatePost] = useState(false);
    const [followData, setFollowData] = useState({});
    const [followStatus, setFollowStatus] = useState(false);
    const [userId, setUserId] = useState('');


    const checkFollowStatus = async (user, userFollowed) => {
        console.log(user, userFollowed);

        try {
            const response = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/checkFollowStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, userFollowed }),
            });
            const userData = await response.json();

            console.log('userData -> ' + userData);
            
            if (userData.followStatus == true) {
                setFollowStatus(true);
                setFollowData(userData.data);
                console.log('FollowStatus is -> '+followStatus);
                
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const followUser = async (user, userFollowed) => {
        console.log(user, userFollowed);

        try {
            const response = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/follow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, userFollowed }),
            });
            const userData = await response.json();
            console.log(userData);
            if (userData.success) {
                setFollowStatus(true);
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const unFollowUser = async (followId) => {
        try {
            const response = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/unfollow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ followId }),
            });
            const userData = await response.json();

            if (userData.success == true) {
                setFollowStatus(false);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


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
        setUserId(userId);
        if (userId) {
            fetchUserData(userId);
        }
    }, [id, UserData, followStatus]);

    useEffect(() => {
        if (id) {
            console.log('id -> ' + id);
            checkFollowStatus(UserData.User._id, id)
        }
    }, [followStatus]);

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
                                className="border border-gray-200 rounded-full w-40 h-auto object-cover"
                                src="https://tse4.mm.bing.net/th?id=OIP.5rcGEldj6E94nYEoEXfcmAAAAA&pid=Api&P=0&h=180"
                                alt="Profile Image"
                            />
                        </div>
                        <div className="flex flex-col">
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

                            { userId != UserData.User._id && 
                                <div className="bg-blue-600 mt-5 w-[12svh] gap-1 text-white font-bold px-2 py-1 border-2 rounded-lg cursor-pointer hover:bg-blue-700 hover:text-white">
                                    {followStatus ? (
                                        <p className='flex flex-row items-center gap-1' onClick={() => unFollowUser(followData._id)}>
                                            Following
                                        </p>
                                    ) : (
                                        <p className='flex flex-row items-center gap-1' onClick={() => followUser(UserData.User._id, id)}>
                                            Follow<FaPlus />
                                        </p>
                                    )}
                                </div>
                            }

                        </div>
                    </div>

                    <div className="flex flex-col mt-8">
                        <div>
                            <p className="text-center text-blue-600 font-semibold text-2xl">Posts</p>
                            <div className="mt-5">
                                <GetPosts user={user._id} />
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
            )
            }
        </div >
    );
};

export default Profile;
