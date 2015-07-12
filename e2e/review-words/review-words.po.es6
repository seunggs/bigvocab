/*global element, by*/
'use strict';

class ReviewWordsPage {
  constructor() {
    this.text = element(by.tagName('p'));
    this.heading = element(by.tagName('h2'));
  }
}

module.exports = ReviewWordsPage;
