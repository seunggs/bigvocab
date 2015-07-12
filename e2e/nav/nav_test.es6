/*global describe, beforeEach, it, browser, expect */
'use strict';

import NavPage from './nav.po';

describe('Nav page', () => {
  let navPage;

  beforeEach(() => {
    navPage = new NavPage();
    browser.get('/#/nav');
  });

  it('should say NavCtrl', () => {
    expect(navPage.heading.getText()).toEqual('nav');
    expect(navPage.text.getText()).toEqual('NavCtrl');
  });
});
