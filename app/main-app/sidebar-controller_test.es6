/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('SidebarCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('SidebarCtrl');
  }));

  it('should have ctrlName as SidebarCtrl', () => {
    expect(ctrl.ctrlName).toEqual('SidebarCtrl');
  });
});
