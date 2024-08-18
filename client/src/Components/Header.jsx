import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const onhandleClick = () => {
    navigate('/main');
  }
  return (
      <div className="flex flex-row justify-between items-center px-12 py-5 bg-gray-800 text-white">
        <p className="font-mono font-bold text-3xl">
          <Link to="/">DevelopersNest</Link>
        </p>
        <button
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white font-semibold text-lg rounded-lg"
          onClick={onhandleClick}
        >
          Sign In
        </button>
      </div>
  )
}

export default Header
