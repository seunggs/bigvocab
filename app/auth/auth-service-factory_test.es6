/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('AuthService', () => {
  let factory;

  beforeEach(module('auth'));

  beforeEach(inject((AuthService) => {
    factory = AuthService;
  }));

  it('should have someValue be AuthService', () => {
    expect(factory.someValue).toEqual('AuthService');
  });

  it('should have someMethod return AuthService', () => {
    expect(factory.someMethod()).toEqual('AuthService');
  });
});
