/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('AuthCtrl', () => {
  let ctrl;

  beforeEach(module('auth'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('AuthCtrl');
  }));

  it('should have ctrlName as AuthCtrl', () => {
    expect(ctrl.ctrlName).toEqual('AuthCtrl');
  });
});
