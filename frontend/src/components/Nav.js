import React from 'react'

function Nav({displayForm, loggedIn, handleLogout}) {
  const loggedOutNav = (
    <ul>
      <li onClick={() => displayForm('login')}>login</li>
      <li onClick={() => displayForm('signup')}>signup</li>
    </ul>
  );

  const loggedInNav = (
    <ul>
      <li onClick={handleLogout}>logout</li>
    </ul>
  )
  return <div>{loggedIn ? loggedInNav : loggedOutNav}</div>
}

export default Nav

