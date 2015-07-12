/*global element, by*/
'use strict';

class CollectionPage {
  constructor() {
    this.text = element(by.tagName('p'));
    this.heading = element(by.tagName('h2'));
  }
}

module.exports = CollectionPage;
