/*global describe, beforeEach, it, browser, expect */
'use strict';

import DashboardPage from './dashboard.po';

describe('Dashboard page', () => {
  let dashboardPage;

  beforeEach(() => {
    dashboardPage = new DashboardPage();
    browser.get('/#/dashboard');
  });

  it('should say DashboardCtrl', () => {
    expect(dashboardPage.heading.getText()).toEqual('dashboard');
    expect(dashboardPage.text.getText()).toEqual('DashboardCtrl');
  });
});
