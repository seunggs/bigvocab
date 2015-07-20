/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ConfigService', () => {
  let factory;

  beforeEach(module('common'));

  beforeEach(inject((ConfigService) => {
    factory = ConfigService;
  }));

  it('should have someValue be ConfigService', () => {
    expect(factory.someValue).toEqual('ConfigService');
  });

  it('should have someMethod return ConfigService', () => {
    expect(factory.someMethod()).toEqual('ConfigService');
  });
});
