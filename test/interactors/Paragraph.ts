import { createInteractor } from '@bigtest/interactor';

export default createInteractor('p')({
  selector: 'p',
  locator: element => element.textContent,
  filters: {
    id: element => element.id
  }
});
