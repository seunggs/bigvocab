/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('CommonCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('common'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('CommonCtrl');
  }));

  it('should have ctrlName as CommonCtrl', function () {
    expect(ctrl.ctrlName).toEqual('CommonCtrl');
  });
});