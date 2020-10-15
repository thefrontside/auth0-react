import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Home } from './Home';
import { SignIn } from "./SignIn";

export const App = () => {
  // if session doesn't exist, go to /authorize
  return (
    <Switch>
      <Route path="/authorize">
        <SignIn />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};
