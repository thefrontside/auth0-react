import { App } from '@bigtest/interactor';
import { test } from '@bigtest/suite';

import Header from './interactors/Header';

export default test('sure')
  .step(App.visit('/'))
  .assertion(Header('the snozzberries taste like snozzberradfasdfies').exists())
