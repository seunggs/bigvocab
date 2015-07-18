/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('Dictionary', function () {
  var factory = undefined;

  beforeEach(module('common'));

  beforeEach(inject(function (Dictionary) {
    factory = Dictionary;
  }));

  it('should have someValue be Dictionary', function () {
    expect(factory.someValue).toEqual('Dictionary');
  });

  it('should have someMethod return Dictionary', function () {
    expect(factory.someMethod()).toEqual('Dictionary');
  });
});