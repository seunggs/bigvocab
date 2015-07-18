/*global describe, beforeEach, it, browser, expect */
'use strict';

import TestWordsPage from './test-words.po';

describe('Test words page', () => {
  let testWordsPage;

  beforeEach(() => {
    testWordsPage = new TestWordsPage();
    browser.get('/#/test-words');
  });

  it('should say TestWordsCtrl', () => {
    expect(testWordsPage.heading.getText()).toEqual('testWords');
    expect(testWordsPage.text.getText()).toEqual('TestWordsCtrl');
  });
});
