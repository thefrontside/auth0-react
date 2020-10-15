import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Auth0SimulationProvider, checkAuth0Simulation } from '../src';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import { setUserToken } from "../src";

const Home = () => {
  let {
    isAuthenticated,
    // error,
    // isLoading,
    // getAccessTokenSilently,
    // getAccessTokenWithPopup,
    // getIdTokenClaims,
    loginWithRedirect,
    // loginWithPopup,
    logout,
    user
  } = useAuth0();

  return isAuthenticated ? (
    <>
      <h1>Hello {user.name}</h1>
      <button
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        logout
      </button>
    </>
  ) : (
    <div>
      <p>user is not authenticated</p>
      <button onClick={loginWithRedirect}>login with redirect</button>
    </div>
  )
};

const USERS = {
  batman: {
    firstName: 'Bruce',
    lastName: 'Wayne'
  }
}

const AuthProvider = ({ children }) => {
  if(checkAuth0Simulation()){
    return (
      <Auth0SimulationProvider
        getUser={async (token) => USERS[token]}
      >
        {children}
      </Auth0SimulationProvider>
    )
  } else {
    return (
      <Auth0Provider
        domain="dev-02sbo7-w.us.auth0.com"
        clientId="fwXiqOHihG63vBYGPhSCMHdRjruioWVr"
        redirectUri={window.location.origin}
      >
        {children}
      </Auth0Provider>
    )
  }
}

const SignIn = () => {
  let [username, setUsername] = useState('');
  let history = useHistory();
  return (
    <div>
      <h1>sign in</h1>
      <form onSubmit={() => {
        setUserToken(username);
        history.push('/')
      }}>
        <input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>
        <input type='password' placeholder='Password'/>
        <button type='submit'>
          submit
        </button>
      </form>
    </div>
  )
}

const App = () => {
  // if session doesn't exist, go to /authorize
  return (
    <Switch>
      <Route path='/authorize'>
        <SignIn />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </Router>,
  document.getElementById('app')
);
