import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Home } from './Home';
import { SignIn } from "./SignIn";
import { Account } from "./Account";

export const App = () => {
  return (
    <Switch>
      <Route path="/authorize">
        <SignIn />
      </Route>
      <Route path="/account">
        <Account />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};
