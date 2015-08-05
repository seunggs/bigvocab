/*global describe, beforeEach, it, browser, expect */
'use strict';

import SettingsPage from './settings.po';

describe('Settings page', () => {
  let settingsPage;

  beforeEach(() => {
    settingsPage = new SettingsPage();
    browser.get('/#/settings');
  });

  it('should say SettingsCtrl', () => {
    expect(settingsPage.heading.getText()).toEqual('settings');
    expect(settingsPage.text.getText()).toEqual('SettingsCtrl');
  });
});
