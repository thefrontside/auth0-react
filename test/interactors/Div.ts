import { createInteractor } from '@bigtest/interactor';

export default createInteractor('div')({
  selector: 'div',
  locator: element => element.textContent,
  filters: {
    id: element => element.id
  }
});
