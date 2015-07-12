/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('CollectionCtrl', () => {
  let ctrl;

  beforeEach(module('bigvocab'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('CollectionCtrl');
  }));

  it('should have ctrlName as CollectionCtrl', () => {
    expect(ctrl.ctrlName).toEqual('CollectionCtrl');
  });
});
