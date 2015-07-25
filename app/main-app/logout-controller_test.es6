/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('LogoutCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('LogoutCtrl');
  }));

  it('should have ctrlName as LogoutCtrl', () => {
    expect(ctrl.ctrlName).toEqual('LogoutCtrl');
  });
});
