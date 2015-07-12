/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('BigvocabCtrl', () => {
  let ctrl;

  beforeEach(module('bigvocab'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('BigvocabCtrl');
  }));

  it('should have ctrlName as BigvocabCtrl', () => {
    expect(ctrl.ctrlName).toEqual('BigvocabCtrl');
  });
});
