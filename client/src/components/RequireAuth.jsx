import React from 'react';
import Login from './Login'
import { useLoginStatus } from '../hooks'

export const RequireAuth = ({ children }) => {
   const userIsLogged = useLoginStatus(); // Your hook to get login status
   if (!userIsLogged) {
      return <Login />;
   }
   return children;
};
