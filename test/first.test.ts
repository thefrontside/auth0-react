import { App } from '@bigtest/interactor';
import { test } from '@bigtest/suite';

import Paragraph from './interactors/Paragraph';
import { authenticateUser } from '../src/test-helpers';

export default test('sure')
  .child('authenticated', test => test
    .step('set username and password', async () => {
      authenticateUser({firstName: 'Homer', lastName: 'Simpson'});
    })
    .step(App.visit('/'))
    .assertion(Paragraph('hello Homer Simpson').exists()))
  .child('unauthenticated', test => test
    .step(App.visit('/'))
    .assertion(Paragraph('user is not authenticated').exists()))
  