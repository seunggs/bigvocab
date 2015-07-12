/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('NavHomeCtrl', () => {
  let ctrl;

  beforeEach(module('home'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('NavHomeCtrl');
  }));

  it('should have ctrlName as NavHomeCtrl', () => {
    expect(ctrl.ctrlName).toEqual('NavHomeCtrl');
  });
});
