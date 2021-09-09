import { MelvorUtilsPage } from './app.po';

describe('melvor-utils App', function() {
  let page: MelvorUtilsPage;

  beforeEach(() => {
    page = new MelvorUtilsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
