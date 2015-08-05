/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('SettingsCtrl', () => {
  let ctrl;

  beforeEach(module('mainApp'));

  beforeEach(inject(($rootScope, $controller) => {
    ctrl = $controller('SettingsCtrl');
  }));

  it('should have ctrlName as SettingsCtrl', () => {
    expect(ctrl.ctrlName).toEqual('SettingsCtrl');
  });
});
