// App.jsx
import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { RequireAuth } from './RequireAuth';
import { useGetUserFromCookies } from '../utils/hooks'
import { getUserFromState } from '../selectors/index'
import Layout from './Layout';
import Home from './Home';
import Login from './Login';
import Create from './Create';
import Game from './Game';

export const router = createBrowserRouter([
  {
    path: "",
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: (<RequireAuth><Home /></RequireAuth>),
      },
      {
        path: "/create",
        element: (<RequireAuth><Create /></RequireAuth>),
      },
      {
        path: "/game",
        element: (<RequireAuth><Game /></RequireAuth>),
      },
    ],
  },
]);

const AppComponent = (props) => {
  React.useMemo(() => {
    const { cookies } = props;
    let user = useGetUserFromCookies(cookies);
    props.getUserSuccess(user);
  }, []);

  return (
    <RouterProvider router={router} />
  )
}

AppComponent.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserSuccess: (user) => dispatch({ type: "GET_USER_SUCCESS", data: user }),
  }, dispatch);
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(AppComponent));

export default App;
