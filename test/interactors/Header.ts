import { createInteractor } from '@bigtest/interactor';

export default createInteractor('header')({
  selector: 'header',
  locator: element => element.textContent
});
