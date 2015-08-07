/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('TopMenuCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('TopMenuCtrl');
  }));

  it('should have ctrlName as TopMenuCtrl', () => {
    expect(ctrl.ctrlName).toEqual('TopMenuCtrl');
  });
});
