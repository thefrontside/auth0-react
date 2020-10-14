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

const assertUrl = (url: string) => {
  return () => {
    return converge(() => {
      if (bigtestGlobals.testFrame?.contentWindow?.location.pathname !== url) {
        throw new Error('URL does not match');
      }
    });
  };
};


export default test('sure')
  .child('anonymous', test => test
    .step(App.visit('/'))
    .assertion(Paragraph('user is not authenticated').exists())
    .child('using loginWithRedirect', test => test
      .step(Button('login with redirect').click())
      .assertion('Comfirm App redirected', assertUrl('/authorize'))
      .assertion(Heading('sign in').exists())
    )
  )
  .child('authenticated', test => test
    .child('using authenticateUser()', test => test
      .step('authenticate user', async () => {
        authenticateUser();
      })
      .step(App.visit('/'))
      .assertion(Button('logout').exists())
      .child('log out', test => test
        .step(Button('logout').click())
        .assertion(Paragraph('user is not authenticated').exists()))
    )
  )
  
