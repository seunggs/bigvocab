/*global describe, beforeEach, it, browser, expect */
'use strict';

import LogoutPage from './logout.po';

describe('Logout page', () => {
  let logoutPage;

  beforeEach(() => {
    logoutPage = new LogoutPage();
    browser.get('/#/logout');
  });

  it('should say LogoutCtrl', () => {
    expect(logoutPage.heading.getText()).toEqual('logout');
    expect(logoutPage.text.getText()).toEqual('LogoutCtrl');
  });
});
