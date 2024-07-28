import React from 'react'
import { FaRegFrown } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <div className="text-6xl mb-4">
              <FaRegFrown />
            </div>
            <h1 className="text-4xl font-bold mb-2">Oops! Something went wrong.</h1>
            <p className="text-xl mb-6">
              It seems like you encountered an error. Please sign in to continue.
            </p>
            <Link to="/signUp">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
                Sign In
              </button>
            </Link>
          </div>
    </div>
  )
}

export default ErrorPage
