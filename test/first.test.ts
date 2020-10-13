import { App } from '@bigtest/interactor';
import { test } from '@bigtest/suite';
import { authenticateUser } from '../src/test-helpers';

import { Button, Paragraph } from './interactors';

export default test('sure')
  .child('unauthenticated', test => test
    .step(App.visit('/'))
    .assertion(Paragraph('user is not authenticated').exists()))
  .child('authenticated', test => test
    .step('authenticate user', async () => {
      authenticateUser();
    })
    .step(App.visit('/'))
    .assertion(Button('logout').exists())
    .child('log out', test => test
      .step(Button('logout').click())
      .assertion(Paragraph('user is not authenticated').exists())))