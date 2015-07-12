/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('NavCtrl', () => {
  let ctrl;

  beforeEach(module('bigvocab'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('NavCtrl');
  }));

  it('should have ctrlName as NavCtrl', () => {
    expect(ctrl.ctrlName).toEqual('NavCtrl');
  });
});
