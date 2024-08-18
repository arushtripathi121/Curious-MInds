import React, { useEffect, useState } from 'react';
import PostLoginHeader from './PostLoginHeader';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import FetchUser from '../Hooks/FetchUser';

const MainPage = () => {

  const UserData = useSelector((store) => store.user.user);
  const { User } = UserData;
  const { _id } = User;

  const [post, setPost] = useState([]);

  const followData = FetchUser(_id);

  const GetAllPost = async (followData) => {
    if (followData) {
      console.log('inside function -> ', followData);
      try {
        const response = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getAllposts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ followData }),
        });

        const res = await response.json();
        setPost(res.posts);
      }
      catch (e) {
        console.log(e);
      };
    }
  }

  useEffect(() => {
    if (followData && followData.length > 0) {
      GetAllPost(followData);
    }
  }, [followData]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full mb-10">
        <PostLoginHeader />
      </div>

      <div className="w-full max-w-5xl">
        {post && post.length > 0 ? (
          post.map((user) => <PostCard Post={user} key={user._id} />)
        ) : (
          <p className="text-center text-gray-500">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
