/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('AddWordsCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('AddWordsCtrl');
  }));

  it('should have ctrlName as AddWordsCtrl', function () {
    expect(ctrl.ctrlName).toEqual('AddWordsCtrl');
  });
});