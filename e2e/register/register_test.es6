/*global describe, beforeEach, it, browser, expect */
'use strict';

import RegisterPage from './register.po';

describe('Register page', () => {
  let registerPage;

  beforeEach(() => {
    registerPage = new RegisterPage();
    browser.get('/#/register');
  });

  it('should say RegisterCtrl', () => {
    expect(registerPage.heading.getText()).toEqual('register');
    expect(registerPage.text.getText()).toEqual('RegisterCtrl');
  });
});
