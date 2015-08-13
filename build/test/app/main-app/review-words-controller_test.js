/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ReviewWordsCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ReviewWordsCtrl');
  }));

  // it('should have ctrlName as ReviewWordsCtrl', () => {
  //   expect(ctrl.ctrlName).toEqual('ReviewWordsCtrl');
  // });
});