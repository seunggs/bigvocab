/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('LoginCtrl', () => {
  let ctrl;

  beforeEach(module('auth'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('LoginCtrl');
  }));

  it('should have ctrlName as LoginCtrl', () => {
    expect(ctrl.ctrlName).toEqual('LoginCtrl');
  });
});
