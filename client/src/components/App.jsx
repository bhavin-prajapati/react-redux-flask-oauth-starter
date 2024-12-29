// App.jsx
import React, { Component } from 'react';
import { connect } from "react-redux";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from './RequireAuth';
import { useGetUserFromCookies } from '../hooks'
import Layout from './Layout';
import Dashboard from './Dashboard'
import Login from './Login'


class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    let user = useGetUserFromCookies(cookies);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RequireAuth>
              <Dashboard user={this.props.user} />
            </RequireAuth>} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  getUserSuccess: () => dispatch({ type: "GET_USER_SUCCESS" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
