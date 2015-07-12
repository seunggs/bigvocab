/*global describe, beforeEach, it, browser, expect */
'use strict';

import CollectionsPage from './collections.po';

describe('Collections page', () => {
  let collectionsPage;

  beforeEach(() => {
    collectionsPage = new CollectionsPage();
    browser.get('/#/collections');
  });

  it('should say CollectionsCtrl', () => {
    expect(collectionsPage.heading.getText()).toEqual('collections');
    expect(collectionsPage.text.getText()).toEqual('CollectionsCtrl');
  });
});
