import { App, Button, Heading, test, TextField } from "bigtest";
import { AuthorizeAuth0 } from "../src/test-helpers";
import { assertPathname, assertSearch } from "./helpers";

import { Paragraph } from "./interactors";

export default test("Auth0 Simulation for React")
  .child("anonymous", test => test
    .step(App.visit("/"))
    .assertion(Paragraph("user is not authenticated").exists())
    .child("using loginWithRedirect", test => test
      .step(Button("login with redirect").click())
      .assertion("redirected to /authorize", assertPathname("/authorize"))
      .assertion(
        "includes redirect uri",
        assertSearch("?redirect_uri=http://localhost:24001"))
      .assertion(Heading("sign in").exists())
      .child("authorize user", test => test
        .step(TextField({ placeholder: 'Username' }).fillIn('batman'))
        .step(Button("submit").click())
        .assertion("redirected to /", assertPathname("/"))
        .assertion(Heading("Hello batman").exists()))))
  .child("AuthorizeAuth0", test => test
    .step('authorize user', async () => { 
      AuthorizeAuth0({firstname: 'bruce', lastname: 'wayne'})
    })
    .step(App.visit("/"))
    .assertion(Button("logout").exists())
    .child("log out", test => test
      .step(Button("logout").click())
			.assertion(Paragraph("user is not authenticated").exists())));
