/*global describe, beforeEach, it, expect, inject, module*/
'use strict';

describe('WordsService', function () {
  var factory = undefined;

  beforeEach(module('mainApp'));

  beforeEach(inject(function (WordsService) {
    factory = WordsService;
  }));

  // it('should have someValue be WordsService', () => {
  //   expect(factory.someValue).toEqual('WordsService');
  // });
});