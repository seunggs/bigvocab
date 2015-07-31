/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Sm2Service', function () {
  var factory = undefined;

  beforeEach(module('common'));

  beforeEach(inject(function (Sm2Service) {
    factory = Sm2Service;
  }));

  it('should have someValue be Sm2Service', function () {
    expect(factory.someValue).toEqual('Sm2Service');
  });

  it('should have someMethod return Sm2Service', function () {
    expect(factory.someMethod()).toEqual('Sm2Service');
  });
});