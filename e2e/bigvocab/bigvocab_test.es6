/*global describe, beforeEach, it, browser, expect */
'use strict';

import BigvocabPage from './bigvocab.po';

describe('Bigvocab page', () => {
  let bigvocabPage;

  beforeEach(() => {
    bigvocabPage = new BigvocabPage();
    browser.get('/#/bigvocab');
  });

  it('should say BigvocabCtrl', () => {
    expect(bigvocabPage.heading.getText()).toEqual('bigvocab');
    expect(bigvocabPage.text.getText()).toEqual('BigvocabCtrl');
  });
});
