/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ReviewWordsCtrl', () => {
  let ctrl;

  beforeEach(module('bigvocab'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('ReviewWordsCtrl');
  }));

  it('should have ctrlName as ReviewWordsCtrl', () => {
    expect(ctrl.ctrlName).toEqual('ReviewWordsCtrl');
  });
});
