/*global describe, beforeEach, it, browser, expect */
'use strict';

import ReviewWordsPage from './review-words.po';

describe('Review words page', () => {
  let reviewWordsPage;

  beforeEach(() => {
    reviewWordsPage = new ReviewWordsPage();
    browser.get('/#/review-words');
  });

  it('should say ReviewWordsCtrl', () => {
    expect(reviewWordsPage.heading.getText()).toEqual('reviewWords');
    expect(reviewWordsPage.text.getText()).toEqual('ReviewWordsCtrl');
  });
});
