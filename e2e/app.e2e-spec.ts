import { MaterialCliStarterPage } from './app.po';

describe('ng-material-starter App', () => {
  let page: MaterialCliStarterPage;

  beforeEach(() => {
    page = new MaterialCliStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
