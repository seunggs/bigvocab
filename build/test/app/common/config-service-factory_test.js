/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('ConfigService', function () {
  var factory = undefined;

  beforeEach(module('common'));

  beforeEach(inject(function (ConfigService) {
    factory = ConfigService;
  }));

  it('should have someValue be ConfigService', function () {
    expect(factory.someValue).toEqual('ConfigService');
  });

  it('should have someMethod return ConfigService', function () {
    expect(factory.someMethod()).toEqual('ConfigService');
  });
});