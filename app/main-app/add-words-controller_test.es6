/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('AddWordsCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('AddWordsCtrl');
  }));

  it('should have ctrlName as AddWordsCtrl', () => {
    expect(ctrl.ctrlName).toEqual('AddWordsCtrl');
  });
});
