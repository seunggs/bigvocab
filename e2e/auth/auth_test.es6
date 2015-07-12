/*global describe, beforeEach, it, browser, expect */
'use strict';

import AuthPage from './auth.po';

describe('Auth page', () => {
  let authPage;

  beforeEach(() => {
    authPage = new AuthPage();
    browser.get('/#/auth');
  });

  it('should say AuthCtrl', () => {
    expect(authPage.heading.getText()).toEqual('auth');
    expect(authPage.text.getText()).toEqual('AuthCtrl');
  });
});
