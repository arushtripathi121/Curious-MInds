import React, { useEffect, useState } from 'react';
import PostLoginHeader from './PostLoginHeader';
import PostCard from './PostCard';
import { useSelector } from 'react-redux';
import FetchUser from '../Hooks/FetchUser';
import CreatePost from './CreatePost';
import { MdOutlineAddComment } from 'react-icons/md';
import { api } from '../Utils/Constants';
const MainPage = () => {

  const UserData = useSelector((store) => store.user.user);
  const { User } = UserData;
  const { _id } = User;
  const [page, setPage] = useState(0);
  const [post, setPost] = useState([]);
  const [createPost, setCreatePost] = useState(false);

  const followData = FetchUser(_id);
  const onHandlePage = (value) => {
    setPage(value);
  }
  const onHandlePost = () => {
    setCreatePost(true);
  };

  const onCloseHandlePost = () => {
    setCreatePost(false);
  };

  const GetAllPost = async (followData) => {
  
    console.log("followData -> ", followData);
    if (followData) {
      console.log('inside function -> ', followData);
      try {
        const response = await fetch(api+'getAllposts', {
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
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
        <div className="w-full mb-10">
          <PostLoginHeader />
        </div>
        <div className='flex flex-row gap-40 mb-10 text-blue-500 text-xl font-bold'>
          <button
            onClick={() => onHandlePage(1)}
            className={`${page === 1 ? 'border-b-4 border-blue-500' : ''}`}
          >
            Recommended
          </button>
          <button
            onClick={() => onHandlePage(0)}
            className={`${page === 0 ? 'border-b-4 border-blue-500' : ''}`}
          >
            Following
          </button>

        </div>

        {page == 0 &&
          <div className="w-full max-w-5xl">
            {post && post.length > 0 ? (
              post.map((user) => <PostCard Post={user} key={user._id} />)
            ) : (
              <p className="text-center text-gray-500">No posts available</p>
            )}
          </div>
        }

        {page == 1 &&
          <p>No posts yet</p>
        }
      </div>
      <div className="fixed bottom-10 right-10 flex items-center space-x-4 p-4 bg-white rounded-lg shadow-lg">
        {createPost && <CreatePost onClose={onCloseHandlePost} user={User._id} userName={User.userName} />}
        <MdOutlineAddComment
          className="text-5xl text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out cursor-pointer"
          title="Write post"
          onClick={onHandlePost}
        />
      </div>
    </div>
  );
};

export default MainPage;
