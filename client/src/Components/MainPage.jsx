import React, { useEffect, useState } from 'react';
import PostLoginHeader from './PostLoginHeader';
import PostCard from './PostCard';

const MainPage = () => {
  const [post, setPost] = useState([]);

  const GetAllPost = async () => {
    const response = await fetch('http://localhost:5000/Curious_Minds/api/v1/user/getAllPosts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setPost(data.posts);
  };

  useEffect(() => {
    GetAllPost();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-5xl mb-10">
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
