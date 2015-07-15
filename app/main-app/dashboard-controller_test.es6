/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('DashboardCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('DashboardCtrl');
  }));

  it('should have ctrlName as DashboardCtrl', () => {
    expect(ctrl.ctrlName).toEqual('DashboardCtrl');
  });
});
