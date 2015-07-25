/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('WordsService', () => {
  let factory;

  beforeEach(module('mainApp'));

  beforeEach(inject((WordsService) => {
    factory = WordsService;
  }));

  it('should have someValue be WordsService', () => {
    expect(factory.someValue).toEqual('WordsService');
  });

  it('should have someMethod return WordsService', () => {
    expect(factory.someMethod()).toEqual('WordsService');
  });
});
