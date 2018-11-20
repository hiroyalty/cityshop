import { NewCityShoppingPage } from './app.po';

describe('new-city-shopping App', () => {
  let page: NewCityShoppingPage;

  beforeEach(() => {
    page = new NewCityShoppingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
