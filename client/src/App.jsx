// App.jsx
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Dashboard from './Dashboard'
import Signin from './Signin'

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

  render() {
    const { user } = this.state;
    return (
      <>
        {user ? (
          <Dashboard user={user} />
        ) : (
          <Signin />
        )}
      </>
    );
  }
}

export default withCookies(App);