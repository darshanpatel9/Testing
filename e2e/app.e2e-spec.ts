import { PocketExpensesPage } from './app.po';

describe('pocket-expenses App', () => {
  let page: PocketExpensesPage;

  beforeEach(() => {
    page = new PocketExpensesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
