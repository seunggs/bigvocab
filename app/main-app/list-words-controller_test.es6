/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ListWordsCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('ListWordsCtrl');
  }));

  it('should have ctrlName as ListWordsCtrl', () => {
    expect(ctrl.ctrlName).toEqual('ListWordsCtrl');
  });
});
