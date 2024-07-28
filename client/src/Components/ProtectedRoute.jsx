import React from 'react'
import { useSelector } from 'react-redux'
import SignUp from './SignUp';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const user = useSelector(store => store.user.user);
  return user ? Component : <SignUp/>;
}

export default ProtectedRoute
