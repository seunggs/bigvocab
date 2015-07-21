/*global describe, beforeEach, it, browser, expect */
'use strict';

import RootPage from './root.po';

describe('Root page', () => {
  let rootPage;

  beforeEach(() => {
    rootPage = new RootPage();
    browser.get('/#/');
  });

  it('should say RootCtrl', () => {
    expect(rootPage.heading.getText()).toEqual('root');
    expect(rootPage.text.getText()).toEqual('RootCtrl');
  });
});
