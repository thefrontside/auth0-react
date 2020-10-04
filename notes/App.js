import React from 'react';
import './App.css';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { ENABLE_SIMULATION } from './Auth0/config';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        hello
      </header>
    </div>    
  )
}

export default ENABLE_SIMULATION ? App : withAuthenticationRequired(App);
