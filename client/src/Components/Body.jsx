import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import SignUp from './SignUp';
import Redirecting from './Redirecting';
import MainPage from './MainPage';
import ErrorPage from './ErrorPage';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';

const Body = () => {

    const appRouter = createBrowserRouter([
        {
          path: '/',
          element: <HomePage/>  
        },
        {
          path: '/signUp',
          element: <SignUp/>
        },
        {
          path: 'redirectToSignIn',
          element: <Redirecting/>
        },
        {
          path: '/main',
          element: <ProtectedRoute element={<MainPage />} />
        },
        {
          path: '/profile',
          element: <ProtectedRoute element={<Profile />} />
        },
        {
          path: '/error',
          element: <ErrorPage/>
        }
    ])
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body;
