/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('SettingsService', () => {
  let factory;

  beforeEach(module('mainApp'));

  beforeEach(inject((SettingsService) => {
    factory = SettingsService;
  }));

  it('should have someValue be SettingsService', () => {
    expect(factory.someValue).toEqual('SettingsService');
  });

  it('should have someMethod return SettingsService', () => {
    expect(factory.someMethod()).toEqual('SettingsService');
  });
});
