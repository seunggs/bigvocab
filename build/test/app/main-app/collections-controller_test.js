/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('CollectionsCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('CollectionsCtrl');
  }));

  // it('should have ctrlName as CollectionsCtrl', () => {
  //   expect(ctrl.ctrlName).toEqual('CollectionsCtrl');
  // });
});