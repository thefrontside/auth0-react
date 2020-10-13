import { createInteractor, perform } from '@bigtest/interactor';

export default createInteractor<HTMLButtonElement>('button')({
  selector: 'button',
  locator: element => element.textContent,
  actions: {
    click: perform((element) => {
      element.click();
    })
  }
});
