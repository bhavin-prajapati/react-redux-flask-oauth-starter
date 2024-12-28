// App.jsx
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthRoute } from './AuthRoute';
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
    let user_cookie = cookies.get('user')
    let user = null
    if (user_cookie) {
      const user_b64 = user_cookie.replace('\'', '').replace('\'', '')
      user = JSON.parse(window.atob(user_b64));
    }
    this.state = {
      user
    };
  }

  isAuthenticated() {
    const { user } = this.state;
    return user != null
  }

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard user={user} />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default withCookies(App);