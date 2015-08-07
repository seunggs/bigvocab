/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('TopMenuCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('TopMenuCtrl');
  }));

  it('should have ctrlName as TopMenuCtrl', function () {
    expect(ctrl.ctrlName).toEqual('TopMenuCtrl');
  });
});