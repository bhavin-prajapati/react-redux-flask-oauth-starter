// App.jsx
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import reactLogo from './assets/BB.svg'
import viteLogo from '/vite.svg'
import Dashboard from './Dashboard'

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    const user_b64 = cookies.get('user').replace('\'', '').replace('\'', '')
    let user = JSON.parse(window.atob(user_b64));
    this.state = {
      user
    };
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <Dashboard user={user} />
      </>
    );
  }
}

export default withCookies(App);