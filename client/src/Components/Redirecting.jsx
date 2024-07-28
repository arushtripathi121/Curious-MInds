import React from 'react'
import { Link } from 'react-router-dom'

const Redirecting = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <p className="text-gray-700 text-xl mb-6">New account created. Go to sign in page.</p>
        <Link to="/signUp">
          <button className="bg-purple-600 px-6 py-2 text-white font-semibold text-lg rounded hover:bg-purple-700">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Redirecting
