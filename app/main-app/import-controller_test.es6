/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ImportCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('ImportCtrl');
  }));

  it('should have ctrlName as ImportCtrl', () => {
    expect(ctrl.ctrlName).toEqual('ImportCtrl');
  });
});
