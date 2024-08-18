import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlus, FaRegUser } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { removeUser } from '../Utils/userSlice';
import Search from './Search';

const PostLoginHeader = () => {

  const [show, setShow] = useState(false);
  const onHandleClick = () => {
    setShow(!show);
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(removeUser());
    navigate('/');
  }

  return (
    <div className="flex justify-between items-center bg-white px-10 py-4 shadow-md">
      <p className="font-mono font-bold text-4xl text-blue-600">
        <Link to="/">DevelopersNest</Link>
      </p>
      <div className="flex-grow mr-60">
        <Search />
      </div>
      <div className="relative group">
        <p className="text-blue-600 text-2xl cursor-pointer">
          <FaRegUser />
        </p>
        <div className="absolute right-0 mt-3 w-48 bg-blue-100 text-blue-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-blue-200 cursor-pointer"
          >
            Your Profile
          </Link>
          <p
            className="block px-4 py-2 hover:bg-blue-200 cursor-pointer"
            onClick={onLogout}
          >
            Log out
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostLoginHeader
