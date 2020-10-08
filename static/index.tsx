import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import { Auth0Provider } from '../src/provider';
      
const Thing = () => {
  let [ userData, setUserData ] = useState({
    firstName: '',
    lastName: '',
    isAuthenticated: false
  });

  useEffect(() => {
    let auth0 = JSON.parse(`${localStorage.getItem('@frontside/auth0-react')}`) || '';
    if (auth0.session.firstName && auth0.session.lastName && auth0.isAuthenticated) {
      setUserData({
        firstName: auth0.session.firstName,
        lastName: auth0.session.lastName,
        isAuthenticated: auth0.isAuthenticated
      })
    }
  }, []);

  return (
    <p>hello {userData.firstName} {userData.lastName}</p>
  )
};

const App = () => {
  return (
    <Thing />
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);