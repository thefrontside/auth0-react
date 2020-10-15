import { App, Button, Heading, test, TextField } from "bigtest";
import { authenticateUser } from "../src/test-helpers";
import { assertPathname, assertSearch } from "./helpers";

import { Paragraph } from "./interactors";

export default test("Auth0 Simulation for React")
  .child("anonymous", test =>
    test
      .step(App.visit("/"))
      .assertion(Paragraph("user is not authenticated").exists())
      .child("using loginWithRedirect", test =>
        test
          .step(Button("login with redirect").click())
          .assertion("redirected to /authorize", assertPathname("/authorize"))
          .assertion(
            "includes redirect uri",
            assertSearch("?redirect_uri=http://localhost:24001")
          )
          .assertion(Heading("sign in").exists())
          .child("authorize user", test =>
            test
              // TODO: need to fill in the name here
              .step(TextField({ placeholder: 'Username' }).fillIn('batman'))
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              .step('pause', () => new Promise<void>(() => { }))
              .step(Button("submit").click())
              .assertion("redirected to /", assertPathname("/"))
          )
      )
  )
  .child("authenticateUser()", test =>
    test
      .step("authenticate user", async () => {
        authenticateUser();
      })
      .step(App.visit("/"))
      .assertion(Button("logout").exists())
      .child("log out", test =>
        test
          .step(Button("logout").click())
          .assertion(Paragraph("user is not authenticated").exists())
      )
  );
