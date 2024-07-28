import React from 'react'
import GetAllPostUser from '../Hooks/GetAllPostUser';
import PostCard from './PostCard';

const GetPosts = ({ user }) => {

  const posts = GetAllPostUser(user);
  return (
    <div className='flex flex-col gap-10'>
      {posts && posts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((post) => <PostCard post={post} key={post._id} />)}
    </div>
  )
}

export default GetPosts;