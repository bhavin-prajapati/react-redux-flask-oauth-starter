import { useState } from 'react'
import { withCookies, Cookies } from 'react-cookie';
import reactLogo from './assets/BB.svg'
import viteLogo from '/vite.svg'
import Example from './Example'

function App(props) {
  console.log(props)
  const { cookies } = props;
  console.log(cookies)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Example />
    </>
  )
}

export default App
