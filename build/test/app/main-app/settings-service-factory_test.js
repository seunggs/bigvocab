/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('SettingsService', function () {
  var factory = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function (SettingsService) {
    factory = SettingsService;
  }));

  it('should have someValue be SettingsService', function () {
    expect(factory.someValue).toEqual('SettingsService');
  });

  it('should have someMethod return SettingsService', function () {
    expect(factory.someMethod()).toEqual('SettingsService');
  });
});