/*global describe, beforeEach, it, browser, expect */
'use strict';

import AddWordsPage from './add-words.po';

describe('Add words page', () => {
  let addWordsPage;

  beforeEach(() => {
    addWordsPage = new AddWordsPage();
    browser.get('/#/add-words');
  });

  it('should say AddWordsCtrl', () => {
    expect(addWordsPage.heading.getText()).toEqual('addWords');
    expect(addWordsPage.text.getText()).toEqual('AddWordsCtrl');
  });
});
