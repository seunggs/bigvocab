/*global describe, beforeEach, it, browser, expect */
'use strict';

import NavHomePage from './nav-home.po';

describe('Nav home page', () => {
  let navHomePage;

  beforeEach(() => {
    navHomePage = new NavHomePage();
    browser.get('/#/nav-home');
  });

  it('should say NavHomeCtrl', () => {
    expect(navHomePage.heading.getText()).toEqual('navHome');
    expect(navHomePage.text.getText()).toEqual('NavHomeCtrl');
  });
});
