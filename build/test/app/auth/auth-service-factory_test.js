/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('AuthService', function () {
  var factory = undefined;

  beforeEach(module('auth'));

  beforeEach(inject(function (AuthService) {
    factory = AuthService;
  }));

  it('should have someValue be AuthService', function () {
    expect(factory.someValue).toEqual('AuthService');
  });

  it('should have someMethod return AuthService', function () {
    expect(factory.someMethod()).toEqual('AuthService');
  });
});