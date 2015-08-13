/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('TestWordsCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('TestWordsCtrl');
  }));

  // it('should have ctrlName as TestWordsCtrl', () => {
  //   expect(ctrl.ctrlName).toEqual('TestWordsCtrl');
  // });
});
