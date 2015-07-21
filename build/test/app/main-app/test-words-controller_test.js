/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('TestWordsCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('TestWordsCtrl');
  }));

  it('should have ctrlName as TestWordsCtrl', function () {
    expect(ctrl.ctrlName).toEqual('TestWordsCtrl');
  });
});