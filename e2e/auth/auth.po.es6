/*global element, by*/
'use strict';

class AuthPage {
  constructor() {
    this.text = element(by.tagName('p'));
    this.heading = element(by.tagName('h2'));
  }
}

module.exports = AuthPage;
