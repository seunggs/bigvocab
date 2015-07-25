/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('SidebarCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('SidebarCtrl');
  }));

  it('should have ctrlName as SidebarCtrl', function () {
    expect(ctrl.ctrlName).toEqual('SidebarCtrl');
  });
});