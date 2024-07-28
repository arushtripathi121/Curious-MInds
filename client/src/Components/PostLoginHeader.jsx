import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { removeUser } from '../Utils/userSlice';

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
        <div className="flex justify-between items-center bg-gray-900 px-20 py-5">
        <p className="font-mono font-bold text-3xl text-gray-100">
          <Link to="/">DevelopersNest</Link>
        </p>
        <div className="relative group">
          <p className="text-gray-100 text-2xl cursor-pointer">
            <FaRegUser />
          </p>
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-gray-800 text-gray-100 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer"><Link to={'/profile'}>Your Profile</Link></p>
              <p className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => onLogout()}>Log out</p>
          </div>
        </div>
      </div>
    )
}

export default PostLoginHeader
