/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('CommonCtrl', () => {
  let ctrl;

  beforeEach(module('common'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('CommonCtrl');
  }));

  it('should have ctrlName as CommonCtrl', () => {
    expect(ctrl.ctrlName).toEqual('CommonCtrl');
  });
});
