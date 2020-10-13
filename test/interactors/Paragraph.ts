import { createInteractor } from '@bigtest/interactor';

export default createInteractor<HTMLElement>('p')({
  selector: 'p',
  locator: element => element.textContent,
  filters: {
    id: element => element.id
  }
});
