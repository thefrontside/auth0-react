import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "./AuthProvider";

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById("app")
);
