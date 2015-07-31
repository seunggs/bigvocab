/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ImportCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ImportCtrl');
  }));

  it('should have ctrlName as ImportCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ImportCtrl');
  });
});