/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('MainAppCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('MainAppCtrl');
  }));

  it('should have ctrlName as MainAppCtrl', () => {
    expect(ctrl.ctrlName).toEqual('MainAppCtrl');
  });
});
