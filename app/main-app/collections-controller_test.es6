/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('CollectionsCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('CollectionsCtrl');
  }));

  // it('should have ctrlName as CollectionsCtrl', () => {
  //   expect(ctrl.ctrlName).toEqual('CollectionsCtrl');
  // });
});
