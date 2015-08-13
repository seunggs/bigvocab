/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('UsersService', function () {
  var factory = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function (UsersService) {
    factory = UsersService;
  }));

  // it('should have someValue be UsersService', () => {
  //   expect(factory.someValue).toEqual('UsersService');
  // });
});