import React from 'react';
import { Auth0SimulationProvider, checkAuth0Simulation } from "../src";
import { Auth0Provider } from "@auth0/auth0-react";

export const AuthProvider = ({ children }) => {
  if (checkAuth0Simulation()) {
    return (
      <Auth0SimulationProvider>
        {children}
      </Auth0SimulationProvider>
    );
  } else {
    return (
      <Auth0Provider
        domain="dev-02sbo7-w.us.auth0.com"
        clientId="fwXiqOHihG63vBYGPhSCMHdRjruioWVr"
        redirectUri={window.location.origin}
      >
        {children}
      </Auth0Provider>
    );
  }
};
