import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../Utils/userSlice';
import Search from './Search';
import { MdDelete } from "react-icons/md";
import { api } from '../Utils/Constants';

const PostLoginHeader = () => {
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');

  const UserData = useSelector((store) => store.user.user);
  const { id, userName } = UserData.User; // Assuming userName is available in UserData.User

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleClick = () => {
    setShow(!show);
  }

  const onLogout = () => {
    dispatch(removeUser());
    navigate('/');
  }

  const deleteAccount = async () => {
    if (usernameInput === userName) {
      const data = await fetch(api + 'deleteUser', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      const res = await data.json();
      if (res.success === true) {
        dispatch(removeUser());
        navigate('/redirectToSignIn');
      }
    } else {
      alert('Username does not match. Please try again.');
    }
    setIsModalOpen(false);
    setUsernameInput('');
  }

  return (
    <div className="flex flex-col">
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
            <p
              className="px-4 py-2 hover:bg-blue-200 cursor-pointer flex flex-row items-center"
              onClick={() => setIsModalOpen(true)}
            >
              <MdDelete className='text-red-500 w-5 h-6' /> Delete Account
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Please enter your username to confirm account deletion.</p>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="border p-2 rounded-lg w-full mb-4"
              placeholder="Enter your username"
            />
            <div className="flex justify-end">
              <button
                onClick={deleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostLoginHeader;
