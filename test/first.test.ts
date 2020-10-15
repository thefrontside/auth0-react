import { App, Button, Heading } from '@bigtest/interactor';
import { test } from '@bigtest/suite';
import { bigtestGlobals } from '@bigtest/globals';
import { authenticateUser } from '../src/test-helpers';

import { Paragraph } from './interactors';

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function converge<T>(fn: () => T): Promise<T> {
  let startTime = performance.now();
  while (true) {
    try {
      return fn();
    } catch (e) {
      let diff = performance.now() - startTime;
      if (diff > bigtestGlobals.defaultInteractorTimeout) {
        throw e;
      } else {
        await wait(1);
      }
    }
  }
}

const assertPathname = (url: string) => {
  return () => {
    return converge(() => {
      let currentURL = bigtestGlobals.testFrame?.contentWindow?.location.pathname;
      if (currentURL !== url) {
        throw new Error(`expected ${url}, received ${currentURL}`);
      }
    });
  };
};

const assertSearch = (url: string) => {
  return () => {
    return converge(() => {
      let currentURL = bigtestGlobals.testFrame?.contentWindow?.location.search;
      if (currentURL !== url) {
        throw new Error(`expected ${url}, received ${currentURL}`);
      }
    });
  };
};


export default test('Auth0 Simulation for React')
  .child('anonymous', test => test
    .step(App.visit('/'))
    .assertion(Paragraph('user is not authenticated').exists())
    .child('using loginWithRedirect', test => test
      .step(Button('login with redirect').click())
      .assertion('redirected to /authorize', assertPathname('/authorize'))
      .assertion('includes redirect uri', assertSearch('?redirect_uri=http://localhost:24001'))
      .assertion(Heading('sign in').exists())
      .child('authorize user', test => test
        // TODO: need to fill in the name here
        .step(Button('submit').click())
        .assertion('redirected to /', assertPathname('/'))
      )
    )
  )
  .child('authenticateUser()', test => test
    .step('authenticate user', async () => {
      authenticateUser();
    })
    .step(App.visit('/'))
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // .step('pause', () => new Promise<void>(() => { }))
    .assertion(Button('logout').exists())
    .child('log out', test => test
      .step(Button('logout').click())
      .assertion(Paragraph('user is not authenticated').exists()))
  );
  
