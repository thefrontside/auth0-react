import { App } from '@bigtest/interactor';
import { test } from '@bigtest/suite';

import Paragraph from './interactors/Paragraph';
import { authenticateUser } from '../src/test-helpers';

export default test('sure')
  .child('authenticated', test => test
    .step('set username and password', async () => {
      authenticateUser();
    })
    .step(App.visit('/'))
    .assertion(Paragraph('user is not authenticated').absent()))
  .child('unauthenticated', test => test
    .step(App.visit('/'))
    .assertion(Paragraph('user is not authenticated').exists()))
  