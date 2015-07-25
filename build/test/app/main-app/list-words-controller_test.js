/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ListWordsCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ListWordsCtrl');
  }));

  it('should have ctrlName as ListWordsCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ListWordsCtrl');
  });
});