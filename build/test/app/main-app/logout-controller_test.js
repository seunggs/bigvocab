/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('LogoutCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('LogoutCtrl');
  }));

  it('should have ctrlName as LogoutCtrl', function () {
    expect(ctrl.ctrlName).toEqual('LogoutCtrl');
  });
});