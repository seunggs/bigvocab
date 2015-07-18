/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Config', function () {
  var factory = undefined;

  beforeEach(module('common'));

  beforeEach(inject(function (Config) {
    factory = Config;
  }));

  it('should have someValue be Config', function () {
    expect(factory.someValue).toEqual('Config');
  });

  it('should have someMethod return Config', function () {
    expect(factory.someMethod()).toEqual('Config');
  });
});