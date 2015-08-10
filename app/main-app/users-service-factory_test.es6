/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('UsersService', () => {
  let factory;

  beforeEach(module('mainApp'));

  beforeEach(inject((UsersService) => {
    factory = UsersService;
  }));

  it('should have someValue be UsersService', () => {
    expect(factory.someValue).toEqual('UsersService');
  });

  it('should have someMethod return UsersService', () => {
    expect(factory.someMethod()).toEqual('UsersService');
  });
});
