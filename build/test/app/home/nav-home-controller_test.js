/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('NavHomeCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('home'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('NavHomeCtrl');
  }));

  it('should have ctrlName as NavHomeCtrl', function () {
    expect(ctrl.ctrlName).toEqual('NavHomeCtrl');
  });
});