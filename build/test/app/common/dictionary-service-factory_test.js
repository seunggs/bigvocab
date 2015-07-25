/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('DictionaryService', function () {
  var factory = undefined;

  beforeEach(module('common'));

  beforeEach(inject(function (DictionaryService) {
    factory = DictionaryService;
  }));

  it('should have someValue be DictionaryService', function () {
    expect(factory.someValue).toEqual('DictionaryService');
  });

  it('should have someMethod return DictionaryService', function () {
    expect(factory.someMethod()).toEqual('DictionaryService');
  });
});