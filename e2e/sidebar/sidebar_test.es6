/*global describe, beforeEach, it, browser, expect */
'use strict';

import SidebarPage from './sidebar.po';

describe('Sidebar page', () => {
  let sidebarPage;

  beforeEach(() => {
    sidebarPage = new SidebarPage();
    browser.get('/#/sidebar');
  });

  it('should say SidebarCtrl', () => {
    expect(sidebarPage.heading.getText()).toEqual('sidebar');
    expect(sidebarPage.text.getText()).toEqual('SidebarCtrl');
  });
});
