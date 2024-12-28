import { Outlet, Navigate } from 'react-router-dom';

export const AuthRoute = ({ auth }) => {
    const isAuth = auth;
    console.log('isAuth', isAuth)
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
