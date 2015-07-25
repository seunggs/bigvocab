/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('WordsService', function () {
  var factory = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function (WordsService) {
    factory = WordsService;
  }));

  it('should have someValue be WordsService', function () {
    expect(factory.someValue).toEqual('WordsService');
  });

  it('should have someMethod return WordsService', function () {
    expect(factory.someMethod()).toEqual('WordsService');
  });
});