import React from 'react';
import Login from './Login'
import { useLoginStatus } from '../utils/hooks'

export const RequireAuth = ({ children }) => {
   const isLoggedIn = useLoginStatus(); // Your hook to get login status
   if (!isLoggedIn) {
      return <Login />;
   }
   return children;
};
