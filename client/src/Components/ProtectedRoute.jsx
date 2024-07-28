import React from 'react'
import { useSelector } from 'react-redux'
import SignUp from './SignUp';

const ProtectedRoute = ({ element: Component, element2: Component2, ...rest }) => {
  const user = useSelector(store => store.user.user);

  if(Component2) {
    return user ? Component : Component2;
  }
  return user ? Component : <SignUp/>;
}

export default ProtectedRoute
