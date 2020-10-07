import { App } from '@bigtest/interactor';
import { test } from '@bigtest/suite';

import Div from './interactors/Div';
import { setUser } from '@frontside/auth0-react/test-helpers';

const username = 'HomerSimpson';
const password = 'ilovedoughnuts123';

export default test('sure')
  .step('set username and password', async () => {
    setUser(username, password);
  })
  .step(App.visit('/'))
  .assertion(Div(username, {id: 'username'}).exists())
  .assertion(Div(password, {id: 'password'}).exists())
