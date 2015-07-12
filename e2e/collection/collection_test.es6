/*global describe, beforeEach, it, browser, expect */
'use strict';

import CollectionPage from './collection.po';

describe('Collection page', () => {
  let collectionPage;

  beforeEach(() => {
    collectionPage = new CollectionPage();
    browser.get('/#/collection');
  });

  it('should say CollectionCtrl', () => {
    expect(collectionPage.heading.getText()).toEqual('collection');
    expect(collectionPage.text.getText()).toEqual('CollectionCtrl');
  });
});
