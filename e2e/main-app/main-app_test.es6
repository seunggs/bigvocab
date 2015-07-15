/*global describe, beforeEach, it, browser, expect */
'use strict';

import MainAppPage from './main-app.po';

describe('Main app page', () => {
  let mainAppPage;

  beforeEach(() => {
    mainAppPage = new MainAppPage();
    browser.get('/#/main-app');
  });

  it('should say MainAppCtrl', () => {
    expect(mainAppPage.heading.getText()).toEqual('mainApp');
    expect(mainAppPage.text.getText()).toEqual('MainAppCtrl');
  });
});
