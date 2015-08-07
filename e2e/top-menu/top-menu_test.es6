/*global describe, beforeEach, it, browser, expect */
'use strict';

import TopMenuPage from './top-menu.po';

describe('Top menu page', () => {
  let topMenuPage;

  beforeEach(() => {
    topMenuPage = new TopMenuPage();
    browser.get('/#/top-menu');
  });

  it('should say TopMenuCtrl', () => {
    expect(topMenuPage.heading.getText()).toEqual('topMenu');
    expect(topMenuPage.text.getText()).toEqual('TopMenuCtrl');
  });
});
