/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('SettingsCtrl', function () {
  var ctrl = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('SettingsCtrl');
  }));

  // it('should have ctrlName as SettingsCtrl', () => {
  //   expect(ctrl.ctrlName).toEqual('SettingsCtrl');
  // });
});