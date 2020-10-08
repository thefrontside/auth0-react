import { App } from '@bigtest/interactor';
import { test } from '@bigtest/suite';

import Paragraph from './interactors/Paragraph';
import { authenticateUser } from '../src/test-helpers';

export default test('sure')
  .step('set username and password', async () => {
    authenticateUser({firstName: 'Homer', lastName: 'Simpson'});
  })
  .step(App.visit('/'))
  .assertion(Paragraph(`hello Homer Simpson`).exists())
  
