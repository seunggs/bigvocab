/*global describe, beforeEach, it, browser, expect */
'use strict';

import ImportPage from './import.po';

describe('Import page', () => {
  let importPage;

  beforeEach(() => {
    importPage = new ImportPage();
    browser.get('/#/import');
  });

  it('should say ImportCtrl', () => {
    expect(importPage.heading.getText()).toEqual('import');
    expect(importPage.text.getText()).toEqual('ImportCtrl');
  });
});
