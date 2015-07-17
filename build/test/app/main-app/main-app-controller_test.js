/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('MainAppCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('MainAppCtrl');
  }));

  it('should have ctrlName as MainAppCtrl', function () {
    expect(ctrl.ctrlName).toEqual('MainAppCtrl');
  });
});