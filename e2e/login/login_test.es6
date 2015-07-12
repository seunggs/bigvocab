/*global describe, beforeEach, it, browser, expect */
'use strict';

import LoginPage from './login.po';

describe('Login page', () => {
  let loginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    browser.get('/#/login');
  });

  it('should say LoginCtrl', () => {
    expect(loginPage.heading.getText()).toEqual('login');
    expect(loginPage.text.getText()).toEqual('LoginCtrl');
  });
});
