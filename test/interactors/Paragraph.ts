import { createInteractor } from '@bigtest/interactor';

export const Paragraph = createInteractor<HTMLElement>('p')({
  selector: 'p',
  locator: element => element.textContent || '',
});
