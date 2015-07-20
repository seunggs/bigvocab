/*global describe, beforeEach, it, browser, expect */
'use strict';

import ListWordsPage from './list-words.po';

describe('List words page', () => {
  let listWordsPage;

  beforeEach(() => {
    listWordsPage = new ListWordsPage();
    browser.get('/#/list-words');
  });

  it('should say ListWordsCtrl', () => {
    expect(listWordsPage.heading.getText()).toEqual('listWords');
    expect(listWordsPage.text.getText()).toEqual('ListWordsCtrl');
  });
});
