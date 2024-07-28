import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'
const HomePage = () => {
  return (
    <div>
      <Header />
      <div className='flex flex-row items-center px-12 font-mono'>
        <div className='space-y-6'>
          <p className='text-7xl font-bold'>Connect with developers</p>
          <p className='text-2xl'>Share experiences, codes and problems</p>
          <button className='bg-purple-600 px-3 py-2 text-white font-semibold text-lg font-sans'><Link to={'/signUp'}>Sign In</Link></button>
        </div>
        <img className=' size-6/12 mx-auto' src='https://i.pinimg.com/originals/e8/c9/28/e8c928879223816651ec0e885932fdea.jpg'/>
      </div>

    </div>
  )
}

export default HomePage
